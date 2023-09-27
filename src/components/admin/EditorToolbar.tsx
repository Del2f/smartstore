import React from "react";

import { Quill } from "react-quill";
import "./Editor";

// Custom Undo button icon component for Quill editor. You can import it directly
// from 'quill/assets/icons/undo.svg' but I found that a number of loaders do not
// handle them correctly
const CustomUndo = () => (
  <svg viewBox="0 0 18 18">
    <polygon className="ql-fill ql-stroke" points="6 10 4 12 2 10 6 10" />
    <path className="ql-stroke" d="M8.09,13.91A4.6,4.6,0,0,0,9,14,5,5,0,1,0,4,9" />
  </svg>
);

// Redo button icon component for Quill editor
const CustomRedo = () => (
  <svg viewBox="0 0 18 18">
    <polygon className="ql-fill ql-stroke" points="12 10 14 12 16 10 12 10" />
    <path className="ql-stroke" d="M9.91,13.91A4.6,4.6,0,0,1,9,14a5,5,0,1,1,5-5" />
  </svg>
);

// Add sizes to whitelist and register them
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

// Add fonts to whitelist and register them
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

// Formats objects for setting up the Quill editor
export const formats = [
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
  "code-block"
];

// Modules object for setting up the Quill editor
export const modules = {
  toolbar: {
    container: "#toolbar",
    handlers: {
      // undo: quill.history.undo(),
      // redo: quill.history.redo(),
    },
  },
  history: {
    delay: 500,
    maxStack: 100,
    userOnly: true,
  },
};


export const EditorToolbar = () => (
  <>
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
        <select className="ql-color" />
        <select className="ql-background" />
      </span>
      <span className="ql-formats">
        <button className="ql-link" />
        <button className="ql-image" />
        <button className="ql-video" />
      </span>
      <span className="ql-formats">
        <button className="ql-formula" />
        <button className="ql-code-block" />
        <button className="ql-clean" />
      </span>
      <span className="ql-formats">
        <button className="ql-undo">
          <CustomUndo />
        </button>
        <button className="ql-redo">
          <CustomRedo />
        </button>
      </span>
      <span className="ql-formats">
        <button id="insert-table">Insert Table</button>
      </span>
    </div>
  </>
);

export default EditorToolbar;
