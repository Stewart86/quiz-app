import { db } from "../firebase"
import { levelLookup } from "../helper/enum"

export const getTopic = async (subject, level) => {
  let topics = null
  if (String(level).includes("Primary")) {
    topics = db
      .collection("topics")
      .where("subject", "==", subject)
      .where("level", "==", level)
  } else {
    topics = db
      .collection("topics")
      .where("subject", "==", subject)
      .where("level", "==", levelLookup[level])
  }
  const snapshot = await topics.get()

  let output = []
  snapshot.forEach((doc) => {
    output.push(doc.data().topic)
  })

  return output
}

export const updateTopic = async (subject, level, topic) => {
  console.log(subject, level, topic)
  const topics = db.collection("topics")
  let query = null
  if (String(level).includes("Primary")) {
    query = topics
      .where("subject", "==", subject)
      .where("level", "==", level)
      .where("topic", "==", topic)
  } else {
    level = levelLookup[level]
    query = topics
      .where("subject", "==", subject)
      .where("level", "==", level)
      .where("topic", "==", topic)
  }

  const snapshot = await query.get()

  if (snapshot.empty) {
    topics.add({ subject, level, topic })
  }
}
