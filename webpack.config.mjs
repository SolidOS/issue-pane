import NodePolyfillPlugin from 'node-polyfill-webpack-plugin'
import path from 'path'
import { moduleRules } from './webpack.module.rules.mjs'

const common = {
  mode: 'production',
  entry: './src/index.js',
  module: {
    rules: moduleRules,
  },
  externals: {
    'solid-ui': 'UI',
    'solid-logic': 'SolidLogic',
    rdflib: '$rdf',
  },
  resolve: {
    extensions: ['.js', '.ts'],
    fallback: {
      path: require.resolve('path-browserify')
    },
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