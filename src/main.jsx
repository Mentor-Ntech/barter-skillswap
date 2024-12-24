import React from "react";
import ReactDOM from "react-dom/client";
import './index.css'; // Tailwind CSS import
import App from './App.jsx'; // Main App component
import { BrowserRouter } from "react-router-dom"; // React Router

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
