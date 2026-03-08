import NodePolyfillPlugin from 'node-polyfill-webpack-plugin'
import path from 'path'

export default [
  {
    mode: 'production',
    entry: {
      board: './src/board.js',
      csvButton: './src/csvButton.js',
      issue: './src/issue.js',
      issuePane: './src/issuePane.js',
      newIssue: './src/newIssue.js',
      newTracker: './src/newTracker.js',
    },
    output: {
      path: path.resolve(process.cwd(), 'dist'),
      filename: '[name].js',
      library: {
        name: '[name]',
        type: 'umd'
      },
      globalObject: 'this',
      clean: false
    },
    plugins: [
      new NodePolyfillPlugin({
        excludeAliases: ['console', 'process']
      })
    ],
    module: {
      rules: [
        {
          test: /\.(js|ts)$/,
          exclude: /node_modules/,
          use: ['babel-loader'],
        },

        {
          test: /\.ttl$/, // Target text  files
          type: 'asset/source', // Load the file's content as a string
        },
  {
          test: /\.css$/,
          exclude: /\.module\.css$/,
          use: ['style-loader', 'css-loader'],
        },
        {
          test: /\.module\.css$/,
          use: [
            'style-loader',
            {
              loader: 'css-loader',
              options: {
                modules: true
              }
            }
          ]
        }
      ],
    },
    externals: {
      'solid-ui': 'UI',
      'solid-logic': 'SolidLogic',
      rdflib: '$rdf',
    },
    resolve: {
      extensions: ['.js', '.ts']
    },

    devtool: false,
  },
]
