FROM node:14.16.0-buster AS builder
WORKDIR /data/
RUN chmod -R a+rw /data/
RUN addgroup --gid 1024 nodegroup
## add user node to the group with GID 1024
RUN adduser node nodegroup 
RUN chown -R node:nodegroup /data
USER node
COPY --chown=node:nodegroup package.json /data/

RUN npm install
ENV PATH=/data/node_modules/.bin:$PATH

RUN next telemetry disable

# COPY . .
COPY --chown=node:nodegroup . .
COPY ./docker/entrypoint.sh /entrypoint/
USER root
RUN ["chmod", "+x", "/entrypoint/entrypoint.sh"]
USER node

ARG SERVER_URL
RUN next telemetry status
RUN npm run build
ENTRYPOINT ["/entrypoint/entrypoint.sh"]


FROM nginx:stable-alpine as app

ARG NGINX_PORT
ARG API_URL
ARG SERVER_URL

# Change gid for the nginx user
# To have usermod and groupmod, I have to install the shadow package.
RUN apk --no-cache add shadow && \
   groupmod -g 1024 -o nginx
# COPY --from=builder /data/dist /usr/share/nginx/html
COPY --from=builder /data/out /usr/share/nginx/html
COPY docker/nginx.conf.template /etc/nginx/conf.d/nginx.conf.template
RUN export
RUN sh -c "envsubst \"`env | awk -F = '{printf \" \\\\$%s\", $1}'`\" < /etc/nginx/conf.d/nginx.conf.template > /etc/nginx/conf.d/custom.conf"


#CMD ["nginx", "-g", '"daemon off;"']

#CMD ["cat", "/etc/nginx/conf.d/custom.conf"]

# FROM node:lts-alpine as app
# USER node
# WORKDIR /data/
# ## Copy built node modules and binaries without including the toolchain
# COPY --from=builder /data/node_modules .

# ENV PATH=/data/node_modules/.bin:$PATH

# COPY . .

# EXPOSE 8080
# ENTRYPOINT ["/entrypoint/entrypoint.sh"]