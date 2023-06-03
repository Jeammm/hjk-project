import axios from "axios";

export async function imageUploader(img) {
  const img_hosting = "https://freeimage.host/api/1/upload";

  const formData = new FormData();
  formData.append('source', img);
  formData.append('key', "6d207e02198a847aa98d0a2a901485a5");
  
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
};