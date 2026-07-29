#!/usr/bin/env bash
set -Eeuo pipefail

: "${SCAPELEAP_DEPLOY_USER:?SCAPELEAP_DEPLOY_USER is required}"
: "${SCAPELEAP_REPO_URL:?SCAPELEAP_REPO_URL is required}"
: "${SCAPELEAP_DEPLOY_BRANCH:?SCAPELEAP_DEPLOY_BRANCH is required}"
: "${SCAPELEAP_PUBLIC_URL:?SCAPELEAP_PUBLIC_URL is required}"
: "${DATABASE_URL:?DATABASE_URL is required}"

readonly root_dir="${SCAPELEAP_ROOT:-/srv/scapeleap-next}"
readonly deploy_home="$(getent passwd "${SCAPELEAP_DEPLOY_USER}" | cut -d: -f6)"
readonly previous_release="$(readlink "${root_dir}/current" 2>/dev/null || true)"

runuser -u "${SCAPELEAP_DEPLOY_USER}" -- \
  env -i \
  HOME="${deploy_home}" \
  LANG="C.UTF-8" \
  PATH="/usr/local/bin:/usr/bin:/bin" \
  NEXT_TELEMETRY_DISABLED="1" \
  SCAPELEAP_DEPLOY_BRANCH="${SCAPELEAP_DEPLOY_BRANCH}" \
  SCAPELEAP_REPO_URL="${SCAPELEAP_REPO_URL}" \
  SCAPELEAP_ROOT="${root_dir}" \
  SCAPELEAP_PUBLIC_URL="${SCAPELEAP_PUBLIC_URL}" \
  SCAPELEAP_DATABASE_URL="${DATABASE_URL}" \
  /usr/local/bin/scapeleap-next-deploy

pending_revision=""
if [[ -f "${root_dir}/pending-revision" ]]; then
  pending_revision="$(tr -d '\n' <"${root_dir}/pending-revision")"
fi
if [[ -z "${pending_revision}" ]]; then
  exit 0
fi

ln -sfn "${root_dir}/releases/${pending_revision}" "${root_dir}/current.next"
mv -Tf "${root_dir}/current.next" "${root_dir}/current"
systemctl restart scapeleap-web.service

healthy=false
for _attempt in $(seq 1 30); do
  if curl --silent --show-error --fail http://127.0.0.1:3010/api/health >/dev/null; then
    healthy=true
    break
  fi
  sleep 1
done

if [[ "${healthy}" != "true" ]]; then
  if [[ -n "${previous_release}" ]]; then
    ln -sfn "${previous_release}" "${root_dir}/current.next"
    mv -Tf "${root_dir}/current.next" "${root_dir}/current"
    systemctl restart scapeleap-web.service
  fi
  echo "ScapeLeap health check failed; previous release restored" >&2
  exit 1
fi

printf '%s\n' "${pending_revision}" >"${root_dir}/deployed-revision"
rm -f "${root_dir}/pending-revision"
