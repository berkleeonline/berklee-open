ARG alpine_version="3.19"
ARG AMPLIFY_APP_ID="d2aaugixocxhg8"
ARG branch="dev"
ARG environment="dev"

FROM node:lts-alpine${alpine_version}
MAINTAINER Joe McDonagh <jmcdonagh@berklee.edu>

RUN apk add --no-cache \
  bash \
  wget

RUN npm install -g @aws-amplify/cli

COPY . /berklee-open
WORKDIR /berklee-open

RUN scripts/build-and-deploy \
  -a "${AMPLIFY_APP_ID}" \
  -b ${branch} \
  -e ${env}
