import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";
import { ContextProvider } from "./context/appContext";
import { UserContextProvider } from "./context/userContext";
import { BrowserRouter as Router } from "react-router-dom";
ReactDOM.render(
  // <React.StrictMode>
  <UserContextProvider>
    <ContextProvider>
      <Router>
        <App />
      </Router>
    </ContextProvider>
  </UserContextProvider>,
  // </React.StrictMode>,
  document.getElementById("root")
);
