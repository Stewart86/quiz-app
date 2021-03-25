import firebase, { db } from "../firebase"

import { isSubscriptionActive } from "./products"

export const postStudent = async (user) => {
  const id = user.id
  user.createdOn = firebase.firestore.FieldValue.serverTimestamp()
  user.updatedOn = firebase.firestore.FieldValue.serverTimestamp()
  user.isEnabled = true

  const userCollection = db.collection("users").doc(id)
  await userCollection.set(user)
}

export const postStaff = async (user) => {
  const id = user.id
  user.createdOn = firebase.firestore.FieldValue.serverTimestamp()
  user.updatedOn = firebase.firestore.FieldValue.serverTimestamp()
  user.isAdmin = false
  user.isEnabled = true

  const userCollection = db.collection("admin").doc(id)
  await userCollection.set(user)
}

export const deleteUser = async (uid) => {
  const userColl = db.collection("users").doc(uid)
  await userColl.delete()
}

export const changeRole = async (uid, role) => {
  let update = {
    updatedOn: firebase.firestore.FieldValue.serverTimestamp(),
  }
  if (role === "tutor") {
    update.isAdmin = firebase.firestore.FieldValue.delete()
  } else {
    update.isAdmin = true
  }
  const userRef = db.collection("admin").doc(uid)
  await userRef.update(update)
}

export const renewOne = async (uid, date) => {
  const userCollection = db.collection("users").doc(uid)
  return await userCollection.update({
    expireStart: firebase.firestore.Timestamp.fromMillis(date),
    updatedOn: firebase.firestore.FieldValue.serverTimestamp(),
    isExpired: firebase.firestore.FieldValue.delete(),
    isEnabled: true,
  })
}

export const getStaff = async (uid) => {
  const adminCollection = db.collection("admin").doc(uid)
  let user
  try {
    user = await adminCollection.get()
  } catch (error) {
    console.error(error)
  }
  if (!user.exists) {
    return user.exists
  }
  return user.data()
}

export const getStudent = async (uid) => {
  const userCollection = db.collection("users").doc(uid)
  try {
    const user = await userCollection.get()
    if (!user.exists) {
      return user.exists
    }

    let dbUser = user.data()

    const subscription = await isSubscriptionActive(uid)
    if (subscription.active) {
      dbUser = { ...user.data(), ...subscription.data }
    } else {
      dbUser = { ...user.data(), ...{ subscription: false } }
    }

    return dbUser
  } catch (error) {
    console.error(error)
  }
}

export const getAllAdmins = async () => {
  const adminCollection = await db.collection("admin").get()
  let result = {}
  adminCollection.forEach((doc) => {
    result[doc.id] = doc.data()

    // add additional column
    if (!result[doc.id].isAdmin) {
      result[doc.id]["isTutor"] = true
    } else {
      result[doc.id]["isTutor"] = false
    }
    result[doc.id]["action"] = {
      id: doc.id,
      isAdmin: result[doc.id].isAdmin,
      isTutor: result[doc.id].isTutor,
      isEnabled: result[doc.id].isEnabled,
    }
  })
  return result
}

export const getAllUsers = async () => {
  const userCollection = db.collection("users")
  const allUsers = await userCollection.get()
  const result = {}

  // get user roles and append into user obj
  allUsers.forEach((doc) => {
    if ("name" in doc.data()) {
      result[doc.id] = doc.data()
      result[doc.id]["action"] = {
        id: doc.id,
        isEnabled: result[doc.id].isEnabled,
      }
    }
  })

  return Object.keys(result).map((key, i) => result[key])
}

export const disableUser = async (uid) => {
  const userCollection = db.collection("users").doc(uid)
  await userCollection.update({
    updatedOn: firebase.firestore.FieldValue.serverTimestamp(),
    isEnabled: false,
  })
}

export const enableUser = async (uid) => {
  const userCollection = db.collection("users").doc(uid)
  await userCollection.update({
    updatedOn: firebase.firestore.FieldValue.serverTimestamp(),
    isEnabled: true,
  })
}
