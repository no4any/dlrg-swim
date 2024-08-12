FROM node:slim
COPY . /app
WORKDIR /app
RUN yarn && yarn build
ENTRYPOINT [ "yarn", "start" ]