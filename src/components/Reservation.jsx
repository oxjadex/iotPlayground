import React, { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import "../App.css";

const Reservation = () => {
  const [child, setChild] = useState("");
  const [time, setTime] = useState("");

  const makeReservation = (e) => {
    e.preventDefault();
    console.log("Making reservation", { child, time });
  };

  return (
    <div className="p-8">
      <h2 className="mb-6 text-2xl font-bold">Make a Reservation</h2>
      <form onSubmit={makeReservation} className="space-y-4">
        <Input
          type="text"
          placeholder="Child's Name"
          value={child}
          onChange={(e) => setChild(e.target.value)}
        />
        <Input
          type="time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
        />
        <Button type="submit">Make Reservation</Button>
      </form>
    </div>
  );
};

export default Reservation;
