import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import Cookies from "js-cookie";
import "../assets/css/cards.css";

import axios from "axios";

export default function Cards({
  data,
  path,
  cookiesChar,
  setCookiesChar,
  cookiesComics,
  setCookiesComics,
  loginModal,
  setLoginModal,
  signModal,
  cookiesSort,
  token,
}) {
  // ----------------- METHOD TO SAVE WITH DATABASE -----------------------------

  const sendFav = async (data) => {
    try {
      const response = await axios.post(
        "https://site--marvel-backend--fwddjdqr85yq.code.run/favorites",
        data,
        { headers: { authorization: `Bearer ${token}` } }
      );
    } catch (error) {
      console.log(error.response);
    }
  };

  const deleteFav = async ({ type, id }) => {
    try {
      const response = await axios.delete(
        `https://site--marvel-backend--fwddjdqr85yq.code.run/favorites?${type}=${id}`,

        { headers: { authorization: `Bearer ${token}` } }
      );
      console.log("post fav", response.data);
    } catch (error) {
      console.log(error.response);
    }
  };

  const handleFav = (id, favData, event) => {
    event.preventDefault();

    if (favData?.title) {
      if (cookiesComics.includes(id)) {
        console.log("present");
        deleteFav({ type: "comics", id: id });
        const cookiesArray = [...cookiesComics];
        cookiesArray.splice(cookiesArray.indexOf(id), 1);
        setCookiesComics(cookiesArray);
      } else {
        sendFav({ comics: id });
        setCookiesComics((cookiesComics) => [...cookiesComics, id]);
      }
      sendFav({ comics: id });
    } else {
      if (cookiesChar.includes(id)) {
        console.log("present");
        deleteFav({ type: "characters", id: id });
        const cookiesArray = [...cookiesChar];
        cookiesArray.splice(cookiesArray.indexOf(id), 1);
        setCookiesChar(cookiesArray);
      } else {
        sendFav({ characters: id });
        setCookiesChar((cookiesChar) => [...cookiesChar, id]);
      }
    }
  };

  // ----------METHOD TO SAVE WITH COOKIES-------------------------

  // const handleFav = (id, favData, event) => {
  //   event.preventDefault();
  //   if (favData?.title) {
  //     if (Cookies.get("comics")) {
  //       let array = JSON.parse(Cookies.get("comics"));

  //       if (array.indexOf(id) === -1) {
  //         array.push(id);
  //         Cookies.set("comics", JSON.stringify(array), { expires: 7 });
  //         setCookiesComics((cookiesComics) => [...cookiesComics, id]);
  //       } else {
  //         let array = JSON.parse(Cookies.get("comics"));
  //         array.splice(array.indexOf(id), 1);
  //         Cookies.set("comics", JSON.stringify(array), { expires: 7 });
  //         const cookiesArray = [...cookiesComics];
  //         cookiesArray.splice(cookiesArray.indexOf(id), 1);
  //         setCookiesComics(cookiesArray);
  //       }
  //     } else {
  //       Cookies.set("comics", JSON.stringify([id]), { expires: 7 });
  //       setCookiesComics((cookiesComics) => [...cookiesComics, id]);
  //     }
  //   } else {
  //     if (Cookies.get("characters")) {
  //       let array = JSON.parse(Cookies.get("characters"));

  //       if (array.indexOf(id) === -1) {
  //         array.push(id);
  //         Cookies.set("characters", JSON.stringify(array), { expires: 7 });
  //         setCookiesChar((cookiesChar) => [...cookiesChar, id]);
  //       } else {
  //         let array = JSON.parse(Cookies.get("characters"));
  //         array.splice(array.indexOf(id), 1);
  //         Cookies.set("characters", JSON.stringify(array), { expires: 7 });
  //         const cookiesArray = [...cookiesChar];
  //         cookiesArray.splice(cookiesArray.indexOf(id), 1);
  //         setCookiesChar(cookiesArray);
  //       }
  //     } else {
  //       Cookies.set("characters", JSON.stringify([id]), { expires: 7 });
  //       setCookiesChar((cookiesChar) => [...cookiesChar, id]);
  //     }
  //   }
  // };

  const displayModal = (event) => {
    event.preventDefault();
    console.log("ici");
    setLoginModal(!loginModal);
  };

  return (
    <main className="wrapper cards-bloc">
      {data.results.length > 0 ? (
        data.results.map((element) => {
          let picture = `${element.thumbnail.path}/portrait_large.${element.thumbnail.extension}`;

          return (
            <Link
              key={element._id}
              to={`${path}${element._id}`}
              state={{ data: element }}
              className="card"
            >
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
                onClick={
                  token
                    ? (event) => handleFav(element._id, element, event)
                    : displayModal
                }
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
          );
        })
      ) : (
        <p className="section-to-complete">Sorry but nothing is find</p>
      )}
    </main>
  );
}
