const nextConfig = {
  webpack: (config) => {
    config.optimization = {
      ...config.optimization,
      minimize: true, // Ensure minification is enabled
    };
    return config;
  },
  reactStrictMode: true,
  swcMinify: true,
};

module.exports = nextConfig;
