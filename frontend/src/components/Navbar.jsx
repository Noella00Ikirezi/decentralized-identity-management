import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav style={{ padding: "10px", borderBottom: "1px solid #ccc" }}>
      <Link to="/">Home</Link> | 
      <Link to="/login"> Login</Link> | 
      <Link to="/profile"> Profile</Link> | 
      <Link to="/issue-credential"> Issue Credential</Link> | 
      <Link to="/my-credentials"> My Credentials</Link> | 
      <Link to="/verify-credential"> Verify Credential</Link>
    </nav>
  );
};

export default Navbar;
