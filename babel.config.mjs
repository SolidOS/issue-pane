export default {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          browsers: ['> 1%', 'last 3 versions', 'not dead']
        },
      },
    ],
  ],
  plugins: [
    [
      'babel-plugin-inline-import', {
        extensions: [
          '.ttl'
        ]
      }
    ]
  ]
}
