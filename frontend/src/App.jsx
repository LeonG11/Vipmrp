import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import PartDetail from "./pages/PartDetail";
import AddPartPage from "./pages/AddPartPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/part/:id" element={<PartDetail />} />
        <Route path="/add" element={<AddPartPage />} />
      </Routes>
    </BrowserRouter>
  );
}
