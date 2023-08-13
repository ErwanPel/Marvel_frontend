import Logo from "../assets/img/LogoMarvel.webp";
import { Link, Navigate, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

import "../assets/css/header.css";

export default function Header({
  loginModal,
  setLoginModal,
  signModal,
  setSignModal,
  token,
  setToken,
  setCookiesChar,
  setCookiesComics,
  setAutocompleteList,
}) {
  const navigate = useNavigate();

  const getSignUp = () => {
    setAutocompleteList(false);
    setSignModal(!signModal);
  };

  const getLogin = () => {
    setAutocompleteList(false);
    setLoginModal(!loginModal);
  };

  const removeToken = () => {
    Cookies.remove("token");
    setCookiesChar([]);
    setCookiesComics([]);
    setToken("");
  };

  return (
    <header>
      <Link to="/">
        <img src={Logo} alt="Logo marvel écrit en blanc sur fond rouge" />
      </Link>
      <div>
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
          <button onClick={() => navigate("/")}>PERSONNAGES</button>

          <button onClick={() => navigate("/comics")}>COMICS</button>
        </div>
      </div>
    </header>
  );
}
