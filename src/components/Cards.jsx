import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Cookies from "js-cookie";

import "../assets/css/cards.css";

export default function Cards({
  data,
  path,
  cookiesChar,
  setCookiesChar,
  cookiesComics,
  setCookiesComics,
  loginModal,
  signModal,
  cookiesSort,
}) {
  console.log("sort", cookiesSort);

  const handleFav = (id, favData, event) => {
    event.preventDefault();
    if (favData.title) {
      if (Cookies.get("comics")) {
        let array = JSON.parse(Cookies.get("comics"));

        if (array.indexOf(id) === -1) {
          array.push(id);
          Cookies.set("comics", JSON.stringify(array));
          setCookiesComics((cookiesComics) => [...cookiesComics, id]);
        } else {
          let array = JSON.parse(Cookies.get("comics"));
          array.splice(array.indexOf(id), 1);
          Cookies.set("comics", JSON.stringify(array));
          const cookiesArray = [...cookiesComics];
          cookiesArray.splice(cookiesArray.indexOf(id), 1);
          setCookiesComics(cookiesArray);
        }
      } else {
        Cookies.set("comics", JSON.stringify([id]));
        setCookiesComics((cookiesComics) => [...cookiesComics, id]);
      }
    } else {
      if (Cookies.get("characters")) {
        let array = JSON.parse(Cookies.get("characters"));

        if (array.indexOf(id) === -1) {
          array.push(id);
          Cookies.set("characters", JSON.stringify(array));
          setCookiesChar((cookiesChar) => [...cookiesChar, id]);
        } else {
          let array = JSON.parse(Cookies.get("characters"));
          array.splice(array.indexOf(id), 1);
          Cookies.set("characters", JSON.stringify(array));
          const cookiesArray = [...cookiesChar];
          cookiesArray.splice(cookiesArray.indexOf(id), 1);
          setCookiesChar(cookiesArray);
        }
      } else {
        Cookies.set("characters", JSON.stringify([id]));
        setCookiesChar((cookiesChar) => [...cookiesChar, id]);
      }
    }
  };

  return (
    <main className="wrapper cards-bloc">
      {data.results.map((element) => {
        let picture = `${element.thumbnail.path}/portrait_large.${element.thumbnail.extension}`;

        return (
          <>
            <Link
              key={element._id}
              to={`${path}${element._id}`}
              state={{ data: element }}
              className="card"
            >
              {}
              <div
                className={
                  ((loginModal || signModal) &&
                    "favorite-modal" &&
                    (cookiesSort.indexOf(element._id) === -1
                      ? "favorite-modal"
                      : "favorite-modal  full-heart-modal")) ||
                  (cookiesSort.indexOf(element._id) === -1
                    ? "favorite"
                    : "favorite  full-heart")
                }
                onClick={(event) => handleFav(element._id, element, event)}
              >
                <FontAwesomeIcon className="heart" icon="fa-regular fa-heart" />
              </div>
              <p>{element.name || element.title}</p>
              {picture && <img src={picture} alt="picture of a hero" />}
              {element.description ? (
                <p className="card-description">{element.description}</p>
              ) : (
                <p className="to-complete">Need to be completed !</p>
              )}
            </Link>
          </>
        );
      })}
    </main>
  );
}
