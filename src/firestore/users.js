import firebase, { db } from "../firebase"

export const post = async (user) => {
  const id = user.id
  user.createdOn = firebase.firestore.FieldValue.serverTimestamp()
  user.expireStart = firebase.firestore.FieldValue.serverTimestamp()

  user.isEnabled = true

  const userCollection = db.collection("users").doc(id)
  await userCollection.set(user)

  const roleCollection = db.collection("roles").doc(id)
  return await roleCollection.set({ trial: true })
}

export const upgradeRole = async (uid, role) => {
  // reset user for role
  const userRef = db.collection("users").doc(uid)
  await userRef.update({
    expireStart: firebase.firestore.FieldValue.delete(),
    createdOn: firebase.firestore.FieldValue.serverTimestamp(),
  })

  const roleCollection = db.collection("roles").doc(uid)
  if (role === "admin") {
    return await roleCollection.update({
      admin: true,
      trial: firebase.firestore.FieldValue.delete(),
      student: firebase.firestore.FieldValue.delete(),
    })
  } else {
    return await roleCollection.update({
      tutor: true,
      trial: firebase.firestore.FieldValue.delete(),
      student: firebase.firestore.FieldValue.delete(),
    })
  }
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

export const getAllStudents = async () => {
  const userCollection = db.collection("users")
  const allUsers = await userCollection.get()
  const result = {}

  const roleCollection = db.collection("roles")
  const getRolesAction = []
  allUsers.forEach((doc) => {
    getRolesAction.push(roleCollection.doc(doc.id).get())
    result[doc.id] = doc.data()
  })
  const dbRoles = await Promise.all(getRolesAction)
  dbRoles.forEach((doc) => {
    result[doc.id] = { ...result[doc.id], ...doc.data() }
  })
  console.log("roles", dbRoles)
  console.log(result)
  return result
}
