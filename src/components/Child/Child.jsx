import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import ApplewatchMockup from "../../assets/ApplewatchMockup.png";
import App from "../../App";
// import WatchScreen from "./WatchScreen"

const API_URL = "http://localhost:5000/api";

const ChildDashboard = () => {
  const [messages, setMessages] = useState([]);
  const [newMessageCount, setNewMessageCount] = useState(0);
  const [latestMessage, setLatestMessage] = useState(null);
  const [currentVisit, setCurrentVisit] = useState(null);
  const [showAlert, setShowAlert] = useState(false);
  const [testMode, setTestMode] = useState(false);
  const [testType, setTestType] = useState(null);
  const [testTimeRemaining, setTestTimeRemaining] = useState(35);

  useEffect(() => {
    if (!testMode) {
      fetchMessages();
      fetchCurrentVisit();
      const messageInterval = setInterval(fetchMessages, 500);
      const visitInterval = setInterval(fetchCurrentVisit, 600);

      return () => {
        clearInterval(messageInterval);
        clearInterval(visitInterval);
      };
    }
  }, [testMode]);

  useEffect(() => {
    let interval;
    if (testMode && testType === 'goHome') {
      interval = setInterval(() => {
        setTestTimeRemaining((prev) => {
          if (prev > 0) return prev - 1;
          return 0;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [testMode, testType]);

  useEffect(() => {
    if (testMode) {
      if (testType === 'goHome') {
        setShowAlert(testTimeRemaining <= 30 && testTimeRemaining > 0);
      } else if (testType === 'alertMom') {
        setShowAlert(true);
      }
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
  }, [currentVisit, testMode, testType, testTimeRemaining]);

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

  const toggleTestMode = (type) => {
    setTestMode(!testMode);
    setTestType(type);
    if (type === 'goHome') {
      setTestTimeRemaining(35);
    } else if (type === 'viewMessage') {
      setLatestMessage({ content: "테스트 메시지입니다." });
      setNewMessageCount(1);
    }
  };
  
  const pageContainer =()=> {
    return (
      <PageContainer>
        <WatchContainer>
          {testMode && testType === 'goHome' && (
            <TestTimeDisplay>남은 시간: {testTimeRemaining}분</TestTimeDisplay>
          )}
          {showAlert && (
            <AlertModal>
              <AlertText>
                {testType === 'alertMom' ? "엄마에게 알림이 전송되었습니다!" : "30분 후에 집에 갈 시간이에요!"}
              </AlertText>
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
        </WatchContainer>
        
      </PageContainer>
    )
  }

  return (
    <>
    <Watch>
    <PageContainer>
        <WatchContainer>
          {testMode && testType === 'goHome' && (
            <TestTimeDisplay>남은 시간: {testTimeRemaining}분</TestTimeDisplay>
          )}
          {showAlert && (
            <AlertModal>
              <AlertText>
                {testType === 'alertMom' ? "엄마에게 알림이 전송되었습니다!" : "30분 후에 집에 갈 시간이에요!"}
              </AlertText>
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
        </WatchContainer>
        
      </PageContainer>
    </Watch>
      <TestModeButtonContainer>
      <TestModeButton onClick={() => toggleTestMode('goHome')}>
        {testMode && testType === 'goHome' ? "테스트 모드 종료" : "귀가 알림 테스트"}
      </TestModeButton>
      <TestModeButton onClick={() => toggleTestMode('alertMom')}>
        {testMode && testType === 'alertMom' ? "테스트 모드 종료" : "엄마 알림 테스트"}
      </TestModeButton>
      <TestModeButton onClick={() => toggleTestMode('viewMessage')}>
        {testMode && testType === 'viewMessage' ? "테스트 모드 종료" : "메시지 보기 테스트"}
      </TestModeButton>
    </TestModeButtonContainer>
    </>
  );
};

export default ChildDashboard;

const Watch = styled.div`
width: 184px;
  height: 224px;
  background: url(${ApplewatchMockup}) no-repeat center center;
  background-size: contain;
  display: flex;
  justify-content: center;
  align-items: center;
`

const PageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 56%;
  width: 57%;
  position: relative;
  
`;

const WatchContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 10px;
  overflow: hidden;
  border-radius: 20px;
  height: 100%;
  width:100%;
  background-color: white;
  position: relative;
  box-shadow: 0 0 10px rgba(0,0,0,0.1);
`;

const TestModeButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  position: absolute;
  top: 50%;
  right: 20px;
  transform: translateY(-50%);
`;

const Modal = styled.div`
  background: rgba(0, 0, 0, 0.1);
  padding: 5px;
  border-radius: 5px;
  margin-bottom: 5px;
  font-size: 12px;
  width: 90%;
`;

const LatestMessage = styled.div`
  font-size: 10px;
  font-weight: 500;
`;

const CountMessage = styled.div`
  font-size: 8px;
`;

const AlertModal = styled.div`
  position: absolute;
  top: 10px;
  left: 50%;
  transform: translateX(-50%);
  background-color: #ff9800;
  color: white;
  padding: 5px 10px;
  border-radius: 10px;
  font-size: 10px;
  font-weight: bold;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  width: 80%;
  text-align: center;
`;

const AlertText = styled.p`
  margin: 0;
  font-size: 10px;
`;

const TestModeButton = styled.button`
  padding: 10px;
  position:'absolute';
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 14px;
  white-space: nowrap;

  &:hover {
    background-color: #0056b3;
  }
`;

const TestTimeDisplay = styled.div`
  padding: 3px;
  background-color: #f0f0f0;
  border-radius: 3px;
  margin-bottom: 5px;
  font-size: 10px;
`;