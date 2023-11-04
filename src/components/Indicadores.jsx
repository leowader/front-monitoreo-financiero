import React from "react";
import ChartPib from "./Pib";
import ChartDeuda from "./Deuda";
import ChartComponent from "./Probando";
import ChartDesempleo from "./Cards";
export default function Indicadores() {
  return (
    <div className="w-full h-screen">
      <h1 className="mb-4 text-3xl font-extrabold flex justify-center text-gray-900 dark:text-white md:text-3xl lg:text-6xl">
        <span className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400 mr-2">
          Proyecto Monitoreo
        </span>{" "}
        Financiero
      </h1>
      <h2 className="flex justify-center mb-5 font-bold text-2xl">
        Inflacion colombiana 2018-2023
      </h2>
      <ChartComponent></ChartComponent>
      <h2 className="flex justify-center mt-4 mb-5 font-bold text-2xl">
        Desempleo en colombia 2018-2023
      </h2>

      <ChartDesempleo></ChartDesempleo>
      <h2 className="flex justify-center mt-4 mb-5 font-bold text-2xl">
        PIB en colombia 2005-2024
      </h2>
      <ChartPib></ChartPib>
      <h2 className="flex justify-center mt-4 mb-5 font-bold text-2xl">
        Deuda Estandar Colombiana
      </h2>
      <ChartDeuda></ChartDeuda>
    </div>
  );
}
