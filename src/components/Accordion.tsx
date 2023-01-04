import * as React from 'react'
import styled from "styled-components";
import "./Accordion.css";


type Props = {
  title?: string | React.ReactNode;
  className?: any | React.ReactNode;
  contents?: string | React.ReactNode;
};

function Accordion(props: Props) {
  
  const parentRef = React.useRef<HTMLDivElement>(null);
  const childRef = React.useRef<HTMLDivElement>(null);
  const [isCollapse, setIsCollapse] = React.useState(false);
  
  const handleButtonClick = React.useCallback(
    (event: any) => {
      event.stopPropagation();
      if (parentRef.current === null || childRef.current === null) {
        return;
      }
      if (parentRef.current.clientHeight > 0) {
        parentRef.current.style.height = "0";
        // console.log('접었다')
      } else {
        parentRef.current.style.height = `${childRef.current.clientHeight}px`;
        // console.log('폈다')
      }
      setIsCollapse(!isCollapse);
    },
    [isCollapse]
  );

  const parentRefHeight = parentRef.current?.style.height ?? "0px";
  const buttonArrow = parentRefHeight === "0px" ? "buttonArrow Up" : "buttonArrow Down";

  return (
    <Container>
      <Header onClick={handleButtonClick}>
        <span>
        {props.title}
        </span>
        <span className={props.className}><i className='icon-beta'></i></span>
        <Button className={buttonArrow}></Button>
      </Header>
      <ContentsWrapper ref={parentRef}>
        <Contents ref={childRef}>{props.contents}</Contents>
      </ContentsWrapper>
    </Container>
  );
}

// styled Components 라이브러리를 적용한 변수들

const Container = styled.div`
  border-radius: 4px;

  &:last-child div {
    border-bottom: 0px;
  }
`;
  
const Header = styled.div`
  position: relative;
  padding: 16px 15px 16px 5px;
  margin: 0 25px;
  font-size: 14px;
  font-weight: 500;
  border-bottom: 1px solid #515D6E;
`;

const Button = styled.div`
  font-size: 14px;
  margin: 0 32px 0 8px;
`;

const ContentsWrapper = styled.div`
  height: 0;
  overflow: hidden;
  transition: height 0.35s ease, background 0.35s ease;
`;
  
const Contents = styled.div`
  background-color: #414958;
  font-size: 13px;
  font-weight: 500;
`;

export default React.memo(Accordion);
