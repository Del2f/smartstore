import { useState, useEffect } from "react";
import axios from "../../api/axios";
import "./ImageProductRegi.scss";

type Props = {
  image?: any;
  deleteFunc?: any;
};

function ImagePreview({ image, deleteFunc }: Props) {
  return (
    <div className="ImagePreview" draggable>
      <img src={image} alt="preview" />
    </div>
  );
}

function ImageUploadBox(props:any) {

  const [max, setMax] = useState<any>(1); // 이미지 최대 개수
  const [uploadedImages, setUploadedImages] = useState<any>([]);
  const [previewImages, setPreviewImages] = useState<any>([]);

  const handleFiles = (files: any) => {
    for (const file of files) {
      if (!file.type.startsWith("image/")) continue;
      const reader = new FileReader();
      reader.onloadend = (e: any) => {
        let result = e.target.result;
        if (result) {
          setUploadedImages((state: any) => [...state, result].slice(0, max));
          props.setIsImage(true);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const changeHandler = (event: any) => {
    const files = event.target.files;
    handleFiles(files);
    const formData = new FormData();
    formData.append("file", files[0]);
    props.setMainImage(formData)
    // if (files) {
    //   axios
    //     .post("/smartstore/home/productregister", img)
    //     .then((res:any) => {
    //       setImageUrl(res.data);
    //     })
    //     .catch((err:any) => {
    //       console.error(err);
    //     });
    // }
  };

  const dropHandler = (event: any) => {
    event.preventDefault();
    event.stopPropagation();
    const files = event.dataTransfer.files;
    handleFiles(files);
  };

  const dragOverHandler = (event: any) => {
    event.preventDefault();
    event.stopPropagation();
  };

  const deleteBtn = () => {
    setUploadedImages([]);
    props.setIsImage(false);
  };

  useEffect(() => {
    const imageJSXs = uploadedImages.map((image: any, index: any) => {
      return <ImagePreview image={image} key={index} />;
    });
    setPreviewImages(imageJSXs);
  }, [uploadedImages]);

  return (
    <>
      <div className="MainImageUploadBox">
        <div className="preview_wrapper">
          <div className="preview_container">
            {previewImages}
            <i className="plus"></i>
            <label
              className="drag_or_click"
              onDragOver={dragOverHandler}
              onDrop={dropHandler}
            >
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={changeHandler}
              />
            </label>

          </div>
        </div>
            <div className="text_box">
              <span>드래그 또는 클릭하여 업로드 (640x640)</span>
              <button className="delete-btn" onClick={deleteBtn}>삭제</button>
            </div>
      </div>
    </>
  );
}

export default ImageUploadBox;
