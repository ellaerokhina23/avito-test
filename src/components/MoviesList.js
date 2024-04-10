import React, { useState } from "react";
import { Link } from "react-router-dom";

const MoviesList = () => {
  // Movies Array
  const movies = [
    {
      id: 1,
      title: "The Shawshank Redemption",
      year: 1994,
      country: "USA",
      rating: "R",
    },
    {
      id: 2,
      title: "The Godfather",
      year: 1972,
      country: "USA",
      rating: "R",
    },
    {
      id: 3,
      title: "Inception",
      year: 2010,
      country: "USA",
      rating: "PG-13",
    },
    {
      id: 4,
      title: "Pulp Fiction",
      year: 1994,
      country: "USA",
      rating: "R",
    },
    {
      id: 5,
      title: "Schindler's List",
      year: 1993,
      country: "USA",
      rating: "R",
    },
    {
      id: 6,
      title: "The Matrix",
      year: 1999,
      country: "USA",
      rating: "R",
    },
    {
      id: 7,
      title: "The Lord of the Rings: The Fellowship of the Ring",
      year: 2001,
      country: "New Zealand",
      rating: "PG-13",
    },
    {
      id: 8,
      title: "Star Wars: Episode V - The Empire Strikes Back",
      year: 1980,
      country: "USA",
      rating: "PG",
    },
    {
      id: 9,
      title: "Forrest Gump",
      year: 1994,
      country: "USA",
      rating: "PG-13",
    },
    {
      id: 10,
      title: "Fight Club",
      year: 1999,
      country: "USA",
      rating: "R",
    },
  ];

  // States for Filter and Search
  const [searchTerm, setSearchTerm] = useState("");
  const [activePage, setActivePage] = useState(1);

  const filteredMovies = movies.filter((movie) =>
    movie.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="movies-list">
      <header>
        <h1>Movies List</h1>
      </header>
      <input
        type="text"
        placeholder="Search by title..."
        aria-label="Search movies by title"
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <nav>
        {filteredMovies.map((movie) => (
          <article key={movie.id}>
            <Link to={`/movie/${movie.id}`}>
              <h2>
                {movie.title} ({movie.year})
              </h2>
            </Link>
          </article>
        ))}
      </nav>
    </div>
  );
};

export default MoviesList;
