import React, { createContext, useEffect, useState } from "react"
import { getStaff, getStudent } from "../firestore/users"

import { Loading } from "./Loading"
import { auth } from "../firebase"

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(true)
  const [currentUser, setCurrentUser] = useState({})

  useEffect(() => {
    const listener = auth.onAuthStateChanged(async (user) => {
      if (user) {
        const student = await getStudent(user.uid)
        if (student === false) {
          console.log("get Staff")
          const staff = await getStaff(user.uid)
          setCurrentUser({ ...user, db: staff, role: "staff" })
        } else {
          setCurrentUser({ ...user, db: student, role: "student" })
        }
      } else {
        setCurrentUser({})
      }
      setLoading(false)
    })
    console.log(currentUser.uid)
    return () => listener()
  }, [currentUser.uid])

  if (loading) {
    return <Loading />
  }
  return (
    <AuthContext.Provider value={{ currentUser }}>
      {children}
    </AuthContext.Provider>
  )
}
