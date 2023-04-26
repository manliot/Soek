const admin = require("firebase-admin");

const serviceAccount = require("./firebaseKeys.json");

try {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });
} catch (error) {

}
const firestore = admin.firestore()

export { admin, firestore }