const admin = require("firebase-admin");

const serviceAccount = JSON.parse(process.env.NEXT_PUBLIC_FIREBASE_KEYS || "")

try {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });
} catch (error) {

}
const firestore = admin.firestore()

export { admin, firestore }