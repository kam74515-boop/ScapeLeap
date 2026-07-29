# Taiwan self-hosted deployment

This deployment keeps the application, authentication, PostgreSQL and files
under infrastructure controlled by ScapeLeap.

## Topology

- Caddy: public `80/443`
- ScapeLeap Next.js: `127.0.0.1:3010`
- PostgreSQL 16: `127.0.0.1:5432`
- Source and releases: `/srv/scapeleap-next`
- Runtime secrets: `/etc/scapeleap-next/production.env`
- Daily database backups: `/srv/scapeleap-next/backups`

The existing legacy application remains in `/srv/scapeleap` and is not
deleted. Caddy is switched only after the new service passes its health check.

## First install

1. Create the private GitHub repository and add the server's dedicated SSH
   public key as a read-only deploy key. The host alias
   `github-scapeleap-next` keeps this key separate from legacy repositories.
2. Update `SCAPELEAP_REPO_URL` in the generated production environment when
   the repository name differs.
3. On the Taiwan host, run:

```bash
sudo bash infra/tw/install.sh
```

The installer creates an isolated database and role, generates authentication
secrets, installs systemd units, performs the first deployment, validates the
application on loopback, then activates Caddy.

## Operations

```bash
sudo systemctl status scapeleap-web scapeleap-next-deploy.timer
sudo systemctl start scapeleap-next-deploy.service
sudo journalctl -u scapeleap-web -n 150 --no-pager
sudo journalctl -u scapeleap-next-deploy.service -n 200 --no-pager
curl --fail http://127.0.0.1:3010/api/health
```

The deploy timer checks the private `main` branch every two minutes. Each
revision must pass dependency installation, type checking, unit tests,
production build and database migration before the current release symlink
changes. Full browser tests run in GitHub Actions before deployment.
