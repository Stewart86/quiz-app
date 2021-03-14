import { db, functions } from "../firebase"

import { STRIPE_PK } from "../helper/constants"
import { loadStripe } from "@stripe/stripe-js"

export const getProduct = () => {
  const test = db
    .collection("products")
    .where("active", "==", true)
    .get()
    .then(function (querySnapshot) {
      let products = []
      querySnapshot.forEach(async function (prodDoc) {
        const priceSnap = await prodDoc.ref.collection("prices").get()
        priceSnap.docs.forEach((doc) => {
          products.push({
            ...prodDoc.data(),
            prod_id: prodDoc.id,
            price_id: doc.id,
            ...doc.data(),
          })
        })
      })
      return products
    })
  return test.then((res) => res)
}

export const checkoutSession = async (currentUser, price_id) => {
  const docRef = await db
    .collection("users")
    .doc(currentUser.uid)
    .collection("checkout_sessions")
    .add({
      price: price_id,
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
      loadStripe(STRIPE_PK).then((stripe) => {
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
      active = true
      data = doc.data()
    } else {
      active = false
      data = null
    }
  })
  return { active, data }
}
