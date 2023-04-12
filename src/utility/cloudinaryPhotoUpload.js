import axios from "axios";
export const uploadCloudinary = async (file) => {
  const data = new FormData();
  data.append("file", file);
  data.append("upload_preset", "uploads");
  const uploadRes = await axios.post(
    "https://api.cloudinary.com/v1_1/dogdjdfih/image/upload",
    data
  );
  const { url } = uploadRes.data;
  return url;
};
