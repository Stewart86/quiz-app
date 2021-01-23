  export const getFirstArrayInObj = (data) => {
    let result = {}
    Object.keys(data).forEach((k, i) => {
      result[k] = ""
    })
    return result
  }

  export const isPrintable = (state) => {
    // all categories must not be empty
    let isAllPrintable = []
    let count = 0
    Object.keys(state).forEach((k,i) => {
      if (state[k].length > 0)
      isAllPrintable.push(true)
      count = i+1
    })
    if (isAllPrintable.length !== count) {
      return true
    }
    else {
      return false
    }
  }