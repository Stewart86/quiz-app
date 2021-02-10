import { db } from "../firebase"

export const getTopic = async (subject, level) => {
  const topics = db
    .collection("topics")
    .where("subject", "==", subject)
    .where("level", "==", level)

  const snapshot = await topics.get()

  let output = []
  snapshot.forEach((doc) => {
    output.push(doc.data().topic)
  })

  return output
}

export const updateTopic = async (subject, level, topic) => {
  const topics = db.collection("topics")
  const query = topics
    .where("subject", "==", subject)
    .where("level", "==", level)
    .where("topic", "==", topic)

  const snapshot = await query.get()

  if (snapshot.empty) {
    topics.add({ subject, level, topic })
  }
}
