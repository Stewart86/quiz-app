import { auth, provider } from "../firebase"

import { CONFIRMATION_EMAIL_REDIRECT } from "../helper/constants"
import { post } from "../firestore/users"

export const signup = async (name, email, phone, password) => {
  const user = await auth.createUserWithEmailAndPassword(email, password)
  if (user) {
    const id = user.user.uid
    await user.user.updateProfile({ displayName: name })
    await post({ id, name, email, phone })
    await auth.currentUser.sendEmailVerification({
      url: CONFIRMATION_EMAIL_REDIRECT,
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
    const credential = provider.credential(email, oldPassword)
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

export const sendVerificationEmail = async (user) => {
  try {
    await user.sendEmailVerification({
      url: CONFIRMATION_EMAIL_REDIRECT,
    })
  } catch (e) {
    console.error(e.message)
  }
}
