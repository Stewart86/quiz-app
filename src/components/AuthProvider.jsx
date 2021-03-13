import React, { createContext, useEffect, useState } from "react"
import { getStaff, getStudent } from "../firestore/users"

import { AskToVerify } from "./AskToVerify"
import { Loading } from "./Loading"
import { SubscribeToTrial } from "./SubscribeToTrial"
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
          console.log("get student")
          const student = await getStudent(user.uid)
          setCurrentUser({ ...user, db: student, role: "student" })
        } else {
          console.log("get Staff")
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
        <AskToVerify
          verified={currentUser.emailVerified}
          email={currentUser.email}
          role={currentUser.role}
        />
      )}
      {!isEmpty(currentUser) &&
        currentUser.role === "student" &&
        currentUser.emailVerified &&
        currentUser.db.subscription === false && <SubscribeToTrial currentUser={currentUser} />}
      {children}
    </AuthContext.Provider>
  )
}
