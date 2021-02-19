import _ from "lodash"
import { db } from "../firebase"
import { typeLookUp } from "../helper/enum"

export const post = async (question) => {
  console.log("insert")
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

  const obj = _.mergeWith(categories, doc.data(), (obj, src) => {
    if (_.isArray(obj)) {
      return _.uniq(obj.concat(src))
    } else if (!_.isArray(obj)) {
      obj = [obj]
      return _.uniq(obj.concat(src))
    } else {
      return ""
    }
  })

  await cursor.set(obj)
}

export const getMany = async (categories) => {
  let cur = db.collection("questions")

  Object.keys(categories).forEach((k, i) => {
    if (k !== "numOfQuestions" && k !== "type") {
      if (Array.isArray(categories[k])) {
        if (categories[k].length > 0) {
          categories[k].forEach((item, i) => {
            if (item !== "all") {
              if (k === "topics") {
                cur = cur.where("topic", "==", item)
              } else {
                cur = cur.where(k, "==", item)
              }
            }
          })
        }
      } else {
        if (categories[k] !== "") {
          cur = cur.where(k, "==", categories[k])
        }
      }
    } else if (k === "type") {
      cur = cur.where(k, "==", typeLookUp[categories[k]])
    }
  })

  const snapshot = await cur.get()

  let data = {}
  snapshot.forEach((doc) => {
    if (doc.id !== "categories") data[doc.id] = doc.data()
  })
  if (categories.numOfQuestions === undefined) {
    return data
  }
  return _.sampleSize(data, Number(categories.numOfQuestions))
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
  console.log(snapshot)
  return snapshot
}

export const updateOne = async (id, categories) => {
  const cur = db.collection("questions").doc(id)
  await cur.update(categories)
}