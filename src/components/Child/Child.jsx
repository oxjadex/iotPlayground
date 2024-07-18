import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";

const API_URL = "http://localhost:5000/api";

const ChildDashboard = () => {
  const [messages, setMessages] = useState([]);
  const [newMessageCount, setNewMessageCount] = useState(0);
  const [latestMessage, setLatestMessage] = useState(null);
  const [currentVisit, setCurrentVisit] = useState(null);
  const [showAlert, setShowAlert] = useState(false);
  const [testMode, setTestMode] = useState(false);
  const [testTimeRemaining, setTestTimeRemaining] = useState(35);

  useEffect(() => {
    if (!testMode) {
      fetchMessages();
      fetchCurrentVisit();
      const messageInterval = setInterval(fetchMessages, 5000);
      const visitInterval = setInterval(fetchCurrentVisit, 60000);

      return () => {
        clearInterval(messageInterval);
        clearInterval(visitInterval);
      };
    }
  }, [testMode]);

  useEffect(() => {
    let interval;
    if (testMode) {
      interval = setInterval(() => {
        setTestTimeRemaining((prev) => {
          if (prev > 0) return prev - 1;
          return 0;
        });
      }, 1000); // 1초마다 감소
    }
    return () => clearInterval(interval);
  }, [testMode]);

  useEffect(() => {
    if (testMode) {
      setShowAlert(testTimeRemaining <= 30 && testTimeRemaining > 0);
    } else if (currentVisit) {
      const checkHomeTime = setInterval(() => {
        const now = new Date();
        const endTime = new Date(currentVisit.endTime);
        const timeRemaining = endTime.getTime() - now.getTime();
        const minutesRemaining = Math.floor(timeRemaining / (1000 * 60));

        setShowAlert(minutesRemaining <= 30 && minutesRemaining > 0);
      }, 1000);

      return () => clearInterval(checkHomeTime);
    }
  }, [currentVisit, testMode, testTimeRemaining]);

  const fetchMessages = async () => {
    try {
      const response = await axios.get(`${API_URL}/messages`);
      if (response.data.length > messages.length) {
        setNewMessageCount(response.data.length - messages.length);
        setLatestMessage(response.data[0]);
      }
      setMessages(response.data);
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };

  const fetchCurrentVisit = async () => {
    try {
      const response = await axios.get(`${API_URL}/visits/current`);
      setCurrentVisit(response.data);
    } catch (error) {
      console.error("Error fetching current visit:", error);
    }
  };

  const toggleTestMode = () => {
    setTestMode(!testMode);
    setTestTimeRemaining(35);
  };

  return (
    <Container>
      <TestModeButton onClick={toggleTestMode}>
        {testMode ? "테스트 모드 종료" : "테스트 모드 시작"}
      </TestModeButton>
      {testMode && (
        <TestTimeDisplay>남은 시간: {testTimeRemaining}분</TestTimeDisplay>
      )}
      {showAlert && (
        <AlertModal>
          <AlertText>30분 후에 집에 갈 시간이에요!</AlertText>
        </AlertModal>
      )}
      {latestMessage && (
        <Modal>
          <LatestMessage>엄마 : {latestMessage.content}</LatestMessage>
          {newMessageCount > 1 && (
            <CountMessage>{newMessageCount - 1}개의 문자 메시지</CountMessage>
          )}
        </Modal>
      )}
    </Container>
  );
};

export default ChildDashboard;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px 18px;
  overflow: auto;
  border-radius: 41px;
  height: 100%;
  position: relative;
`;

const Modal = styled.div`
  display: flex;
  background: rgba(0, 0, 0, 0.1);
  padding: 10px;
  border-radius: 8px;
  margin-bottom: 10px;
  font-size: 18px;
  font-weight: bold;
  gap: 3px;
  flex-direction: column;
`;

const LatestMessage = styled.div`
  font-size: 13px;
  font-weight: 500;
`;

const CountMessage = styled.div`
  font-size: 10px;
  font-weight: 400;
`;

const AlertModal = styled.div`
  position: absolute;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  background-color: #ff9800;
  color: white;
  padding: 10px 20px;
  border-radius: 20px;
  font-size: 14px;
  font-weight: bold;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
  animation: pulse 2s infinite;

  @keyframes pulse {
    0% {
      transform: translateX(-50%) scale(1);
    }
    50% {
      transform: translateX(-50%) scale(1.05);
    }
    100% {
      transform: translateX(-50%) scale(1);
    }
  }
`;

const AlertText = styled.p`
  margin: 0;
`;

const TestModeButton = styled.button`
  top: 10px;
  right: 10px;
  padding: 5px 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;

const TestTimeDisplay = styled.div`
  top: 50px;
  right: 10px;
  padding: 5px;
  background-color: #f0f0f0;
  border-radius: 5px;
`;
