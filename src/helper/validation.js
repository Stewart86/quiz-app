import isNumber from "lodash.isnumber"

export const isMultipleChoiceQuestionValid = (question) => {
  let isValid = true

  const requiredKeys = [
    "subject",
    "level",
    "topic",
    "question",
    "answer",
    "choices",
    "type",
  ]

  requiredKeys.forEach((key) => {
    if (key in question) {
      const vut = question[key]

      // if value is empty
      if (!vut) {
        throw new Error(`${key} cannot be empty`)
      }

      // check if answer is correct value
      if (vut === "answer") {
        if (!isNumber(vut)) throw new Error(`${key} is not a number but ${vut}`)
      }

      // chek if choices is greater than one
      if (vut === "choices") {
        if (vut.length <= 1) {
          throw new Error(`${key} must be greater than 1, but is ${vut.length}`)
        }
      }
    } else {
      throw new Error(`${key} is missing`)
    }
  })

  return isValid
}
