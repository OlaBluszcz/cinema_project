import React, { useEffect, useState, useMemo, useRef } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";
import MovieDetails from "./MovieDetails";
import SeatRoom from "./components/SeatRoom";
import ReservationForm from "./components/ReservationForm";
import Success from "./components/Success";
import { useFavoritesStore } from "./store/useFavorites"; // ✅ Zustand
import "./App.css";

function App() {
  const [movies, setMovies] = useState([]);
  const listRef = useRef(null);
  const { addFavorite, favorites } = useFavoritesStore(); // ✅ Zustand hook

  useEffect(() => {
    fetch("/api/Movies")
      .then((res) => {
        if (!res.ok) throw new Error("Błąd sieci");
        return res.json();
      })
      .then((data) => setMovies(data))
      .catch((err) => console.error("Błąd ładowania filmów:", err));
  }, []);

  const sortedMovies = useMemo(() => {
    return [...movies].sort((a, b) => a.title.localeCompare(b.title));
  }, [movies]);

  useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [sortedMovies]);

  return (
    <Router>
      <div className="container page-home">
        <h1 ref={listRef}>🍿 Repertuar Kina 🍿</h1>
        <p><strong>Ulubione:</strong> {favorites.length}</p> {/* ✅ licznik */}

        <Routes>
          <Route
            path="/"
            element={
              <div className="movie-grid">
                {sortedMovies.length === 0 ? (
                  <p>Ładowanie filmów...</p>
                ) : (
                  sortedMovies.map((movie) => (
                    <div key={movie.id} className="movie-card">
                      <Link to={`/movies/${movie.id}`}>
                        {movie.posterUrl && (
                          <img
                            src={movie.posterUrl}
                            alt={movie.title}
                            className="poster"
                          />
                        )}
                        <h2>{movie.title}</h2>
                        <p>{movie.description}</p>
                        <p>
                          <strong>Czas trwania:</strong> {movie.duration} min
                        </p>
                      </Link>
                      {/* ✅ Przycisk do dodania do ulubionych */}
                      <button
                        onClick={() => addFavorite(movie)}
                        className="favorite-btn"
                      >
                        ❤️ Dodaj do ulubionych
                      </button>
                    </div>
                  ))
                )}
              </div>
            }
          />

          <Route path="/movies/:id" element={<MovieDetails />} />
          <Route path="/screenings/:screeningId/seats" element={<SeatRoom />} />
          <Route
            path="/screenings/:screeningId/seats/:seatId/form"
            element={<ReservationForm />}
          />
          <Route path="/success" element={<Success />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
