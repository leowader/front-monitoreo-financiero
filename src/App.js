import ChartComponent from "./components/Probando";
// import { ChartComponent } from "./components/ProbandoChart";
import ChartDesempleo from "./components/Desempleo";
import "./index.css";
import ChartPib from "./components/Pib";
import ChartDeuda from "./components/Deuda";
import Cards from "./components/Cards";
import leo from "./assets/leo.jpg";
import luis from "./assets/luis.jpg";
import juan from "./assets/juan.jpg";
import ChartMoneda from "./components/Moneda";
import Acciones from "./components/Acciones";
import AccionesTec from "./components/AccionesTec";

function App() {
  const ingeniero = {
    nombre: "Leonardo Andres Acuña Dominguez",
    cc: 1066268141,
    carrera: "Ingenieria de sistemas",
    correo: "landresacuna@unicesar.edu.co",
    dir: "Calle 28 #28-98",
    telefono: 3022575805,
    img: leo,
  };
  const ingeniero2 = {
    img: juan,
    nombre: "Juan Peralta ",
    cc: 1067592444,
    carrera: "Ingenieria de sistemas",
    correo: "jdavidperalta@unicesar.Edu.co",
    dir: "Calle 54a 31-45",
    telefono: 3152774623,
  };
  const ingeniero3 = {
    nombre: "Luis Cataño ",
    img: luis,
    cc: 1065646710,
    carrera: "Ingenieria de sistemas",
    correo: "lacatano@unicesar.edu.co",
    dir: " Diagonal 18 # 27a 04    ",
    telefono: 3152774623,
  };
  return (
    <div className="App ">
      <div className="lg:w-full sm:grid sm:grid-rows-2 md:grid md:grid-cols-2 lg:flex h-full w-full p-5 justify-center items-center">
        <Cards ingeniero={ingeniero}></Cards>
        <Cards ingeniero={ingeniero2}></Cards>
        <Cards ingeniero={ingeniero3}></Cards>
      </div>

      <h1 className="mb-4 p-2 text-3xl font-extrabold flex justify-center text-gray-900 dark:text-white md:text-3xl lg:text-6xl">
        <span className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400 mr-2">
          Proyecto Monitoreo
        </span>{" "}
        Financiero
      </h1>
      <h2 className="flex justify-center mb-5 font-bold text-2xl">
        Inflacion colombiana 2018-2023
      </h2>
      <ChartComponent></ChartComponent>
      <h2 className="flex justify-center mt-4 mb-5 font-bold text-2xl  p-2 ">
        Desempleo en colombia 2018-2023
      </h2>

      <ChartDesempleo></ChartDesempleo>
      <h2 className="flex justify-center mt-4 mb-5 font-bold text-2xl  p-2 ">
        PIB en colombia 2005-2024
      </h2>
      <ChartPib></ChartPib>
      <h2 className="flex justify-center mt-4 mb-5 font-bold text-2xl  p-2 ">
        Deuda Estandar Colombiana
      </h2>
      <ChartDeuda></ChartDeuda>
      <h2 className="flex justify-center mt-4 mb-5 font-bold text-2xl  p-2 ">
        Monitoreo del dolar 2019-2023
      </h2>
      <ChartMoneda></ChartMoneda>
      <h2 className="flex justify-center mt-4 mb-5 font-bold text-2xl  p-2 ">
        Acciones
      </h2>
      <AccionesTec></AccionesTec>
    </div>
  );
}

export default App;
