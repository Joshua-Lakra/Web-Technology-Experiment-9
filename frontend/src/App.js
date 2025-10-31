import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AuthPage from "./components/AuthPage";
import UserList from "./components/UserList";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AuthPage />} />
        <Route path="/users" element={<UserList />} />
      </Routes>
    </Router>
  );
}

export default App;
