// import DataUriParser from "datauri/parser.js"

// import path from "path";

// const getDataUri = (file) => {
//     const parser = new DataUriParser();
//     const extName = path.extname(file.originalname).toString();
//     return parser.format(extName, file.buffer);
// }

// export default getDataUri;

import DatauriParser from "datauri/parser.js";
import path from "path";

const parser = new DatauriParser();

const getDataUri = (file) => {
  if (!file) return null; // 🔥 SAFETY

  const extName = path.extname(file.originalname);
  return parser.format(extName, file.buffer);
};

export default getDataUri;
