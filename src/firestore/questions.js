import { db } from "../firestore"

export const postNewQuestion = async (question) => {
  // check for new categories
  await db
    .collection("questions")
    .doc()
    .set(question)
    .then("postNewQuestion done")
    .catch()
}
