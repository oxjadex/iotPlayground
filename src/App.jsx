import React, { useState, useEffect } from "react";
import axios from "axios";
import { Users } from "lucide-react";
import "./App.css";
import styled from "styled-components";

const API_URL = "http://localhost:5000/api";

const ParentDashboard = () => {
  const [message, setMessage] = useState("");
  const [returnTime, setReturnTime] = useState("");
  const [selectedChild, setSelectedChild] = useState("");
  const [messages, setMessages] = useState([]);
  const [visits, setVisits] = useState([]);

  useEffect(() => {
    fetchMessages();
    fetchVisits();
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

  return (
    <div className="p-4 max-w-4xl mx-auto">
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
    </div>
  );
};

export default ParentDashboard;


const Card = styled.div``;
const CardHeader = styled.div``;
const CardTitle = styled.div``;
const CardContent = styled.div``;
const Input = styled.input``;
const Button = styled.button``;