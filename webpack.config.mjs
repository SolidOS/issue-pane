import path from 'path'
import { moduleRules } from './webpack.module.rules.mjs'
import TerserPlugin from 'terser-webpack-plugin'
import CopyPlugin from 'copy-webpack-plugin'

const common = {
  entry: './src/issuePane.js',
  resolve: {
    extensions: ['.js', '.ts'],
  },
  module: {
    rules: moduleRules,
  },
  externals: {
    fs: 'null',
    'node-fetch': 'fetch',
    'isomorphic-fetch': 'fetch',
    'text-encoding': 'TextEncoder',
    '@trust/webcrypto': 'crypto',
    rdflib: 'rdflib',
    'solid-logic': 'SolidLogic',
    'solid-ui': 'UI'
  },
  devtool: 'source-map',
}

const normalConfig = {
  ...common,
  mode: 'production',
  output: {
    path: path.resolve(process.cwd(), 'lib'),
    filename: 'issue-pane.js',
    library: {
      type: 'umd',
      name: 'IssuePane',
      export: 'default',
    },
    globalObject: 'this',
    clean: true,
  },
  plugins: [
    ...(common.plugins || []),
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve('src/styles'),
          to: path.resolve('lib/styles'),
        },
      ],
    }),
  ],
  optimization: {
    minimize: false,
  }
}

const minConfig = {
  ...common,
  mode: 'production',
  output: {
    path: path.resolve(process.cwd(), 'lib'),
    filename: 'issue-pane.min.js',
    library: {
      type: 'umd',
      name: 'IssuePane',
      export: 'default',
    },
    globalObject: 'this',
    clean: false,
  },
  plugins: [
    ...(common.plugins || []),
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve('src/styles'),
          to: path.resolve('lib/styles'),
        },
      ],
    }),
  ],
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          format: {
            comments: false,
          },
        },
        extractComments: false,
      })
    ],
  }
}

export default [normalConfig, minConfig]
