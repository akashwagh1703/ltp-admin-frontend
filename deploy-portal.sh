#!/bin/bash

set -e

echo "=============================="
echo " Deploying LTP Admin Portal"
echo "=============================="

# Go to project directory
cd /var/www/ltp/ltp-portal || exit 1

echo "▶ Stashing local changes (if any)..."
git stash push -u -m "auto-stash before portal deploy" || true

echo "▶ Pulling latest code..."
git fetch origin
git checkout master
git pull --rebase origin master

echo "▶ Installing dependencies..."
npm install

echo "▶ Building admin portal..."
npm run build

echo "▶ Fixing permissions..."
chown -R www-data:www-data dist
chmod -R 755 dist

echo "▶ Reloading NGINX..."
systemctl reload nginx

echo "=============================="
echo " Admin Portal deployed 🚀"
echo "=============================="
