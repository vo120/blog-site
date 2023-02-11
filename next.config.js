/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    GRAPHCMS_ENDPOINT:
      "https://api-us-east-1-shared-usea1-02.hygraph.com/v2/cldyupwh81s6r01t2aq8d7n1r/master",
  },
  reactStrictMode: true,
  images: {
    domains: ["media.graphassets.com", "localhost"],
  },
  publicRuntimeConfig: {
    fontFamily: {
      sans: ["Brand", "sans-serif"],
    },
  },
};

module.exports = nextConfig;
