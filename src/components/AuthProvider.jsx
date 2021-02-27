import React, { createContext, useEffect, useState } from "react"

import { Loading } from "./Loading"
import { auth } from "../firebase"
import { getRole } from "../firestore/users"

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(true)
  const [currentUser, setCurrentUser] = useState(null)
  const [roles, setRoles] = useState({
    trail: false,
    student: false,
    tutor: false,
    admin: false,
  })

  useEffect(() => {
    const listener = auth.onAuthStateChanged((user) => {
      setCurrentUser(user)
      setLoading(false)
    })
    return () => listener()
  }, [])

  useEffect(() => {
    const getRolesFromDb = async () => {
      if (currentUser) {
        setRoles(await getRole(currentUser.uid))
      }
    }
    getRolesFromDb()
    console.log("effect")
  }, [currentUser])

  if (loading) {
    return <Loading />
  }
  return (
    <AuthContext.Provider value={{ currentUser, roles }}>
      {children}
    </AuthContext.Provider>
  )
}
