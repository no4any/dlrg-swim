FROM node:lts-slim AS builder
WORKDIR /build
COPY . .
RUN yarn && yarn build

FROM node:lts-slim
WORKDIR /app
COPY --from=builder /build/.next/standalone .
ENTRYPOINT [ "node", "server.js" ]