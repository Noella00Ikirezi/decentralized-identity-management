import React, { useContext } from "react";
import { AccountContext } from "../contexts/AccountContext";
import Web3 from "web3";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { account, setAccount } = useContext(AccountContext);
  const navigate = useNavigate();

  const connectMetaMask = async () => {
    if (window.ethereum) {
      const web3 = new Web3(window.ethereum);
      try {
        await window.ethereum.request({ method: "eth_requestAccounts" });
        const accounts = await web3.eth.getAccounts();
        setAccount(accounts[0]);
        navigate("/profile");
      } catch (error) {
        console.error("User rejected the request.");
      }
    } else {
      console.error("MetaMask is not installed.");
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>Login with MetaMask</h2>
      <button onClick={connectMetaMask}>{account ? "Connected" : "Connect"}</button>
    </div>
  );
};

export default Login;
