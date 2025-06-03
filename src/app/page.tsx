"use client";
import React, { useState } from "react";
import Peliculas from "./misComponentes/peliculas";
import PeliculasFavoritas from "./misComponentes/peliculas-favoritas";

export default function MovieExplorer() {
  const [view, setView] = useState<"peliculas" | "favoritas">("peliculas");

  return (
    <main>
      <div className="min-h-screen flex justify-center items-center">
        <div className="w-full mx-auto text-center">
          <nav className="mb-4">
            <button
              className="mx-2 px-4 py-2 bg-blue-500 text-white rounded"
              onClick={() => setView("peliculas")}
            >
              Películas
            </button>
            <button
              className="mx-2 px-4 py-2 bg-green-500 text-white rounded"
              onClick={() => setView("favoritas")}
            >
              Favoritas
            </button>
          </nav>
          {view === "peliculas" ? <Peliculas /> : <PeliculasFavoritas />}
        </div>
      </div>
    </main>
  );
}
