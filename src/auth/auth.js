import { CONFIRMATION_EMAIL_REDIRECT } from "../helper/constants"
import { auth } from "../firebase"
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

export const forgetPassword = async (email) => {
  return auth.sendPasswordResetEmail(email)
}

export const confirmPasswordReset = async (code, email) => {
  return auth.confirmPasswordReset(code, email)
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
