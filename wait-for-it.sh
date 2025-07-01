#!/usr/bin/env bash
host="$1"
shift
until nc -z "$host"; do
  echo "Waiting for $host..."
  sleep 1
done
exec "$@"
