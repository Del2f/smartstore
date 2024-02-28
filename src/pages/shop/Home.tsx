import styled from "styled-components";
import { Link } from "react-router-dom";

import "./Home.scss";

import mainImg from "@img/shop/hero_wwdc23_apple__f6s4xvm9mk2u_largetall.jpg";
import mainText from "@img/shop/hero_logo_wwdc23__bgfcj40dxkpe_largetall.png";

const HomeWrap = styled.div`
  
`;

const LineMiddle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: auto;
  margin-left: auto;
  font-size: 13.5px;
  padding: 12px 0;
  background-color: white;
  color: #1d1d1f;
  
   & > span {
    font-weight: 400;
    text-align: center;
    display: inline-block;
    line-height: 20px;

    & > sup {
      font-weight: 400;
      top: -0.5em;
      position: relative;
      font-size: 0.6em;
      vertical-align: baseline;
    }
  }

  a {
    margin-top: 5px;

    font-weight: 400;
    color: #06c;
    white-space: nowrap;
  }

  a::after {
    font-family: "SF Pro Icons";
    color: inherit;
    display: inline-block;
    font-style: normal;
    font-weight: inherit;
    font-size: inherit;
    line-height: 1;
    text-decoration: underline;
    position: relative;
    content: "";
    text-decoration: none;
    top: -0.08em;
    padding-left: 0.3em;
  }

  @media only screen and (max-width: 834px) {
    & {
      flex-direction: column;
      max-width: 700px;
    }

    & > span {
    }

    & > a {
      /* display: block; */
    }
  }

  @media only screen and (max-width: 734px) {
    & {
      flex-direction: column;
      max-width: 300px;
    }

    & > span {
    }
  }
`;

const HomeImgWrap = styled.div`
  position: relative;
  overflow: hidden;
  width: 100%;
  height: 692px;

  & > img {
    position: absolute;
    left: calc(50% + 0px);
    right: 0px;
    bottom: 0px;
    width: 3008px;
    height: 736px;
    background-size: 3008px 736px;
    background-image: url(${mainImg});
    background-repeat: no-repeat;
    transform: translatex(-50%);
    z-index: -1;
  }
`;

const TextWrap = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  padding: 55px 0;
  position: relative;
`;
const MainText = styled.h2`
  display: block;
  width: 100%;
  height: 53px;
  text-align: center;
  margin-left: auto;
  margin-right: auto;
  background-size: 292px 53px;
  background-image: url(${mainText});
  background-repeat: no-repeat;
  background-position: center;
`;
const MiddleText = styled.p`
  font-size: 25px;
  font-weight: 500;
  margin-top: 10px;
  line-height: 1.1;
  color: white;
`;

const LinkWrap = styled.div`
  margin-top: 10px;

  & > a {
    color: #2997ff;
    font-size: 20px;
    font-weight: 400;
  }
`;

function Home() {
  return (
    <>
      <HomeWrap className="HomeWrap">
        <LineMiddle className="LineMiddle">
          <span>
            교육 할인가로 Mac 또는 iPad를 더욱 부담 없이. 여기에 Mac 구입 시 AirPods을, iPad 구입 시<br></br> Apple Pencil을 받을 수 있습니다.**&nbsp;
            <Link to={""} className="link">
              지금 쇼핑하기
            </Link>
          </span>
        </LineMiddle>
        <HomeImgWrap className="HomeImgWrap">
          <TextWrap className="TextWrap">
            <MainText></MainText>
            <MiddleText>한국 시간 6월 6일 새벽 2시, 온라인 생중계.</MiddleText>
            <MiddleText>촬영: 앤드류 주커만</MiddleText>
            <LinkWrap>
              <Link to={""}>더 알아보기</Link>
            </LinkWrap>
          </TextWrap>
          <img />
        </HomeImgWrap>
      </HomeWrap>
    </>
  );
}

export default Home;
