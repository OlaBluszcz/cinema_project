import React, { useState, useEffect } from "react";
import "./SeatRoom.css";
import { useParams, useNavigate } from "react-router-dom";

function SeatRoom() {
  const { screeningId } = useParams();
  const navigate = useNavigate();
  const [seats, setSeats] = useState([]);
  const [selectedSeat, setSelectedSeat] = useState(null);

  useEffect(() => {
    fetch(`/api/Seats?screeningId=${screeningId}`)
      .then((res) => res.json())
      .then((data) => setSeats(data));
  }, [screeningId]);

  const handleSeatClick = (seat) => {
    if (seat.isReserved) return;
    setSelectedSeat(seat);
    navigate(`/screenings/${screeningId}/seats/${seat.id}/form`);
  };

  const groupedSeats = {};
  seats.forEach((seat) => {
    const row = seat.row;
    if (!groupedSeats[row]) groupedSeats[row] = [];
    groupedSeats[row].push(seat);
  });

  return (
    <div className="seat-room-container">
      {/* Powrót usunięty */}
      <h2>🎟️ Wybierz miejsce dla seansu #{screeningId} 🎟️</h2>
      <div className="screen">EKRAN</div>
      <div className="seat-grid">
        {seats
          .sort((a, b) => {
            if (a.row === b.row) return a.number - b.number;
            return a.row.localeCompare(b.row);
          })
          .map((seat) => (
            <button
              key={seat.id}
              className={`seat ${seat.isReserved ? "reserved" : ""}`}
              onClick={() => handleSeatClick(seat)}
              disabled={seat.isReserved}
            >
              {seat.row}{seat.number}
            </button>
          ))}
      </div>
    </div>
  );
}

export default SeatRoom;
