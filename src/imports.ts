import { BaseProcessor } from './baseProcessor'
import { Schema } from './types'

export class ImportsProcessor extends BaseProcessor {
  constructor(protected schema: Schema) {
    super()

    if ('colors' in schema) this._content += "@import './colors.css';\n"
    if ('spacings' in schema) this._content += "@import './spacings.css';\n"

    this.formatDocument()
  }
}
