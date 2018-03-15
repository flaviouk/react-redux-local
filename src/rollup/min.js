import uglify from 'rollup-plugin-uglify'

import std from './std'

export default Object.assign(std, {
  output: std.output.map(output =>
    Object.assign(output, { file: output.file.replace('.', '.min.') })
  ),
  plugins: [...std.plugins, uglify()]
})
