import { useRef, useState } from 'react'
import styled from "styled-components";

type Props = {
  title?: string | React.ReactNode;
  className?: any | React.ReactNode;
  contents?: string | React.ReactNode;
};

function Accordion(props: Props) {
  
  const parentRef = useRef<HTMLUListElement>(null);
  const childRef = useRef<HTMLLIElement>(null);
  const [isCollapse, setIsCollapse] = useState(false);

  // const parentRefHeight = parentRef.current?.style.height ?? "0px";
  const buttonArrow = isCollapse ? "buttonArrow Down" : "buttonArrow Up";
  
  const handleButtonClick = ((e: any) => {
      e.stopPropagation();
      
      if (parentRef.current === null || childRef.current === null) {
        return
      }

      if (parentRef.current.clientHeight > 0) {
        parentRef.current.style.height = "0px";
      } else {
        parentRef.current.style.height = `${childRef.current.clientHeight}px`;
      }

      setIsCollapse(!isCollapse);
    }
  );

  return (
    <Container className='admin-leftMenu-Container'>
      <Header onClick={handleButtonClick}>
        <span>
        {props.title}
        </span>
        <span className={props.className}><i className='icon-beta'></i></span>
        <Button className={buttonArrow}></Button>
      </Header>
      <ul className='ContentsWrapper' ref={parentRef}>
        <li className='Contents' ref={childRef}>{props.contents}</li>
      </ul>
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
  

export default Accordion;
