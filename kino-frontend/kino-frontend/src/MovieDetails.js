import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ScreeningTiles from "./components/ScreeningTiles";

function MovieDetails() {
  const { id } = useParams();
  const [screenings, setScreenings] = useState([]);

  useEffect(() => {
    fetch("https://localhost:7162/api/Screenings")
      .then((res) => res.json())
      .then((data) => {
        const filtered = data.filter((s) => s.movieId === parseInt(id));
        setScreenings(filtered);
      })
      .catch((err) => console.error("Błąd ładowania seansów:", err));
  }, [id]);

  return (
    <div>
      <h2>📅 Seanse dla filmu #{id}</h2>
      {screenings.length === 0 ? (
        <p>Brak seansów dla tego filmu.</p>
      ) : (
        <ScreeningTiles screenings={screenings} />
      )}
    </div>
  );
}

export default MovieDetails;
