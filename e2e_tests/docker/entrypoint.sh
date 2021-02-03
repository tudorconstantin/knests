#!/bin/sh
echo "Checking client is up ($CLIENT_URL) ..."
for i in $(seq 1 30); do
    if curl -s --head  --request GET "$CLIENT_URL/signup" | grep "200 OK" > /dev/null; then 
      echo "$CLIENT_URL is UP"
      break
    else
      echo $(date -u) "$CLIENT_URL is DOWN ... retrying" && sleep 1
    fi

done
echo "executing command: |$@|";
exec "$@";