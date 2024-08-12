import express from "express";
import { createProxyMiddleware } from "http-proxy-middleware";
import { PORT, PROXY_PATH_PREFIX, PROXY_TARGET } from "./props";

const proxy = express();

proxy.use(PROXY_PATH_PREFIX, createProxyMiddleware({
    target: PROXY_TARGET
}))

proxy.listen(PORT, () => {
    console.log(`Server started on Port ${PORT}`);
})