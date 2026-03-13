import axios from "axios";

export const uploadImage = async (file) => {
  const formData = new FormData();

  formData.append("avatar", file);

  const res = await axios.post(
    "http://localhost:8000/api/v1/auth/upload",
    formData
    
  );

  return res.data;
};
