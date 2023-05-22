import type { Position } from './types'


const TRANSLATE_X = 10
const TRANSLATE_Y = 8

export const getPopupTranslateByPosition = () => {
  const translate = {
    tl: [-TRANSLATE_X, -TRANSLATE_Y],
    tr: [TRANSLATE_X, -TRANSLATE_Y],
    top: [0, -TRANSLATE_Y],
    bl: [-TRANSLATE_X, TRANSLATE_Y],
    br: [TRANSLATE_X, TRANSLATE_Y],
    bottom: [0, TRANSLATE_Y],
    lt: [-TRANSLATE_Y, -TRANSLATE_X],
    lb: [-TRANSLATE_Y, TRANSLATE_X],
    left: [-TRANSLATE_Y, 0],
    rt: [TRANSLATE_Y, -TRANSLATE_X],
    rb: [TRANSLATE_Y, TRANSLATE_X],
    right: [TRANSLATE_Y, 0]

  }
  return translate
}

const startsWithMap = {
  't': 'top',
  'r': 'right',
  'b': 'bottom',
  'l': 'left'
}

export const getPopupPositionByEmpty = (position: Position) => {
  return startsWithMap[position.slice(0,1) as 't'|'r'| 'b' | 'l']
}