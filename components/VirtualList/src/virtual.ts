
const DIRECTION_TYPE = {
  FRONT: "FRONT", // scroll up or left
  BEHIND: "BEHIND", // scroll down or right
}
const CALC_TYPE = {
  INIT: "INIT",
  FIXED: "FIXED",
  DYNAMIC: "DYNAMIC",
}
const LEADING_BUFFER = 2

export declare interface VRange {
  start: number
  end: number
  padFront: number
  padBehind: number
}

export declare interface VParam {
  keeps: number
  slotHeaderSize: number
  estimateSize: number
  buffer: number
  uniqueIds: string[]
}
export declare type VCallUpdate  = (range: VRange) => void
export default class {
  param: VParam | null = null
  callUpdate: VCallUpdate | null = null
  firstRangeTotalSize? = 0
  firstRangeAverageSize = 0
  lastCalcIndex = 0
  fixedSizeValue? = 0
  calcType = CALC_TYPE.INIT
  offset = 0
  direction = ""
  sizes: Map<string, number> = new Map()
  range: VRange | null = null

  constructor(param: VParam | null, callUpdate: VCallUpdate | null) {
    this.init(param, callUpdate)
  }

  init(param: VParam | null, callUpdate: VCallUpdate | null) {
    // param data
    this.param = param
    this.callUpdate = callUpdate

    // size data
    this.sizes = new Map()
    this.firstRangeTotalSize = 0
    this.firstRangeAverageSize = 0
    this.fixedSizeValue = 0
    this.calcType = CALC_TYPE.INIT

    // scroll data
    this.offset = 0
    this.direction = ""

    // range data
    this.range = Object.create(null)
    if (param) {
      this.checkRange(0, param.keeps - 1)
    }
  }

  destroy() {
    this.init(null, null)
  }

  // return current render range
  getRange() {
    const range:VRange = Object.create(null)
    if(this.range){
      range.start = this.range.start
      range.end = this.range.end
      range.padFront = this.range.padFront
      range.padBehind = this.range.padBehind
    }
    return range
  }

  isBehind() {
    return this.direction === DIRECTION_TYPE.BEHIND
  }

  isFront() {
    return this.direction === DIRECTION_TYPE.FRONT
  }

  // return start index offset
  getOffset(start: number) {
    return (start < 1 ? 0 : this.getIndexOffset(start)) + this.param!.slotHeaderSize
  }

  updateParam(key: string, value: number & string[]) {
    if (this.param && (key in this.param)) {
      // if uniqueIds change, find out deleted id and remove from size map
      if (key === "uniqueIds") {
        this.sizes.forEach((v, key) => {
          if (!(value as string[]).includes(key)) {
            this.sizes.delete(key)
          }
        })
      }
      this.param[key as keyof typeof this.param] = value
    }
  }

  // save each size map by id
  saveSize(id: string, size: number) {
    this.sizes.set(id, size)

    // we assume size type is fixed at the beginning and remember first size value
    // if there is no size value different from this at next coming saving
    // we think it's a fixed size list, otherwise is dynamic size list
    if (this.calcType === CALC_TYPE.INIT) {
      this.fixedSizeValue = size
      this.calcType = CALC_TYPE.FIXED
    } else if (this.calcType === CALC_TYPE.FIXED && this.fixedSizeValue !== size) {
      this.calcType = CALC_TYPE.DYNAMIC
      // it's no use at all
      delete this.fixedSizeValue
    }

    // calculate the average size only in the first range
    if (this.calcType !== CALC_TYPE.FIXED && this.firstRangeTotalSize !== undefined) {
      if (this.sizes.size < Math.min(this.param!.keeps, this.param!.uniqueIds.length)) {
        this.firstRangeTotalSize = [...this.sizes.values()].reduce((acc, val) => acc + val, 0)
        this.firstRangeAverageSize = Math.round(this.firstRangeTotalSize! / this.sizes.size)
      } else {
        // it's done using
        delete this.firstRangeTotalSize
      }
    }
  }

  // in some special situation (e.g. length change) we need to update in a row
  // try going to render next range by a leading buffer according to current direction
  handleDataSourcesChange() {
    if(this.range){
      let start = this.range.start

      if (this.isFront()) {
        start = start - LEADING_BUFFER
      } else if (this.isBehind()) {
        start = start + LEADING_BUFFER
      }

      start = Math.max(start, 0)
      this.updateRange(this.range.start, this.getEndByStart(start))
    }
  }

  // when slot size change, we also need force update
  handleSlotSizeChange() {
    this.handleDataSourcesChange()
  }

  // calculating range on scroll
  handleScroll(offset: number) {
    this.direction = offset < this.offset ? DIRECTION_TYPE.FRONT : DIRECTION_TYPE.BEHIND
    this.offset = offset

    if (!this.param) {
      return
    }

    if (this.direction === DIRECTION_TYPE.FRONT) {
      this.handleFront()
    } else if (this.direction === DIRECTION_TYPE.BEHIND) {
      this.handleBehind()
    }
  }

