#!/bin/bash

echo "=== BlackSentinel API Setup ==="
echo ""

echo "1. Creating D1 database..."
npx wrangler d1 create blacksentinel-db
echo ""

echo "2. Copy the database_id from above and update worker/wrangler.toml"
echo ""

echo "3. Creating KV namespace for rate limiting..."
npx wrangler kv namespace create RATE_LIMIT_KV
echo ""

echo "4. Copy the KV namespace ID and update worker/wrangler.toml"
echo ""

echo "5. Setting CSRF secret..."
echo "Run: npx wrangler secret put CSRF_SECRET"
echo "Enter a strong random string when prompted"
echo ""

echo "6. Initializing database schema..."
echo "Run: npx wrangler d1 execute blacksentinel-db --file=./worker/schema.sql"
echo ""

echo "7. Deploy the worker:"
echo "Run: cd worker && npx wrangler deploy"
echo ""

echo "=== Setup Complete ==="
