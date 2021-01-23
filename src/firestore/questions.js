import { db } from "../firestore"

export const postNewQuestion = async (question) => {
  const questionsCollection = db.collection("questions")
  await questionsCollection.add(question)
}

export const updateNewCategories = async (categories) => {
  const cursor = db.collection("questions").doc("categories")
  const doc = await cursor.get()
  const obj = {}

  Object.keys(categories).forEach((k, i) => {
    const data = doc.data()
    if (!data || !data[k]) {
      obj[k] = [categories[k]]
    } else {
      obj[k] = [...new Set([...data[k], categories[k]])]
    }
  })

  await cursor.set(obj)
}

export const getCategories = async () => {
  const cursor = db.collection("questions").doc("categories")
  const doc = await cursor.get()
  return doc.data()
}

export const getQuestions = async (categories) => {
  var cursor = db.collection("questions")
  Object.keys(categories).forEach((k, i) => {
    if (Array.isArray(categories[k])) {
      if (categories[k].length > 0) {
        categories[k].forEach((item, i) => {
          cursor = cursor.where(k, "==", item)
        })
      }
    } else {
      if (categories[k] !== "") {
        cursor = cursor.where(k, "==", categories[k])
      }
    }
  })

  const snapshot = await cursor.get()

  const data = []
  snapshot.forEach((doc) => {
    if (doc.id !== "categories") data.push(doc.data())
  })
  console.log(data)
  // randomise here
  // loop limit count with this and  append
  // var item = items[Math.floor(Math.random() * items.length)];
  // need to check if its alrady in list
  // doc.id is useful for uniqueness check
  return data
}
