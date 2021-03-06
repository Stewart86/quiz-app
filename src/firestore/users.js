import { dayToTrialEnd, daysToRenew } from "../helper/utilities"
import firebase, { db } from "../firebase"

export const post = async (user) => {
  const id = user.id
  user.createdOn = firebase.firestore.FieldValue.serverTimestamp()
  user.expireStart = firebase.firestore.FieldValue.serverTimestamp()
  user.updatedOn = firebase.firestore.FieldValue.serverTimestamp()

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
    updatedOn: firebase.firestore.FieldValue.serverTimestamp(),
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

export const renewOne = async (uid, date) => {
  const userCollection = db.collection("users").doc(uid)
  return await userCollection.update({
    expireStart: firebase.firestore.Timestamp.fromMillis(date),
    updatedOn: firebase.firestore.FieldValue.serverTimestamp(),
    isExpired: firebase.firestore.FieldValue.delete(),
    isEnabled: true,
  })
}

export const convertToStudent = async (uid) => {
  const roleCollection = db.collection("roles").doc(uid)
  try {
    await roleCollection.update({
      trial: firebase.firestore.FieldValue.delete(),
      student: true,
    })
  } catch (error) {
    console.error(error)
  }
  const userCollection = db.collection("users").doc(uid)
  return await userCollection.update({
    expireStart: firebase.firestore.FieldValue.serverTimestamp(),
    updatedOn: firebase.firestore.FieldValue.serverTimestamp(),
    isExpired: firebase.firestore.FieldValue.delete(),
    isEnabled: true,
  })
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

export const getAllUsers = async () => {
  const userCollection = db.collection("users")
  const allUsers = await userCollection.get()
  const result = {}

  const roleCollection = db.collection("roles")

  // get user roles and append into user obj
  const getRolesAction = []
  allUsers.forEach((doc) => {
    getRolesAction.push(roleCollection.doc(doc.id).get())
    result[doc.id] = doc.data()
  })

  // one shot get all  and merge into user
  const dbRoles = await Promise.all(getRolesAction)
  dbRoles.forEach((doc) => {
    result[doc.id] = { ...result[doc.id], ...doc.data() }
  })

  // foreach user check trial or student and calculate expiry
  Object.keys(result).forEach((key) => {
    if (result[key].trial) {
      result[key].dueIn = `${dayToTrialEnd(
        result[key].expireStart.seconds
      )} days`
    } else if (result[key].student) {
      result[key].dueIn = `${daysToRenew(result[key].expireStart.seconds)} days`
    } else {
      result[key].dueIn = "N/A"
    }

    // action field to include id, admin, tutor, enabled
    result[key].action = {
      id: key,
      isAdmin: result[key].admin,
      isTutor: result[key].tutor,
      isEnabled: result[key].isEnabled,
    }
  })
  return result
}

export const expireUser = async (uid) => {
  const userCollection = db.collection("users").doc(uid)
  await userCollection.update({
    updatedOn: firebase.firestore.FieldValue.serverTimestamp(),
    isEnabled: false,
    isExpired: true,
  })

  const roleCollection = db.collection("roles").doc(uid)
  return await roleCollection.update({
    admin: firebase.firestore.FieldValue.delete(),
    tutor: firebase.firestore.FieldValue.delete(),
    trial: firebase.firestore.FieldValue.delete(),
    student: firebase.firestore.FieldValue.delete(),
  })
}

export const disableUser = async (uid) => {
  const userCollection = db.collection("users").doc(uid)
  await userCollection.update({
    updatedOn: firebase.firestore.FieldValue.serverTimestamp(),
    isEnabled: false,
  })

  const roleCollection = db.collection("roles").doc(uid)
  return await roleCollection.update({
    admin: firebase.firestore.FieldValue.delete(),
    tutor: firebase.firestore.FieldValue.delete(),
    trial: firebase.firestore.FieldValue.delete(),
    student: firebase.firestore.FieldValue.delete(),
  })
}

export const enableUser = async (uid) => {
  const userCollection = db.collection("users").doc(uid)
  await userCollection.update({
    expireStart: firebase.firestore.FieldValue.serverTimestamp(),
    updatedOn: firebase.firestore.FieldValue.serverTimestamp(),
    isEnabled: true,
  })
  const roleCollection = db.collection("roles").doc(uid)
  return await roleCollection.update({
    trial: true,
  })
}
