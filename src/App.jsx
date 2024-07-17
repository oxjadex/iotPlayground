import React from "react";
import "./App.css";
import Parent from "./components/Parent/Parent";
import PhoneMockup from "./assets/mockup.png";
import styled from "styled-components";

const App = () => {
  return (
    <Container>
      <PhoneMockupContainer>
        <Parent></Parent>
      </PhoneMockupContainer>
    </Container>
  );
};

export default App;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh; /* 전체 뷰포트 높이를 차지 */
  background-color: #ffffff; /* 배경색 설정 (필요에 따라 변경) */
`;

const PhoneMockupContainer = styled.div`
  width: 360px;
  height: 735px;
  background: url(${PhoneMockup}) 50%/ 100% no-repeat;
`;
