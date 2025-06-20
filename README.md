# 🎬 Cinema Reservation System

A full-stack web application for managing movie reservations in a cinema. The system is built with a **React frontend** and a **.NET Core Web API backend**, supporting core functionalities such as listing movies, managing screenings, selecting seats, and making reservations.

---

## 📁 Project Structure

<pre> cinema_project/ ├── CinemaReservationApi/ # 🎬 Backend (.NET Core Web API) │ ├── Controllers/ # 🎯 API endpoints (Movies, Seats, Screenings, Reservations) │ ├── Models/ # 📦 Data models (Movie.cs, Seat.cs, etc.) │ ├── Data/, Migrations/ # 🧬 EF Core config & database migrations │ ├── Properties/, bin/, obj/ # ⚙️ Project configs and build folders │ └── CinemaReservationApi.csproj # 🧾 C# project file │ ├── kino-frontend/ # 💻 Frontend (React) │ ├── kino-frontend/ # 📁 React app root │ │ ├── public/ # 🌍 Static files (index.html, favicon, etc.) │ │ ├── src/ # 🔧 Source code (React components, views, CSS) │ │ │ ├── components/ # 🧩 Reusable UI components │ │ │ ├── App.js # 🚀 App entry point │ │ │ ├── MovieDetails.js # 🎥 Movie detail view │ │ │ └── index.js # 🧵 React DOM root │ │ ├── package.json # 📦 Project dependencies and scripts │ │ └── README.md # 📘 Frontend readme │ └── README.md # 📘 Main project readme </pre>


---

## 🚀 Features

### 🎥 Backend (ASP.NET Core Web API)

- Get a list of available movies and their details.
- Manage screenings and seating arrangements.
- Handle reservations and seat availability.
- Controllers:
  - `MoviesController.cs`
  - `ScreeningController.cs`
  - `SeatController.cs`
  - `ReservationsController.cs`

### 💻 Frontend (React.js)

- Browse movies and their descriptions.
- View available screening times.
- Select and reserve seats.
- Frontend built with React components and Bootstrap styling.

---

## 🛠️ Technologies Used

**Backend**:
- ASP.NET Core 8.0
- Entity Framework Core
- RESTful API
- C#

**Frontend**:
- React.js
- JavaScript (ES6+)
- JSX
- CSS Modules

---

## 🧪 Local Setup

### 1. Clone the repository
```bash
git clone https://github.com/OlaBluszcz/cinema_project.git

### 2. Run the Backend

cd CinemaReservationApi/CinemaReservationApi
dotnet restore
dotnet build
dotnet run

### 3. Run the Frontend

cd kino-frontend/kino-frontend
npm install
npm start

### 📌 Notes

Backend uses EF Core for ORM and SQLite/SQL Server for data storage (adjustable in configuration).

### Authors

Created by **Aleksandra Bluszcz** and **Aleksandra Strzelczyk**

 

