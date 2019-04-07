let util = {
  registerArrayLast: () => {
    if (!Array.prototype.last) {
      Array.prototype.last = function () {
        return this[this.length - 1]
      }
    }
  },

  registerObjArrayGroupBy: () => {
    Array.prototype.objGroupBy = function (key) {
      const arraySelf = this
      return arraySelf.reduce(function (reduceValue, arrayElement) {
        if (typeof arrayElement === 'object') {
          const groupByTarget = arrayElement[key]
          reduceValue[groupByTarget] = reduceValue[groupByTarget] || []
          reduceValue[groupByTarget].push(arrayElement)
          return reduceValue
        } else {
          return arraySelf
        }
      }, Object.create(null))
    }

  }
}

export { util }