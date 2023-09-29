/*eslint-disable*/
import { Link, useNavigate } from "react-router-dom";

import { useCurrentUserContext } from "./../Contexts/CurrentUserContext";
function NavBar({ toggleModalConnexion }) {
  const { user } = useCurrentUserContext();
  const navigate = useNavigate();
  const handleLogIn = () => {
    if (user) {
      navigate("/profil");
    } else {
      toggleModalConnexion();
    }
  };

  return (
    <div className="navbar bg-slate-200 ">
      <div className="navbar-start ">
        <div className="dropdown">
          <label
            tabIndex={0}
            className="btn btn-ghost btn-circle bg-slate-500 "
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h7"
              />
            </svg>
          </label>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content font-bold mt-3 z-[1] text-slate-500  p-2 shadow bg-slate-200 rounded-box w-52"
          >
            <li>
              <Link to="/">Homepage</Link>
            </li>
            {user.roles === "doctor" ? (
              " "
            ) : (
              <li>
                <Link to="/appointments">Appointments</Link>
              </li>
            )}

            {user.roles === "userStandard" && (
              <li>
                <Link to="/myAppointments">My Appointments</Link>
              </li>
            )}
          </ul>
        </div>
      </div>
      <div className="navbar-center">
        <a className="btn btn-ghost normal-case text-slate-500 font-bold text-3xl">
          Dinex
        </a>
      </div>
      <div className="navbar-end mx-5 items-center text-xl">
        <button
          onClick={handleLogIn}
          type="button"
          className="btn bg-slate-500 text-slate-200 text-lg font-bold"
        >
          {user ? (
            <svg
              width="45px"
              height="45px"
              strokeWidth="1.5"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              color="#E5E9E7"
            >
              <path
                d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2z"
                stroke="#E5E9E7"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M4.271 18.346S6.5 15.5 12 15.5s7.73 2.846 7.73 2.846M12 12a3 3 0 100-6 3 3 0 000 6z"
                stroke="#E5E9E7"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          ) : (
            <span>Log In</span>
          )}
        </button>
      </div>
    </div>
  );
}

export default NavBar;
