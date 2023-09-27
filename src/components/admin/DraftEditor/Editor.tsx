import axios from "../../../api/axios";
import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';

import { Editor } from 'react-draft-wysiwyg';
import { EditorState, RichUtils, Modifier } from 'draft-js';
import { convertToHTML } from 'draft-convert';
import ColorPicker, { useColorPicker } from 'react-best-gradient-color-picker';

import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import "./Editor.scss";


const MyBlock = styled.div`
     .wrapper-class{
         margin: 0 auto;
         margin-bottom: 4rem;
     }
   .editor {
     height: 500px !important;
     border: 1px solid #f1f1f1 !important;
     padding: 5px !important;
     border-radius: 2px !important;
   }
 `;

type Props = {
  EditorValue?: any;
  setEditorValue?: any;
};

const TestEditorForm = (props: Props) => {

  //useState로 상태관리하기 초기값은 EditorState.createEmpty()
  //EditorState의 비어있는 ContentState 기본 구성으로 새 개체를 반환 => 이렇게 안하면 상태 값을 나중에 변경할 수 없음.

  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [color, setColor] = useState('red');
  const [showColorPicker, setShowColorPicker] = useState(false);

  const { setSolid, setGradient, isGradient } = useColorPicker(color, setColor);

  // const [convertedContent, setConvertedContent] = useState("");

  useEffect(() => {

  }, [props.EditorValue]);

  const onEditorStateChange = (editorState: any) => {
    setEditorState(editorState);
    let html = convertToHTML(editorState.getCurrentContent());
    props.setEditorValue(html);
  };

  const handleKeyCommand = (command: any) => {
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      setEditorState(newState);
      return 'handled';
    }
    return 'not-handled';
  };

  const customStyleMap = {
    GRADIENT: {
      background: color,
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
    },
    COLOR: {
      background: "none",
      color: color,
    },
  };

  const toggleColorPicker = () => {
    setShowColorPicker(!showColorPicker);
  };

  const applyColor = (color: string) => {
    setColor(color);
    if (isGradient) {
      setEditorState(RichUtils.toggleInlineStyle(editorState, 'GRADIENT'));
    } else {
      const contentState = editorState.getCurrentContent();
      const selection = editorState.getSelection();
      const newContentState = Modifier.applyInlineStyle(contentState, selection, 'COLOR');
      const newEditorState = EditorState.push(editorState, newContentState, 'change-inline-style');
      setEditorState(newEditorState);
    }
  };

  const imageHandler = (file: Blob) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onloadend = async () => {
        const formData = new FormData();
        formData.append("Image", file);
        const res = await axios.post("/smartstore/home/productregister/img3", formData);

        resolve({ data: { link: res.data.location } });
      };

      reader.readAsDataURL(file);
    });
  };


  const handleFontFamilyChange = (fontFamily: any) => {
    const currentContent = editorState.getCurrentContent();
    const selection = editorState.getSelection();

    const contentWithFontFamily = Modifier.applyInlineStyle(
      currentContent,
      selection,
      fontFamily
    );

    console.log(fontFamily);

    const newEditorState = EditorState.push(
      editorState,
      contentWithFontFamily,
      'change-inline-style'
    );

    setEditorState(newEditorState);
  };

  return (
    <MyBlock>
      {/* <ColorPicker value={color} onChange={setColor}  /> */}
      {showColorPicker && <ColorPicker value={color} onChange={applyColor} />}
      <button onClick={toggleColorPicker}>파레트</button>
      <Editor
        wrapperClassName="wrapper-class"  // 에디터와 툴바 모두에 적용되는 클래스
        editorClassName="editor"  // 에디터 주변에 적용된 클래스
        toolbarClassName="toolbar-class"  // 툴바 주위에 적용된 클래스
        toolbar={{
          options: ['fontFamily', 'inline', 'blockType', 'list', 'textAlign', 'colorPicker', 'link', 'embedded', 'emoji', 'image', 'remove', 'history'],
          list: { inDropdown: true },
          textAlign: { inDropdown: true },
          link: { inDropdown: true },
          history: { inDropdown: false },
          fontFamily: {
            options: ['Pretendard', 'Pretendard-200',],
            className: undefined,
            component: undefined,
            dropdownClassName: undefined,
          },
          image: {
            uploadCallback: imageHandler,
            previewImage: true,
            alt: { present: true, mandatory: false },
          },
        }}
        placeholder="내용을 작성해주세요."
        localization={{ locale: 'ko', }}
        editorState={editorState}
        onEditorStateChange={onEditorStateChange}  //에디터의 값이 변경될 때마다 onEditorStateChange 호출
        handleKeyCommand={handleKeyCommand}
        customStyleMap={customStyleMap}

      />
    </MyBlock>
  );
};

export default TestEditorForm;