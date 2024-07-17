import React, { useState, useEffect } from "react";
import Header from "./Header";
import styled from "styled-components";
import "../App.css";

const PlaygroundOccupancy = () => {
  const [occupancy, setOccupancy] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setOccupancy(Math.floor(Math.random() * 100));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Container>
      <Header></Header>
    </Container>
  );
};

export default PlaygroundOccupancy;

const Container = styled.div``;


