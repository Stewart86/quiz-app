import { db, functions } from "../firebase"

import { loadStripe } from "@stripe/stripe-js"

export const get = async () => {
  db.collection("products")
    .where("active", "==", true)
    .get()
    .then(function (querySnapshot) {
      querySnapshot.forEach(async function (doc) {
        console.log(doc.id, " => ", doc.data())
        const priceSnap = await doc.ref.collection("prices").get()
        priceSnap.docs.forEach((doc) => {
          console.log(doc.id, " => ", doc.data())
        })
      })
    })
}

export const checkoutSession = async (currentUser) => {
  const docRef = await db
    .collection("users")
    .doc(currentUser.uid)
    .collection("checkout_sessions")
    .add({
      price: "price_1ITRvWHSBlztNPVochBJjTrK",
      allow_promotion_codes: true,
      success_url: window.location.origin,
      cancel_url: window.location.origin,
    })
  // Wait for the CheckoutSession to get attached by the extension
  docRef.onSnapshot((snap) => {
    const { error, sessionId } = snap.data()
    if (error) {
      // Show an error to your customer and
      // inspect your Cloud Function logs in the Firebase console.
      alert(`An error occured: ${error.message}`)
    }
    if (sessionId)
      // We have a session, let's redirect to Checkout
      // Init Stripe
      loadStripe(
        "pk_test_51ITOYHHSBlztNPVoyJM9n6bhlbbly2CUcFJHPCHZL4MiDCVBbLliONPTVEWT8sSN9bMl2dVrkDP48wKdi3Y1zqk800zbT37vHA"
      ).then((stripe) => {
        stripe.redirectToCheckout({ sessionId })
      })
  })
}

export const createPortalLink = async () => {
  const functionRef = functions.httpsCallable(
    "ext-firestore-stripe-subscriptions-createPortalLink"
  )
  const { data } = await functionRef({ returnUrl: window.location.origin })
  window.location.assign(data.url)
}

export const isSubscriptionActive = async (uid) => {
  let active = false
  let data = null
  const subRef = db
    .collection("users")
    .doc(uid)
    .collection("subscriptions")
    .where("status", "in", ["trialing", "active"])

  const snapshot = await subRef.get()

  snapshot.forEach((doc) => {
    if (doc && doc.exists) {
      console.log(doc.data())
      active = true
      data = doc.data()
    }
  })

  return { active, data }
}
