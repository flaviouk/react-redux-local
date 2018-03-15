import resolve from 'rollup-plugin-node-resolve'

export default {
  input: 'src/index.js',
  external: [
    'react',
    'prop-types',
    'redux',
    'redux-saga',
    'redux-devtools-extension'
  ],

  output: [
    {
      format: 'amd',
      name: 'LocalReducer',
      file: 'dist/amd.js'
    },
    {
      format: 'cjs',
      name: 'LocalReducer',
      file: 'dist/cjs.js'
    },
    {
      format: 'es',
      name: 'LocalReducer',
      file: 'dist/es.js'
    },
    {
      format: 'iife',
      name: 'LocalReducer',
      file: 'dist/iife.js'
    },
    {
      format: 'umd',
      name: 'LocalReducer',
      file: 'dist/umd.js'
    }
  ],

  plugins: [
    resolve({
      jsnext: true,
      browser: true,
      modulesOnly: true
    })
  ]
}
