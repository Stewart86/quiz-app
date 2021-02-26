import { auth } from "../firebase"
import { post } from "../firestore/users"

export const signup = async (name, email, phone, password) => {
  const user = await auth.createUserWithEmailAndPassword(email, password)
  const id = user.user.uid
  return await post({ id, name, email, phone })
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
