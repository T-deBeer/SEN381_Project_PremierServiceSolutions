import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import { UserProvider } from "./data-layer/context-classes/UserContext";
import App from "./app";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <UserProvider>
      <App />
    </UserProvider>
  </React.StrictMode>
);
