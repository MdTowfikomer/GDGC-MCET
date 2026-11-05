/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ['image/webp'],
    // Reuse generated sizes between visits instead of frequently re-encoding.
    minimumCacheTTL: 86400,
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.(glsl|vs|fs|vert|frag)$/,
      exclude: /node_modules/,
      use: [
        {
          loader: 'webpack-glsl-loader'
        }
      ]
    });
    return config;
  }
}

module.exports = nextConfig
