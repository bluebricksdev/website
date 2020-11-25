const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true"
});

module.exports = withBundleAnalyzer({
  reactStrictMode: true,
  target: "serverless",
  poweredByHeader: false,
  future: {
    excludeDefaultMomentLocales: true
  }
});
