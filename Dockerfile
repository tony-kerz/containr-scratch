ARG fromImage=node:23.6.0-bookworm-slim
FROM $fromImage AS base

#RUN \
#    apt-get update &&\
#    apt-get install -y docker-ce-cli &&\
#    rm -rf /var/lib/apt/lists/*

# https://stackoverflow.com/a/65588785
#
COPY --from=docker:27.4.1-cli /usr/local/bin/docker /usr/local/bin/

ARG entrypoint=node
ENV entrypoint=$entrypoint

ENV appPath=/app
# PACKAGE_PATH env for use with helpr function to grab package info
ENV PACKAGE_PATH=$appPath
WORKDIR $appPath

ARG cmd=${appPath}/src/index.js
ENV cmd=$cmd

COPY . .

#
FROM base AS dev
RUN \
    npm install --include=dev
CMD npm run dev

# https://stackoverflow.com/a/58752370
#
FROM scratch AS lock
COPY --from=dev /app/package-lock.json package-lock.json

#
FROM base AS test
ARG testParams=''
ENV testParams=$testParams
ENV NODE_ENV=test
RUN \
    npm ci --include=dev &&\
    chmod 777 node_modules ${appPath}
CMD ["sh", "-c", "npm test"]

#
FROM base AS prod
RUN npm ci --omit=dev

ENV NODE_CONFIG_DIR=${appPath}/config

CMD ["sh", "-c", "${entrypoint} ${cmd}"]