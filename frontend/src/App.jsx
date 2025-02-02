import "./config/connection";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Layout from "./components/Layout"
import LandingPage from "./pages/LandingPage"
import Dashboard from "./pages/ Dashboard"
import Listings from "./pages/Listings"
import Requests from "./pages/Requests"
import Agreements from "./pages/Agreements"
import Disputes from "./pages/Disputes"
import Reputation from "./pages/Reputation"
import Escrow from "./pages/Escrow"

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route element={<Layout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/listings" element={<Listings />} />
          <Route path="/requests" element={<Requests />} />
          <Route path="/agreement" element={<Agreements />} />
          <Route path="/disputes" element={<Disputes />} />
          <Route path="/reputation" element={<Reputation />} />
          <Route path="/escrow" element={<Escrow />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default App