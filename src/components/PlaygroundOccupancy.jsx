import React, { useState, useEffect } from "react";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";
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
    <div className="p-8">
      <h2 className="mb-6 text-2xl font-bold">Playground Occupancy</h2>
      <Alert>
        <AlertTitle>Current Occupancy</AlertTitle>
        <AlertDescription>
          The playground is currently at {occupancy}% capacity.
        </AlertDescription>
      </Alert>
    </div>
  );
};

export default PlaygroundOccupancy;
