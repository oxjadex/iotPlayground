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
  height: 100vh;
  background-color: #ffffff;
`;

const PhoneMockupContainer = styled.div`
  width: 360px;
  height: 735px;
  background: url(${PhoneMockup}) 50%/ 100% no-repeat;
  overflow: hidden;
`;
