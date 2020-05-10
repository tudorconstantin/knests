#!/bin/sh
echo "Running migrations ..."
cd src
for i in $(seq 1 30); do
    node ../node_modules/knex-migrate/src/cli.js up
    [ $? = 0 ] && break
    echo "Reconnecting to the db ..." && sleep 1

done
cd ../

echo "executing command: |$@|";
exec "$@";