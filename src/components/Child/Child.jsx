import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";

const API_URL = "http://localhost:5000/api";

const ChildDashboard = () => {
  const [messages, setMessages] = useState([]);
  const [newMessageCount, setNewMessageCount] = useState(0);
  const [latestMessage, setLatestMessage] = useState(null);

  useEffect(() => {
    fetchMessages();
    const interval = setInterval(fetchMessages, 500);
    return () => clearInterval(interval);
  }, []);

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

  return (
    <Container>
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
  justify-content: center;
  align-items: center;
  padding: 40px 36px;
  overflow: auto;
  border-radius: 41px;
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
