import { chunk, isNumber, sampleSize } from "lodash"
import { levelLookup, typeReverseLookup } from "../helper/enum"

import { db } from "../firebase"

export const post = async (question) => {
  // convert P1 to Primary 1
  const level = levelLookup[question.level]
  question.level = level
  const questionsCollection = db.collection("questions")
  await questionsCollection.add(question)
}

export const getMany = async (categories) => {
  console.log(categories)
  // assign into local var
  let data = {}
  const setCount = Number(categories.numOfQuestions)
  const level = levelLookup[categories.level]
  const type = isNumber(categories.type)
    ? categories.type
    : typeReverseLookup[categories.type]

  if (categories.topic || categories.topic === "") {
    let cur = db.collection("questions")
    cur = cur.where("subject", "==", categories.subject)
    cur = cur.where("level", "==", level)
    cur = cur.where("type", "==", type)

    if (categories.topic !== "") {
      cur = cur.where("topic", "==", categories.topic)
    }

    const snapshot = await cur.get()
    snapshot.forEach((doc) => {
      data[doc.id] = doc.data()
    })
  } else {
    const chunkTopics = chunk(categories.topics, 10)
    for (let i = 0; i < chunkTopics.length; i++) {
      let cur = db.collection("questions")

      cur = cur.where("subject", "==", categories.subject)
      cur = cur.where("level", "==", level)
      cur = cur.where("type", "==", type)

      if (chunkTopics.length > 0) {
        if (chunkTopics.length === 1) {
          cur = cur.where("topic", "in", chunkTopics[i])
        } else {
          cur = cur.where("topic", "in", [chunkTopics[i]])
        }
      } else {
        cur = cur.where("topic", "==", chunkTopics[0][0])
      }

      const snapshot = await cur.get()
      snapshot.forEach((doc) => {
        data[doc.id] = doc.data()
      })
    }
  }

  // if num of question specified return with the amount using sampleSize
  // else return everything
  if (categories.numOfQuestions === undefined) {
    return data
  }
  return sampleSize(data, setCount)
}

export const deleteMany = async (questions) => {
  let cur = db.collection("questions")
  let deleteActions = []
  questions.forEach((id) => {
    deleteActions.push(cur.doc(id).delete())
  })

  await Promise.all(deleteActions)
  return true
}

export const getOne = async (id) => {
  const cur = await db.collection("questions").doc(id).get()
  const snapshot = cur.data()
  return snapshot
}

export const updateOne = async (id, question) => {
  if (!question.level.includes("Primary")) {
    question.level = question.level.replace(/P\d/, "Primary ")
  }
  const cur = db.collection("questions").doc(id)
  await cur.set(question)
}
