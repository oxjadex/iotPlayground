import React from "react";
import "./App.css";
import Parent from "./components/Parent/Parent";
import Child from "./components/Child/Child";
import PhoneMockup from "./assets/mockup.png";
import ApplewatchMockup from "./assets/ApplewatchMockup.png";

import styled from "styled-components";

const App = () => {
  return (
    <Container>
      <PhoneMockupContainer>
        <Parent></Parent>
      </PhoneMockupContainer>
      <Child></Child>
    </Container>
  );
};

export default App;

const Container = styled.div`
  display: flex;
  justify-content: center;
  gap: 200px;
  align-items: center;
  height: 100vh;
  background-color: #ffffff;
  z-index:-2;
`;

const PhoneMockupContainer = styled.div`
  width: 360px;
  height: 735px;
  background: url(${PhoneMockup}) 50%/ 100% no-repeat;
  overflow: hidden;
  z-index: 1;
`;

const AppleWatchMockupContainer = styled.div`
  width: 184px;
  height: 224px;
  background: url(${ApplewatchMockup}) 50%/ 100% no-repeat;
  overflow: hidden;
`;
