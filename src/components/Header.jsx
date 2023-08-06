import Logo from "../assets/img/LogoMarvel.webp";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import { useEffect } from "react";

import "../assets/css/header.css";

export default function Header({
  loginModal,
  setLoginModal,
  signModal,
  setSignModal,
  token,
  setToken,
}) {
  const getSignUp = () => {
    setSignModal(!signModal);
  };

  const getLogin = () => {
    setLoginModal(!loginModal);
  };

  const removeToken = () => {
    Cookies.remove("token");
    setToken("");
  };

  return (
    <header>
      <Link to="/">
        <img src={Logo} alt="Logo marvel écrit en blanc sur fond rouge" />
      </Link>
      <div>
        {!token ? (
          <>
            <button onClick={getSignUp}>S'INSCRIRE</button>
            <button onClick={getLogin}>SE CONNECTER</button>
          </>
        ) : (
          <button onClick={removeToken}>DECONNEXION</button>
        )}
      </div>

      <div>
        <Link to="/">
          <button>PERSONNAGES</button>
        </Link>
        <Link to="/comics">
          <button>COMICS</button>
        </Link>
      </div>
    </header>
  );
}
