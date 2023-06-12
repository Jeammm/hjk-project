import { useState, useEffect } from "react";

import { imageUploader } from "../utils/imageUploader";

export default function ImgUploader({ prevImg, img_field }) {
  const [selectedFile, setSelectedFile] = useState();
  const [preview, setPreview] = useState(prevImg);
  const [imgUrl, SetImgUrl] = useState(prevImg);
  const [uploading, setUploading] = useState("");

  // create a preview as a side effect, whenever selected file is changed
  useEffect(() => {
    if (!selectedFile) {
      if (prevImg && prevImg !== "placeholder.png") {
        setPreview(prevImg);
        return;
      }
      setPreview(undefined);
      return;
    }

    const objectUrl = URL.createObjectURL(selectedFile);
    setPreview(objectUrl);

    // free memory when ever this component is unmounted
    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedFile]);

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
      res = "placeholder.png";
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
    SetImgUrl("placeholder.png");
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
    <div id="product-img-container">
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

      {preview && (
        <img loading="lazy" src={preview} alt="preview" id="product-img" />
      )}

      <input type="text" value={imgUrl} name={img_field} readOnly hidden />

      <input
        type="file"
        onChange={onSelectFile}
        id="file-input-text"
        name="source"
      />
    </div>
  );
}
