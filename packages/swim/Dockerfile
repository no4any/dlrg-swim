FROM node:slim
COPY . /app
WORKDIR /app
ARG BASE_PATH
ARG MONGO_USERNAME
ARG MONGO_PASSWORD
ARG MONGO_CONNECTION
RUN yarn
ENTRYPOINT ["yarn", "docker"]