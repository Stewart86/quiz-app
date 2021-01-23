import { db } from "../firestore"

export const postNewQuestion = async (question) => {
  const questionsCollection = db.collection("questions")
  await questionsCollection.add(question)
}

export const  updateNewCategories = async (categories) => {
  const questionsColl = db.collection("questions").doc("categories")
  const doc = await questionsColl.get()
  const obj = {}

  Object.keys(categories).forEach((k,i)=> {
    const data = doc.data()
    if (!data || !data[k]) {
      obj[k] = [categories[k]]
    }
    else {
      obj[k] =[...new Set([...data[k], categories[k]])] 
    }
  })

  await questionsColl.set(obj)
}

export const getCategories = async () => {
  const questionsColl = db.collection("questions").doc("categories")
  const doc = await questionsColl.get()
  return doc.data()
}

export const getQuestions = async (filter) => {
  const cursor = db.collection("questions")

}