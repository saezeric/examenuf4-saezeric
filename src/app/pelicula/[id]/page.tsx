"use client";
import React from "react";
import DetallePelicula from "../../misComponentes/detalle";

export default function Pelicula() {
  return (
    <main>
      <div className="min-h-screen flex justify-center items-center">
        <div className="w-full mx-auto text-center">
          <DetallePelicula />
        </div>
      </div>
    </main>
  );
}
