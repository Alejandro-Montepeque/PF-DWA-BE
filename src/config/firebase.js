import admin from "firebase-admin";
import fs from "fs";
import path from "path";

// Ruta al JSON de credenciales
const serviceAccountPath = path.resolve("src/serviceAccountKey.json");
const serviceAccount = JSON.parse(fs.readFileSync(serviceAccountPath, "utf8"));

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

const db = admin.firestore();
export default db;
