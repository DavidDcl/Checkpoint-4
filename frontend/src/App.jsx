import { BrowserRouter, Route, Routes } from "react-router-dom";

import Home from "./pages/Home";
import "./App.css";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import Appointments from "./pages/Appointments";

function App() {
  return (
    <div className="bg-slate-500 h-screen w-full">
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/appointments" element={<Appointments />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
