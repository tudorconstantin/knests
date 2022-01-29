#!/bin/sh
echo "Checking client is up ($CLIENT_URL) ..."
for i in $(seq 1 30); do
    if curl -s --head  --request GET "$CLIENT_URL/signup" | grep "200 OK" > /dev/null; then 
      echo "$CLIENT_URL is UP"
      sleep 5 #after the client is reported to have started, it takes a few more seconds for it to report "event - compiled client and server successfully"
      break
    else
      echo $(date -u) "$CLIENT_URL is DOWN ... retrying" && sleep 1
    fi

done
echo "executing command: |$@|";
exec "$@";