import { ColorPresetName } from './presets/index'

export type Spacing = {
  [key: number]: string
  add?: number
  xy?: boolean
  short?: string
}

export type Color = {
  [key: number | string]: string
}

export type Schema = {
  out: string
  colors: {
    _extend?: ColorPresetName | ColorPresetName[]
    palette: {
      [key: string]: string | Color
    }
  }
  spacings: {
    [key: string]: Spacing
  }
}
