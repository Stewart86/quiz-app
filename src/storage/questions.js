import { nanoid } from "nanoid"
import { storage } from "../firebase"

export const uploadImage = async (location, image) => {
  const randomString = nanoid()
  const storageRef = storage.ref()
  const questionRef = storageRef.child(
    `/${location.toLowerCase()}s/${randomString}.${image.name
      .split(".")
      .slice(-1)}`
  )
  await questionRef.put(image)
  const url = await questionRef.getDownloadURL()
  return url
}
