import axios from "../../api/axios";
import { useState, useEffect, useRef } from "react";
import "./DetailImageProductRegi.scss";

  type Props = {
    image?: any;
    addImg?: any;
    deleteImg?: any;
  }

  function ImagePreview({ image, addImg, deleteImg }:Props) {

    const inputRef = useRef<any>();

    return (
      <div className="ImagePreview" draggable>
        <img src={image} alt="preview"/>
        <label className="icon_add">
          <input type="file" multiple accept="image/*" ref={inputRef} onChange={addImg}/>
          <span className="icon-plus"></span>
        </label>
        <div className="icon_delete" onClick={deleteImg}>
            <span className="icon-x"></span>
        </div>
      </div>
    );
  }

  function DetailImageUploadBox( props: any ) {
  
    const [max, setMax] = useState<any>(10); // 이미지 최대 개수
    const [uploadedImages, setUploadedImages] = useState<any>([]);
    const [previewImages, setPreviewImages] = useState<any>([]);
    const uploadBoxRef = useRef<any>();
    const inputRef = useRef<any>();
    
    useEffect(() => {
      const uploadBox = uploadBoxRef.current;
      const input = inputRef.current;
      
      const handleFiles = async (files: any) => {
        const timer = (ms: any) => new Promise(res => setTimeout(res, ms))

        const formData = new FormData();

        for(let i=0; i < files.length; i++){
          formData.append('DetailImage', files[i]);
        }

        try {
          const URL = await axios.post('/smartstore/home/productregister/img2', formData);
          URL.data.location.DetailImage.map((list: any, index: any) => {
            console.log(list.location)
            props.setDetailImage((data:any) => [...data, list.location]);
            props.setIsDetail(true);
          })

        } catch (error) {
          console.log(error);
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
      const editImg = props.DetailImage;
      const imageJSXs = editImg.map((image: any, index: any) => {

        const isDeleteImage = (element: any) => {
          return element === image;
        };

        const addIndex = (element: any) => {
          return element === image;
        };

        const addImg = async (event: any) => {
          const files = event.target.files;
          const formData = new FormData();

          for(let i=0; i < files.length; i++){
            formData.append('DetailImage', files[i]);
          }

          const URL = await axios.post('/smartstore/home/productregister/img2', formData);
            URL.data.location.DetailImage.map((list:any, index:any) => {

            const index1 = editImg.findIndex(addIndex) + 1
            props.DetailImage.splice(index1, 0, list.location)
            props.setDetailImage((data:any) => [...data]);
          })
        };

        const deleteImg = () => {
          const index = uploadedImages.findIndex(isDeleteImage);
          uploadedImages.splice(index, 1);
          setUploadedImages([...uploadedImages]);

          props.DetailImage.splice(index, 1);
          props.setDetailImage([...props.DetailImage]);

          if(uploadedImages.length == 0){
            props.setIsDetail(false);
          }
        };

        return <ImagePreview image={image} deleteImg={deleteImg} addImg={addImg} key={index} />;
      });

      setPreviewImages(imageJSXs);
    }, [props.DetailImage]);
  
  return (
    <>
      <div className="DetailImageUploadBox">
        <div className="preview_wrapper">
          <div className="wrap">
            <div className="inner">
              <div className="preview_container">{previewImages}</div>
              <div className="icon_box"></div>
            </div>
          </div>
        </div>
        <label className="drag_or_click" ref={uploadBoxRef}>
          <span>이미지 추가</span>
          <input type="file" multiple accept="image/*" name="filename[]" ref={inputRef} />
        </label>
        <div className="text_box">
          <span>이미지 추가 버튼을 클릭하시면 상세 사진이 업로드 됩니다.</span>
          <span>이미지 우측 상단에 있는 X 버튼을 누르면 해당 사진이 삭제 됩니다.</span>
        </div>
      </div>
      </>
  );
  }

  export default DetailImageUploadBox;