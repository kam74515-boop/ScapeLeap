#!/usr/bin/env bash
set -Eeuo pipefail

if [[ "${EUID}" -ne 0 ]]; then
  echo "Run this installer with sudo." >&2
  exit 1
fi

readonly deploy_user="${SCAPELEAP_DEPLOY_USER:-${SUDO_USER:-}}"
readonly app_root="/srv/scapeleap-next"
readonly config_dir="/etc/scapeleap-next"
readonly database_name="scapeleap_next"
readonly database_user="scapeleap_next"

if [[ -z "${deploy_user}" || "${deploy_user}" == "root" ]]; then
  echo "SCAPELEAP_DEPLOY_USER must be a non-root system user." >&2
  exit 1
fi

install -d -m 0755 -o "${deploy_user}" -g "${deploy_user}" "${app_root}"
install -d -m 0750 -o "${deploy_user}" -g "${deploy_user}" \
  "${app_root}/source" "${app_root}/releases" "${app_root}/builds" "${app_root}/data"
install -d -m 0700 -o postgres -g postgres "${app_root}/backups"
install -d -m 0700 -o root -g root "${config_dir}"

database_password="$(openssl rand -base64 36 | tr -d '/+=' | head -c 40)"
auth_secret="$(openssl rand -base64 48 | tr -d '\n')"

if ! sudo -u postgres psql -Atqc "select 1 from pg_roles where rolname='${database_user}'" | grep -qx 1; then
  sudo -u postgres psql -v ON_ERROR_STOP=1 -c "create role ${database_user} login password '${database_password}'"
fi

if ! sudo -u postgres psql -Atqc "select 1 from pg_database where datname='${database_name}'" | grep -qx 1; then
  sudo -u postgres createdb --owner="${database_user}" "${database_name}"
fi

if [[ ! -f "${config_dir}/production.env" ]]; then
  umask 077
  {
    echo "NODE_ENV=production"
    echo "HOSTNAME=127.0.0.1"
    echo "PORT=3010"
    echo "NEXT_TELEMETRY_DISABLED=1"
    echo "NEXT_PUBLIC_LOGGING_LEVEL=info"
    echo "NEXT_PUBLIC_APP_URL=https://museart.cloud"
    echo "BETTER_AUTH_URL=https://museart.cloud"
    echo "BETTER_AUTH_SECRET=${auth_secret}"
    echo "DATABASE_URL=postgresql://${database_user}:${database_password}@127.0.0.1:5432/${database_name}"
    echo "SCAPELEAP_DATABASE_NAME=${database_name}"
    echo "SCAPELEAP_DEPLOY_USER=${deploy_user}"
    echo "SCAPELEAP_DEPLOY_BRANCH=main"
    echo "SCAPELEAP_REPO_URL=git@github.com:kam74515-boop/ScapeLeap.git"
    echo "SCAPELEAP_PUBLIC_URL=https://museart.cloud"
    echo "SCAPELEAP_ROOT=${app_root}"
  } >"${config_dir}/production.env"
fi

install -m 0755 infra/tw/deploy.sh /usr/local/bin/scapeleap-next-deploy
install -m 0755 infra/tw/deploy-wrapper.sh /usr/local/sbin/scapeleap-next-deploy-wrapper
install -m 0755 infra/tw/backup.sh /usr/local/sbin/scapeleap-next-backup

sed "s/SCAPELEAP_DEPLOY_USER/${deploy_user}/g" \
  infra/tw/scapeleap-web.service >/etc/systemd/system/scapeleap-web.service
install -m 0644 infra/tw/scapeleap-next-deploy.service /etc/systemd/system/
install -m 0644 infra/tw/scapeleap-next-deploy.timer /etc/systemd/system/
install -m 0644 infra/tw/scapeleap-next-backup.service /etc/systemd/system/
install -m 0644 infra/tw/scapeleap-next-backup.timer /etc/systemd/system/

systemctl daemon-reload
systemctl enable scapeleap-web.service scapeleap-next-deploy.timer scapeleap-next-backup.timer
systemctl start scapeleap-next-deploy.service

curl --silent --show-error --fail http://127.0.0.1:3010/api/health >/dev/null

install -m 0644 infra/tw/Caddyfile /etc/caddy/Caddyfile
caddy validate --config /etc/caddy/Caddyfile
systemctl reload caddy

systemctl disable --now scapeleap-deploy.timer 2>/dev/null || true
systemctl start scapeleap-next-deploy.timer scapeleap-next-backup.timer

echo "ScapeLeap is running at https://museart.cloud"
echo "The previous /srv/scapeleap release remains available for rollback."
