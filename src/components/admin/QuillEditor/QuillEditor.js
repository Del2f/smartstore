import React, { useState, useMemo } from 'react';
import ReactQuill from 'react-quill';

import 'react-quill/dist/quill.snow.css';
import './QuillEditor.css';


// Reference https://quilljs.com/docs/quickstart/
const QuillEditor = () => {

  // html_textArea
  const htmlTextArea = document.createElement('textarea');
  const attrHtmlTextArea = document.createAttribute('quill__html');
  htmlTextArea.setAttributeNode(attrHtmlTextArea);

  /**
   * html 제어
   */
  function htmlHandler() {

    const activeTextArea = (htmlTextArea.getAttribute('quill__html').indexOf('-active-') > -1);

    if (activeTextArea) {

      //html editor to quill
      this.quill.pasteHTML(htmlTextArea.value);

    } else {

      if (!this.quill.container.querySelector('.ql-custom')) {
        // textArea 삽입
        const quillCustomDiv = this.quill.addContainer('ql-custom');
        quillCustomDiv.appendChild(htmlTextArea);
      }

      //quill to html editor
      const html = this.quill.container.querySelector('.ql-editor').innerHTML;
      htmlTextArea.value = html;
    }
    
    htmlTextArea.setAttribute('quill__html', activeTextArea ? '' : '-active-');
  }

  const [value, setValue] = useState('');

  /**
   * QuillEditor 모듈 구성
   */
  const modules = useMemo(() => ({
    toolbar: {
      container: [
        [{ 'font': [] }],
        // [{ header: [1, 2, 3, false] }],                   // custom button values
        [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
        ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
        [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
        [{ list: 'ordered' }, { list: 'bullet' }, { 'align': [] }],
        ['link', 'image', 'code-block'],
        ['clean']                                         // remove formatting button
      ],
      handlers: {
        'code-block': htmlHandler
      }
    }
  }), [])

  console.log(value);

  return (
    <ReactQuill theme='snow' value={value} modules={modules} placeholder={'Write something or insert a HTML'} onChange={setValue} />
  );
}

export default QuillEditor;