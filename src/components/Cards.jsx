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
  // const handleFav = (id, favData, event) => {
  //   event.preventDefault();
  //   console.log(favData);
  //   if (favData.title) {
  //     console.log("comic", cookiesComics.indexOf(id));
  //     const favori = favData.title;
  //     console.log("comics");
  //     if (!Cookies.get(id)) {
  //       Cookies.set(id, id);
  //       setCookiesComics((cookiesComics) => [...cookiesComics, id]);
  //     } else {
  //       Cookies.remove(id);
  //       const cookiesArray = [...cookiesComics];
  //       cookiesArray.splice(cookiesArray.indexOf(id), 1);
  //       setCookiesComics(cookiesArray);
  //     }
  //   } else {
  //     console.log("chara");
  //     console.log("chara", cookiesChar.indexOf(id));
  //     if (!Cookies.get(id)) {
  //       const favori = favData.name;
  //       Cookies.set(id, id);
  //       setCookiesChar((cookiesChar) => [...cookiesChar, id]);
  //     } else {
  //       Cookies.remove(id);
  //       const cookiesArray = [...cookiesChar];
  //       cookiesArray.splice(cookiesArray.indexOf(id), 1);
  //       setCookiesChar(cookiesArray);
  //     }
  //   }
  // };

  console.log("sort", cookiesSort);

  const handleFav = (id, favData, event) => {
    event.preventDefault();
    if (favData.title) {
      console.log("comics");
      if (Cookies.get("comics")) {
        console.log("existe");
        let array = JSON.parse(Cookies.get("comics"));
        console.log("prev", array);
        if (array.indexOf(id) === -1) {
          array.push(id);
          Cookies.set("comics", JSON.stringify(array));
          setCookiesComics((cookiesComics) => [...cookiesComics, id]);
          console.log(JSON.parse(Cookies.get("comics")));
        } else {
          let array = JSON.parse(Cookies.get("comics"));
          array.splice(array.indexOf(id), 1);
          Cookies.set("comics", JSON.stringify(array));
          const cookiesArray = [...cookiesComics];
          cookiesArray.splice(cookiesArray.indexOf(id), 1);
          setCookiesComics(cookiesArray);
          console.log("fin supp", JSON.parse(Cookies.get("comics")));
        }
      } else {
        console.log("n'existe pas");
        Cookies.set("comics", JSON.stringify([id]));
        setCookiesComics((cookiesComics) => [...cookiesComics, id]);
        console.log(JSON.parse(Cookies.get("comics")));
      }
    } else {
      console.log("char");
      if (Cookies.get("characters")) {
        console.log("existe");
        let array = JSON.parse(Cookies.get("characters"));
        console.log("prev", array);
        if (array.indexOf(id) === -1) {
          array.push(id);
          Cookies.set("characters", JSON.stringify(array));
          setCookiesChar((cookiesChar) => [...cookiesChar, id]);
          console.log(JSON.parse(Cookies.get("characters")));
        } else {
          let array = JSON.parse(Cookies.get("characters"));
          array.splice(array.indexOf(id), 1);
          Cookies.set("characters", JSON.stringify(array));
          const cookiesArray = [...cookiesChar];
          cookiesArray.splice(cookiesArray.indexOf(id), 1);
          setCookiesChar(cookiesArray);
          console.log("fin supp", JSON.parse(Cookies.get("characters")));
        }
      } else {
        console.log("n'existe pas");
        Cookies.set("characters", JSON.stringify([id]));
        setCookiesChar((cookiesChar) => [...cookiesChar, id]);
        console.log(JSON.parse(Cookies.get("characters")));
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
