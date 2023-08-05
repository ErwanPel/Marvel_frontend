import Logo from "../assets/img/LogoMarvel.webp";
import { Link } from "react-router-dom";

import "../assets/css/header.css";

export default function Header() {
  return (
    <header>
      <Link to="/">
        <img src={Logo} alt="Logo marvel écrit en blanc sur fond rouge" />
      </Link>

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
