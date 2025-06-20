import React, {
  useEffect,
  useState,
  useRef,
  useMemo,
  useCallback,
} from "react";
import { useParams } from "react-router-dom";
import ScreeningTiles from "./components/ScreeningTiles";
import { useForm } from "react-hook-form";

function MovieDetails() {
  const { id } = useParams();
  const [screenings, setScreenings] = useState([]);
  const headingRef = useRef();

  const { register, handleSubmit, reset } = useForm();

  // Focus na nagłówku po załadowaniu
  useEffect(() => {
    headingRef.current?.focus();
  }, []);

  // Pobierz seanse z API
  useEffect(() => {
    fetch("https://localhost:7162/api/Screenings")
      .then((res) => res.json())
      .then((data) => {
        const filtered = data.filter((s) => s.movieId === parseInt(id));
        setScreenings(filtered);
      })
      .catch((err) => console.error("Błąd ładowania seansów:", err));
  }, [id]);

  // Memoizacja przefiltrowanych seansów
  const memoizedScreenings = useMemo(() => screenings, [screenings]);

  // Callback np. do logowania kliknięcia w formularzu
  const onSubmit = useCallback((data) => {
    console.log("Form submitted:", data);
    reset();
  }, [reset]);

  return (
    <div>
      <h2 tabIndex={-1} ref={headingRef}>
        📅 Seanse dla filmu #{id}
      </h2>

      {memoizedScreenings.length === 0 ? (
        <p>Brak seansów dla tego filmu.</p>
      ) : (
        <ScreeningTiles screenings={memoizedScreenings} />
      )}

      {memoizedScreenings.length > 0 && (
        <div style={{ marginTop: "2rem" }}>
          <h3>Zgłoś problem z rezerwacją:</h3>
          <form onSubmit={handleSubmit(onSubmit)}>
            <input
              {...register("email")}
              placeholder="Twój email"
              style={{ marginRight: "1rem" }}
            />
            <input
              {...register("message")}
              placeholder="Wiadomość"
              style={{ marginRight: "1rem" }}
            />
            <button type="submit">Wyślij</button>
          </form>
        </div>
      )}
    </div>
  );
}

export default MovieDetails;