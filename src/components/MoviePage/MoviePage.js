import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { fetchMovieDetails } from "../../services/MovieService";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Pagination from "../Pagination/Pagination";
import "./MoviePage.css";

const MoviePage = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [sliderSettings] = useState({
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    arrows: false,
  });

  const [currentPage, setCurrentPage] = useState(1);
  const actorsPerPage = 6;

  const indexOfLastActor = currentPage * actorsPerPage;
  const indexOfFirstActor = indexOfLastActor - actorsPerPage;
  const currentActors = movie?.persons?.slice(
    indexOfFirstActor,
    indexOfLastActor
  );

  useEffect(() => {
    const loadMovieDetails = async () => {
      try {
        setIsLoading(true);
        const data = await fetchMovieDetails(id);
        setMovie(data);
      } catch (error) {
        console.error("Failed to load movie details:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadMovieDetails();
  }, [id]);

  if (isLoading) return <div>Loading...</div>;
  if (!movie) return <div>Movie not found</div>;

  return (
    <div className="movie-detail">
      <nav>
        <Link to="/">Back to list</Link>
      </nav>
      <section className="movie-details">
        <div className="poster-container">
          <img
            className="poster-image"
            style={{ maxWidth: "100%", height: "auto" }}
            src={movie.poster.url}
            alt={`Poster of ${movie.name}`}
          />
        </div>
        <div className="description-container">
          <div style={{display: "flex", justifyContent: "space-between"}}>
          <h1>{movie.name ? movie.name : "Movie Name was not provided"}</h1>
          <h2>Raiting: {movie.rating.kp}</h2>
          </div>
          <p>
            {movie.description
              ? movie.description
              : "No movie Description provided"}
          </p>
        </div>
      </section>
      <section>
        <h2>Actors</h2>
        {movie.persons && movie.persons.length > 0 ? (
          <div className={'actors-container'}>
            {currentActors.map((person) => (
              <div className={'actor-card'}key={person.id}>
                <img
                  style={{ height: 100, width: "auto" }}
                  src={person.photo}
                  alt={`Photo of ${person.name}`}
                />
                <p>{person.name}</p>
              </div>
            ))}
          </div>
        ) : (
          <p>No information about actors.</p>
        )}
        <Pagination
          currentPage={currentPage}
          totalPages={Math.ceil(movie.persons.length / actorsPerPage)}
          onPageChange={(page) => setCurrentPage(page)}
        />
      </section>
      <section>
        <h2>Similar Movies</h2>
        {movie.similarMovies && movie.similarMovies.length > 0 ? (
          <Slider {...sliderSettings}>
            {movie.similarMovies.map((similarMovie) => (
              <Link key={similarMovie.id} to={`/movie/${similarMovie.id}`}>
                <div>
                  <img
                    src={similarMovie.poster.url}
                    alt={`Poster of ${similarMovie.name}`}
                    style={{ width: "100%", height: "auto" }}
                  />
                  <p>{similarMovie.name}</p>
                </div>
              </Link>
            ))}
          </Slider>
        ) : (
          <p>No similar movies found.</p>
        )}
      </section>
    </div>
  );
};

export default MoviePage;
