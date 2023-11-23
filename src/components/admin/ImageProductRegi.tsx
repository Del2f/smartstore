import axios from "../../api/axios";
import { useState, useEffect } from "react";
import "./ImageProductRegi.scss";

function ImagePreview({ image, deleteFunc }:any) {
  return (
    <div className="ImagePreview" draggable>
      <img src={image} alt="preview" /> 
    </div>
  );
}

function ImageUploadBox( props: any ) {

  const [max, setMax] = useState<any>(1); // 이미지 최대 개수
  const [uploadedImages, setUploadedImages] = useState<any>([]);

  const [previewImages, setPreviewImages] = useState<any>([]);
  const [errorMessage, setErrorMessage] = useState<any>([]);

  const validFileTypes = ['image/jpg', 'image/jpeg', 'image/png']

  const handleFiles = async (files: any) => {

    if(!validFileTypes.find(( type: any ) => type === files[0].type)) {
      setErrorMessage('이미지 파일을 업로드 해주세요.');
      return
    }
    setErrorMessage('');

    const img = files[0];
    const formData = new FormData();
    formData.append('MainImage', img);
    try {

      for (const file of files) {
        console.log(file)
        if (!file.type.startsWith("image/")) continue;
        const reader = new FileReader();
        reader.onloadend = (e: any) => {
          let result = e.target.result;
          if (result) {
            setUploadedImages([result].slice(0, max));
            props.setIsImage(true);
          }
        };
        reader.readAsDataURL(file);
      }

      const URL = await axios.post('/smartstore/home/productregister/img', formData);
      props.setMainImage([URL.data.location]);

    } catch (error) {
      console.log(error);
    }
    

  };

  // const [list, setList] = useState();
  // console.log(list)

  // useEffect(() => {
  //   async function fetchData() {
  //     // You can await here
  //     const response = await axios.get("/smartstore/home/productregister");
  //     // db 에 저장된 (서버에 저장되어 있는) 이미지의 경로를 가져온다.
  //     setList(response.data.users);
  //     // ...
  //   }
  //   fetchData();
  // }, []);

  const changeHandler = (event: any) => {
    const files = event.target.files;
    handleFiles(files);
    event.target.value = ''; // 같은 파일 업로드를 위한 초기화
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

  const deleteBtn = (event: any) => {
    event.preventDefault();
    event.stopPropagation();
    setUploadedImages([]);
    props.setMainImage([]);
    props.setIsImage(false);
  };

  // 상품 최초 등록시
  useEffect(() => {
    
    const imageJSXs = uploadedImages.map((image: any, index: any) => {
      return <ImagePreview image={image} key={index} />;
    });
    setPreviewImages(imageJSXs);

  }, [uploadedImages]);

  // 상품 수정시
  useEffect(() => {
    const editImg = props.MainImage;

    const imageJSXs = editImg.map((image: any, index: any) => {
      return <ImagePreview image={image} key={index} />;
    });
    setPreviewImages(imageJSXs);
  }, [props.MainImage]);

  return (
    <>
      <div className="MainImageUploadBox">
        <div className="preview_wrapper">
          <div className="preview_container">
            <i className="plus"></i>
            <label
              className="drag_or_click"
              onDragOver={dragOverHandler}
              onDrop={dropHandler}
              >
              {previewImages}
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
              <span>{errorMessage}</span>
              <span>드래그 또는 클릭하여 업로드</span>
              <button className="delete-btn" onClick={deleteBtn}>삭제</button>
            </div>
      </div>
    </>
  );
}

export default ImageUploadBox;
