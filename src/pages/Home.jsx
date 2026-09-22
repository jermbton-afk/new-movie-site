import { useEffect, useState } from "react";
import Header from "../components/Header";
import axios from "axios";
import "./Home.css";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";

export default function Home() {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState("title-asc");
  const API_KEY = "7fcbec3";

  useEffect(() => {
    fetchFeaturedMovies();
  }, []);

  async function fetchFeaturedMovies() {
    try {
      const { data } = await axios.get(
        `https://www.omdbapi.com/?s=home&apikey=${API_KEY}`,
      );
      setMovies(data.Search);
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  }

  const handleSearch = async (e) => {
    e.preventDefault(); // Prevent form submission
    if (searchTerm.trim()) {
      try {
        const { data } = await axios.get(
          `https://www.omdbapi.com/?s=${searchTerm}&apikey=${API_KEY}`,
        );
        setMovies(data.Search || []);
      } catch (error) {
        console.error("Error searching movies:", error);
      }
    }
  };

  const sortedMovies = () => {
    return [...movies].sort((a, b) => {
      switch (sortOption) {
        case "year":
          return parseInt(a.Year) - parseInt(b.Year);
        case "title-asc":
          return a.Title.localeCompare(b.Title);
        case "title-desc":
          return b.Title.localeCompare(a.Title);
        case "rating":
          return (b.imdbRating || 0) - (a.imdbRating || 0);
        default:
          return 0;
      }
    });
  };

  return (
    <>
      <Header />
      <div className="container">
        <div className="movie--search">
          <form onSubmit={handleSearch}>
            <input
              type="text"
              placeholder="Search for movies..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button type="submit">Search</button>
          </form>
        </div>
        <div className="filter--container">
        <select
          className="filter"
          onChange={(e) => setSortOption(e.target.value)}
          value={sortOption}
        >
          <option value="year">Sort by Year</option>
          <option value="title-asc">Sort A-Z</option>
          <option value="title-desc">Sort Z-A</option>
          <option value="rating">Sort by Rating</option>
        </select>
        </div>
        <div className="row">
          {sortedMovies().map((movie) => (
            <div className="movie" key={movie.imdbID}>
              <Link to={`/movie/${movie.imdbID}`}>
                <div className="movie-card">
                  <div className="movie-card__container">
                    <h2>{movie.Title}</h2>
                    <p>{movie.Year}</p>
                    <img src={movie.Poster} alt={movie.Title} />
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
        <Footer />
      </div>
    </>
  );
}
