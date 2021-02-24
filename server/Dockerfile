FROM node:14.16.0-alpine3.11 AS builder 

RUN apk add --no-cache python make g++
RUN addgroup -S nodegroup && adduser -S -G node nodegroup

USER node
WORKDIR /home/node

# Copy or mount node app here
COPY --chown=node:nodegroup package.json /home/node/

RUN npm install


FROM node:14.16.0-alpine3.11 as app

RUN addgroup -S nodegroup && adduser -S -G node nodegroup

RUN chown -R node:nodegroup /home/node/
RUN rm -rf /home/node/dist

USER node
COPY --chown=node:nodegroup ./docker/entrypoint.sh /tmp/
RUN ["chmod", "+x", "/tmp/entrypoint.sh"]

WORKDIR /home/node/
RUN ["chown", "-R", "node:nodegroup", "/home/node/"]

## Copy built node modules and binaries without including the toolchain
COPY --from=builder --chown=node:nodegroup /home/node/node_modules node_modules

ENV PATH=/home/node/node_modules/.bin:$PATH

COPY --chown=node:nodegroup . .

RUN ["ls", "-al",  "/home/node/"]
# RUN ["chmod", "-R", "oug+rx", "/home/node/src/"]

EXPOSE 8081
ENTRYPOINT ["/tmp/entrypoint.sh"]