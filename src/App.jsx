import { Route, Routes } from "react-router-dom";
import Layout from "./Component/Layout/Layout";
import HomeDash from "./Component/Dashboard/HomeDash";
import Hero from "./Component/Hero/Hero";

function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <Layout>
            <Hero />
          </Layout>
        }
      />

        <Route path="/homedash" element={<HomeDash />} />
    </Routes>
  );
}

export default App;
