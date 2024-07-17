import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import set from "../../assets/rightSide.svg";
import logo from "../../assets/logo.svg";
import hamburgerIcon from "../../assets/hamburgerIcon.svg";
import locationIcon from "../../assets/locationIcon.svg";
import userIcon from "../../assets/user.svg";
import usersIcon from "../../assets/users.svg";
import userFour from "../../assets/userFour.svg";
import sendIcon from "../../assets/sendIcon.svg";

const API_URL = "http://localhost:5000/api";

const ParentDashboard = () => {
  const [message, setMessage] = useState("");
  const [returnTime, setReturnTime] = useState("");
  const [selectedChild, setSelectedChild] = useState("");
  const [messages, setMessages] = useState([]);
  const [visits, setVisits] = useState([]);
  const [time, setTime] = useState("");
  const [congestion, setCongestion] = useState(0);

  useEffect(() => {
    fetchMessages();
    fetchVisits();
    updateTime();
    const timerId = setInterval(updateTime, 60000); // 1분마다 업데이트
    return () => clearInterval(timerId); // 컴포넌트 언마운트 시 타이머 정리
  }, []);

  const fetchMessages = async () => {
    try {
      const response = await axios.get(`${API_URL}/messages`);
      setMessages(response.data);
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };

  const fetchVisits = async () => {
    try {
      const response = await axios.get(`${API_URL}/visits`);
      setVisits(response.data);
    } catch (error) {
      console.error("Error fetching visits:", error);
    }
  };

  const sendMessage = async () => {
    try {
      await axios.post(`${API_URL}/messages`, {
        childName: selectedChild,
        content: message,
      });
      setMessage("");
      fetchMessages();
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  const setPlaygroundVisit = async () => {
    try {
      await axios.post(`${API_URL}/visits`, {
        childName: selectedChild,
        returnTime: new Date(returnTime),
      });
      setSelectedChild("");
      setReturnTime("");
      fetchVisits();
    } catch (error) {
      console.error("Error setting visit:", error);
    }
  };

  const updateTime = () => {
    const now = new Date();
    const hours = now.getHours() % 12 || 12;
    const minutes = now.getMinutes().toString().padStart(2, "0");
    const formattedTime = `${hours}:${minutes}`;
    setTime(formattedTime);
  };

  const getConfusionColor = (value) => {
    if (value >= 5) return "#0095FF";
    if (value >= 3 && value < 5) return "grey";
    return "grey";
  };

  const getNormalColor = (value) => {
    if (value >= 5) return "grey";
    if (value >= 3 && value < 5) return "#0095FF";
    return "grey";
  };

  const getLazyColor = (value) => {
    if (value >= 5) return "grey";
    if (value >= 3 && value < 5) return "grey";
    return "#0095FF";
  };

  return (
          <Container>
        <PhoneContainer>
          <TimeContainer>
            <TimeText>{time}</TimeText>
            <Battery src={set}></Battery>
          </TimeContainer>
          <Bar>
            <LogoImg src={logo}></LogoImg>
            <Hamburger src={hamburgerIcon}></Hamburger>
          </Bar>
          <ContentContainer>
            <LocationContainer>
              <LocationIcon src={locationIcon}></LocationIcon>
              <LocationText>
                <LocationName>창민의 위치</LocationName>
                <Location>숲속 놀이터</Location>
              </LocationText>
            </LocationContainer>
            <Title>현재 위치의 놀이터 CCTV</Title>
            <Card className="mb-4">
              <CardHeader>
                <SmallTitle>CCTV 영상</SmallTitle>
              </CardHeader>
              <CardContent>
                <Video>영상 올거임</Video>
              </CardContent>
            </Card>
            <Card className="mb-4">
              <CardHeader>
                <SmallTitle>아이에게 메시지 보내기</SmallTitle>
              </CardHeader>
              <CardContent>
                <MessageContainer>
                  <InputContainer>
                    <Input
                      type="text"
                      value={selectedChild}
                      onChange={(e) => setSelectedChild(e.target.value)}
                      placeholder="아이의 이름"
                    />
                    <Input
                      type="text"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="메시지 내용을 적어주세요"
                    />
                  </InputContainer>
                  <Button onClick={sendMessage}>
                    <SendIcon src={sendIcon}></SendIcon>
                  </Button>
                </MessageContainer>
                <div className="mt-4">
                  <h3 className="font-bold">Recent Messages:</h3>
                  <ul>
                    {messages.slice(0, 5).map((msg, index) => (
                      <li key={index}>
                        {msg.childName}: {msg.content}
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
            <Card className="mb-4">
              <CardHeader>
                <SmallTitle>놀이터 혼잡률</SmallTitle>
              </CardHeader>
              <CardContent>
                <Congestion>
                  <CongestionContainer>
                    <CongestionIcon src={userIcon}></CongestionIcon>
                    <CongestionText color={getLazyColor(congestion)}>
                      한산
                    </CongestionText>
                  </CongestionContainer>
                  <CongestionContainer>
                    <CongestionIcon src={usersIcon}></CongestionIcon>
                    <CongestionText color={getNormalColor(congestion)}>
                      보통
                    </CongestionText>
                  </CongestionContainer>
                  <CongestionContainer>
                    <CongestionIcon src={userFour}></CongestionIcon>
                    <CongestionText color={getConfusionColor(congestion)}>
                      혼잡
                    </CongestionText>
                  </CongestionContainer>
                </Congestion>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <SmallTitle>Set Playground Return Time</SmallTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col space-y-2">
                  <Input
                    type="text"
                    value={selectedChild}
                    onChange={(e) => setSelectedChild(e.target.value)}
                    placeholder="Child's name"
                  />
                  <Input
                    type="datetime-local"
                    value={returnTime}
                    onChange={(e) => setReturnTime(e.target.value)}
                  />
                  <Button onClick={setPlaygroundVisit}>Set Visit</Button>
                </div>
                <div className="mt-4">
                  <h3 className="font-bold">Scheduled Visits:</h3>
                  <ul>
                    {visits.map((visit, index) => (
                      <li key={index}>
                        {visit.childName}:{" "}
                        {new Date(visit.returnTime).toLocaleString()}
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          </ContentContainer>
        </PhoneContainer>
      </Container>
      );
};

export default ParentDashboard;

const Container = styled.div`
  position: relative;
  height: 90%;
  top: -10px;
  padding: 16px 18px;
  overflow: auto;
  border-radius: 41px;
`;

const PhoneContainer = styled.div``;

const TimeContainer = styled.div`
  padding: 16px 16px 0px 32px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const TimeText = styled.div`
  font-size: 14px;
  font-weight: 600;
`;

const Battery = styled.img`
  width: 60px;
`;

const Bar = styled.div`
  padding: 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const LogoImg = styled.img`
  width: 80px;
`;

const Hamburger = styled.img`
  width: 20px;
`;

const ContentContainer = styled.div`
  padding: 16px;
  width: 100%;
  background: #f1f3f8;
`;

const LocationContainer = styled.div`
  display: flex;
`;

const LocationIcon = styled.img`
  width: 24px;
  margin-right: 8px;
`;

const LocationText = styled.div`
  display: flex;
  flex-direction: column;
`;

const LocationName = styled.div`
  color: #8a8a8a;
  font-size: 12px;
`;

const Location = styled.div`
  font-size: 14px;
`;

const Title = styled.div`
  font-size: 18px;
  font-weight: 500;
  padding: 12px 0px;
`;

const Video = styled.video`
  width: 100%;
  height: 200px;
  object-fit: cover;
`;

const Card = styled.div`
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  width: 100%;
  margin-bottom: 16px;
`;

const CardHeader = styled.div`
  padding: 0px 16px;
  border-bottom: 1px solid #eaeaea;
`;

const SmallTitle = styled.h2`
  font-size: 12px;
  padding: 12px 0px;
  font-weight: 500;
`;

const CardContent = styled.div`
  padding: 16px;
`;

const MessageContainer = styled.div`
  display: flex;
  gap: 5px;
  justify-content: center;
`;

const InputContainer = styled.div`
  display: flex;
  gap: 5px;
  width: 100%;
  flex-direction: column;
`;

const Input = styled.input`
  width: 100%;
  padding: 8px;
  border: 1px solid #eaeaea;
  border-radius: 4px;
  width: 100%;
`;

const Button = styled.button`
  padding: 8px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;

const SendIcon = styled.img`
  width: 16px;
`;

const Congestion = styled.div`
  display: flex;
  gap: 5px;
  justify-content: space-between;
`;

const CongestionContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const CongestionIcon = styled.img`
  width: 24px;
`;

const CongestionText = styled.div`
  color: ${(props) => props.color};
  font-weight: 400;
  font-size: 8px;
`;
