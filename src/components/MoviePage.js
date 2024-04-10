import React from "react";
import { useParams, Link } from "react-router-dom";

const MoviePage = () => {
  const { id } = useParams();
  const movie = {
    id: parseInt(id),
    title: "Some Movie",
    description: "Description here",
    actors: ["Actor One", "Actor Two"],
    seasons: [{ title: "Season 1", episodes: ["Episode 1", "Episode 2"] }],
    reviews: ["Review 1", "Review 2"],
    posters: ["/images/poster1.jpg", "/images/poster2.jpg"],
    similarMovies: [{ id: 2, title: "Similar Movie" }],
  };

  return (
    <div className="movie-detail">
      <nav>
        <Link to="/">Back to list</Link>
      </nav>
      <header>
        <h1>{movie.title}</h1>
      </header>
      <section>
        <p>{movie.description}</p>
      </section>
      <section>
        <h2>Actors</h2>
        <p>{movie.actors.join(", ")}</p>
      </section>
      <section>
        <h2>Posters</h2>
        {movie.posters.map((poster, index) => (
          <figure key={index}>
            <img src={poster} alt={`Poster of ${movie.title}`} />
            <figcaption>{`Poster ${index + 1}`}</figcaption>
          </figure>
        ))}
      </section>
    </div>
  );
};

export default MoviePage;
