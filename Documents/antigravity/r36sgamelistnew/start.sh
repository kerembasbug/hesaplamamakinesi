#!/bin/sh
# Start script for Coolify deployment
# This ensures PORT is properly set for standalone mode

export PORT=${PORT:-3000}
# CRITICAL: Force HOSTNAME to 0.0.0.0 for Coolify/Traefik access
# Coolify may set HOSTNAME to container hostname, which causes 502 errors
export HOSTNAME=0.0.0.0
export NODE_ENV=${NODE_ENV:-production}

echo "Starting Next.js standalone server on $HOSTNAME:$PORT"
echo "PORT=$PORT HOSTNAME=$HOSTNAME NODE_ENV=$NODE_ENV"
echo "Current directory: $(pwd)"
echo "Listing .next directory:"
ls -la .next/ 2>/dev/null || echo ".next directory not found"

# Ensure games.json exists in standalone directory if needed
if [ -f "src/data/games.json" ] && [ -d ".next/standalone" ]; then
  mkdir -p .next/standalone/src/data
  cp src/data/games.json .next/standalone/src/data/games.json 2>/dev/null || true
  echo "✓ Copied games.json to standalone directory"
fi

# Copy static files to standalone directory (required for standalone mode)
# In standalone mode, static files must be at .next/standalone/.next/static
if [ -d ".next/standalone" ]; then
  # Copy .next/static to standalone/.next/static
  if [ -d ".next/static" ]; then
    mkdir -p .next/standalone/.next
    # Remove old static directory if exists to avoid conflicts
    rm -rf .next/standalone/.next/static 2>/dev/null || true
    # Copy with preserve attributes
    cp -r .next/static .next/standalone/.next/static 2>/dev/null || true
    echo "✓ Copied .next/static to standalone/.next/static"
    echo "  Static files count: $(find .next/standalone/.next/static -type f 2>/dev/null | wc -l || echo 0)"
  else
    echo "⚠ Warning: .next/static directory not found!"
  fi
  
  # Copy public folder if exists
  if [ -d "public" ]; then
    cp -r public .next/standalone/public 2>/dev/null || true
    echo "✓ Copied public folder to standalone directory"
  fi
  
  # Verify static files are in place
  if [ -d ".next/standalone/.next/static" ]; then
    echo "✓ Verified: .next/standalone/.next/static exists"
    ls -la .next/standalone/.next/static/chunks/ 2>/dev/null | head -5 || echo "  No chunks directory found"
  else
    echo "⚠ Error: .next/standalone/.next/static does not exist!"
  fi
fi

# CRITICAL FIX: Ensure server binds to 0.0.0.0 for Coolify/Traefik
# Next.js standalone server.js might bind to localhost by default
# We need to explicitly ensure it binds to 0.0.0.0

# Try standalone first, fallback to next start
if [ -f ".next/standalone/server.js" ]; then
  echo "Using standalone server..."
  cd .next/standalone || cd /app/.next/standalone || cd /app
  echo "Changed to directory: $(pwd)"
  
  # CRITICAL: Patch server.js to bind to 0.0.0.0 instead of localhost
  # Next.js standalone might generate server.js that binds to localhost
  echo "Checking and patching server.js to bind to 0.0.0.0..."
  
  # Backup original server.js
  cp server.js server.js.original 2>/dev/null || true
  
  # Patch any hostname bindings to 0.0.0.0
  # This ensures Coolify/Traefik can access the server
  # Replace any hostname (localhost, 127.0.0.1, container hostname, etc.) with 0.0.0.0
  sed -i.tmp \
    -e "s/listen(\([^,]*\),\s*['\"][^'\"]*['\"]/listen(\1, '0.0.0.0'/g" \
    -e "s/\.listen(\([^,]*\))/.listen(\1, '0.0.0.0')/g" \
    -e "s/process\.env\.HOSTNAME || '0\.0\.0\.0'/process.env.HOSTNAME || '0.0.0.0'/g" \
    -e "s/HOSTNAME || '0\.0\.0\.0'/HOSTNAME || '0.0.0.0'/g" \
    server.js 2>/dev/null || true
  
  # Also ensure HOSTNAME is set in the server.js file itself
  # Add or replace HOSTNAME environment variable usage
  if ! grep -q "HOSTNAME.*0\.0\.0\.0" server.js 2>/dev/null; then
    # Try to add HOSTNAME override at the top of server.js
    sed -i.tmp "1s/^/process.env.HOSTNAME = process.env.HOSTNAME || '0.0.0.0';\n/" server.js 2>/dev/null || true
  fi
  
  # Remove temp file if created
  rm -f server.js.tmp 2>/dev/null || true
  
  echo "Starting server with HOSTNAME=0.0.0.0 and PORT=$PORT"
  echo "✓ Server will bind to 0.0.0.0:$PORT for Coolify/Traefik access"
  echo "⚠ Overriding any HOSTNAME set by Coolify (container hostname causes 502 errors)"
  
  # CRITICAL: Force HOSTNAME=0.0.0.0 in the server.js file itself
  # Next.js reads process.env.HOSTNAME, so we need to set it before requiring server.js
  # Create a wrapper that sets HOSTNAME before loading server.js
  cat > server-wrapper.js << 'EOF'
// Force HOSTNAME to 0.0.0.0 for Coolify/Traefik access
process.env.HOSTNAME = '0.0.0.0';
process.env.PORT = process.env.PORT || '3000';
require('./server.js');
EOF
  
  # Start server with explicit environment variables
  # Force HOSTNAME=0.0.0.0 to override any container hostname set by Coolify
  HOSTNAME=0.0.0.0 PORT=$PORT NODE_ENV=production exec node server-wrapper.js
else
  echo "Standalone server not found, using next start..."
  # Explicitly bind to 0.0.0.0 for Coolify/Traefik
  # Force HOSTNAME=0.0.0.0 regardless of environment variable
  exec npx next start -p $PORT -H 0.0.0.0
fi

