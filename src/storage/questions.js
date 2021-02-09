import { nanoid } from "nanoid"
import { storage } from "../firebase"

export const uploadImage = async (image) => {
  console.log(image)
  const randomString = nanoid()
  const storageRef = storage.ref()
  const questionRef = storageRef.child(
    `/questions/${randomString}.${image.name.split(".").slice(-1)}`
  )
  await questionRef.put(image)
  const url = await questionRef.getDownloadURL()
  console.log(url)
  return url
}
