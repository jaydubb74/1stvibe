#!/bin/bash
export PATH="/opt/homebrew/bin:/usr/local/bin:$PATH"
exec node node_modules/.bin/next dev --port 3000
