FROM node:lts-slim AS builder
WORKDIR /build
COPY . .
RUN yarn && yarn build

FROM node:lts-slim
WORKDIR /app
COPY --from=builder /build/.next/standalone .
COPY --from=builder /build/.next/static /app/.next/static
COPY --from=builder /build/.next/static /app/public

ENTRYPOINT [ "node", "server.js" ]