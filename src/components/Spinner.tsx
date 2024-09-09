import styled, { keyframes } from 'styled-components';

const rotate = keyframes`
  0% {
    opacity: 0.5;
  }
  100% {
    opacity: 1;
  }
`;

const SpinnerWrap = styled.div`
  position: absolute;
  width: 0;
  z-index: 2000000000;
  left: 50%;
  top: 50%;
`;

const SpinnerBar = styled.div`
  position: absolute;
  top: -1px;
  opacity: 0.25;
  animation: ${rotate} 1s linear infinite;
  width: 7.25px;
  height: 2.25px;
  background: rgb(73, 73, 73);
  box-shadow: rgba(0, 0, 0, 0.1) 0px 0px 1px;
  transform-origin: left center;
  border-radius: 1px;
`;

const Spinner = () => {
  const bars = Array.from({ length: 12 }).map((_, i) => (
    <SpinnerBar
      key={i}
      style={{
        transform: `rotate(${i * 30}deg) translate(6.25px, 0px)`,
        animationDelay: `${i * 0.083}s`,
      }}
    />
  ));
  return (
    <SpinnerWrap>
      {bars}
    </SpinnerWrap>
  );
};

export default Spinner;