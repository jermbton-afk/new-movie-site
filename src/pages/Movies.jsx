import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import Header from '../components/Header';
import API_KEY from ""

export default function Movies() {
let { id } = useParams();
const [movies, setMovies] = useState([])
const [searchId, setSearchId] = React.useState(id)

useEffect(() => {
  async function fetchMovies() {
    const { data } = await axios.get(`http://www.omdbapi.com/?apikey=${API_KEY}`)
    setMovies(data)
  }
  fetchMovies()
}, [])

  return (
    <>
    <Header />
     <div className="movie__search">
      <button></button>
     </div>
    </>
  )
}
