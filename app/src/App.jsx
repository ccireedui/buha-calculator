import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import InfoPage from "./pages/InfoPage";
import MintPage from "./pages/MintPage";
import StakePage from "./pages/StakePage";
import Layout from "./components/Layout";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/info" element={<InfoPage />} />
          <Route path="/mint" element={<MintPage />} />
          <Route path="/stake" element={<StakePage />} />
          {/* <Route path="/news/:newsId" element={<NewsPage />} /> */}
          {/* <Route path="/news/:newsId/edit" element={<EditNews />} /> */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
