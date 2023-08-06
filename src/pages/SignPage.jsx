import { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";

export default function SignPage({ setSignModal, setToken }) {
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [power, setPower] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (setState, event) => {
    setErrorMessage("");
    setState(event.target.value);
  };

  const fetchData = async (data) => {
    try {
      console.log("data", data);
      const response = await axios.post(
        "https://site--marvel-backend--fwddjdqr85yq.code.run/signup",
        data
      );
      Cookies.set("token", response.data.token, { expires: 7 });
      setToken(() => response.data.token);
    } catch (error) {
      console.log(error.response);
      if (
        error.response.data.message.match(
          "E11000 duplicate key error collection: marvel.users index: email_1 dup key:"
        )
      ) {
        setErrorMessage("L'adresse mail est déjà utilisée");
      }
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (confirmPassword === password) {
      console.log("oui");
      fetchData({
        username,
        email,
        password,
        power,
      });

      setSignModal(false);
    } else {
      setErrorMessage("Les deux mots de passe ne sont pas identiques !");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Inscription</h3>
      <div>
        <label htmlFor="name">Ton nom :</label>
        <input
          type="text"
          name="name"
          id="name"
          required={true}
          onChange={(event) => handleChange(setUserName, event)}
          value={username}
        />
      </div>
      <div>
        <label htmlFor="email">Ton email :</label>
        <input
          type="email"
          name="email"
          id="email"
          required={true}
          onChange={(event) => handleChange(setEmail, event)}
          value={email}
        />
      </div>
      <div>
        <label htmlFor="password">Ton mot de passe :</label>
        <input
          type="password"
          name="password"
          id="password"
          required={true}
          onChange={(event) => handleChange(setPassword, event)}
          value={password}
        />
      </div>
      <div>
        <label htmlFor="confirmPassword">Confirme mot de passe :</label>
        <input
          type="password"
          name="confirmPassword"
          id="confirmPassword"
          required={true}
          onChange={(event) => handleChange(setConfirmPassword, event)}
          value={confirmPassword}
        />
      </div>
      <div>
        <label htmlFor="power">Quel serait ton pouvoir :</label>
        <input
          type="text"
          name="power"
          id="power"
          required={true}
          onChange={(event) => handleChange(setPower, event)}
          value={power}
        />
      </div>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <button>S'inscrire</button>
    </form>
  );
}
