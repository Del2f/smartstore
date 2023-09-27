import axios from "../../api/axios";
import ReactQuill, { Quill } from "react-quill";
import { useEffect, useState, useRef, useMemo } from "react";
import ColorPicker, { useColorPicker } from "react-best-gradient-color-picker";

import * as QuillTableUI from "quill-table-ui";
import "react-quill/dist/quill.snow.css";
import "./Editor.scss";
// import { Table } from "react-bootstrap-icons";

type Props = {
  EditorValue?: any;
  setEditorValue?: any;
  container: any;
};

function Editor(props: any) {
  const [color, setColor] = useState("black");
  const { setSolid, setGradient, isGradient } = useColorPicker(color, setColor);
  const [showColorPicker, setShowColorPicker] = useState(false);
  const quillRef = useRef<ReactQuill>(null);

  console.log(color);
  // console.log(props.EditorValue);
  // console.log(isGradient);

  const htmlTextArea = document.createElement('textarea');
  const attrHtmlTextArea = document.createAttribute('quill__html');
  htmlTextArea.setAttributeNode(attrHtmlTextArea);

  const Parchment = Quill.import("parchment");
  const GradientBackground = new Parchment.Attributor.Style("gradient", "background", {
    scope: Parchment.Scope.INLINE,
  });

  const BackgroundClip = new Parchment.Attributor.Style("backclip", "-webkit-background-clip", {
    scope: Parchment.Scope.INLINE,
  });

  // Quill.register({
  //   'modules/tableUI': QuillTableUI
  // }, true)

  Quill.register(GradientBackground, true);
  Quill.register(BackgroundClip, true);


  const handleEditorChange = (html: any) => {
    props.setEditorValue(html);
  };

  const Size = Quill.import("formats/size");
  Size.whitelist = [
    "extra-small",
    "small",
    "medium",
    "large",
    "10px",
    "15px",
    "20px",
    "25px",
    "30px",
    "35px",
    "40px",
    "45px",
    "50px",
    "55px",
    "60px",
    "65px",
    "70px",
  ];
  Quill.register(Size, true);

  const Font = Quill.import("formats/font");
  Font.whitelist = [
    "Pretendard-100",
    "Pretendard-200",
    "Pretendard-300",
    "Pretendard-400",
    "Pretendard-500",
    "Pretendard-600",
    "Pretendard-700",
    "Pretendard-800",
    "Pretendard-900",
  ];
  Quill.register(Font, true);

  const imageicon = `
  <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="20" width="20" xmlns="http://www.w3.org/2000/svg">
    <path fill="none" d="M0 0h24v24H0z"></path>
    <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z"></path></svg>
  `;

  const videoIcon = `
  <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="20" width="20" xmlns="http://www.w3.org/2000/svg"><path fill="none" d="M0 0h24v24H0z"></path><path d="M4 6H2v14c0 1.1.9 2 2 2h14v-2H4V6zm16-4H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-8 12.5v-9l6 4.5-6 4.5z"></path></svg>
  `;

  const customIcons = Quill.import("ui/icons");
  customIcons["image"] = imageicon;
  customIcons["video"] = videoIcon;

  // 이미지 추가 핸들러
  const imageHandler = () => {
    // console.log("imageHandler");
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();
    if (input)
      input.addEventListener("change", async (e: any) => {
        // const file = input.files[0];
        const file = input.files ? input.files[0] : null;
        // console.log(file);
        const formData = new FormData();
        if (file) formData.append("quillImg", file);
        try {
          const res = await axios.post("/smartstore/home/productregister/img3", formData);
          // console.log(res.data.location);

          const imgUrl = res.data.location;
          if (quillRef.current) {
            const editor = quillRef.current.getEditor();
            const range = editor.getSelection();
            if (range) {
              editor.insertEmbed(range.index, "image", imgUrl);
            }
          }
        } catch (error) {
          console.log(error);
        }
      });
  };

  // 파레트 열기
  const toggleColorPicker = () => {
    setShowColorPicker(!showColorPicker);
  };

  // 파레트 색상 변경
  const ColorChange = (color: string) => {
    setColor(color);
  };

  // 파레트 색상 적용
  const ColorApply = () => {
    if (quillRef.current) {
      const editor = quillRef.current.getEditor();
      const range = editor.getSelection();

      if (range) {
        if (quillRef.current) {
          const quill = quillRef.current.getEditor();
          if (isGradient) {
            quill.format("gradient", color);
            quill.format("backclip", "text");
            quill.format("color", "transparent");
          } else {
            quill.format("color", color);
          }
        }
      }
    }
  };

  const modules = useMemo(() => {
    return {
      toolbar: {
        container: "#toolbar",
        handlers: {
          image: imageHandler,
          // 'code-block': htmlHandler,
        },
      },
      };
  }, []);

  const formats = [
    "header",
    "font",
    "size",
    "bold",
    "italic",
    "underline",
    "align",
    "strike",
    "script",
    "blockquote",
    "background",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
    "color",
    "code-block",
    "gradient",
    "backclip",
  ];

  return (
    <>
      {showColorPicker && <ColorPicker value={color} onChange={ColorChange} />}
      <button onClick={toggleColorPicker}>파레트</button>
      <button onClick={ColorApply}>적용</button>
      {/* <button onClick={TableApply}>Table</button> */}
      <div id="toolbar">
        <span className="ql-formats">
          <select className="ql-font" defaultValue="Pretendard-100">
            <option value="Pretendard-100">Pretendard 100</option>
            <option value="Pretendard-200">Pretendard 200</option>
            <option value="Pretendard-300">Pretendard 300</option>
            <option value="Pretendard-400">Pretendard 400</option>
            <option value="Pretendard-500">Pretendard 500</option>
            <option value="Pretendard-600">Pretendard 600</option>
            <option value="Pretendard-700">Pretendard 700</option>
            <option value="Pretendard-800">Pretendard 800</option>
            <option value="Pretendard-900">Pretendard 900</option>
          </select>
          <select className="ql-size" defaultValue="medium">
            <option value="extra-small">Size 1</option>
            <option value="small">Size 2</option>
            <option value="medium">Size 3</option>
            <option value="large">Size 4</option>
            <option value="10px">10px</option>
            <option value="15px">15px</option>
            <option value="20px">20px</option>
            <option value="25px">25px</option>
            <option value="30px">30px</option>
            <option value="35px">35px</option>
            <option value="40px">40px</option>
            <option value="45px">45px</option>
            <option value="50px">50px</option>
            <option value="55px">55px</option>
            <option value="60px">60px</option>
            <option value="65px">65px</option>
            <option value="70px">70px</option>
          </select>
          <select className="ql-header" defaultValue="3">
            <option value="1">Heading</option>
            <option value="2">Subheading</option>
            <option value="3">Normal</option>
          </select>
        </span>
        <span className="ql-formats">
          <button className="ql-bold" />
          <button className="ql-italic" />
          <button className="ql-underline" />
          <button className="ql-strike" />
        </span>
        <span className="ql-formats">
          <button className="ql-list" value="ordered" />
          <button className="ql-list" value="bullet" />
          <button className="ql-indent" value="-1" />
          <button className="ql-indent" value="+1" />
        </span>
        <span className="ql-formats">
          <button className="ql-script" value="super" />
          <button className="ql-script" value="sub" />
          <button className="ql-blockquote" />
          <button className="ql-direction" />
        </span>
        <span className="ql-formats">
          <select className="ql-align" />
          <select className="ql-color" defaultValue="#000000">
            <option value="red"></option>
            <option value="blue"></option>
            <option value={color} style={{ background: "red" }}></option>
          </select>
          <select className="ql-background" />
        </span>
        <span className="ql-formats">
          <button className="ql-link" />
          <button className="ql-image" value="image" type="button" />
          <button className="ql-video" value="video" />
        </span>
        <span className="ql-formats">
          <button className="ql-formula" />
          <button className="ql-code-block" />
          <button className="ql-clean" />
        </span>
        <span className="ql-formats">
          <button className="ql-undo">{/* <CustomUndo /> */}</button>
          <button className="ql-redo">{/* <CustomRedo /> */}</button>
        </span>
      </div>
      <ReactQuill
        style={{ height: "800px", margin: "4px 0" }}
        ref={quillRef}
        theme="snow"
        value={props.EditorValue}
        placeholder="내용을 입력하세요."
        modules={modules}
        formats={formats}
        onChange={handleEditorChange}
      />
    </>
  );
}

export default Editor;

// const CustomUndo = () => (
//   <svg viewBox="0 0 18 18">
//     <polygon className="ql-fill ql-stroke" points="6 10 4 12 2 10 6 10" />
//     <path className="ql-stroke" d="M8.09,13.91A4.6,4.6,0,0,0,9,14,5,5,0,1,0,4,9" />
//   </svg>
// );

// const CustomRedo = () => (
//   <svg viewBox="0 0 18 18">
//     <polygon className="ql-fill ql-stroke" points="12 10 14 12 16 10 12 10" />
//     <path className="ql-stroke" d="M9.91,13.91A4.6,4.6,0,0,1,9,14a5,5,0,1,1,5-5" />
//   </svg>
// );
