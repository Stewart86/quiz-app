import firebase, { db } from "../firebase"

export const post = async (user) => {
  const id = user.id
  const time = firebase.firestore.FieldValue.serverTimestamp()
  user.createdOn = firebase.firestore.FieldValue.serverTimestamp()
  // if isPaid is false, 7 days trial starts from createOn time
  user.isPaid = false
  const userCollection = db.collection("users").doc(id)
  if (delete user.id) {
    await userCollection.set(user)
  }
  const roleCollection = db.collection("roles").doc(id)
  await roleCollection.set({ role: "student" })
}

export const get = async (uid) => {
    const userCollection = db.collection("users").doc(uid)
    const user = await userCollection.get()
    console.log(user.data())
}

// TODO: Renewal will update renewal time