import express from "express";
import fs from "fs";
import http from "http";
import https from "https";
import { createProxyMiddleware } from "http-proxy-middleware";
import { CERTIFICATE_PATH, PRIVATE_KEY_PATH, PROXY_PATH_PREFIX, PROXY_TARGET } from "./props";

/*
const privateKey  = fs.readFileSync(PRIVATE_KEY_PATH, 'utf8');
const certificate = fs.readFileSync(CERTIFICATE_PATH, 'utf8');

const credentials = {
    key: privateKey,
    cert: certificate
};
*/

const proxy = express();

proxy.use(PROXY_PATH_PREFIX, createProxyMiddleware({
    target: PROXY_TARGET
}))

const httpServer = http.createServer(proxy);
httpServer.listen(80);

/*
const httpsServer = https.createServer(credentials, proxy);
httpsServer.listen(443);
*/