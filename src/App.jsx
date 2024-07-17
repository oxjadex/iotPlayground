import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import AuthPage from "./components/AuthPage";
import Home from "./components/Home";
import PlaygroundOccupancy from "./components/PlaygroundOccupancy";
import Reservation from "./components/Reservation";
import Login from "./components/Login";
import ChildrenList from "./components/ChildrenList";
import ProtectedRoute from "./components/ProtectedRoute";

const App = () => {
  const isAuthenticated = true;

  return (
    <Router>
      <div className="app">
        <div className="content">
          <Routes>
            <Route path="/auth" element={<AuthPage />} />
            <Route
              path="/"
              element={isAuthenticated ? <Home /> : <Navigate to="/auth" />}
            />
            <Route
              path="/occupancy"
              element={
                isAuthenticated ? (
                  <PlaygroundOccupancy />
                ) : (
                  <Navigate to="/auth" />
                )
              }
            />
            <Route
              path="/reservation"
              element={
                isAuthenticated ? <Reservation /> : <Navigate to="/auth" />
              }
            />
            <Route path="/login" element={<Login />} />
            <Route
              path="/children"
              element={
                  <ChildrenList />
              }
            />
            <Route
              path="*"
              element={<Navigate to={isAuthenticated ? "/" : "/auth"} />}
            />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
