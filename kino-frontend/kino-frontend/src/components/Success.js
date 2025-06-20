import React from "react";
import { Link } from "react-router-dom";
import "./Success.css";

function Success() {
  return (
    <div className="success-container">
      <h2>✨ Rezerwacja zakończona sukcesem! ✨</h2>
      <p>Dziękujemy za dokonanie rezerwacji. Link do płatności został wysłany na podanego maila. Czas rozliczenia wynosi 20min. Po jego upłynięciu rezerwacja zostanie anulowana.</p>
      <p>Miłego seansu 🫶</p>
      <Link to="/" className="back-home">Powrót do repertuaru</Link>
    </div>
  );
}

export default Success;
