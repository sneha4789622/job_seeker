import admin from "firebase-admin";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 🔹 prevent re-initialization
if (!admin.apps.length) {
  const serviceAccount = JSON.parse(
    fs.readFileSync(
      path.join(__dirname, "../config/firebaseServiceAccount.json"),
      "utf-8"
    )
  );

  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

export default admin;
