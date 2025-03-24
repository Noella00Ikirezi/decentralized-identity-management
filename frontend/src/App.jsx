import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Login from "./components/Login";
import Profile from "./components/Profile";
import IssueCredential from "./components/IssueCredential";
import MyCredentials from "./components/MyCredentials";
import VerifyCredential from "./components/VerifyCredential";

const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/issue-credential" element={<IssueCredential />} />
        <Route path="/my-credentials" element={<MyCredentials />} />
        <Route path="/verify-credential" element={<VerifyCredential />} />
      </Routes>
    </>
  );
};

export default App;
