import React, { useState, useEffect } from "react";
import axios from "axios";
import { Users } from "lucide-react";
import styled from "styled-components";
import set from "../../assets/rightSide.svg";
import logo from "../../assets/logo.svg";
import hamburgerIcon from "../../assets/hamburgerIcon.svg";
import locationIcon from "../../assets/locationIcon.svg";

const API_URL = "http://localhost:5000/api";

const ParentDashboard = () => {
  const [message, setMessage] = useState("");
  const [returnTime, setReturnTime] = useState("");
  const [selectedChild, setSelectedChild] = useState("");
  const [messages, setMessages] = useState([]);
  const [visits, setVisits] = useState([]);
  const [time, setTime] = useState("");
  const [name, setName] = useState("");
  const [location, setLocation] = useState;

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
              <LocationName>{name}</LocationName>
              <Location>{location}</Location>
            </LocationText>
          </LocationContainer>
          <h1 className="text-2xl font-bold mb-4">
            Smart Playground Parent Dashboard
          </h1>
          <Card className="mb-4">
            <CardHeader>
              <CardTitle>CCTV Monitoring</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-gray-200 h-64 flex items-center justify-center">
                CCTV Feed Placeholder
              </div>
            </CardContent>
          </Card>
          <Card className="mb-4">
            <CardHeader>
              <CardTitle>Send Message to Child</CardTitle>
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
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Enter message for your child"
                />
                <Button onClick={sendMessage}>Send</Button>
              </div>
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
              <CardTitle>Playground Congestion</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <Users className="mr-2" />
                <span>Current playground congestion: Moderate</span>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Set Playground Return Time</CardTitle>
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
  height: 90%;
  padding: 16px 18px;
  overflow: hidden;
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

const LocationContainer = styled.div``;

const LocationIcon = styled.img`
  width: 24px;
  margin-right: 8px;
`;

const LocationText = styled.div`
  display: flex;
  align-items: center;
`;

const LocationName = styled.div``;

const Location = styled.div``;

const Card = styled.div`
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  width: 100%;
  margin-bottom: 16px;
`;

const CardHeader = styled.div`
  padding: 16px;
  border-bottom: 1px solid #eaeaea;
`;

const CardTitle = styled.h2`
  font-size: 18px;
  font-weight: bold;
`;

const CardContent = styled.div`
  padding: 16px;
`;

const Input = styled.input`
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
