import axios from "../../api/axios";
import styled from "styled-components";
import plus from "@img/plus1.svg";
import { useState, useEffect } from "react";
import { InputWrap } from "../../pages/adminPage/Category";
import { admin } from "@styles/icons";
import useUploadImage from "../../api/useUploadImage";
const Icon = styled.div`
  position: relative;
`;

const IconInner = styled.div`
  position: relative;
  width: 100%;
  height: 100px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  font-size: 15px;
  font-weight: 100;
  color: #888;
  border: 1px solid #86868b;
  border-radius: 12px;
  background-color: transparent;

  & > span {
    color: #888;
  }

  .addbutton-wrap {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0px;
    left: 0px;
    right: 0px;
    bottom: 0px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

interface IconI {
  isImage: boolean;
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

  ${(props) => (props.isImage ? `opacity: 0;` : `opacity: 1;`)}
`;

const IconLabel = styled.label`
  position: absolute;
  top: 0px;
  left: 0px;
  right: 0px;
  bottom: 0px;
  background-color: transparent;

  .ImagePreview {
    position: absolute;
    overflow: hidden;
    width: 100%;
    height: 100px;

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

const AddButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  width: 40px;
  height: 40px;
  transition: fill 0.3s ease-in-out;

  path {
    fill: #353535;
  }

  &:hover {
    path {
      fill: #272727;
    }
  }

  & > span {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 20px;
    font-weight: 500;
  }
`;

function ImagePreview({ image }: { image: string }) {

  return (
    <div className="ImagePreview">
      <img src={image} alt="preview" />
    </div>
  );
}

function CategoryIconRegi(props: any) {
  const [max, setMax] = useState<any>(1); // 이미지 최대 개수
  const [uploadedImages, setUploadedImages] = useState<string[]>(props.iconImg);
  const [mainImage, setMainImage] = useState<any>([]);
  // const [errorMessage, setErrorMessage] = useState<any>([]);
  const [isImage, setIsImage] = useState<boolean>(false);

 const { handleFiles, errorMessage } = useUploadImage(setUploadedImages, props.setIconImg, setIsImage);

  console.log(props);
  console.log(isImage);

  useEffect(() => {
    if (props.iconImg.length > 0) {
      setUploadedImages(props.iconImg);
      setIsImage(true);
    } else {
      setUploadedImages([]);
      setIsImage(false);
    }
  }, [props.iconImg]);

  // const handleFiles = async (files: any) => {
  //   if (!validFileTypes.find((type: any) => type === files[0].type)) {
  //     setErrorMessage("SVG 파일을 업로드 해주세요.");
  //     return;
  //   }
  //   setErrorMessage("");

  //   const img = files[0];
  //   const formData = new FormData();
  //   formData.append("CategoryImage", img);
  //   try {
  //     for (const file of files) {
  //       if (!file.type.startsWith("image/")) continue;
  //       const reader = new FileReader();
  //       reader.onloadend = (e: any) => {
  //         let result = e.target.result;
  //         if (result) {
  //           setUploadedImages([result].slice(0, max));
  //           setIsImage(true);
  //         }
  //       };
  //       reader.readAsDataURL(file);
  //     }

  //     const URL = await axios.post("/smartstore/home/categoryicon/img", formData);
  //     props.setIconImg(URL.data.location);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const changeHandler = (event: any) => {
    const files = event.target.files;

    if (!props.isSelectedTask && !props.isSelectedSubTask) {
      console.log("서브 카테고리를 선택해주세요");
      return;
    }
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
    props.setIconImg([]);
    setIsImage(false);
  };

  // 상품 최초 등록시 미리보기
  // useEffect(() => {
  //   const imageJSXs = uploadedImages.map((image: any, index: any) => {
  //     return <ImagePreview image={image} key={index} />;
  //   });
  //   // props.setIconImg(imageJSXs);
  // }, [uploadedImages]);

  // 상품 수정시
  useEffect(() => {
    const editImg = props.iconImg;

    if (!editImg) {
      props.setIconImg("");
      // setMainImage("");
      setIsImage(false);
      return;
    }

    const imageJSXs = <ImagePreview image={editImg} />;
    setIsImage(true);
    props.setIconImg(editImg);
  }, []);

  return (
    <>
      <Icon className="Icon">
        <InputWrap className="IconWrap">
          <IconInner className="IconInner">
            <h5 className="cateInfo-name">아이콘</h5>
            <div className="addbutton-wrap">
              {isImage ?  <></> :<AddButton className="addbutton">
                <admin.Plus width="18px" height="18px" fill={"#0071e3"}></admin.Plus>
              </AddButton>}

            </div>
            <IconLabel className="IconLabel dragorclick" onDragOver={dragOverHandler} onDrop={dropHandler}>
            {props.iconImg.map((image, index) => (
              <ImagePreview image={image} key={index} />
            ))}
              <IconInput type="file" multiple accept="image/*" onChange={changeHandler} />
            </IconLabel>
            <div className="text-btn-wrap" style={{ position: "absolute", right: "20px" }}>
              <button className="text-btn" onClick={IconDelete}>
                <span>삭제</span>
              </button>
            </div>
          </IconInner>
        </InputWrap>
        <Error>{errorMessage}</Error>
      </Icon>
    </>
  );
}

export default CategoryIconRegi;
