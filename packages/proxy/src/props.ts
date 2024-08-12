export const PORT = 8080;
export const PROXY_TARGET = process.env.PROXY_TARGET || 'http://localhost:3000';
export const PROXY_PATH_PREFIX = process.env.PROXY_PATH_PREFIX || '';