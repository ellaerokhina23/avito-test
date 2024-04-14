import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MoviesList from "./components/MoviesList/MoviesList";
import MovieDetail from "./components/MoviePage/MoviePage";
import "./App.css";
import "./components/MoviePage/MoviePage.css";

function App() {
  return (
    <Router>
      <div>
        <header>
          <h1>Movie App</h1>
        </header>
        <main>
          <Routes>
            <Route path="/" element={<MoviesList />} />
            <Route path="/movie/:id" element={<MovieDetail />} />
          </Routes>
        </main>
        <footer>&copy; 2024 Movie App, Inc.</footer>
      </div>
    </Router>
  );
}

export default App;
