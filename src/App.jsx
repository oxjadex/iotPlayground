import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
  Link,
} from "react-router-dom";
import AuthPage from "./components/AuthPage";
import MainPage from "./components/MainPage";
import PlaygroundOccupancy from "./components/PlaygroundOccupancy";
import Reservation from "./components/Reservation";
import Login from "./components/Login";
import ChildrenList from "./components/ChildrenList";
import ProtectedRoute from "./components/ProtectedRoute";
import "./App.css";

const App = () => {
  const isAuthenticated = false;

  return (
    <Router>
      <div className="app">
        {isAuthenticated && (
          <nav>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/occupancy">Occupancy</Link>
              </li>
              <li>
                <Link to="/reservation">Reservation</Link>
              </li>
            </ul>
          </nav>
        )}
        <div className="content">
          <Routes>
            <Route path="/auth" element={<AuthPage />} />
            <Route
              path="/"
              element={isAuthenticated ? <MainPage /> : <Navigate to="/auth" />}
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
                <ProtectedRoute>
                  <ChildrenList />
                </ProtectedRoute>
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
