import nodeResolve from 'rollup-plugin-node-resolve'
import babel from 'rollup-plugin-babel'
import replace from 'rollup-plugin-replace'
import uglify from 'rollup-plugin-uglify'
import commonjs from 'rollup-plugin-commonjs'

const env = process.env.NODE_ENV
const config = {
  name: 'react-redux-local',
  input: 'src/index.js',
  plugins: [],
  external: ['react', 'prop-types', 'redux', 'redux-saga']
}

if (env === 'es' || env === 'cjs') {
  config.output = { format: env, indent: false }
  config.external = []
  config.plugins.push(
    babel({
      plugins: ['external-helpers']
    })
  )
}

if (env === 'development' || env === 'production') {
  config.output = { format: 'umd', name: 'react-redux-local', indent: false }
  config.plugins.push(
    commonjs({
      include: 'node_modules/**',
      namedExports: {
        './node_modules/react/index.js': ['React', 'Component', 'PureComponent']
      }
    }),
    nodeResolve({
      jsnext: true
    }),
    babel({
      exclude: 'node_modules/**',
      plugins: ['external-helpers']
    }),
    replace({
      'process.env.NODE_ENV': JSON.stringify(env)
    })
  )
}

if (env === 'production') {
  config.plugins.push(
    uglify({
      compress: {
        pure_getters: true,
        unsafe: true,
        unsafe_comps: true,
        warnings: false
      }
    })
  )
}

export default config
