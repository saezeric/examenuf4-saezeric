"use client";
import React from "react";
import { useEffect, useState } from "react";
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

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-6 text-left">
      {peliculas.map((pelicula) => (
        <Link
          key={pelicula.id}
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
      ))}
    </div>
  );
}
