import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App.jsx"
import "./index.css"
import { SkillExchangeProvider } from "./context/SkillExchangeContext.jsx"

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <SkillExchangeProvider>
    <App />
    </SkillExchangeProvider>
    
  </React.StrictMode>,
)