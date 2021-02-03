#!/bin/sh
echo "Checking client is up ($SERVER_URL) ..."
ls -al /data/
for i in $(seq 1 30); do
    if curl -s --head  --request GET $SERVER_URL | grep "200 OK" > /dev/null; then 
      echo "$SERVER_URL is UP"
      break
    else
      echo $(date -u) "$SERVER_URL is DOWN ... retrying" && sleep 1
    fi

done
echo "executing command: |$@|";
exec "$@";