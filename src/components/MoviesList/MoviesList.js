import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  fetchMoviesWithFilters,
  searchMoviesByTitle,
} from "../../services/MovieService";
import Pagination from "../Pagination/Pagination.js";
import "./MoviesList.css";

const MoviesList = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [query, setQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageLimit, setPageLimit] = useState(10);
  const [, setSearchMode] = useState(false);
  const [filterYear, setFilterYear] = useState();
  const [filterCountry, setFilterCountry] = useState();
  const [filterAgeRating, setFilterAgeRating] = useState();
  
  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);
      try {
        const data = await fetchMoviesWithFilters({
          limit: pageLimit,
          page: currentPage,
          selectFields: ["id", "name", "year", "alternativeName"],
          year: filterYear,
          country: filterCountry,
          ageRating: filterAgeRating,
          sortField: ["rating.kp"],
          sortType: ["-1"],
        });
        setMovies(data.docs || []);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch movies.");
      } finally {
        setLoading(false);
      }
    };
  
    fetchMovies();
  }, [currentPage, pageLimit, filterYear, filterCountry, filterAgeRating]); // Ensure these dependencies are included
  
  const generateYearOptions = () => {
    const years = [];
    for (let year = (new Date()).getFullYear(); year >= 1890; year--) {
      years.push(<option key={year} value={year}>{year}</option>);
    }
    return years;
  };
  const handleSearch = async (e, page = 1, limit = 10) => {
    e?.preventDefault();
    setLoading(true);
    setError("");
    setSearchMode(true);

    try {
      const data = await searchMoviesByTitle(query, page, pageLimit);
      setMovies(data.docs || []);
    } catch (err) {
      console.error(err);
      setError("Failed to search for movies.");
    } finally {
      setLoading(false);
    }
  };
  
  const handleLimitChange = (event) => {
    setPageLimit(Number(event.target.value));
    setCurrentPage(1);  // Reset to page 1 whenever the limit changes
  };

  return (
    <div className="movies-list">
      <header>
        <h1>Movies List</h1>
      </header>
      <form  onSubmit={handleSearch}>
        <div className="search-form">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for a movie..."
        />
        <select className="page-limit-select" value={pageLimit} onChange={handleLimitChange}>
          <option value="10">10</option>
          <option value="20">20</option>
          <option value="50">50</option>
          <option value="100">100</option>
        </select>
        <button className="search-btn" type="submit">Search</button>
        </div>
        <div className={'filter-selects'}>
          <select value={filterYear} onChange={e => setFilterYear(e.target.value ?? '')}>
          <option value="">Select a Year</option>
          {generateYearOptions()}
        </select>
                  <select  value={filterCountry} onChange={e => setFilterCountry(e.target.value ?? '')}>
                    <option value="">Select a Country</option>
                    <option value="США">США</option>
                    <option value="Россия">Россия</option>
                    <option value="Китай">Китай</option>
                    <option value="Япония">Япония</option>
                  </select>
                  <select  value={filterAgeRating} onChange={e => setFilterAgeRating(e.target.value ?? '')}>
                    <option value="">Select Age Rating</option>
                    <option value="0">0+</option>
                    <option value="6">6+</option>
                    <option value="12">12+</option>
                    <option value="16">16+</option>
                    <option value="18">18+</option>
                  </select>
        </div>
      </form>
      

      {loading && <div>Loading...</div>}
      {error && <div>Error: {error}</div>}
      {!error && !loading && (
        <nav>
          {movies.length
            ? movies.map((movie) => (
                <article key={movie.id}>
                  <Link to={`/movie/${movie.id}`}>
                    <h2>
                      {movie.name || movie.alternativeName} ({movie.year})
                    </h2>
                  </Link>
                </article>
              ))
            : "No movies were found"}
        </nav>
      )}
      <Pagination
        currentPage={currentPage}
        onPageChange={(page) => setCurrentPage(page)}
      />
    </div>
  );
};

export default MoviesList;
