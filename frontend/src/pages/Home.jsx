import { useNavigate } from "react-router-dom";

import dentist1 from "../assets/dentist1.jpg";
import dentist3 from "../assets/dentist3.jpg";

function Home() {
  const navigate = useNavigate();
  return (
    <div className="lg:my-5 lg:flex lg:justify-between sm:mb-[10vh] lg:w-full lg:mx-5 lg:gap-4 lg:mt-14 ">
      <div className="w-full sm:w-1/2">
        <div className="text-center sm:text-left text-4xl sm:text-8xl flex flex-col mx-5 gap-4 sm:gap-8">
          <span className="text-stone-200">SMILE</span>
          <span className="text-cyan-200">BRIGHTER</span>
          <span className="text-stone-200">WITH US</span>
        </div>
        <div className="mx-5 my-5">
          <img src={dentist1} alt="dentist" className="rounded-lg w-full" />
        </div>
      </div>

      <div className="w-full sm:w-1/2 mr-4 ">
        <div className="text-center sm:text-left mx-5 my-5 flex flex-col gap-2">
          <p className="text-base sm:text-3xl text-stone-200">
            Ensure the health and protection of your smile with our extensive
            network of dentists across the nation. Our services offer prompt
            answers and personalized attention.
          </p>
          <div className="flex mx-2 my-5">
            <button
              onClick={() => navigate("/appointments")}
              type="button"
              className="btn bg-cyan-500 text-slate-500 text-base sm:text-lg font-bold"
            >
              Book Now
            </button>
          </div>
          <div className="flex my-5 justify-center ">
            <img src={dentist3} alt="dentist" className="rounded-lg" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
