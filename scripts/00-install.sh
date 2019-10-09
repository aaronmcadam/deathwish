#!/usr/bin/env bash
set -e

yarn

# Build server and client containers
docker-compose -f docker/docker-compose.dev.yml build
