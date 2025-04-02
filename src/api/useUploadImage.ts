import { useState } from "react";
import axios from "axios";

const useUploadImage = (
  setUploadedImages: (images: string[]) => void,
  setMainImage: (images: string[]) => void,
  setIsImage: (state: boolean) => void
) => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const validFileTypes = ["image/jpeg", "image/png", "image/webp", "image/svg+xml"];


  const handleFiles = async (files: FileList | null) => {
    if (!files || files.length === 0) return;

    const file = files[0];
    if (!validFileTypes.includes(file.type)) {
      setErrorMessage("이미지 파일을 업로드 해주세요.");
      return;
    }

    setErrorMessage(null);
    const formData = new FormData();
    formData.append("file", file);

    try {
      console.log("파일 업로드 요청:", file.name);
      const response = await axios.post(
        process.env.REACT_APP_UPLOAD_URL || "http://del2f.sytes.net:20001/upload",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      console.log("업로드 성공:", response.data);

      const uploadedUrl = response.data.url;
      setUploadedImages([uploadedUrl]);
      setMainImage([uploadedUrl]);
      setIsImage(true);
      setErrorMessage("");

    } catch (error) {
      console.error("업로드 실패:", error);
      setErrorMessage("파일 업로드 중 오류 발생");
    }
  };

  return { handleFiles, errorMessage };
};

export default useUploadImage;
