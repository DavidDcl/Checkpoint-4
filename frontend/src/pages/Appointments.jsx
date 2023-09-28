import { useEffect, useState } from "react";
import expressApi from "../services/expressApi";
import DoctorCard from "../components/DoctorCard";

function Appointment() {
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    expressApi.get("/doctors").then((res) => setDoctors(res.data));
  }, []);

  return (
    <div>
      <div className="text-center  my-10 text-6xl">
        <span className="text-stone-200">Make an appointment</span>{" "}
        <span className="text-cyan-200">with the doctor</span>{" "}
        <span className="text-stone-200">of your choice!</span>
      </div>
      <div className="flex flex-row gap-4 justify-around mt-44">
        {doctors.map((doctor) => (
          <div key={doctor.id} className="flex">
            <DoctorCard
              firstName={doctor.first_name}
              surname={doctor.surname}
              profilePic={doctor.profile_pic}
              bio={doctor.bio}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Appointment;
