  export const getFirstArrayInObj = (data) => {
    let result = {}
    Object.keys(data).forEach((k, i) => {
      result[k] = ""
    })
    return result
  }