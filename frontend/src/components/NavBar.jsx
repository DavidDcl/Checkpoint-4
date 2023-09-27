/*eslint-disable*/
import { Link } from "react-router-dom";
function NavBar() {
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
            <li>
              <Link to="/appointments">Appointment</Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="navbar-center">
        <a className="btn btn-ghost normal-case text-slate-500 font-bold text-3xl">
          Dinex
        </a>
      </div>
      <div className="navbar-end"></div>
    </div>
  );
}

export default NavBar;
