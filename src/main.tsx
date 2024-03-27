import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { MyContextProvider } from "./contexts";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      {/* <MyContextProvider> */}
      <App />
      {/* </MyContextProvider> */}
    </BrowserRouter>
  </React.StrictMode>
);
