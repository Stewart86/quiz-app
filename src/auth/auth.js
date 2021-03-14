import {
  deleteUser,
  getStaff,
  postStaff,
  postStudent,
} from "../firestore/users"
import firebase, { auth } from "../firebase"

export const signup = async (name, email, phone, password, addStaff) => {
  const user = await auth.createUserWithEmailAndPassword(email, password)
  if (user) {
    const id = user.user.uid
    await user.user.updateProfile({ displayName: name })
    if (addStaff) {
      await postStaff({ id, name, email, phone })
      await deleteUser(id)
    } else {
      await postStudent({ id, name, email, phone })
    }
    await user.user.sendEmailVerification({
      url: window.location.origin,
    })
  }
  return user.user.uid
}

export const signin = async (email, password) => {
  let user = null
  try {
    user = await auth.signInWithEmailAndPassword(email, password)
  } catch (error) {
    return error.message
  }
  return user
}

export const signout = async () => {
  return auth.signOut()
}

export const resetPassword = async (oldPassword, newPassword) => {
  try {
    const email = auth.currentUser.email
    const credential = firebase.auth.EmailAuthProvider.credential(
      email,
      oldPassword
    )
    await auth.currentUser.reauthenticateWithCredential(credential)
    await auth.currentUser.updatePassword(newPassword)
  } catch (e) {
    console.error(e.message)
    if (e.code === "auth/wrong-password") {
      return { error: true, msg: "Please enter a valid old password" }
    } else {
      return { error: true, msg: e.message }
    }
  }
  return { error: false }
}

export const forgetPassword = async (email) => {
  try {
    await auth.sendPasswordResetEmail(email)
  } catch (e) {
    console.error(e.message)
  }
}

export const confirmPasswordReset = async (code, email) => {
  try {
    await auth.confirmPasswordReset(code, email)
  } catch (e) {
    console.error(e.message)
  }
}

export const sendVerificationEmail = async () => {
  if (await getStaff(auth.currentUser.uid)) {
    // delete stripe account / user db
    await deleteUser(auth.currentUser.uid)
  }
  try {
    await auth.currentUser.sendEmailVerification({
      url: window.location.origin,
    })
  } catch (e) {
    console.error(e.message)
  }
}
