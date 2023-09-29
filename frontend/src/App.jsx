import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useState } from "react";

import Home from "./pages/Home";
import "./App.css";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import Appointments from "./pages/Appointments";
import ModalConnexion from "./components/ModalConnexion";
import ModalInscription from "./components/ModalInscription";
import { CurrentUserContextProvider } from "./Contexts/CurrentUserContext";
import Profil from "./pages/Profil";
import UserAppointments from "./pages/UserAppointments";
import DoctorAppointments from "./pages/DoctorAppointments";

function App() {
  const [modalConnexionIsVisible, setModalConnexionIsVisible] = useState(false);
  const [modalInscriptionIsVisible, setModalInscriptionIsVisible] =
    useState(false);

  const toggleModalInscritpion = () => {
    setModalInscriptionIsVisible(!modalInscriptionIsVisible);
  };

  const toggleModalConnexion = () => {
    setModalConnexionIsVisible(!modalConnexionIsVisible);
  };
  return (
    <BrowserRouter>
      <CurrentUserContextProvider>
        <div className="bg-slate-500 min-h-screen overflow-hidden">
          <NavBar toggleModalConnexion={toggleModalConnexion} />
          {modalConnexionIsVisible && (
            <ModalConnexion
              toggleModalConnexion={toggleModalConnexion}
              toggleModalInscritpion={toggleModalInscritpion}
            />
          )}
          {modalInscriptionIsVisible && (
            <ModalInscription
              toggleModalConnexion={toggleModalConnexion}
              toggleModalInscritpion={toggleModalInscritpion}
            />
          )}

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/appointments" element={<Appointments />} />
            <Route path="/profil" element={<Profil />} />
            <Route path="/myAppointments" element={<UserAppointments />} />
            <Route
              path="/doctor-appointments"
              element={<DoctorAppointments />}
            />
          </Routes>

          <Footer />
        </div>
      </CurrentUserContextProvider>
    </BrowserRouter>
  );
}

export default App;
