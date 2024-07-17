import React, { useState } from "react";
import styled from "styled-components";
import "../App.css";
import rightSide from "../assets/rightSide.svg";

const Header = () => {
  const time = new Date().toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <Container>
      <Time>{time}</Time>
      <RightSide src={rightSide}></RightSide>
    </Container>
  );
};

export default Header;

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 10px 20px;
`;

const Time = styled.div`
  font-weight: 500;
`;

const RightSide = styled.img``;
