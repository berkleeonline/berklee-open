ARG alpine_version="3.20"
FROM node:lts-alpine${alpine_version}

ARG branch="dev"

ARG AMPLIFY_APP_ID="d2aaugixocxhg8"
ARG CONTENTFUL_DELIVERY_TOKEN
ARG CONTENTFUL_SPACE_ID
ARG CONTENTFUL_PREVIEW_TOKEN
ARG WEBHOOK

RUN apk add --no-cache \
  bash \
  wget

RUN npm install -g @aws-amplify/cli

COPY . /berklee-open
WORKDIR /berklee-open

RUN bash -x -c " \
  export AMPLIFY_APP_ID="${AMPLIFY_APP_ID}"; \
  export CONTENTFUL_DELIVERY_TOKEN="${CONTENTFUL_DELIVERY_TOKEN}"; \
  export CONTENTFUL_SPACE_ID="${CONTENTFUL_SPACE_ID}"; \
  export CONTENTFUL_PREVIEW_TOKEN="${CONTENTFUL_PREVIEW_TOKEN}"; \
  export WEBHOOK="${WEBHOOK}"; \
  scripts/build-and-deploy \
    -b ${branch} \
"
