import { db } from "../firestore"

export const postNewQuestion = async (question, categories) => {
  // check for new categories
  console.group("new question")
  var questionsCollection = db.collection("questions")
  const res = await questionsCollection.add(question)

  console.log(res)
  await questionsCollection
    .doc(res.id)
    .collection("categories")
    .doc()
    .set(categories)

  console.groupEnd()
}
