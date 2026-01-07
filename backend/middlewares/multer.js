import multer from "multer";

const storage = multer.memoryStorage();
export const singleUpload = multer({storage}).single("file");

<<<<<<< HEAD
=======
export default singleUpload;
>>>>>>> 99c2990f774df0329fafe0f462d72128dc74cb71
