import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import { AccountProvider } from "./contexts/AccountContext";
import App from "./App";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AccountProvider>
      <Router>
        <App />
      </Router>
    </AccountProvider>
  </React.StrictMode>
);
