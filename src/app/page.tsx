"use client";
import React from "react";
import Peliculas from "./misComponentes/peliculas";

export default function MovieExplorer() {
  return (
    <main>
      <div className="min-h-screen flex justify-center items-center">
        <div className="w-full mx-auto text-center">
          <h2 className="text-2xl font-bold mb-4">
            Bienvenido a la pagina de Movie Explorer
            <Peliculas />
          </h2>
        </div>
      </div>
    </main>
  );
}
