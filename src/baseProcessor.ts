import prettier from 'prettier'

export class BaseProcessor {
  protected _content = ''

  get content() {
    return this._content
  }

  protected formatDocument(parser: prettier.BuiltInParserName = 'css') {
    this._content = prettier.format(this._content, { parser })
  }
}
