#!/usr/bin/env bash
set -Eeuo pipefail

: "${SCAPELEAP_REPO_URL:?SCAPELEAP_REPO_URL is required}"
: "${SCAPELEAP_DEPLOY_BRANCH:?SCAPELEAP_DEPLOY_BRANCH is required}"
: "${SCAPELEAP_DATABASE_URL:?SCAPELEAP_DATABASE_URL is required}"

readonly root_dir="${SCAPELEAP_ROOT:-/srv/scapeleap-next}"
readonly source_dir="${root_dir}/source"
readonly releases_dir="${root_dir}/releases"
readonly builds_dir="${root_dir}/builds"
readonly revision_file="${root_dir}/deployed-revision"

mkdir -p "${source_dir}" "${releases_dir}" "${builds_dir}" "${root_dir}/data"

if [[ ! -d "${source_dir}/.git" ]]; then
  git clone --filter=blob:none --no-checkout "${SCAPELEAP_REPO_URL}" "${source_dir}"
fi

git -C "${source_dir}" remote set-url origin "${SCAPELEAP_REPO_URL}"
git -C "${source_dir}" fetch --prune --depth=1 origin "${SCAPELEAP_DEPLOY_BRANCH}"

revision="$(git -C "${source_dir}" rev-parse FETCH_HEAD)"
if [[ ! "${revision}" =~ ^[0-9a-f]{40}$ ]]; then
  echo "Refusing to deploy an invalid Git revision: ${revision}" >&2
  exit 1
fi

deployed_revision="$(tr -d '\n' <"${revision_file}" 2>/dev/null || true)"
if [[ "${revision}" == "${deployed_revision}" && -L "${root_dir}/current" ]]; then
  exit 0
fi

build_dir="${builds_dir}/${revision}"
release_dir="${releases_dir}/${revision}"
rm -rf -- "${build_dir}"
mkdir -p "${build_dir}"

git -C "${source_dir}" archive "${revision}" | tar -x -C "${build_dir}"
cd "${build_dir}"

npm ci

export BETTER_AUTH_SECRET="build-only-secret-not-used-at-runtime"
export BETTER_AUTH_URL="http://127.0.0.1:3010"
export NEXT_PUBLIC_APP_URL="${SCAPELEAP_PUBLIC_URL}"
export DATABASE_URL="postgresql://build:build@127.0.0.1:5432/build"

npm run check:types
npm run test:unit
npm run build:next

unset BETTER_AUTH_SECRET BETTER_AUTH_URL
export DATABASE_URL="${SCAPELEAP_DATABASE_URL}"
npm run db:migrate

mkdir -p "${build_dir}/.next/standalone/.next"
cp -a "${build_dir}/.next/static" "${build_dir}/.next/standalone/.next/static"
if [[ -d "${build_dir}/public" ]]; then
  cp -a "${build_dir}/public" "${build_dir}/.next/standalone/public"
fi

rm -rf -- "${release_dir}"
mv "${build_dir}/.next/standalone" "${release_dir}"
printf '%s\n' "${revision}" >"${root_dir}/pending-revision"
