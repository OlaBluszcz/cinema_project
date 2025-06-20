import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import MovieDetails from "./MovieDetails";
import ScreeningTiles from "./components/ScreeningTiles";
import SeatRoom from "./components/SeatRoom";
import ReservationForm from "./components/ReservationForm";
import Success from "./components/Success"; // dodany import
import "./App.css";

function App() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetch("/api/Movies")
      .then((res) => {
        if (!res.ok) throw new Error("Błąd sieci");
        return res.json();
      })
      .then((data) => setMovies(data))
      .catch((err) => console.error("Błąd ładowania filmów:", err));
  }, []);

  return (
    <Router>
      <div className="container page-home">
        <h1>🍿 Repertuar Kina 🍿</h1>
        <Routes>
          <Route
            path="/"
            element={
              <div className="movie-grid">
                {movies.map((movie) => (
                  <Link to={`/movies/${movie.id}`} key={movie.id} className="movie-card">
                    {movie.posterUrl && <img src={movie.posterUrl} alt={movie.title} className="poster" />}
                    <h2>{movie.title}</h2>
                    <p>{movie.description}</p>
                    <p><strong>Czas trwania:</strong> {movie.duration} min</p>
                  </Link>
                ))}
              </div>
            }
          />
          <Route path="/movies/:id" element={<MovieDetails />} />
          <Route path="/screenings/:screeningId/seats" element={<SeatRoom />} />
          <Route path="/screenings/:screeningId/seats/:seatId/form" element={<ReservationForm />} />
          <Route path="/success" element={<Success />} /> {/* nowa trasa */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;

