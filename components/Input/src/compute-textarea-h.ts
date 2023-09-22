
export type NodeStyle = {
  contextStyle: string
  boxSizing: string
  paddingSize: number
  borderSize: number
}

export type TextAreaHeight = {
  height: string
  minHeight?: string
}


let hiddenTextarea: HTMLTextAreaElement | null
const HIDDEN_STYLE = `
  height:0 !important;
  visibility:hidden !important;
  overflow:hidden !important;
  position:absolute !important;
  z-index:-1000 !important;
  top:0 !important;
  right:0 !important;
`
const CONTEXT_STYLE = [
  'letter-spacing',
  'line-height',
  'padding-top',
  'padding-bottom',
  'font-family',
  'font-weight',
  'font-size',
  'text-rendering',
  'text-transform',
  'width',
  'text-indent',
  'padding-left',
  'padding-right',
  'border-width',
  'box-sizing',
]

/**
 * get padding、border、context
 * @param targetElement
 */
function computeNodeStyling(targetElement: HTMLElement): NodeStyle {
  const style = globalThis.getComputedStyle(targetElement)
  const boxSizing = style.getPropertyValue('box-sizing')

  const paddingSize
    = parseFloat(style.getPropertyValue('padding-bottom'))
    + parseFloat(style.getPropertyValue('padding-top'))

  const borderSize
    = parseFloat(style.getPropertyValue('border-bottom-width'))
    + parseFloat(style.getPropertyValue('border-top-width'))

  const contextStyle = CONTEXT_STYLE.map(name => `${name}:${style.getPropertyValue(name)}`).join(
    ';',
  )
  return { contextStyle, paddingSize, borderSize, boxSizing }
}

function computeSingleRowH(scrollHeight: number, paddingSize: number): number {
  return scrollHeight - paddingSize
}

function computeMinRowH(
  height: number,
  singleRowHeight: number,
  minRows: number,
  boxSizing: string,
  paddingSize: number,
  borderSize: number,
): number {
  let minHeight = singleRowHeight * minRows
  if (boxSizing === 'border-box')
    minHeight = minHeight + paddingSize + borderSize

  height = Math.max(minHeight, height)
  return minHeight
}

function computeMaxRowH(
  height: number,
  singleRowHeight: number,
  maxRows: number | null,
  boxSizing: string,
  paddingSize: number,
  borderSize: number,
): number | undefined {
  if (!maxRows)
    return
  let maxHeight = singleRowHeight * maxRows
  if (boxSizing === 'border-box')
    maxHeight = maxHeight + paddingSize + borderSize

  return Math.min(maxHeight, height)
}

export function compTextareaH(
  targetElement: HTMLTextAreaElement,
  minRows = 3,
  maxRows: number | null = null,
): TextAreaHeight {
  if (!hiddenTextarea) {
    hiddenTextarea = document.createElement('textarea')
    document.body.appendChild(hiddenTextarea)
  }

  const { paddingSize, borderSize, boxSizing, contextStyle } = computeNodeStyling(targetElement)

  hiddenTextarea.setAttribute('style', `${contextStyle};${HIDDEN_STYLE}`)
  hiddenTextarea.value = targetElement.value || targetElement.placeholder || ''

  let height = hiddenTextarea.scrollHeight
  const result = {} as TextAreaHeight

  if (boxSizing === 'border-box')
    height = height + borderSize
  else if (boxSizing === 'content-box')
    height = height - paddingSize

  hiddenTextarea.value = ''
  const singleRowHeight = computeSingleRowH(hiddenTextarea.scrollHeight, paddingSize)

  if (minRows !== null) {
    const minHeight: number = computeMinRowH(
      height,
      singleRowHeight,
      minRows,
      boxSizing,
      paddingSize,
      borderSize,
    )
    result.minHeight = `${minHeight}px`
  }
  if (maxRows !== null) {
    height
      = computeMaxRowH(height, singleRowHeight, maxRows, boxSizing, paddingSize, borderSize) || height
  }
  result.height = `${height}px`
  hiddenTextarea.parentNode?.removeChild(hiddenTextarea)
  hiddenTextarea = null

  return result
}
