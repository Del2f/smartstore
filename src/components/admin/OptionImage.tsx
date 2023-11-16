import axios from "../../api/axios";
import styled from "styled-components";
import { useState, useEffect, SetStateAction } from "react";
import { OptionList } from "../../pages/adminPage/ProductRegister";

const IconWrap = styled.div`
  display: flex;
  align-items: center;
  margin: 0 10px;
`;

interface isImage {
  // isAdImage: boolean;
  optionImage: any;
}

const IconI = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 800;
  width: 20px;
  height: 20px;
  content: "";
  background-color: #f0f0f0;
  border-radius: 20px;
  cursor: pointer;
`;

const IconLabel = styled.label`
  background-color: transparent;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  z-index: 0;

  .ImagePreview {
    position: absolute;
    width: 30px;
    height: 30px;
    display: flex;
    justify-content: center;
    align-items: center;

    img {
      width: 100%;
    }
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
  position: absolute;
  right: -30px;
  z-index: 1;
  margin: 0;
  top: -30px;

  ${(props) =>
    props.optionImage !== undefined && props.optionImage !== null
      ? `
      display: block;
      `
      : `
      display: none;
  `}

  span {
    width: 15px;
    height: 15px;

    svg {
      width: 10px;
      height: 10px;
    }
  }
`;

function ImagePreview({ imageURL }: any) {
  console.log(imageURL);

  return (
    <>
      {(imageURL !== undefined && imageURL !== null) && (
        <div className="ImagePreview" draggable>
          <img src={imageURL} alt="preview" />
        </div>
      )}
    </>
  );
}

interface OptionImage {
  index: number;
  OptionListIndex1: number | null;
  OptionListIndex2: number | null;
  OptionList: any;
  setOptionList: React.Dispatch<SetStateAction<OptionList>>;
  isClicked: boolean;
  setIsClicked: React.Dispatch<SetStateAction<boolean>>;
  optionImage: any;
}

function OptionImage(props: OptionImage) {

  // 이미지 최대 개수
  const [max, setMax] = useState<any>(1);
  const [uploadedImages, setUploadedImages] = useState<any>([]);
  const [previewImages, setPreviewImages] = useState<any>([]);
  const [errorMessage, setErrorMessage] = useState<any>([]);
  const validFileTypes = ["image/jpg", "image/jpeg", "image/png"];

  // 이미지 업로드
  const handleFiles = async (files: any) => {
    if (!validFileTypes.find((type: any) => type === files[0].type)) {
      setErrorMessage("이미지 파일을 업로드 해주세요.");
      return;
    }
    setErrorMessage("");

    // if (!isClicked) {
    //   // 클릭 이벤트가 실행 중이 아닌 경우에만 처리
    //   setIsClicked(true);
    // }

    try {
      for (const file of files) {
        if (!file.type.startsWith("image/")) continue;

        const image = new Image();
        image.src = URL.createObjectURL(file);

        image.onload = async () => {
          if (image.width <= 2500 && image.height <= 1200) {
            const reader = new FileReader();
            reader.onloadend = (e: any) => {
              let result = e.target.result;

              if (result) {
                setUploadedImages([result].slice(0, max));
                // props.setIsAdImage(true);
              }
            };
            reader.readAsDataURL(file);

            const formData = new FormData();
            formData.append("OptionImage", file);

            const URL = await axios.post("/smartstore/home/product/optionimage", formData);

            if (props.OptionListIndex1 !== null && props.OptionListIndex2 !== null) {
              // OptionList를 복사하여 업데이트할 새로운 리스트 생성
              const updatedOptionList = [...props.OptionList];
              const targetOption = updatedOptionList[props.OptionListIndex1][props.OptionListIndex2]; // 수정하려는 optionImage 배열을 가져옵니다.

              if (!targetOption.optionImage) {
                targetOption.optionImage = [];
              }

              targetOption.optionImage[props.index] = { url: URL.data.location };

              console.log(targetOption);
              props.setOptionList(updatedOptionList);
            }
          } else {
            setErrorMessage("이미지의 가로는 2500px 이하, 세로는 1200px 이하이어야 합니다.");
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

    // if (!props.isSelectedTask && !props.isSelectedSubTask) {
    //   console.log("서브 카테고리를 선택해주세요");
    //   return;
    // }

    const files = event.dataTransfer.files;
    handleFiles(files);
  };

  const dragOverHandler = (event: any) => {
    event.preventDefault();
    event.stopPropagation();
  };

  // 이미지 삭제
  const ImageDelete = (event: any) => {
    console.log("옵션 이미지 삭제");

    event.preventDefault();
    event.stopPropagation();

    if (props.OptionListIndex1 !== null) {
      const updatedOptionList = [...props.OptionList];
      updatedOptionList[props.OptionListIndex1][props.OptionListIndex1].optionImage[props.index] = null;

      props.setOptionList(updatedOptionList);
      setPreviewImages([]);
    }
  };

  // 상품 최초 등록시 미리보기
  // useEffect(() => {
  //   // if (props.isAdvertiseEdit) {
  //   //   return;
  //   // }
  //   console.log('최초 등록');

  //   const imageJSXs = uploadedImages.map((imageURL: any, index: any) => {
  //     return (
  //       <ImagePreview
  //         imageURL={imageURL}
  //         key={index}
  //       />
  //     );
  //   });

  //   setPreviewImages(imageJSXs);
  // }, [uploadedImages]);

  useEffect(() => {
    console.log("이미지 추가 및 수정시 실행");
    const imageURL = props.optionImage;
    
    if (Array.isArray(imageURL) && imageURL.length > 0) {
      console.log(props.optionImage[props.index]);
      const imageJSX = <ImagePreview imageURL={imageURL[props.index]?.url} key={props.index} />;
      setPreviewImages(imageJSX);
    }
  }, [props.OptionList]);

  return (
    <>
      <IconWrap className="IconWrap">
        <IconLabel className="IconLabel dragorclick" onDragOver={dragOverHandler} onDrop={dropHandler}>
          <IconI className="IconI">
            <span>+</span>
          </IconI>
          {previewImages}
          <IconInput type="file" multiple accept="image/*" onChange={changeHandler} />
          {Array.isArray(props.optionImage) && props.optionImage.length > 0 && (

          <DeleteBtn className="modal-close-button" optionImage={props.optionImage[props.index]?.url} onClick={ImageDelete}>
            <span className="modal-close-icon">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                <path d="M12.12,10l4.07-4.06a1.5,1.5,0,1,0-2.11-2.12L10,7.88,5.94,3.81A1.5,1.5,0,1,0,3.82,5.93L7.88,10,3.81,14.06a1.5,1.5,0,0,0,0,2.12,1.51,1.51,0,0,0,2.13,0L10,12.12l4.06,4.07a1.45,1.45,0,0,0,1.06.44,1.5,1.5,0,0,0,1.06-2.56Z"></path>
              </svg>
            </span>
          </DeleteBtn>
          )}
        </IconLabel>
        <Error>{errorMessage}</Error>
      </IconWrap>
    </>
  );
}

export default OptionImage;
