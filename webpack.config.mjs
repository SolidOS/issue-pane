import NodePolyfillPlugin from 'node-polyfill-webpack-plugin'
import path from 'path'
import { moduleRules } from './webpack.module.rules.mjs'

export default [
  {
    mode: 'production',
    entry: {
      board: './src/board.js',
      csvButton: './src/csvButton.js',
      issue: './src/issue.js',
      issuePane: './src/index.js',
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
      rules: moduleRules,
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
