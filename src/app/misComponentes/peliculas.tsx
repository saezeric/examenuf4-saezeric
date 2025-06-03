"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";

interface Pelicula {
  id: number;
  title: string;
  poster_path: string;
  media_type: "movie";
}

const MiToken =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3MWVmZTEyZTc2MGM4OTZmMjdlNGM3YWU0MzFiYmY2ZCIsIm5iZiI6MTc0ODkzNDM2NS43NjEsInN1YiI6IjY4M2U5ZWRkMTQ1MzFkYzgzODI4OTRhOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.GwVQqhMnc2YP0EQb3fJv02P-hSwAZZCtQ3Jxf0vtV2E";

export default function Peliculas() {
  const [peliculas, setPeliculas] = useState<Pelicula[]>([]);
  const [favoritas, setFavoritas] = useState<number[]>([]);
  const [busqueda, setBusqueda] = useState(""); // Estado para el buscador

  useEffect(() => {
    const fav = localStorage.getItem("favoritas");
    if (fav) setFavoritas(JSON.parse(fav));
  }, []);

  useEffect(() => {
    if (favoritas.length > 0) {
      localStorage.setItem("favoritas", JSON.stringify(favoritas));
    }
  }, [favoritas]);

  useEffect(() => {
    fetch("https://api.themoviedb.org/3/movie/popular?page=1&limit=30", {
      headers: {
        Authorization: `Bearer ${MiToken}`,
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        const peliculasConTipo: Pelicula[] = data.results.map(
          (p: { id: number; title: string; poster_path: string }) => ({
            id: p.id,
            title: p.title,
            poster_path: p.poster_path,
            media_type: "movie",
          })
        );
        setPeliculas(peliculasConTipo);
      })
      .catch(() => setPeliculas([]));
  }, []);

  const toggleFavorita = (id: number) => {
    if (favoritas.includes(id)) {
      const nuevasFavoritas = favoritas.filter(
        (favoritaId) => favoritaId !== id
      );
      setFavoritas(nuevasFavoritas);
    } else {
      const nuevasFavoritas = [...favoritas, id];
      setFavoritas(nuevasFavoritas);
    }
  };

  const peliculasFiltradas = peliculas.filter((pelicula) =>
    pelicula.title.toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <div>
      <div className="p-6">
        <input
          type="text"
          placeholder="Buscar película..."
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          className="border rounded px-3 py-2 w-full max-w-md"
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-6 text-left">
        {peliculasFiltradas.map((pelicula) => (
          <div key={pelicula.id} className="relative">
            <Link
              href={`/pelicula/${pelicula.id}`}
              className="border border-gray-200 rounded-lg overflow-hidden bg-black shadow-sm block"
            >
              <img
                src={`https://image.tmdb.org/t/p/w500${pelicula.poster_path}`}
                alt={pelicula.title}
                className="w-full aspect-[2/3] object-cover bg-black"
              />
              <div className="p-5 text-base font-medium bg-black">
                {pelicula.title}
              </div>
            </Link>
            <button
              onClick={() => toggleFavorita(pelicula.id)}
              className="absolute top-2 right-2 bg-white rounded-full p-3 shadow text-2xl"
            >
              {favoritas.includes(pelicula.id) ? "❤️" : "🤍"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
