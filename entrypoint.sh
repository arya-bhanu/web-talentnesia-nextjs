#!/bin/bash

# Start nginx & PHP
service nginx start

# Checking http respond
curl -Is http://localhost

# Stop interactive
npm start
