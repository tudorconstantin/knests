FROM node:14.7.0-buster AS builder

# playwright dependencies
# 2. Install WebKit dependencies
RUN apt-get update && apt-get install -y --no-install-recommends \
    libwoff1 \
    libopus0 \
    libwebp6 \
    libwebpdemux2 \
    libenchant1c2a \
    libgudev-1.0-0 \
    libsecret-1-0 \
    libhyphen0 \
    libgdk-pixbuf2.0-0 \
    libegl1 \
    libnotify4 \
    libxslt1.1 \
    libevent-2.1-6 \
    libgles2 \
    libvpx5 \
    libxcomposite1 \
    libatk1.0-0 \
    libatk-bridge2.0-0 \
    libepoxy0 \
    libgtk-3-0 \
    libharfbuzz-icu0 \
    curl apt-utils

# 3. Install gstreamer and plugins to support video playback in WebKit.
RUN apt-get update && apt-get install -y --no-install-recommends \
    libgstreamer-gl1.0-0 \
    libgstreamer-plugins-bad1.0-0 \
    gstreamer1.0-plugins-good \
    gstreamer1.0-libav

RUN apt-get update && \
    apt-get -y install xvfb gconf-service libasound2 libatk1.0-0 \
    libc6 \
    libcairo2 libcups2 \
      libdbus-1-3 libexpat1 libfontconfig1 libgbm1 libgcc1 libgconf-2-4 libgdk-pixbuf2.0-0 libglib2.0-0 \
      libgtk-3-0 libnspr4 libpango-1.0-0 libpangocairo-1.0-0 \
      libstdc++6 \
      libx11-6 libx11-xcb1 libxcb1 \
      libxcomposite1 libxcursor1 libxdamage1 libxext6 libxfixes3 libxi6 libxrandr2 libxrender1 libxss1 \
      libxtst6 ca-certificates fonts-liberation libappindicator1 libnss3 lsb-release xdg-utils wget \
      fonts-noto-color-emoji && \
    rm -rf /var/lib/apt/lists/*

# 5. Install Firefox dependencies
RUN apt-get update && apt-get install -y --no-install-recommends \
    libdbus-glib-1-2 \
    libxt6

# 6. Install ffmpeg to bring in audio and video codecs necessary for playing videos in Firefox.
RUN apt-get update && apt-get install -y --no-install-recommends \
    ffmpeg

# Install latest chrome dev package and fonts to support major charsets (Chinese, Japanese, Arabic, Hebrew, Thai and a few others)
# Note: this installs the necessary libs to make the bundled version of Chromium that Puppeteer
# installs, work.
RUN apt-get update \
    && apt-get install -y wget gnupg \
    && wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add - \
    && sh -c 'echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list' \
    && apt-get update \
    && apt-get install -y google-chrome-stable fonts-ipafont-gothic fonts-wqy-zenhei fonts-thai-tlwg fonts-kacst fonts-freefont-ttf libxss1 \
      --no-install-recommends \
    && rm -rf /var/lib/apt/lists/*

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

COPY . .
COPY ./docker/entrypoint.sh /entrypoint/
USER root
RUN ["chmod", "+x", "/entrypoint/entrypoint.sh"]
USER node

ARG SERVER_URL
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