  // ----------- public method end -----------

  handleFront() {
    if(this.range){
      const overs = this.getScrollOvers()
      // should not change range if start doesn't exceed overs
      if (overs > this.range.start) {
        return
      }

      // move up start by a buffer length, and make sure its safety
      const start = Math.max(overs - this.param!.buffer, 0)
      this.checkRange(start, this.getEndByStart(start))
    }
  }

  handleBehind() {
    if(this.range) {
      const overs = this.getScrollOvers()
      // range should not change if scroll overs within buffer
      if (overs < this.range.start + this.param!.buffer) {
        return
      }

      this.checkRange(overs, this.getEndByStart(overs))
    }
  }

  // return the pass overs according to current scroll offset
  getScrollOvers() {
    // if slot header exist, we need subtract its size
    const offset = this.offset - this.param!.slotHeaderSize
    if (offset <= 0) {
      return 0
    }

    // if is fixed type, that can be easily
    if (this.isFixedType() && this.fixedSizeValue !== undefined) {
      return Math.floor(offset / this.fixedSizeValue)
    }

    let low = 0
    let middle = 0
    let middleOffset = 0
    let high = this.param!.uniqueIds.length

    while (low <= high) {
      // this.__bsearchCalls++
      middle = low + Math.floor((high - low) / 2)
      middleOffset = this.getIndexOffset(middle)

      if (middleOffset === offset) {
        return middle
      } else if (middleOffset < offset) {
        low = middle + 1
      } else if (middleOffset > offset) {
        high = middle - 1
      }
    }

    return low > 0 ? --low : 0
  }

  // return a scroll offset from given index, can efficiency be improved more here?
  // although the call frequency is very high, its only a superposition of numbers
  getIndexOffset(givenIndex: number) {
    if (!givenIndex) {
      return 0
    }

    let offset = 0
    let indexSize:number | undefined = 0
    for (let index = 0; index < givenIndex; index++) {
      // this.__getIndexOffsetCalls++
      indexSize = this.sizes.get(this.param!.uniqueIds[index])
      offset = offset + (indexSize !== undefined ? indexSize : this.getEstimateSize())
    }

    // remember last calculate index
    this.lastCalcIndex = Math.max(this.lastCalcIndex, givenIndex - 1)
    this.lastCalcIndex = Math.min(this.lastCalcIndex, this.getLastIndex())

    return offset
  }

  // is fixed size type
  isFixedType() {
    return this.calcType === CALC_TYPE.FIXED
  }

  // return the real last index
  getLastIndex() {
    return this.param!.uniqueIds.length - 1
  }

  // in some conditions range is broke, we need correct it
  // and then decide whether need update to next range
  checkRange(start: number, end: number) {
    const keeps = this.param!.keeps
    const total = this.param!.uniqueIds.length

    // data less than keeps, render all
    if (total <= keeps) {
      start = 0
      end = this.getLastIndex()
    } else if (end - start < keeps - 1) {
      // if range length is less than keeps, correct it base on end
      start = end - keeps + 1
    }

    if (this.range && this.range.start !== start) {
      this.updateRange(start, end)
    }
  }

  // setting to a new range and rerender
  updateRange(start: number, end: number) {
    if(this.range){
      this.range.start = start
      this.range.end = end
      this.range.padFront = this.getPadFront()
      this.range.padBehind = this.getPadBehind()
      this.callUpdate && this.callUpdate(this.getRange())
    }
  }

  // return end base on start
  getEndByStart(start: number) {
    const theoryEnd = start + this.param!.keeps - 1
    return Math.min(theoryEnd, this.getLastIndex())
  }

  // return total front offset
  getPadFront() {
    if(this.range){
      if (this.isFixedType()  && this.fixedSizeValue !== undefined) {
        return this.fixedSizeValue * this.range.start
      } else {
        return this.getIndexOffset(this.range.start)
      }
    }else {
      return 0
    }
  }

  // return total behind offset
  getPadBehind() {
    const end = this.range? this.range.end : 0
    const lastIndex = this.getLastIndex()

    if (this.isFixedType() && this.fixedSizeValue !== undefined) {
      return (lastIndex - end) * this.fixedSizeValue
    }

    // if it's all calculated, return the exactly offset
    if (this.lastCalcIndex === lastIndex) {
      return this.getIndexOffset(lastIndex) - this.getIndexOffset(end)
    } else {
      // if not, use a estimated value
      return (lastIndex - end) * this.getEstimateSize()!
    }
  }

  // get the item estimate size
  getEstimateSize() {
    return this.isFixedType() && this.fixedSizeValue !== undefined ? this.fixedSizeValue : (this.firstRangeAverageSize || this.param!.estimateSize)
  }
}

export function isBrowser() {
  return typeof document !== "undefined"
}
