import React, { useState, useEffect } from "react";
import { getChildren, addChild } from "../api";

const ChildrenList = () => {
  const [children, setChildren] = useState([]);
  const [newChildName, setNewChildName] = useState("");

  useEffect(() => {
    fetchChildren();
  }, []);

  const fetchChildren = async () => {
    try {
      const response = await getChildren();
      setChildren(response.data);
    } catch (error) {
      console.error("Failed to fetch children:", error);
    }
  };

  const handleAddChild = async (e) => {
    e.preventDefault();
    try {
      await addChild(newChildName);
      setNewChildName("");
      fetchChildren();
    } catch (error) {
      console.error("Failed to add child:", error);
    }
  };

  return (
    <div>
      <h2>Children</h2>
      <ul>
        {children.map((child) => (
          <li key={child.id}>{child.name}</li>
        ))}
      </ul>
      <form onSubmit={handleAddChild}>
        <input
          type="text"
          value={newChildName}
          onChange={(e) => setNewChildName(e.target.value)}
          placeholder="New child's name"
        />
        <button type="submit">Add Child</button>
      </form>
    </div>
  );
};

export default ChildrenList;
