import HtmlWebpackPlugin from 'html-webpack-plugin'
import NodePolyfillPlugin from 'node-polyfill-webpack-plugin'

export default [
  {
    mode: 'development',
    entry: ['./dev/index.js'],
    plugins: [
      new HtmlWebpackPlugin({ template: './dev/index.html' }),
      new NodePolyfillPlugin()
    ],
    module: {
      rules: [
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
        },

        {
          test: /\.ttl$/, // Target text  files
          type: 'asset/source', // Load the file's content as a string
        },

      ],
    },
    resolve: {
      extensions: ['.js', '.ts'],
      alias: {
        $rdf: 'rdflib',
        rdflib: 'rdflib',
        SolidLogic: 'solid-logic',
        'solid-logic': 'solid-logic',
        UI: 'solid-ui',
        'solid-ui': 'solid-ui'
      }
    },

    devServer: {
      static: ['./dev', './test']
    },
    devtool: 'source-map',
  },
]
