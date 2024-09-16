export const PORT = 8080;
export const PROXY_TARGET = process.env.PROXY_TARGET || 'http://localhost:3000';
export const PROXY_PATH_PREFIX = process.env.PROXY_PATH_PREFIX || '';

export const PRIVATE_KEY_PATH = process.env.PRIVATE_KEY_PATH || "/data/cert/privkey1.pem";
export const CERTIFICATE_PATH = process.env.CERTIFICATE_PATH || "/data/cert/cert1.pem";
export const HTTP_REDIRECT_LOCATION = process.env.HTTP_REDIRECT_LOCATION || "https://www.google.de"