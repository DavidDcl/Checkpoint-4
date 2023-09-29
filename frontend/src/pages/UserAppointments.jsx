import { useState, useEffect } from "react";
import expressApi from "../services/expressApi";
import { useCurrentUserContext } from "../Contexts/CurrentUserContext";

function UserAppointments() {
  const { user } = useCurrentUserContext();
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    expressApi
      .get(`/appointments/${user.id}`)
      .then((res) => setAppointments(res.data))
      .catch((error) => console.error(error));
  }, []);

  return (
    <div className="mx-5 my-10">
      <h1 className="text-center text-5xl lg:text-8xl">
        <span className="text-slate-200">Your</span>{" "}
        <span className="text-cyan-500">Appointments</span>
      </h1>

      <div className="flex justify-around flex-wrap my-32">
        {appointments.map((appointment) => (
          <div
            key={appointment.id}
            className="card w-full sm:w-96 bg-slate-200 shadow-xl mx-3 my-3"
          >
            <div className="card-body flex flex-col gap-2 my-1">
              <div className="flex-1">
                <h2 className="card-title text-slate-500 font-bold text-center sm:text-left">
                  Your appointment details
                </h2>
              </div>
              <div className="text-md text-slate-500 font-bold flex flex-col">
                <p className="text-center sm:text-left">
                  When : {appointment.date.split("T")[0]}
                </p>
                <p className="text-center sm:text-left">
                  At : {appointment.start_time.split(":00")[0]} H
                </p>
                <p className="text-center sm:text-left">
                  With : {appointment.first_name} {appointment.surname}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default UserAppointments;
