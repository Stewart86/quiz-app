import { db } from "../firestore"

export const postNewQuestion = async (question, categories) => {
  // check for new categories
  const questionsCollection = db.collection("questions")
  const res = await questionsCollection.add(question)

  await questionsCollection
    .doc(res.id)
    .collection("categories")
    .doc()
    .set(categories)
}

export const  updateNewCategories = async (categories) => {
  const questionsColl = db.collection("questions").doc("categories")
  const doc = await questionsColl.get()
  const obj = {}
  Object.keys(categories).forEach((k,i)=> {
    const data = doc.data()
    if (!data[k]) {
      obj[k] = [categories[k]]
    }
    else {
      obj[k] =[...new Set([...data[k], categories[k]])] 
    }
  })
  await questionsColl.set(obj)
}