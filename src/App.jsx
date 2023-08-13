import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { library } from "@fortawesome/fontawesome-svg-core";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";

import AllCharactersPage from "./pages/AllCharactersPage";
import Header from "./components/Header";
import CharacterPage from "./pages/CharacterPage";
import ComicPage from "./pages/ComicPage";
import AllComicsPage from "./pages/AllComicsPage";

import "./assets/css/App.css";

import {
  faChevronRight,
  faChevronLeft,
  faAnglesRight,
  faAnglesLeft,
} from "@fortawesome/free-solid-svg-icons";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import Modal from "./components/Modal";

library.add(
  faChevronRight,
  faChevronLeft,
  faAnglesRight,
  faAnglesLeft,
  faHeart
);

function App() {
  const [loginModal, setLoginModal] = useState(false);
  const [signModal, setSignModal] = useState(false);
  const [token, setToken] = useState(Cookies.get("token") || "");
  // cookiesChar and cookiesComics are use for save either for cookies navigator
  // or database
  const [cookiesComics, setCookiesComics] = useState([]);
  const [cookiesChar, setCookiesChar] = useState([]);
  const [autocompleteList, setAutocompleteList] = useState(false);

  return (
    <Router>
      <Header
        loginModal={loginModal}
        setLoginModal={setLoginModal}
        signModal={signModal}
        setSignModal={setSignModal}
        token={token}
        setToken={setToken}
        cookiesComics={cookiesComics}
        setCookiesComics={setCookiesComics}
        cookiesChar={cookiesChar}
        setCookiesChar={setCookiesChar}
        setAutocompleteList={setAutocompleteList}
      />
      <Routes>
        <Route
          path="/"
          element={
            <AllCharactersPage
              loginModal={loginModal}
              signModal={signModal}
              token={token}
              cookiesChar={cookiesChar}
              setCookiesChar={setCookiesChar}
              setLoginModal={setLoginModal}
              autocompleteList={autocompleteList}
              setAutocompleteList={setAutocompleteList}
            />
          }
        />
        <Route path="/:characterId" element={<CharacterPage />} />
        <Route
          path="/comics"
          element={
            <AllComicsPage
              loginModal={loginModal}
              signModal={signModal}
              token={token}
              cookiesComics={cookiesComics}
              setCookiesComics={setCookiesComics}
              setLoginModal={setLoginModal}
              autocompleteList={autocompleteList}
              setAutocompleteList={setAutocompleteList}
            />
          }
        />
        <Route path="/comic/:comicId" element={<ComicPage />} />
      </Routes>
      {loginModal && (
        <Modal
          loginModal={loginModal}
          setLoginModal={setLoginModal}
          setToken={setToken}
        />
      )}
      {signModal && (
        <Modal
          signModal={signModal}
          setSignModal={setSignModal}
          setToken={setToken}
        />
      )}
    </Router>
  );
}

export default App;
