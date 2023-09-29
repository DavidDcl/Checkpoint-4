import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import expressApi from "../services/expressApi";
import { useCurrentUserContext } from "../Contexts/CurrentUserContext";

function Profil() {
  const { user, setUser } = useCurrentUserContext();
  const [formData, setFormData] = useState({
    username: user.username,
    firstName: user.firstName,
    surname: user.surname,
    id: user.id,
    roles: user.roles,
  });
  const navigate = useNavigate();

  const handleFirstNameChange = (event) => {
    setFormData({ ...formData, firstName: event.target.value });
  };

  const handleSurnameChange = (event) => {
    setFormData({ ...formData, surname: event.target.value });
  };

  const handleUsernameChange = (event) => {
    setFormData({ ...formData, username: event.target.value });
  };
  const handleClickDeconnexion = () => {
    expressApi.get("/logout").then((res) => {
      if (res.status === 200) {
        localStorage.removeItem("user");
        setUser(null);

        navigate("/");
      } else {
        res.status(500).send("impossible de se deconnecter ");
      }
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    expressApi.put(`/users/${user.id}`, formData).then((res) => {
      if (res.status === 201) {
        toast.success("Your profile has been updated !");
        localStorage.setItem("user", JSON.stringify(formData));
        setUser(formData);
      }
    });
  };

  return (
    <div className="w-full  flex justify-center my-10 ">
      <div className="flex justify-center w-2/3 h-2/3 mt-[15vh] my-5 border-cyan-400 border-2 mx-5 ">
        <form action="submit" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-2 my-5">
            <label
              htmlFor="firstName"
              className="text-slate-200  font-bold text-lg "
            >
              First Name:{" "}
            </label>
            <input
              type="text"
              value={formData.firstName}
              onChange={handleFirstNameChange}
              placeholder={user.firstName ? user.firstName : "Your first name"}
              className="input placeholder:font-bold bg-neutral-300 w-full focus:border-none focus:bg-blue text-stone-900 focus:text-stone-900 placeholder-stone-900 focus:placeholder-stone-900"
            />
          </div>
          <div className="flex flex-col gap-2 my-5">
            <label
              htmlFor="firstName"
              className="text-slate-200 font-bold text-lg"
            >
              {" "}
              Surname:{" "}
            </label>
            <input
              value={formData.surname}
              onChange={handleSurnameChange}
              type="text"
              placeholder={user.surname ? user.surname : "Your surname"}
              className="input placeholder:font-bold bg-neutral-300 w-full focus:border-none focus:bg-blue text-stone-900 focus:text-stone-900 placeholder-stone-900 focus:placeholder-stone-900"
            />
          </div>
          <div className="flex flex-col gap-2 my-5">
            <label
              htmlFor="firstName"
              className="text-slate-200  font-bold text-lg "
            >
              {" "}
              Username:{" "}
            </label>
            <input
              value={formData.username}
              onChange={handleUsernameChange}
              type="text"
              placeholder={user.username ? user.username : "Your username"}
              className="input placeholder:font-bold bg-neutral-300 w-full focus:border-none focus:bg-blue text-stone-900 focus:text-stone-900 placeholder-stone-900 focus:placeholder-stone-900"
            />
          </div>
          <div className="flex flex-col justify-around gap-5 my-5">
            <button
              type="submit"
              className="btn bg-cyan-500 text-slate-200 text-lg font-bold border-none"
            >
              Update Your profile
            </button>
            <button
              onClick={handleClickDeconnexion}
              type="button"
              className="btn bg-cyan-500 text-slate-200 text-lg font-bold border-none"
            >
              Disconnect
            </button>
          </div>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
}

export default Profil;
