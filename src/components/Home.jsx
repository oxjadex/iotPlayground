import React, { useState } from "react";
import styled from "styled-components";
import "../App.css";
import Header from "./Header";
import color from "../styles/color";
import locationIcon from "../assets/location.svg";
import arrowBottom from "../assets/arrowBottom.svg";

const Home = () => {
  const [message, setMessage] = useState("");

  const sendMessage = () => {
    console.log("Sending message:", message);
    setMessage("");
  };

  const name = "이름";
  const location = "숲속의 놀이터";

  return (
    <Container>
      <Header></Header>
      <LocationContainer>
        <LocationIcon src={locationIcon}></LocationIcon>
        <TextContainer>
          <NameLocation>{name}의 위치</NameLocation>
          <Location>
            {location}
            <ArrowBottomIcon src={arrowBottom}></ArrowBottomIcon>
          </Location>
        </TextContainer>
      </LocationContainer>
      <VideoContainer>
        <Title>현재 위치의 놀이터 CCTV</Title>
        <CctvVideo>
          <Video>
            <VideoImg src={arrowBottom}></VideoImg>
          </Video>
        </CctvVideo>
        <SendMessageContainer>
          <SendMessageText>{name}님에게 연락하기</SendMessageText>
          <InputContainer>
            <Input
              type="text"
              placeholder="메시지를 입력해주세요"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <Button onClick={sendMessage}>전송</Button>
          </InputContainer>
        </SendMessageContainer>
      </VideoContainer>
    </Container>
  );
};

export default Home;

const Container = styled.div``;

const LocationContainer = styled.div`
  display: flex;
  padding: 10px 20px;
  gap: 10px;
`;

const TextContainer = styled.div`
  display: flex;
  gap: 2px;
  flex-direction: column;
`;

const LocationIcon = styled.img``;

const NameLocation = styled.div`
  font-size: 10px;
  color: ${color.gray};
`;

const Location = styled.div`
  font-size: 12px;
`;
const ArrowBottomIcon = styled.img``;

const VideoContainer = styled.div`
  padding: 0px 20px;
`;

const Title = styled.div`
  font-size: 18px;
`;

const CctvVideo = styled.div``;

const Video = styled.div``;

const VideoImg = styled.img``;

const SendMessageContainer = styled.div`
  display: flex;
  gap: 5px;
  flex-direction: column;
`;

const SendMessageText = styled.div`
  font-size: 16px;
`;

const InputContainer = styled.div`
  display: flex;
  gap: 5px;
`;

const Input = styled.input`
  border: 1px solid ${color.primary};
  border-radius: 4px;
  padding: 6px;
`;

const Button = styled.button`
  border: none;
  background-color: ${color.primary};
  padding: 5px 8px;
  border-radius: 4px;
  color: white;
`;
