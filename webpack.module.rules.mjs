export const moduleRules = [
  {
    test: /\.(js|ts)$/,
    exclude: /node_modules/,
    use: ['babel-loader'],
  },
  {
    test: /\.css$/,
    exclude: /\.module\.css$/,
    use: ['style-loader', 'css-loader'],
  },
  {
    test: /\.ttl$/,
    type: 'asset/source',
  }
]
