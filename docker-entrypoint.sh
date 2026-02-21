#!/bin/sh
set -e
mkdir -p /data
chown -R nextjs:nodejs /data
export DATABASE_PATH="${DATABASE_PATH:-/data/auth.db}"
su-exec nextjs sh -c "cd /app/apps/web && npx @better-auth/cli@latest migrate --yes --config ./src/lib/auth.ts"
exec su-exec nextjs node apps/web/server.js
