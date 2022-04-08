import deepMerge from 'lodash-deepmerge'

import { BaseProcessor } from './baseProcessor'
import { colorPresets } from './presets'
import { Schema } from './types'

export class ColorsProcessor extends BaseProcessor {
  constructor(protected schema: Schema) {
    super()
    let colors = schema.colors.palette
    if (schema.colors._extend) {
      let extended = {}
      if (typeof schema.colors._extend === 'string')
        schema.colors._extend = [schema.colors._extend]

      schema.colors._extend.forEach((presetName) => {
        extended = deepMerge.merge(extended, colorPresets[presetName])
      })

      colors = deepMerge.merge(extended, colors)
    }
    delete colors._extend

    let vars = ''

    for (const colorName of Object.keys(colors)) {
      if (typeof colors[colorName] === 'string') {
        this._content += `/* Color - ${colorName} */\n`
        this._content += ':root {\n'
        this._content += this.generateSingleColorVars(
          colorName,
          colors[colorName],
        )
        this._content += '}\n\n'

        this._content += this.generateSingleColorRules(
          colorName,
          colors[colorName],
        )
        this._content += '\n'
        continue
      }
      for (const colorSubname of Object.keys(colors[colorName])) {
        const fullName = colorName + '-' + colorSubname
        this._content += `// Color - ${colorName}\n`

        vars += this._content += this.generateSingleColorVars(
          fullName,
          colors[colorName][colorSubname],
        )

        this._content += this.generateSingleColorRules(
          fullName,
          colors[colorName][colorSubname],
        )
        this._content += '\n'
      }
    }

    this._content += ':root {\n'
    this._content += vars
    this._content += '}\n\n'

    this.formatDocument()
  }

  generateSingleColorVars(name, value) {
    return `--${name}: ${value};\n`
  }

  generateSingleColorRules(name, value) {
    let s = ''
    s += `.clr-${name} {color: ${value}}\n`
    s += `.bg-${name} {background-color: ${value}}\n`
    return s
  }
}
