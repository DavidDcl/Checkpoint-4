import dentist1 from "../assets/dentist1.jpg";
import dentist3 from "../assets/dentist3.jpg";

export default function Home() {
  return (
    <div className=" my-5 flex justify-between mx-5">
      <div className=" w-5/12 ">
        <div className="text-left text-8xl flex flex-col mx-5 gap-8">
          <span className="text-stone-200">SMILE</span>
          <span className="text-green-400">BRIGHTER</span>
          <span className="text-stone-200">WITH US</span>
        </div>
        <div className="mx-5 my-5 ">
          <img src={dentist1} alt="dentiste" className="rounded-lg" />
        </div>
      </div>
      <div className="w-5/12">
        <div className="text-center mx-5 my-5 flex flex-col gap-2">
          <p className="text-3xl text-left text-stone-200">
            Ensure the health and protection of your smile with our extense
            network dentist across the nation. Our services offers prompt
            answers and personalized attention
          </p>
          <div className="flex my-5">
            <button
              type="button"
              className="btn btn-lg border-none rounded-2xl font-bold text-zinc-800 bg-green-400 "
            >
              Book Now
            </button>
          </div>
          <div className=" flex my-5 justify-center">
            <img src={dentist3} alt="dentiste" className="rounded-lg" />
          </div>
        </div>
      </div>
    </div>
  );
}
