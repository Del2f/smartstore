import { useState, useEffect, useRef } from "react";
import axios from "../../api/axios";
import "./SubImageProductRegi.scss";

  type Props = {
    image?: any;
    deleteFunc?: any;
  }

  function ImagePreview({ image, deleteFunc }:Props) {
    return (
      <div className="ImagePreview" draggable>
        <img src={image} alt="preview"/>
        <div className="icon_container" onClick={deleteFunc}>
          <i className="fas fa-times"></i>
        </div>
      </div>
    );
  }

  function SubImageUploadBox(props:any) {
    
    const [max, setMax] = useState<any>(10); // 이미지 최대 개수
    const [uploadedImages, setUploadedImages] = useState<any>([]);
    const [previewImages, setPreviewImages] = useState<any>([]);
    const uploadBoxRef = useRef<any>();
    const inputRef = useRef<any>();

    const [errorMessage, setErrorMessage] = useState<any>([]);
    const validFileTypes = ['image/jpg', 'image/jpeg', 'image/png']

    useEffect(() => {
      const uploadBox = uploadBoxRef.current;
      const input = inputRef.current;
      
      const handleFiles = async (files:any) => {

        const formData = new FormData();

        for(let i=0; i < files.length; i++){
          formData.append('SubImage', files[i]);
        }

        try {
          const timer = (ms: any) => new Promise(res => setTimeout(res, ms))
          for (const file of files) {
            await timer(1000);

            if(!validFileTypes.find((type:any) => type === file.type)) {
              setErrorMessage('이미지 파일을 업로드 해주세요.');
              return
            }
            setErrorMessage('');

          //   if (!file.type.startsWith("image/")) continue;
          //   const reader = new FileReader();
          //   reader.onloadend = (e:any) => {
          //     const result = e.target!.result;
          //     if (result) {
          //       setUploadedImages((state:any) => [...state, result].slice(0, max));
          //       // props.setSubImage((state:any) => [...state, file].slice(0, max));
          //     }
          //   };
          //   reader.readAsDataURL(file);
          }
          
          const URL = await axios.post('/smartstore/home/productregister/img1', formData);
          
          // console.log(URL.data.location.SubImage)
          URL.data.location.SubImage.map((list:any, index:any) => {
            props.setSubImage((data:any) => [...data, list.location]);
          })

        } catch (error) {
          console.log(error);
        }
        
      };
      
      const changeHandler = async (event:any) => {
        const files = event.target.files;
        await handleFiles(files);
        // event.target.value = '';
      };
      
      const dropHandler = async (event:any) => {
        event.preventDefault();
        event.stopPropagation();
        const files = event.dataTransfer.files;
        await handleFiles(files);
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
    
    // 상품 최초 등록시
    useEffect(() => {
      const editImg = props.SubImage;

      const imageJSXs = editImg.map((image:any, index:any) => {

        const isDeleteImage = (element:any) => {
          return element === image;
        };

        const deleteFunc = (e:any) => {
          e.preventDefault();
          e.stopPropagation();
          const index = editImg.findIndex(isDeleteImage);

          uploadedImages.splice(index, 1);
          setUploadedImages([...uploadedImages]);

          props.SubImage.splice(index, 1);
          props.setSubImage([...props.SubImage]);
        };

        return <ImagePreview image={image} deleteFunc={deleteFunc} key={index} />;
      });
      setPreviewImages(imageJSXs);
    }, [props.SubImage]);

    // // 상품 수정시
    // useEffect(() => {
    //   const editImg = props.SubImage;

    //   const imageJSXs = editImg.map((image:any, index:any) => {

    //     const isDeleteImage = (element:any) => {
    //       return element === image;
    //     };

    //     const deleteFunc = (e:any) => {
    //       e.preventDefault();
    //       e.stopPropagation();
    //       const index = editImg.findIndex(isDeleteImage);

    //       editImg.splice(index, 1);
    //       setUploadedImages([...editImg]);

    //       props.SubImage.splice(index, 1);
    //       props.setSubImage([...props.SubImage]);
    //     };

    //     return <ImagePreview image={image} deleteFunc={deleteFunc} key={index} />;
    //   });
    //   setPreviewImages(imageJSXs);
    // }, [props.SubImage]);
  
    

  return (
    <>
      <div className="SubImageUploadBox">
        <div className="preview_wrapper">
          <label className="drag_or_click" ref={uploadBoxRef}>
            <div className="icon_box">
              <i className="fas fa-arrow-circle-up"></i>
            </div>
            <input type="file" multiple accept="image/*" ref={inputRef} />
          </label>
          <div className="preview_container">{previewImages}</div>
        </div>
          <div className="text_box">
            <span>{errorMessage}</span>
            <span>위 상자에 드래그 또는 클릭하시면 추가사진이 업로드 됩니다. (640x640)</span>
          </div>
      </div>
    </>
  );
  }

  export default SubImageUploadBox;


