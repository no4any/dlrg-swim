FROM node:slim
COPY . /app
WORKDIR /app
RUN yarn
RUN yarn build
ENTRYPOINT [ "yarn", "start" ]