FROM node:14.13.1-alpine3.11 AS builder 

RUN apk add --no-cache python make g++

USER node
WORKDIR /home/node

# Copy or mount node app here
COPY --chown=node:node package*.json /home/node/
COPY package*.json /home/node/

RUN npm install


FROM node:14.13.1-alpine3.11 as app

USER node
COPY --chown=node:node ./docker/entrypoint.sh /tmp/
RUN ["chmod", "+x", "/tmp/entrypoint.sh"]

WORKDIR /home/node/

## Copy built node modules and binaries without including the toolchain
COPY --from=builder /home/node/node_modules node_modules

ENV PATH=/home/node/node_modules/.bin:$PATH

COPY --chown=node:node . .

EXPOSE 8081
ENTRYPOINT ["/tmp/entrypoint.sh"]