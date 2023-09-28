import PropTypes from "prop-types";

function DoctorCard({ surname, firstName, profilePic, bio }) {
  return (
    <div className="card w-96 bg-slate-200 shadow-xl">
      <figure className="w-full h-full ">
        <img
          src={`${
            import.meta.env.VITE_BACKEND_URL
          }/assets/images/doctors/${profilePic}`}
          alt="Shoes"
          className="w-full h-full rounded-[2rem]  p-4"
        />
      </figure>
      <div className="card-body flex gap-2 my-1">
        <div className="flex">
          <h2 className="card-title text-slate-500 font-bold">
            {firstName} {surname}
          </h2>
        </div>
        <div className="text-md text-slate-500 font-bold">
          <p>{bio}</p>
        </div>
        <div className="card-actions justify-end mt-3">
          <button
            type="button"
            className="btn bg-slate-500 text-slate-200 text-lg font-bold"
          >
            Book Now !{" "}
          </button>
        </div>
      </div>
    </div>
  );
}

DoctorCard.propTypes = {
  surname: PropTypes.string.isRequired,
  firstName: PropTypes.string.isRequired,
  profilePic: PropTypes.string.isRequired,
  bio: PropTypes.string.isRequired,
};

export default DoctorCard;
