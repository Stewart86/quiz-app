import { chunk, isArray, isNumber, mergeWith, sampleSize, uniq } from "lodash"

import { db } from "../firebase"
import { typeReverseLookup } from "../helper/enum"

export const post = async (question) => {
  const questionsCollection = db.collection("questions")
  await questionsCollection.add(question)
}

export const updateNewCategories = async (categories) => {
  let preparedCat = {}
  Object.keys(categories).forEach((k) => {
    if (!Array.isArray(categories[k])) {
      preparedCat[k] = [categories[k]]
    }
  })

  const cursor = db.collection("questions").doc("categories")
  const doc = await cursor.get()

  const obj = mergeWith(categories, doc.data(), (obj, src) => {
    if (isArray(obj)) {
      return uniq(obj.concat(src))
    } else if (!isArray(obj)) {
      obj = [obj]
      return uniq(obj.concat(src))
    } else {
      return ""
    }
  })

  await cursor.set(obj)
}

export const getMany = async (categories) => {
  // assign into local var
  const setCount = Number(categories.numOfQuestions)
  const chunkTopics = chunk(categories.topics, 10)

  // delete after assignment
  delete categories.topics
  delete categories.numOfQuestions

  let data = {}
  for (let i = 0; i < chunkTopics.length; i++) {
    let cur = db.collection("questions")

    cur = cur.where("subject", "==", categories.subject)
    cur = cur.where("level", "==", categories.level)
    cur = cur.where("topic", "in", chunkTopics[i])

    if (isNumber(categories.type)) {
      cur = cur.where("type", "==", categories.type)
    } else {
      cur = cur.where("type", "==", typeReverseLookup[categories.type])
    }

    // console.log(cur.d_.C_.filters)
    const snapshot = await cur.get()
    snapshot.forEach((doc) => {
      data[doc.id] = doc.data()
    })
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

export const updateOne = async (id, categories) => {
  const cur = db.collection("questions").doc(id)
  await cur.update(categories)
}
