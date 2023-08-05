import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { library } from "@fortawesome/fontawesome-svg-core";

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

library.add(
  faChevronRight,
  faChevronLeft,
  faAnglesRight,
  faAnglesLeft,
  faHeart
);

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<AllCharactersPage />} />
        <Route path="/:characterId" element={<CharacterPage />} />
        <Route path="/comics" element={<AllComicsPage />} />
        <Route path="/comic/:comicId" element={<ComicPage />} />
      </Routes>
    </Router>
  );
}

export default App;
