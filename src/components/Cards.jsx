import { Link } from "react-router-dom";

import "../assets/css/cards.css";

export default function Cards({ data, path }) {
  return (
    <section className="wrapper cards-bloc">
      {data.results.map((element) => {
        let picture = `${element.thumbnail.path}/portrait_large.${element.thumbnail.extension}`;

        return (
          <Link
            key={element._id}
            to={`${path}${element._id}`}
            state={{ data: element }}
            className="card"
          >
            <p>{element.name || element.title}</p>
            {picture && <img src={picture} alt="picture of a hero" />}
            {element.description ? (
              <p className="card-description">{element.description}</p>
            ) : (
              <p className="to-complete">Need to be completed !</p>
            )}
          </Link>
        );
      })}
    </section>
  );
}
