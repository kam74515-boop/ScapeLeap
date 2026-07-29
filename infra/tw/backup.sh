#!/usr/bin/env bash
set -Eeuo pipefail

: "${SCAPELEAP_DATABASE_NAME:?SCAPELEAP_DATABASE_NAME is required}"

readonly backup_dir="${SCAPELEAP_ROOT:-/srv/scapeleap-next}/backups"
readonly stamp="$(date -u +%Y%m%dT%H%M%SZ)"

mkdir -p "${backup_dir}"
sudo -u postgres pg_dump --format=custom --file="${backup_dir}/scapeleap-${stamp}.dump" "${SCAPELEAP_DATABASE_NAME}"
find "${backup_dir}" -type f -name 'scapeleap-*.dump' -mtime +14 -delete
