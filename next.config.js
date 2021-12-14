const WindiCSSWebpackPlugin = require('windicss-webpack-plugin')
const path = require('path')

module.exports = {
  swcMinify: true,
  poweredByHeader: false,
  reactStrictMode: true,
  webpack: (config) => {
    config.plugins.push(new WindiCSSWebpackPlugin())
    return config
  },
  eslint: {
    ignoreDuringBuilds: true
  }
}
