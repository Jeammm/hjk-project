import axios from "axios";

export async function imageUploader(img) {
  const img_hosting = process.env.REACT_APP_IMG_HOSTING;

  const formData = new FormData();
  formData.append("source", img);
  formData.append("key", process.env.REACT_APP_IMG_HOSTING_PASSWORD);

  try {
    const response = await axios.post(img_hosting, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    const imageUrl = response.data.image.url;

    return imageUrl;
  } catch (error) {
    throw error;
  }
}
