#!/bin/sh
set -e
# wait for db and kafka (simplified)
sleep 5
./core-payments
