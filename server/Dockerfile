FROM node:14.15.0-alpine3.11 AS builder 

RUN apk add --no-cache python make g++
RUN addgroup -S nodegroup && adduser -S -G node nodegroup

USER node
WORKDIR /home/node

# Copy or mount node app here
COPY --chown=node:nodegroup package*.json /home/node/
COPY package*.json /home/node/

RUN npm install


FROM node:14.15.0-alpine3.11 as app

RUN addgroup -S nodegroup && adduser -S -G node nodegroup

RUN chown -R node:nodegroup /home/node/
RUN mkdir -p /home/node/dist && chown -R node:nodegroup /home/node/dist

USER node
COPY --chown=node:nodegroup ./docker/entrypoint.sh /tmp/
RUN ["chmod", "+x", "/tmp/entrypoint.sh"]

WORKDIR /home/node/

## Copy built node modules and binaries without including the toolchain
COPY --from=builder /home/node/node_modules node_modules

ENV PATH=/home/node/node_modules/.bin:$PATH

COPY --chown=node:nodegroup . .

EXPOSE 8081
ENTRYPOINT ["/tmp/entrypoint.sh"]