import Sidebar from "./components/common/Sidebar";
import Dashboard from "./pages/Dashboard";
import Entry from "./pages/Entry";
import Exit from "./pages/Exit";
import Slots from "./pages/Slots";
import History from "./pages/History";
import { Routes, Route } from "react-router-dom";
import "./App.css";

function App() {
  return (
    <div className="flex min-h-screen">
      <Sidebar />

      <main className="flex-1 p-8 bg-gray-100">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/entry" element={<Entry />} />
          <Route path="/exit" element={<Exit />} />
          <Route path="/slots" element={<Slots />} />
          <Route path="/history" element={<History />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;