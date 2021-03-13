import React, { createContext, useEffect, useState } from "react"
import { getStaff, getStudent } from "../firestore/users"

import { AskToVerify } from "./AskToVerify"
import { Loading } from "./Loading"
import { auth } from "../firebase"
import { isEmpty } from "lodash"

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(true)
  const [currentUser, setCurrentUser] = useState({})

  useEffect(() => {
    const listener = auth.onAuthStateChanged(async (user) => {
      if (user) {
        const staff = await getStaff(user.uid)
        if (staff === false) {
          console.log("get Staff")
          const student = await getStudent(user.uid)
          setCurrentUser({ ...user, db: student, role: "student" })
        } else {
          setCurrentUser({ ...user, db: staff, role: "staff" })
        }
      } else {
        setCurrentUser({})
      }
      setLoading(false)
    })
    return () => listener()
  }, [currentUser.uid])

  if (loading) {
    return <Loading />
  }

  return (
    <AuthContext.Provider value={{ currentUser }}>
      {!isEmpty(currentUser) && (
        <AskToVerify verified={currentUser.emailVerified} />
      )}
      {children}
    </AuthContext.Provider>
  )
}
