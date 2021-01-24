#!/bin/sh
echo "Running migrations ..."
whoami
cd /home/node/src/
for i in $(seq 1 30); do
    node /home/node/node_modules/knex-migrate/src/cli.js --knexfile=/home/node/src/knexfile.js up
    [ $? = 0 ] && break
    echo "Reconnecting to the db ..." && sleep 1

done
cd /home/node/

echo "executing command: |$@|";
exec "$@";