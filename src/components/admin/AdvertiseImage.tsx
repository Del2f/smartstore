import axios from "../../api/axios";
import styled from "styled-components";
import plus from "@img/plus1.svg";
import { useState, useEffect, useRef } from "react";

const IconWrap = styled.div`
  position: relative;
  width: 100%;
  height: 500px;
  display: flex;
  align-items: center;
  margin-top: 14px;
`;

interface IconI {
  isAdImage: boolean;
}

const IconI = styled.div<IconI>`
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  position: absolute;
  width: 50px;
  height: 50px;
  content: "";
  background: url(${plus}) 15px 15px no-repeat;
  background-size: 20px;

  ${(props) => (props.isAdImage ? `opacity: 0;` : `opacity: 1;`)}
`;

const IconLabel = styled.label`
  position: absolute;
  top: 0px;
  left: 0px;
  right: 0px;
  bottom: 0px;
  background-color: transparent;

  .ImagePreview {
    overflow: hidden;
    width: 100%;
    z-index: 2;

    img {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      max-width: 100%;
      max-height: 100%;
    }
  }
`;

const IconInput = styled.input`
  width: 100%;
  visibility: hidden;
`;

const Error = styled.span`
  display: block;
  margin-top: 10px;
`;

function ImagePreview({ image, setAdBackColor, colorSelector, setIsBackColor }: any) {
  const colorPicker = (e: any) => {

    console.log(colorSelector);
    if (!colorSelector) {
      return;
    }

    const canvas = document.createElement("canvas");

    if (canvas) {
      const context = canvas.getContext("2d");
      const img = e.target;

      canvas.width = img.width;
      canvas.height = img.height;
      if (context) {
        context.drawImage(img, 0, 0, img.width, img.height);

        const x = e.nativeEvent.offsetX;
        const y = e.nativeEvent.offsetY;
        const pixelData = context.getImageData(x, y, 1, 1).data;

        const color = `rgba(${pixelData[0]}, ${pixelData[1]}, ${pixelData[2]}, ${pixelData[3] / 255})`;
        setAdBackColor(color);
        setIsBackColor(true);
        console.log("클릭한 픽셀의 색상:", color);
      }
    }
  };

  return (
    <>
      <div className="ImagePreview" draggable>
        <img src={image} alt="preview" onClick={colorPicker} />
      </div>
    </>
  );
}

function AdvertiseImage(props: any) {

  const [max, setMax] = useState<any>(1); // 이미지 최대 개수
  const [uploadedImages, setUploadedImages] = useState<any>([]);
  const [previewImages, setPreviewImages] = useState<any>([]);
  const [errorMessage, setErrorMessage] = useState<any>([]);

  const validFileTypes = ["image/jpg", "image/jpeg", "image/png"];

  const handleFiles = async (files: any) => {
    if (!validFileTypes.find((type: any) => type === files[0].type)) {
      setErrorMessage("이미지 파일을 업로드 해주세요.");
      return;
    }
    setErrorMessage("");

    const img = files[0];
    const formData = new FormData();
    formData.append("AdvertiseImage", img);
    try {
      for (const file of files) {
        if (!file.type.startsWith("image/")) continue;
        const reader = new FileReader();
        reader.onloadend = (e: any) => {
          let result = e.target.result;
          if (result) {
            setUploadedImages([result].slice(0, max));
            props.setIsAdImage(true);
          }
        };
        reader.readAsDataURL(file);
      }

      const URL = await axios.post("/smartstore/home/advertise/img", formData);
      props.setAdImage(URL.data.location);
    } catch (error) {
      console.log(error);
    }
  };

  const changeHandler = (event: any) => {
    const files = event.target.files;

    handleFiles(files);
    event.target.value = ""; // 같은 파일 업로드를 위한 초기화
  };

  const dropHandler = (event: any) => {
    event.preventDefault();
    event.stopPropagation();

    if (!props.isSelectedTask && !props.isSelectedSubTask) {
      console.log("서브 카테고리를 선택해주세요");
      return;
    }

    const files = event.dataTransfer.files;
    handleFiles(files);
  };

  const dragOverHandler = (event: any) => {
    event.preventDefault();
    event.stopPropagation();
  };

  const IconDelete = (event: any) => {
    event.preventDefault();
    event.stopPropagation();
    setUploadedImages([]);
    props.setAdImage("");

    props.setAdBackColor();
    props.setColorSelector(false);

    props.setIsAdImage(false);
    props.setIsBackColor(false);
  };

  // 상품 최초 등록시 미리보기
  useEffect(() => {
    const imageJSXs = uploadedImages.map((image: any, index: any) => {
      return (
        <ImagePreview
          image={image}
          key={index}
          colorSelector={props.colorSelector}
          setAdBackColor={props.setAdBackColor}
          setIsBackColor={props.setIsBackColor}
        />
      );
    });

    setPreviewImages(imageJSXs);
  }, [uploadedImages, props.colorSelector]);

  // 상품 수정시
  useEffect(() => {
    const editImg = props.iconImg;

    if (!editImg) {
      setPreviewImages("");
      props.setAdImage("");
      props.setIsAdImage(false);
      return;
    }

    const imageJSXs = <ImagePreview image={editImg} />;
    props.setIsAdImage(true);
    setPreviewImages(imageJSXs);
  }, [props.iconImg]);

  return (
    <>
      <IconWrap className="IconWrap">
        <IconI className="IconI" isAdImage={props.isAdImage}></IconI>
        <IconLabel className="IconLabel dragorclick" onDragOver={dragOverHandler} onDrop={dropHandler} >
          {previewImages}
          {!props.colorSelector && <IconInput type="file" multiple accept="image/*" onChange={changeHandler} />}
        </IconLabel>
        {uploadedImages[0] && (
          <div className="text-btn-wrap" style={{ position: "absolute", right: "20px" }}>
            <button className="text-btn" onClick={IconDelete}>
              <span className="text">삭제</span>
            </button>
          </div>
        )}
        <Error>{errorMessage}</Error>
      </IconWrap>

    </>
  );
}

export default AdvertiseImage;
