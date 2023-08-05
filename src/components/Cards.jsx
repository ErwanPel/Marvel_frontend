import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import "../assets/css/cards.css";

export default function Cards({ data, path }) {
  const handleEvent = (event) => {
    if (event && event.stopPropagation) event.stopPropagation();
    console.log(event);
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
              <div
                className="favorite"
                onClick={((event) => event.stopPropagation(), true)}
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
