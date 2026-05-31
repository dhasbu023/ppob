import { BrowserRouter, Routes, Route } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import Input from "./pages/Input";
import History from "./pages/History";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/input" element={<Input />} />
        <Route path="/history" element={<History />} />
      </Routes>
    </BrowserRouter>
  );
}