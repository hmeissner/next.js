const relativeResolve = require('../root-module-relative-path').default(require)

const envPlugins = {
  'development': [
    require.resolve('babel-plugin-transform-react-jsx-source')
  ],
  'production': [
    require.resolve('babel-plugin-transform-react-remove-prop-types')
  ]
}

const plugins = envPlugins[process.env.NODE_ENV] || envPlugins['development']

module.exports = (context, opts = {}) => ({
  presets: [
    [require.resolve('babel-preset-env'), {
      modules: false,
      ...opts['preset-env']
    }],
    require.resolve('babel-preset-react')
  ],
  plugins: [
    require.resolve('babel-plugin-react-require'),
    require.resolve('./plugins/handle-import'),
    require.resolve('babel-plugin-transform-object-rest-spread'),
    require.resolve('babel-plugin-transform-class-properties'),
    [require.resolve('babel-plugin-transform-runtime'),
      opts['transform-runtime'] || {}],
    require.resolve('styled-jsx/babel'),
    ...plugins,
    [
      require.resolve('babel-plugin-module-resolver'),
      {
        alias: {
          'babel-runtime': relativeResolve('babel-runtime/package'),
          'next/link': relativeResolve('../../../lib/link'),
          'next/prefetch': relativeResolve('../../../lib/prefetch'),
          'next/css': relativeResolve('../../../lib/css'),
          'next/dynamic': relativeResolve('../../../lib/dynamic'),
          'next/head': relativeResolve('../../../lib/head'),
          'next/document': relativeResolve('../../../server/document'),
          'next/router': relativeResolve('../../../lib/router'),
          'next/error': relativeResolve('../../../lib/error')
        }
      }
    ]
  ]
})
