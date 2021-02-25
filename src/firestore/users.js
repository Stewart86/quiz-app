import firebase, { db } from "../firebase"

export const post = async (user) => {
  const id = user.id
  user.createdOn = firebase.firestore.FieldValue.serverTimestamp()
  user.expireStart = firebase.firestore.FieldValue.serverTimestamp()
  // if isPaid is false, 7 days trial starts from createOn time

  user.isTrial = true
  user.isPaid = false
  user.isRenewed = false
  user.isEnabled = true

  const userCollection = db.collection("users").doc(id)
  await userCollection.set(user)
  const roleCollection = db.collection("roles").doc(id)
  return await roleCollection.set({ student: true })
}

export const postNewTutor = async (user) => {
  const id = user.id

  user.createdOn = firebase.firestore.FieldValue.serverTimestamp()
  user.isEnabled = true

  const userCollection = db.collection("users").doc(id)
  await userCollection.set(user)
  const roleCollection = db.collection("roles").doc(id)
  return await roleCollection.set({ tutor: true })
}

export const updateOne = async (user) => {
  const id = user.id

  user.updateOn = firebase.firestore.FieldValue.serverTimestamp()

  const userCollection = db.collection("users").doc(id)
  return await userCollection.update(user)
}

export const renewOne = async (user) => {
  const id = user.id

  user.updateOn = firebase.firestore.FieldValue.serverTimestamp()
  user.expireStart = firebase.firestore.FieldValue.serverTimestamp()
  user.isPaid = true
  user.isTrial = false

  const userCollection = db.collection("users").doc(id)
  return await userCollection.update(user)
}

export const getUser = async (uid) => {
  const userCollection = db.collection("users").doc(uid)
  try {
    const user = await userCollection.get()
    const data = user.data()
    return data
  } catch (error) {
    console.error(error)
  }
}

export const getRole = async (uid) => {
  const roleCollection = db.collection("roles").doc(uid)
  try {
    const role = await roleCollection.get()
    const data = role.data()
    return data
  } catch (error) {
    console.error(error)
  }
}

// TODO: Renewal will update renewal time
