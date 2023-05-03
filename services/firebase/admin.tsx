const admin = require("firebase-admin");

const serviceAccount = {
  "type": process.env.NEXT_PUBLIC_FIREBASE_KEYS_TYPE,
  "project_id": process.env.NEXT_PUBLIC_FIREBASE_KEYS_PROJECT_ID,
  "private_key_id": process.env.NEXT_PUBLIC_FIREBASE_KEYS_PRIVATE_KEY_ID,
  "private_key": process.env.NEXT_PUBLIC_FIREBASE_KEYS_PRIVATE_KEY,
  "client_email": process.env.NEXT_PUBLIC_FIREBASE_KEYS_PRIVATE_CLIENT_EMAIL,
  "client_id": process.env.NEXT_PUBLIC_FIREBASE_KEYS_CLIENT_ID,
  "auth_uri": process.env.NEXT_PUBLIC_FIREBASE_KEYS_AUTH_URI,
  "token_uri": process.env.NEXT_PUBLIC_FIREBASE_KEYS_TOKEN_URI,
  "auth_provider_x509_cert_url": process.env.NEXT_PUBLIC_FIREBASE_KEYS_AUTH_PROVIDER_URL,
  "client_x509_cert_url": process.env.NEXT_PUBLIC_FIREBASE_KEYS_CLIENT_CERT_URL
}

try {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });
} catch (error) {
  console.error(error)
}
const firestore = admin.firestore()

export { admin, firestore }