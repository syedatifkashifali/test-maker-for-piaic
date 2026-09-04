#!/bin/sh
set -eu
# Resolve the project root from this script's own location, so the same file
# works wherever the workspace is checked out.
cd "$(dirname "$0")"
node scripts/preview.mjs stop || true
if curl -sf -o /dev/null --max-time 2 http://127.0.0.1:8080/; then
  exit 0
fi
# Dependencies are not part of the workspace snapshot, so a revived sandbox can
# come back with an empty node_modules and no vite binary to run.
if [ ! -x node_modules/.bin/vite ]; then
  npm install --no-audit --no-fund >>/tmp/app-startup.log 2>&1
fi
npm run dev >>/tmp/app-startup.log 2>&1 &
