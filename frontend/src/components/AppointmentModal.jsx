import { useState } from "react";
import PropTypes from "prop-types";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useCurrentUserContext } from "../Contexts/CurrentUserContext";

import expressApi from "../services/expressApi";
import add30mins from "../services/addTime";

function AppointmentModal({ setIsModalOpen, isModalOpen, doctorId }) {
  const { user } = useCurrentUserContext();

  const [reservation, setReservation] = useState(true);
  const [confirmation, setConfirmation] = useState(false);
  const [dataConfirmation, setDataConfirmation] = useState([]);
  const [formDataReservation, setFormDataReservation] = useState({
    id: user.id,
    doctorId,
    startTime: "",
    date: "",
  });

  const handleDate = (e) => {
    setFormDataReservation({ ...formDataReservation, date: e.target.value });
  };
  const handleStart = (e) => {
    setFormDataReservation({
      ...formDataReservation,
      startTime: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const getReservation = await expressApi.post("/create-appointment", {
        userId: formDataReservation.id,
        startTime: formDataReservation.startTime,
        endTime: add30mins(formDataReservation.startTime),
        date: formDataReservation.date,
        doctorId: formDataReservation.doctorId,
      });

      setDataConfirmation(getReservation.data);
      setReservation(!reservation);
      setConfirmation(!confirmation);
    } catch (error) {
      if (error.response.status === 400) {
        toast.error("Mauvaise date inserer");
      }
      console.error(error);
    }
  };

  return (
    <div>
      {reservation && (
        <div className="fixed inset-0 h-screen flex items-center justify-center bg-zinc-800 bg-opacity-70 z-20">
          <div className="bg-slate-500 rounded-xl shadow-md w-80 flex flex-col">
            <h3 className="bg-blue p-3 rounded-t-xl text-xl text-slate-200 font-bold">
              Your appointment :
            </h3>
            <form className=" p-3 flex flex-col gap-3" onSubmit={handleSubmit}>
              <div className=" flex gap-8 items-center">
                <label
                  htmlFor="date"
                  className="text-slate-200 font-bold"
                  onSubmit={handleSubmit}
                >
                  Date
                </label>
                <br />
                <input
                  className="input bg-slate-200 focus:border-none focus:bg-slate-200 text-slate-500 focus:text-slate-500 placeholder-secondary focus:placeholder-slate-500"
                  type="date"
                  id="formData.date"
                  name="date"
                  value={formDataReservation.date || ""}
                  onChange={handleDate}
                  required
                />
              </div>
              <div className=" flex items-center gap-7">
                <label htmlFor="start" className="text-slate-200 font-bold">
                  Heure
                </label>
                <br />
                <input
                  className="input bg-slate-200 focus:border-none focus:bg-slate-200 text-slate-500 focus:text-slate-200 placeholder-slate-500 focus:placeholder-slate-500"
                  type="time"
                  name="formData.start"
                  onChange={handleStart}
                  value={formDataReservation.startTime || ""}
                  required
                />
              </div>

              <div className=" flex  lg:justify-evenly justify-between">
                <button
                  type="button"
                  onClick={() => {
                    setReservation(!reservation);
                    setIsModalOpen(!isModalOpen);
                  }}
                  className="btn bg-rose-700 bg-opacity-75  border-none text-slate-200"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="btn bg-cyan-500  text-slate-500 border-none text-base sm:text-lg font-bold"
                >
                  Confirmer
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {confirmation && (
        <div className="fixed inset-0 h-screen flex items-center justify-center bg-zinc-800 bg-opacity-70 z-20">
          <div className="bg-slate-500 rounded-xl shadow-md w-80 flex flex-col">
            <div className="flex justify-between p-3 bg-blue  rounded-t-xl">
              <h1 className="text-stone-800 font-bold text-xl text-center">
                Recap :
              </h1>
              <button
                type="button"
                onClick={() => {
                  setConfirmation(!confirmation);
                  setIsModalOpen(!isModalOpen);
                }}
              >
                <svg
                  width="32px"
                  height="32px"
                  strokeWidth="1.5"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  color="#E5E9E7"
                >
                  <path
                    d="M9.172 14.828L12.001 12m2.828-2.828L12.001 12m0 0L9.172 9.172M12.001 12l2.828 2.828M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"
                    stroke="#E5E9E7"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>
            <div className="border rounded-lg border-green flex flex-col m-2 p-3">
              <div className="flex gap-4">
                <h3 className="text-stone-800 font-bold">Date :</h3>
                <p className="text-slate-200  font-bold">
                  {dataConfirmation.date.split("T")[0]}
                </p>
              </div>
              <div className="flex gap-4">
                <h3 className="text-stone-800 font-bold">Time :</h3>
                <p className="text-slate-200  font-bold tracking-widest ">
                  {dataConfirmation.start_time.split(":00")} H
                </p>
              </div>
              <div>
                <h3 className="text-stone-800  font-bold">Doctor:</h3>
                <p className="text-slate-200  font-bold">
                  {dataConfirmation.first_name} {dataConfirmation.surname}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
      <ToastContainer
        position="top-center"
        style={{ marginTop: 80 }}
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        theme="colored"
      />
    </div>
  );
}
AppointmentModal.propTypes = {
  setIsModalOpen: PropTypes.func.isRequired,
  isModalOpen: PropTypes.bool.isRequired,
  doctorId: PropTypes.number.isRequired,
};

export default AppointmentModal;
