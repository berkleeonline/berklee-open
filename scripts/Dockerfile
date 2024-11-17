FROM node:lts-bookworm

ARG branch="dev"

ARG AMPLIFY_APP_ID="d2aaugixocxhg8"
ARG AWS_ACCESS_KEY_ID
ARG AWS_SECRET_ACCESS_KEY
ARG AWS_DEFAULT_REGION
ARG CONTENTFUL_DELIVERY_TOKEN
ARG CONTENTFUL_SPACE_ID
ARG CONTENTFUL_PREVIEW_TOKEN
ARG WEBHOOK

RUN \
apt-get update \
  && \
DEBIAN_FRONTEND=noninteractive apt-get install -y \
  bash \
  wget

RUN npm install -g @aws-amplify/cli

COPY . /berklee-open
WORKDIR /berklee-open

RUN bash -x -c " \
  export AMPLIFY_APP_ID="${AMPLIFY_APP_ID}"; \
  export AWS_ACCESS_KEY_ID="${AWS_ACCESS_KEY_ID}" \
  export AWS_SECRET_ACCESS_KEY="${AWS_SECRET_ACCESS_KEY}" \
  export AWS_DEFAULT_REGION="${AWS_DEFAULT_REGION}" \
  export CONTENTFUL_DELIVERY_TOKEN="${CONTENTFUL_DELIVERY_TOKEN}"; \
  export CONTENTFUL_SPACE_ID="${CONTENTFUL_SPACE_ID}"; \
  export CONTENTFUL_PREVIEW_TOKEN="${CONTENTFUL_PREVIEW_TOKEN}"; \
  export WEBHOOK="${WEBHOOK}"; \
  scripts/build-and-deploy \
    -b ${branch} \
"
