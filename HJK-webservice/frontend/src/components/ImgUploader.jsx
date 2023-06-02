import { useState, useEffect } from "react";

import { imageUploader } from "../utils/imageUploader";

export default function ImgUploader({ prevImg, img_field }) {
  const [selectedFile, setSelectedFile] = useState();
  const [preview, setPreview] = useState(prevImg);
  const [imgUrl, SetImgUrl] = useState(prevImg);

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
    const res = await imageUploader(e.target.files[0]);
    SetImgUrl(res);
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

  return (
    <div id="product-img-container" >
      
      <div id="remove-img-btn-con">
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

      {preview && <img src={preview} alt="preview" id="product-img" />}

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
