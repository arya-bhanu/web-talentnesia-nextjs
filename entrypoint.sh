#!/bin/bash

# Start nginx & PHP
service nginx start

# Checking http respond
curl -Is http://localhost

# Stop checking
service nginx stop >> /dev/null

# Stop interactive
nginx -g 'daemon off;'
