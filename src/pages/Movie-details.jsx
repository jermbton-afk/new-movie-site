// MovieDetails.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./Movie-details.css"; 
import Header from "../components/Header";
import Footer from "../components/Footer";

const MovieDetails = () => {
  const { id } = useParams(); 
  const [movie, setMovie] = useState(null);
  const API_KEY = "7fcbec3";

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const { data } = await axios.get(
          `https://www.omdbapi.com/?i=${id}&apikey=${API_KEY}`,
        );
        setMovie(data);
      } catch (error) {
        console.error("Error fetching movie details:", error);
      }
    };

    fetchMovieDetails();
  }, [id]);

  if (!movie) return <div>Loading...</div>; 

  return (
    <>
      <Header />
      <div className="movie-details">
        <h1>{movie.Title}</h1>
        <img src={movie.Poster} alt={movie.Title} />
        <div className="details">
          <p>{movie.Plot}</p>
          <div className="rating">Rating: {movie.Rated}</div>
         
        </div>
        <button onClick={() => window.history.back()}>Back</button>
      </div>
      <Footer />
    </>
  );
};

export default MovieDetails;
