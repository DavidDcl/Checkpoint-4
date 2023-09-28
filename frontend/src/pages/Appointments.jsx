import { useEffect, useState } from "react";
import expressApi from "../services/expressApi";
import DoctorCard from "../components/DoctorCard";

function Appointment() {
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    expressApi.get("/doctors").then((res) => setDoctors(res.data));
  }, []);

  return (
    <div className="h-full mb-10">
      <div className="text-center my-5 sm:my-10 text-3xl sm:text-6xl ">
        <span className="text-stone-200">Make an appointment</span>{" "}
        <span className="text-cyan-200">with the doctor</span>{" "}
        <span className="text-stone-200">of your choice!</span>
      </div>
      <div className="flex flex-col sm:flex-row gap-4 justify-center sm:justify-around mt-5 sm:mt-44">
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
