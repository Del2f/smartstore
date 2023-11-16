import styled from "styled-components";

const NotFoundWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 900px;
`;

const NotFoundBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const NotFound_h1 = styled.h1`
  font-size: 40px;
  font-weight: 900;
  margin-right: 10px;
`;

const DescWrap = styled.div`
  font-size: 40px;
  font-weight: 900;
`;

const DescText = styled.span`
  font-size: 40px;
  font-weight: 700;
  margin-right: 10px;
  color: #838383;
`;

function Notfound() {
  return (
    <>
      <NotFoundWrap className="not-found-wrap">
        <NotFoundBox className="not-found-box">
          <NotFound_h1>NOT FOUND</NotFound_h1>
          <DescWrap className="desc-wrap">
            <DescText>잘못된 페이지 이므로 뒤로가기를 해주세요. </DescText>
          </DescWrap>
        </NotFoundBox>
      </NotFoundWrap>
    </>
  );
}

export default Notfound;
