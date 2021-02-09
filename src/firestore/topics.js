import { db } from "../firebase"

export const getTopic = async (subject, level) => {
  const topics = db.collection("topics")
    .where("subject", "==", subject)
    .where("level", "==", level)

  const snapshot = await topics.get()

  let output = []
  snapshot.forEach((doc) => {
    output.push(doc.id)
  })

  return output
}
