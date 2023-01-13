import { useState, useEffect, useRef } from "react";
import "./DetailImageProductRegi.scss";

  type Props = {
    image?: any;
    deleteFunc?: any;
  }

  function ImagePreview({ image, deleteFunc }:Props) {
    return (
      <div className="ImagePreview" draggable>
        <img src={image} alt="preview"/>
        <div className="icon_container" onClick={deleteFunc}>
            <span className="icon-x"></span>
        </div>
      </div>
    );
  }

  function DetailImageUploadBox(props:any) {
  
    const [max, setMax] = useState<any>(10); // 이미지 최대 개수
    const [uploadedImages, setUploadedImages] = useState<any>([]);
    const [previewImages, setPreviewImages] = useState<any>([]);
    const uploadBoxRef = useRef<any>();
    const inputRef = useRef<any>();

    useEffect(() => {
      const uploadBox = uploadBoxRef.current;
      const input = inputRef.current;
      
      const handleFiles = (files:any) => {
        for (const file of files) {
          if (!file.type.startsWith("image/")) continue;
          const reader = new FileReader();
          reader.onloadend = (e:any) => {
            const result = e.target!.result;
            if (result) {
              setUploadedImages((state:any) => [...state, result].slice(0, max));
              props.setIsDetail(true);
            }
          };
          reader.readAsDataURL(file);
        }
      };
      
      const changeHandler = (event:any) => {
        const files = event.target.files;
        handleFiles(files);
      };
      
      const dropHandler = (event:any) => {
        event.preventDefault();
        event.stopPropagation();
        const files = event.dataTransfer.files;
        handleFiles(files);
      };
      
      const dragOverHandler = (event:any) => {
        event.preventDefault();
        event.stopPropagation();
      };
      
      uploadBox.addEventListener("drop", dropHandler);
      uploadBox.addEventListener("dragover", dragOverHandler);
      input.addEventListener("change", changeHandler);
      
      return () => {
        uploadBox.removeEventListener("drop", dropHandler);
        uploadBox.removeEventListener("dragover", dragOverHandler);
        input.removeEventListener("change", changeHandler);
      };
    }, [max]);
    
    useEffect(() => {
      const imageJSXs = uploadedImages.map((image:any, index:any) => {
        const isDeleteImage = (element:any) => {
          return element === image;
        };
        const deleteFunc = () => {
          uploadedImages.splice(uploadedImages.findIndex(isDeleteImage), 1);
          setUploadedImages([...uploadedImages]);
          if(uploadedImages.length == 0){
            props.setIsDetail(false);
          }
        };
        return <ImagePreview image={image} deleteFunc={deleteFunc} key={index} />;
      });
      setPreviewImages(imageJSXs);
    }, [uploadedImages]);
  

  return (
    <>
      <div className="DetailImageUploadBox">
        <div className="preview_wrapper">
              <div className="wrap">
                <label className="drag_or_click" ref={uploadBoxRef}>
                  <div className="inner">
                    <div className="preview_container">{previewImages}</div>
                    <div className="icon_box"></div>
                    <input type="file" multiple accept="image/*" ref={inputRef} />

                  </div>
                </label>
              </div>
        </div>
          <div className="text_box">
              <span>위 상자에 드래그 또는 클릭하시면 추가사진이 업로드 됩니다.</span>
            </div>
      </div>
    </>
  );
  }

  export default DetailImageUploadBox;


