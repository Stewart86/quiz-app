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
  Object.keys(state).forEach((k, i) => {
    if (state[k].length > 0) isAllPrintable.push(true)
    count = i + 1
  })
  if (isAllPrintable.length !== count) {
    return true
  } else {
    return false
  }
}

export const makeDrawerList = (questions) => {
  let result = {}
  Object.keys(questions).forEach((key, i) => {
    result[key] = false
  })
  return result
}

export const questionKeyRename = (questions) => {
  let result = {}
  Object.keys(questions).forEach((key, i) => {
    result[i + 1] = questions[key]
  })

  return result
}

export const getAttempted = (questions) => {
  let attempted = []
  let notAttempted = []

  Object.keys(questions).forEach((key) => {
    let out = questions[key]
    out["index"] = key
    if (questions[key]["result"] !== undefined) {
      attempted.push(out)
    } else {
      notAttempted.push(out)
    }
  })

  return { attempted, notAttempted }
}
