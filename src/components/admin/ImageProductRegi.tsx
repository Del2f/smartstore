import { useState } from "react";
import "./ImageProductRegi.scss";
import useUploadImage from "../../api/useUploadImage";

function ImagePreview({ image }: { image: string }) {
  
  return (
    <div className="ImagePreview">
      <img src={image} alt="preview" />
    </div>
  );
}

function ImageProductRegi(props: {
  setMainImage: (images: string[]) => void;
  setIsImage: (state: boolean) => void;
  MainImage: string[];
  SubImage?: string[];    // 선택적으로 받을 수 있도록 추가
  DetailImage?: string[]; // 선택적으로 받을 수 있도록 추가
}) {
  const [uploadedImages, setUploadedImages] = useState<string[]>(props.MainImage);
  const { handleFiles, errorMessage } = useUploadImage(setUploadedImages, props.setMainImage, props.setIsImage);

  const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      handleFiles(files);
      event.target.value = ""; // 같은 파일 업로드 방지
    }
  };

  const dropHandler = (event: React.DragEvent<HTMLLabelElement>) => {
    event.preventDefault();
    handleFiles(event.dataTransfer.files);
  };

  const deleteBtn = () => {
    setUploadedImages([]);
    props.setMainImage([]);
    props.setIsImage(false);
  };

  return (
    <div className="MainImageUploadBox">
      <div className="preview_wrapper">
        <div className="preview_container">
          <i className="plus"></i>
          <label className="drag_or_click" onDragOver={(e) => e.preventDefault()} onDrop={dropHandler}>
            {uploadedImages.map((image, index) => (
              <ImagePreview image={image} key={index} />
            ))}
            <input type="file" multiple accept="image/*" onChange={changeHandler} />
          </label>
        </div>
      </div>
      <div className="text_box">
        <span>{errorMessage}</span>
        <span>드래그 또는 클릭하여 업로드</span>
        <button className="delete-btn" onClick={deleteBtn}>
          삭제
        </button>
      </div>
    </div>
  );
}

export default ImageProductRegi;
