import { useState, useEffect } from "react";

import { imageUploader } from "../utils/imageUploader";

export default function ImgUploader({
  prevImg,
  img_field,
  width = 300,
  height = 300,
}) {
  const [selectedFile, setSelectedFile] = useState();
  const [preview, setPreview] = useState(prevImg);
  const [imgUrl, SetImgUrl] = useState(prevImg);
  const [uploading, setUploading] = useState("");

  // create a preview as a side effect, whenever selected file is changed
  useEffect(() => {
    if (!selectedFile) {
      if (prevImg && !prevImg.includes("placeholder")) {
        setPreview(prevImg);
        return;
      }
      setPreview(prevImg || undefined);
      return;
    }

    const objectUrl = URL.createObjectURL(selectedFile);
    setPreview(objectUrl);

    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedFile, prevImg]);

  const onSelectFile = async (e) => {
    if (!e.target.files || e.target.files.length === 0) {
      setSelectedFile(undefined);
      return;
    }

    // I've kept this example simple by using the first image instead of multiple
    setSelectedFile(e.target.files[0]);
    setUploading("uploading");
    let res = "";
    try {
      res = await imageUploader(e.target.files[0]);
      setUploading("done");
    } catch (e) {
      res = prevImg;
      setUploading("error");
    } finally {
      SetImgUrl(res);
    }
  };

  const removeSelected = () => {
    setSelectedFile(undefined);
    document.getElementById("file-input-text").value = "";
    if (prevImg) {
      setPreview(prevImg);
      SetImgUrl(prevImg);
      return;
    }
    setPreview(undefined);
    SetImgUrl(prevImg);
  };

  const statusComponent = (status) => {
    if (status === "uploading") {
      return (
        <div className="uploading-spin">
          <div className="lds-ring">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
          <p>Uploading</p>
        </div>
      );
    } else if (status === "done") {
      return <p className="green-done">Done</p>;
    } else if (status === "error") {
      return <p className="red-error">Error</p>;
    }
  };

  return (
    <div id="product-img-upload-container">
      <div className="status-container">
        {statusComponent(uploading)}
        <div id="remove-img-btn-con"></div>
        {selectedFile && (
          <button
            onClick={removeSelected}
            id="remove-img-btn"
            className="selectable"
          >
            x
          </button>
        )}
      </div>
      
      <div id="product-image-upload-display"  style={{ width: width, height: height }}>
        {preview && (
          <img loading="lazy" src={preview} alt="preview" id="product-img" />
        )}
      </div>

      <input type="text" value={imgUrl} name={img_field} readOnly hidden/>

      <input
        type="file"
        onChange={onSelectFile}
        id="file-input-text"
        name="source"
      />
    </div>
  );
}
