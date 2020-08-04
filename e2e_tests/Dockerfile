FROM node:14.7.0-buster AS test

RUN ["mkdir", "/entrypoint"]
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
    curl

# 3. Install gstreamer and plugins to support video playback in WebKit.
RUN apt-get update && apt-get install -y --no-install-recommends \
    libgstreamer-gl1.0-0 \
    libgstreamer-plugins-bad1.0-0 \
    gstreamer1.0-plugins-good \
    gstreamer1.0-libav

# 4. Install Chromium dependencies
RUN apt-get update && apt-get install -y --no-install-recommends \
    libnss3 \
    libxss1 \
    libasound2 \
    fonts-noto-color-emoji \
    libxtst6

# 5. Install Firefox dependencies
RUN apt-get update && apt-get install -y --no-install-recommends \
    libdbus-glib-1-2 \
    libxt6

# 6. Install ffmpeg to bring in audio and video codecs necessary for playing videos in Firefox.
RUN apt-get update && apt-get install -y --no-install-recommends \
    ffmpeg

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
ENTRYPOINT ["/entrypoint/entrypoint.sh"]
USER node
