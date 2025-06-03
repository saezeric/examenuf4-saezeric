"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

const MiToken =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3MWVmZTEyZTc2MGM4OTZmMjdlNGM3YWU0MzFiYmY2ZCIsIm5iZiI6MTc0ODkzNDM2NS43NjEsInN1YiI6IjY4M2U5ZWRkMTQ1MzFkYzgzODI4OTRhOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.GwVQqhMnc2YP0EQb3fJv02P-hSwAZZCtQ3Jxf0vtV2E";

interface Genero {
  id: number;
  name: string;
}

interface DetallesPelicula {
  id: number;
  title: string;
  poster_path: string;
  overview: string;
  release_date: string;
  genres: Genero[];
  runtime: number; // Añadido
}

export default function DetallePelicula() {
  const params = useParams();
  const router = useRouter();
  const [pelicula, setPelicula] = useState<DetallesPelicula | null>(null);

  useEffect(() => {
    if (!params?.id) return;
    fetch(`https://api.themoviedb.org/3/movie/${params.id}?language=es-ES`, {
      headers: {
        Authorization: `Bearer ${MiToken}`,
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success === false) {
          setPelicula(null);
        } else {
          setPelicula(data);
        }
      });
  }, [params?.id]);

  if (!pelicula)
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <div>No se encontró la película</div>
        <button
          className="border px-4 py-2 rounded"
          onClick={() => router.push("/")}
        >
          Volver al inicio
        </button>
      </div>
    );

  // Formatear fecha de estreno
  const fechaEstreno = new Date(pelicula.release_date).toLocaleDateString(
    "es-ES",
    {
      year: "numeric",
      month: "long",
      day: "numeric",
    }
  );

  // Formatear duración
  const duracion = pelicula.runtime
    ? `${Math.floor(pelicula.runtime / 60)}h ${pelicula.runtime % 60}min`
    : "Desconocida";

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6">
      <button
        className="mb-4 border px-4 py-2 rounded self-start"
        onClick={() => router.push("/")}
      >
        Volver al inicio
      </button>
      <div className="max-w-md w-full bg-black rounded-lg shadow-lg p-6 text-white">
        <img
          src={`https://image.tmdb.org/t/p/w500${pelicula.poster_path}`}
          alt={pelicula.title}
          className="w-full rounded mb-4"
        />
        <h2 className="text-2xl font-bold mb-2">{pelicula.title}</h2>
        <div className="mb-2">
          <span className="font-semibold">Duración: </span>
          {duracion}
        </div>
        <div className="mb-2">
          <span className="font-semibold">Fecha de estreno: </span>
          {fechaEstreno}
        </div>
        <div className="mb-2">
          <span className="font-semibold">Géneros: </span>
          {pelicula.genres.map((g) => g.name).join(", ")}
        </div>
        <p className="text-gray-300">{pelicula.overview}</p>
      </div>
    </div>
  );
}
