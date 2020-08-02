FROM node:14.4.0-alpine3.11 AS test

RUN apk add --no-cache python make g++

USER node
WORKDIR /home/node

# Copy or mount node app here
COPY --chown=node:node package*.json /home/node/

RUN npm install
