import { colors as windiColors } from './windi'

export const colorPresets = {
  windi: windiColors,
  windi2: windiColors,
}

export type ColorPresetName = keyof typeof colorPresets
