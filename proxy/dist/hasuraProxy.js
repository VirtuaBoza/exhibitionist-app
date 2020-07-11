"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http_proxy_middleware_1 = require("http-proxy-middleware");
const hasuraProxy = http_proxy_middleware_1.createProxyMiddleware({
    target: process.env.HASURA_URL,
    changeOrigin: true,
    ws: true,
    pathRewrite: { "^/graphql": "/v1/graphql" },
    onProxyReq: function (proxyReq, req, res) {
        proxyReq.setHeader("x-hasura-admin-secret", process.env.HASURA_GRAPHQL_ADMIN_SECRET);
    },
    onProxyReqWs: function (proxyReq, req, socket, opts, head) {
        proxyReq.setHeader("x-hasura-admin-secret", process.env.HASURA_GRAPHQL_ADMIN_SECRET);
    },
    onError: function (err, req, res) {
        console.log("error", err);
    },
});
exports.default = hasuraProxy;
//# sourceMappingURL=hasuraProxy.js.map