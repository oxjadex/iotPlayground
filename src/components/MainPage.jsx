import React, { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import "../App.css";

const MainPage = () => {
  const [message, setMessage] = useState("");

  const sendMessage = () => {
    console.log("Sending message:", message);
    setMessage("");
  };

  return (
    <div className="p-8">
      <h2 className="mb-6 text-2xl font-bold">Playground Monitor</h2>
      <div className="mb-6">
        <h3 className="mb-2 text-xl">CCTV Feed</h3>
        <div className="w-full h-64 bg-gray-300 flex items-center justify-center">
          CCTV Feed Placeholder
        </div>
      </div>
      <div className="mb-6">
        <h3 className="mb-2 text-xl">Send Message to Child</h3>
        <Input
          type="text"
          placeholder="Enter message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="mb-2"
        />
        <Button onClick={sendMessage}>Send Message</Button>
      </div>
    </div>
  );
};

export default MainPage;
