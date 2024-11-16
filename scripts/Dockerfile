ARG alpine_version="3.19"
ARG branch="dev"
ARG environment="dev"

ARG AMPLIFY_APP_ID="d2aaugixocxhg8"
ARG CONTENTFUL_DELIVERY_TOKEN
ARG CONTENTFUL_SPACE_ID
ARG CONTENTFUL_PREVIEW_TOKEN
ARG WEBHOOK

FROM node:lts-alpine${alpine_version}
MAINTAINER Joe McDonagh <jmcdonagh@berklee.edu>

RUN apk add --no-cache \
  bash \
  wget

RUN npm install -g @aws-amplify/cli

COPY . /berklee-open
WORKDIR /berklee-open

RUN bash -x -c " \
  AMPLIFY_APP_ID="${AMPLIFY_APP_ID}" \
  CONTENTFUL_DELIVERY_TOKEN="${CONTENTFUL_DELIVERY_TOKEN}" \
  CONTENTFUL_SPACE_ID="${CONTENTFUL_SPACE_ID}" \
  CONTENTFUL_PREVIEW_TOKEN="${CONTENTFUL_PREVIEW_TOKEN}" \
  WEBHOOK="${WEBHOOK}" \
  scripts/build-and-deploy \
    -b ${branch} \
    -e ${env} \
"
