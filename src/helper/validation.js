import { QUESTION_TYPE } from ".././helper/enum"
import { isNumber } from "lodash"

export const isMultipleChoiceQuestionValid = (question) => {
  let isValid = true

  const requiredKeys = {
    [QUESTION_TYPE.multipleChoice]: [
      "subject",
      "level",
      "topic",
      "question",
      "answer",
      "choices",
      "type",
    ],
    [QUESTION_TYPE.fillInTheBlank]: [
      "subject",
      "level",
      "topic",
      "answer",
      "question",
      "type",
    ],
    [QUESTION_TYPE.note]: ["subject", "level", "topic", "explain", "type"],
  }

  requiredKeys[question.type].forEach((key) => {
    if (key in question) {
      const vut = question[key]

      if (vut.toString().trim() === "\\") {
        throw new Error(`${key} cannot be empty`)
      }

      if (vut === "") {
        throw new Error(`${key} cannot be empty`)
      }

      // if value is empty
      if (!vut) {
        throw new Error(`${key} cannot be empty`)
      }

      // check if answer is correct value
      if (key === "answer" && question.type === 1) {
        if (!isNumber(vut)) throw new Error(`${key} is not a number but ${vut}`)
      }

      // chek if choices is greater than one
      if (key === "choices") {
        if (vut.length <= 1) {
          throw new Error(`${key} must be greater than 1, but is ${vut.length}`)
        }
      }
    } else {
      throw new Error(`${key} is missing`)
    }
  })
  let result = {}
  requiredKeys[question.type].forEach((val) => {
    result[val] = question[val]
  })

  if ("explain" in question) {
    console.log("in if", question)
    if (question["explain"].match(/\w+/)) {
      console.log("in if match", question)
      result["explain"] = question["explain"]
    }
  }

  return { isValid, result }
}
