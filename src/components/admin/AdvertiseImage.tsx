import axios from "../../api/axios";
import styled from "styled-components";
import plus from "@img/plus1.svg";
import { useState, useEffect, useRef } from "react";

const IconWrap = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 14px;
`;

interface isImage {
  isAdImage: boolean;
}

const IconI = styled.div<isImage>`
  width: 50px;
  height: 50px;
  content: "";
  background: url(${plus}) 15px 15px no-repeat;
  background-size: 20px;

  ${(props) =>
    props.isAdImage
      ? `
  position: absolute;
  opacity: 0;
  `
      : `
  opacity: 1;
  `}
`;

const IconLabel = styled.label`
  background-color: transparent;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  z-index: 0;
  padding: 100px 30px;

  .ImagePreview {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

const IconInput = styled.input`
  position: absolute;
  width: 100%;
  visibility: hidden;
`;

const Error = styled.span`
  display: block;
  margin: 20px 0;
  font-size: 20px;
  font-weight: 700;
`;

const DeleteBtn = styled.button<isImage>`
  ${(props) =>
    props.isAdImage
      ? `
  opacity: 1;
  `
      : `
  opacity: 0;
  `}
`;

const ImagePreviewWrap = styled.div`

    img {
      max-width: 100%;
    }

`

function ImagePreview({ imageURL, setAdBackColor, colorSelector, setIsBackColor }: any) {
  
  const image = new Image();
  image.src = imageURL;
  image.crossOrigin = "Anonymous";

  const colorPicker = (e: any) => {
    console.log("colorpicker");

    if (!colorSelector) {
      console.log('colorSelector false')
      return;
    }

    const ImagePreviewWrap = document.getElementById("ImagePreviewWrap");
    const canvas = document.createElement("canvas");

    if (ImagePreviewWrap && canvas) {
      const context = canvas.getContext("2d");

      canvas.width = ImagePreviewWrap.clientWidth;
      canvas.height = ImagePreviewWrap.clientHeight;

      console.log(ImagePreviewWrap.clientWidth);
      console.log(ImagePreviewWrap.clientHeight);

        if (context) {
          context.drawImage(image, 0, 0, canvas.width, canvas.height);
  
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
      <ImagePreviewWrap className="ImagePreview" id="ImagePreviewWrap" draggable>
        <img src={imageURL} alt="preview" onClick={colorPicker} />
      </ImagePreviewWrap>
    </>
  );
}

function AdvertiseImage(props: any) {
  const [max, setMax] = useState<any>(1); // 이미지 최대 개수
  const [uploadedImages, setUploadedImages] = useState<any>([]);
  const [previewImages, setPreviewImages] = useState<any>([]);
  const [errorMessage, setErrorMessage] = useState<any>([]);

  const validFileTypes = ["image/jpg", "image/jpeg", "image/png"];

  // console.log(props.colorSelector);
  // console.log(previewImages);
  // console.log(props.adImage);
  // console.log(props.isAdvertiseEdit);

  // 이미지 업로드
  const handleFiles = async (files: any) => {
    if (!validFileTypes.find((type: any) => type === files[0].type)) {
      setErrorMessage("이미지 파일을 업로드 해주세요.");
      return;
    }
    setErrorMessage("");

    try {
      for (const file of files) {
        if (!file.type.startsWith("image/")) continue;

        const image = new Image();
        image.src = URL.createObjectURL(file);

        image.onload = async () => {
          if (image.width <= 2200 && image.height <= 1700) {
            const reader = new FileReader();
            reader.onloadend = (e: any) => {
              let result = e.target.result;
              if (result) {
                setUploadedImages([result].slice(0, max));
                props.setIsAdImage(true);
              }
            };
            reader.readAsDataURL(file);

            const formData = new FormData();
            formData.append("AdvertiseImage", file);

            const URL = await axios.post("/smartstore/home/advertise/img", formData);
            props.setAdImage(URL.data.location);
          } else {
            setErrorMessage("이미지의 가로는 2200px 이하, 세로는 1700px 이하이어야 합니다.");
          }
        };
      }
    } catch (error) {
      console.log(error);
    }
  };

  // 이미지 교체
  const changeHandler = (event: any) => {
    const files = event.target.files;

    handleFiles(files);
    event.target.value = ""; // 같은 파일 업로드를 위한 초기화
  };

  // 끌어서 업로드
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

  // 삭제
  const IconDelete = (event: any) => {
    console.log("광고 이미지를 삭제합니다.");

    event.preventDefault();
    event.stopPropagation();
    
    setUploadedImages([]);
    props.setAdImage("");

    props.setAdBackColor();
    props.setColorSelector(false);

    props.setIsAdImage(false);
    props.setIsBackColor(false);

    setPreviewImages("");
  };

  // 상품 최초 등록시 미리보기
  useEffect(() => {
    // if (props.isAdvertiseEdit) {
    //   return;
    // }
    console.log('이미지 최초 업로드시 실행 됩니다.')

    const imageJSXs = uploadedImages.map((imageURL: any, index: any) => {
      return (
        <ImagePreview
          imageURL={imageURL}
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
    const imageURL = props.adImage;
    console.log("상품수정시 시작");
    console.log(imageURL);

    if (!props.isAdvertiseEdit) {
      console.log("props.isAdvertiseEdit false이므로 return");
      return;
    }

    if (!imageURL) {
      console.log("imageURL이 없으므로 수정이 아닌것으로 판단, return");
      setPreviewImages("");
      props.setAdImage("");
      props.setIsAdImage(false);
      return;
    }

    const imageJSXs = (
      <ImagePreview
        imageURL={imageURL}
        colorSelector={props.colorSelector}
        setAdBackColor={props.setAdBackColor}
        setIsBackColor={props.setIsBackColor}
      />
    );

    props.setIsAdImage(true);
    setPreviewImages(imageJSXs);
  }, [props.adImage, props.colorSelector]);

  return (
    <>
      <IconWrap className="IconWrap">
        <IconLabel className="IconLabel dragorclick" onDragOver={dragOverHandler} onDrop={dropHandler}>
          <IconI className="IconI" isAdImage={props.isAdImage}></IconI>
          {previewImages}
          {!props.colorSelector && <IconInput type="file" multiple accept="image/*" onChange={changeHandler} />}
        </IconLabel>
        <Error>{errorMessage}</Error>
        <DeleteBtn
            className="modal-close-button"
            style={{ position: "absolute", right: "0px", zIndex: "0" }}
            isAdImage={props.isAdImage}
            onClick={IconDelete}
          >
            <span className="modal-close-icon">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                <path d="M12.12,10l4.07-4.06a1.5,1.5,0,1,0-2.11-2.12L10,7.88,5.94,3.81A1.5,1.5,0,1,0,3.82,5.93L7.88,10,3.81,14.06a1.5,1.5,0,0,0,0,2.12,1.51,1.51,0,0,0,2.13,0L10,12.12l4.06,4.07a1.45,1.45,0,0,0,1.06.44,1.5,1.5,0,0,0,1.06-2.56Z"></path>
              </svg>
            </span>
          </DeleteBtn>
      </IconWrap>
    </>
  );
}

export default AdvertiseImage;
