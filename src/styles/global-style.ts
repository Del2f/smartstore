// global-style.ts
import { createGlobalStyle } from "styled-components";
import { reset } from "styled-reset";

const GlobalStyles = createGlobalStyle`
    ${reset}

    * {
        // home
        --btn-color: var(--black-color);
        --btn-blue-color: var(--blue-color);
        --input-border-blue-color: var(--blue-color);
        --input-border-radius: 15px;
        --btn-border-radius: 15px;

        // home/category
        --input-border-color: #86868b;
        
        --white-color: white;
        --black-color: rgba(0, 0, 0, 0.8); // 자주 사용하는 블랙 컬러.
        --black2-color: #1d1d1f; // 자주 사용하는 블랙2 컬러.
        --blue-color: #0071e3; // 자주 사용하는 블루 컬러.
        --gray-color: #f5f5f7; // 자주 사용하는 그레이 컬러

        // shop
        box-sizing: border-box; 
    }
    
    body {
        font-size: 17px;
        font-weight: 400;
        font-family: 'Pretendard';
    }

    a {
        text-decoration: none;
    }

    li {
        list-style: none;
    }

    ul {
        list-style: none;
        padding: 0px;
        margin: 0px;
    }
`;

export default GlobalStyles;
