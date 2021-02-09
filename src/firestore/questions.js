import _ from "lodash"
import { db } from "../firebase"

export const postNewQuestion = async (question) => {
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

export const getQuestions = async (categories) => {
  console.log(categories)
  var cur = db.collection("questions")
  Object.keys(categories).forEach((k, i) => {
    if (k !== "numOfQuestions") {
      if (Array.isArray(categories[k])) {
        if (categories[k].length > 0) {
          categories[k].forEach((item, i) => {
            if (item !== "all") {
              cur = cur.where(k, "==", item)
            }
          })
        }
      } else {
        if (categories[k] !== "") {
          cur = cur.where(k, "==", categories[k])
        }
      }
    }
  })

  const snapshot = await cur.get()

  const data = {}
  snapshot.forEach((doc) => {
    if (doc.id !== "categories") data[doc.id] = doc.data()
  })
  // randomise here
  // loop limit count with this and  append
  // var item = items[Math.floor(Math.random() * items.length)];
  // need to check if its alrady in list
  // doc.id is useful for uniqueness check
  console.log("Number of questions returned", Object.keys(data).length)
  return data
}
