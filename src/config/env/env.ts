export const env = () => ({
  app: {
    env: process.env.NODE_ENV,
    serverName: process.env.SERVER_NAME,
    host: process.env.NAEYEOP_API_HOST,
    port: +process.env.NAEYEOP_API_PORT,
  },
  http: {
    timeout: process.env.HTTP_TIMEOUT,
    max_redirects: process.env.HTTP_MAX_REDIRECTS,
  },
});
