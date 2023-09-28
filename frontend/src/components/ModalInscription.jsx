import PropTypes from "prop-types";
import { useState } from "react";

import expressApi from "../services/expressApi";
import { useCurrentUserContext } from "../Contexts/CurrentUserContext";

function ModalInscription({ toggleModalInscritpion }) {
  const [formDataInscription, setFormDataInscription] = useState({
    username: "",
    password: "",
    passwordConfirm: "",
  });
  const [errorValues, setErrorValues] = useState("");
  const { setUser } = useCurrentUserContext();

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormDataInscription((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const checkSignupForm = (obj) => {
    const values = [];
    let message = "";

    for (const [key, value] of Object.entries(obj)) {
      if (!value.length) {
        values.push(` ${key}`);
      }
    }

    if (values.length) {
      if (values.length === 1) {
        message = `Complete these fields${values[0]}.`;
      } else {
        message = `Complete these fields${[...values]}.`;
      }
    }
    if (obj.password !== obj.passwordConfirm) {
      message += "Passwords did not match";
    }
    if (obj.password.length < 8) {
      message += " Your password must be at least 8 characters long.";
    }
    const hasDigit = /\d/.test(obj.password);
    const hasUpperCase = /[A-Z]/.test(obj.password);
    const hasSpecialChar = /[+−*/=<>%!@#$^&;:"'(),.~_]/.test(obj.password);
    if (!hasDigit || !hasUpperCase || !hasSpecialChar) {
      message +=
        " Your password must contain at least one digit, one uppercase letter and one special character.";
    }
    return message.replace("_", " ");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errorMessage = checkSignupForm(formDataInscription);
    if (!errorMessage.length) {
      await expressApi
        .post(`/signup`, {
          username: formDataInscription.username,
          password: formDataInscription.password,
        })
        .then((res) => {
          setUser(res.data);
          localStorage.setItem("user", JSON.stringify(res.data));
          toggleModalInscritpion();
        })
        .catch((err) => {
          setErrorValues(err.response?.data);
        });
    } else {
      setErrorValues(errorMessage);
    }
  };

  return (
    <div className="fixed inset-0 h-screen flex items-center justify-center bg-zinc-800 bg-opacity-70 z-20 ">
      <div className=" bg-slate-500 rounded-xl w-80 ">
        <div className="flex items-center justify-between  rounded-t-xl p-3">
          <h3 className="text-xl text-slate-200 font-bold">Sign Up :</h3>
          <button type="button" onClick={toggleModalInscritpion}>
            <svg
              width="32px"
              height="32px"
              strokeWidth="1.5"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              color="#E5E9E7"
            >
              <path
                d="M9.172 14.828L12.001 12m2.828-2.828L12.001 12m0 0L9.172 9.172M12.001 12l2.828 2.828M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"
                stroke="#E5E9E7"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
        <div className="flex flex-col gap-3 p-3">
          <form onSubmit={handleSubmit} className="flex flex-col gap-2">
            <div>
              <label
                htmlFor="username"
                className="text-slate-200  font-bold text-lg "
              >
                Username :
              </label>
              <input
                className="input bg-neutral-300 w-full focus:border-none focus:bg-blue text-stone-900 focus:text-stone-900 placeholder-stone-900 focus:placeholder-stone-900"
                type="text"
                id="formDataConnexion.username"
                name="username"
                placeholder="Your username"
                value={formDataInscription.username || ""}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="text-slate-200 font-bold text-lg"
              >
                Password :
              </label>
              <input
                className="input bg-neutral-300 w-full focus:border-none focus:bg-blue text-stone-900 focus:text-stone-900 placeholder-stone-900 focus:placeholder-stone-900"
                type="password"
                id="formDataInscription.password"
                name="password"
                placeholder="Your password"
                value={formDataInscription.password || ""}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="text-slate-200  font-bold text-lg"
              >
                Confirm your password :
              </label>
              <input
                className="input bg-neutral-300 w-full focus:border-none focus:bg-blue text-stone-900 focus:text-stone-900 placeholder-stone-900 focus:placeholder-stone-900"
                type="password"
                id="formDataInscription.passwordConfirm"
                name="passwordConfirm"
                placeholder="Password verification"
                value={formDataInscription.passwordConfirm || ""}
                onChange={handleChange}
                required
              />
            </div>
          </form>
          <p className="text-sm text-red-700">{errorValues}</p>

          <button
            type="submit"
            onClick={handleSubmit}
            className="btn btn-sm border-none bg-cyan-500 text-slate-200"
          >
            S'incrire
          </button>
        </div>
      </div>
    </div>
  );
}
ModalInscription.propTypes = {
  toggleModalInscritpion: PropTypes.func.isRequired,
};
export default ModalInscription;
