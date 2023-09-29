import { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

import expressApi from "../services/expressApi";
import { useCurrentUserContext } from "../Contexts/CurrentUserContext";

function DoctorAppointments() {
  const [date, setDate] = useState(new Date());
  const [appointments, setAppointments] = useState([]);

  const { user } = useCurrentUserContext();

  useEffect(() => {
    expressApi
      .get(`/doctor-appointments/${user.doctor_id}`)
      .then((res) => setAppointments(res.data))
      .catch((error) => console.error("Error fetching appointments", error));
  }, []);

  const tileContent = ({ date: tileDate, view }) => {
    if (view === "month") {
      const appointmentsForDate = appointments.filter(
        (appointment) =>
          tileDate.toDateString() === new Date(appointment.date).toDateString()
      );

      return (
        <div>
          {appointmentsForDate.map((appointment) => (
            <div key={appointment.id} className="appointment-marker">
              {`${appointment.start_time} - ${appointment.end_time}`}
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="mx-auto text-center">
      <div className="calendar-container font-bold">
        <Calendar onChange={setDate} value={date} tileContent={tileContent} />
      </div>
    </div>
  );
}

export default DoctorAppointments;
