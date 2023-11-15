import React, { useEffect, useState } from "react";
import { datos } from "../accionesName";
import axios from "axios";
export default function Acciones({ accion }) {
  const [adi, setadi] = useState([]);
  const [adiCache, setadiadiCache] = useState([]);
  // const [prediccion, setPrediccion] = useState([]);
  const [ultimo, setUltimo] = useState(null);
  // const [ganancias, setGanancias] = useState(null);
  const [valor, setValor] = useState(0);
  const [accionSelect, setAccionSelect] = useState({});
  const acciones = Object.keys(datos);

  // console.log(acciones);
  // const nvdaData = [
  //   408.55, 437.53, 439.4, 434.86, 433.435, 432.99, 469.67, 456.68, 471.16,
  //   471.63, 460.18, 468.35, 487.84, 492.64, 493.55, 485.09, 485.48, 470.61,
  //   462.41, 455.72, 451.78, 448.7, 454.85, 455.81, 439, 439.66, 435.2, 422.39,
  //   410.17, 416.1, 422.22, 419.11, 424.68, 430.89, 434.99, 447.82, 435.17,
  //   440.41, 446.88, 457.62, 452.73, 457.98, 468.06, 469.45, 454.61, 460.95,
  //   439.38, 421.96, 421.01, 413.87, 429.75, 436.63, 417.79, 403.26, 405, 411.61,
  //   407.8, 423.25, 435.06, 450.05, 457.51, 459.55, 465.74, 469.5, 483.35,
  // ];
  // console.log(nvdaData.length);
  const cargar = async () => {
    try {
      const adi = await axios.get(
        `https://financialmodelingprep.com/api/v3/stock/real-time-price?apikey=N2i2nlhGC4zqiFfb8cD7hi3GZC6JLcJ6`
      );
      // console.log("yes sir", adi.data.stockList);
      setadi(adi.data.stockList);
      console.log("cargue datos");
    } catch (error) {
      console.log("error", error);
    }
  };
  async function onPrediccion(params) {
    console.log("kee", params.symbol);
    //sirve
    const res = await axios.get(
      `https://deploy-api-production-3131.up.railway.app/acciones/predicciones/${params.symbol}`
    );
    console.log("RES MSFT", res.data);
    // setPrediccion(res.data);
    setUltimo(res.data.predicciones[res.data.predicciones.length - 2]);
    console.log(
      "ultimo",
      res.data.predicciones[res.data.predicciones.length - 2]
    );
    localStorage.setItem(
      "ultimo",
      JSON.stringify(res.data.predicciones[res.data.predicciones.length - 2])
    );

    //sirve

    // console.log("ultimo",res.data.data[res.data.data.length - 1]);
  }
  // Función para guardar datos en el almacenamiento compartido
  // const guardarDatosEnAlmacenamiento = () => {
  //   localStorage.setItem("misDatos", JSON.stringify(adi));
  // };
  const cargarDatosDesdeAlmacenamiento = () => {
    const datosGuardados = localStorage.getItem("misDatos");
    // const ultimostorage = localStorage.getItem("ultimo");
    if (datosGuardados) {
      // setUltimo(JSON.parse(ultimostorage));
      setadiadiCache(JSON.parse(datosGuardados));
    }
  };
  useEffect(() => {
    cargar();
    setInterval(cargar, 1800000);
    cargarDatosDesdeAlmacenamiento();
  }, []);

  // console.log("a", adi);

  // function calcularCrecimientoPorcentaje(datos) {
  //   const porcentajesCrecimiento = [];

  //   for (let i = 1; i < datos.length; i++) {
  //     const crecimiento = ((datos[i] - datos[i - 1]) / datos[i - 1]) * 100;
  //     porcentajesCrecimiento.push(crecimiento);
  //   }

  //   return porcentajesCrecimiento;
  // }
  if (!adi) {
    return;
  }
  const calcularGanancias = () => {
    const gan = (
      ((
        ((ultimo.yhat - accionSelect.price) / accionSelect.price) *
        100
      ).toFixed(2) *
        valor) /
      100
    ).toLocaleString();
    if (gan > 0) {
      return { ganancia: true, value: gan };
    } else {
      return { ganancia: false, value: gan };
    }
  };
  const handleInputChange = (event) => {
    const inputValue = event.target.value;
    setValor(
      Number.isInteger(parseFloat(inputValue))
        ? parseInt(inputValue, 10)
        : parseFloat(inputValue)
    );
  };
  // console.log(adiCache);
  var accionesFiltrados =
    adi.length > 0
      ? adi.filter(function (objeto) {
          return acciones.includes(objeto.symbol);
        })
      : adiCache.filter(function (objeto) {
          return acciones.includes(objeto.symbol);
        });
  // const porcentajesCrecimiento = calcularCrecimientoPorcentaje(nvdaData);
  // // console.log("acciiones", porcentajesCrecimiento);
  console.log("ultimo dato", ultimo);
  return (
    <div className="lg:flex">
     
      <div className="grid lg:grid-cols-4 grid-cols-1 lg:w-[900px] gap-2 p-5">
        
        {accionesFiltrados.map((acc, i) => (
          <div
            key={i}
            className="flex items-center cursor-pointer p-4 w-auto bg-[#242526] rounded-lg overflow-hidden shadow hover:shadow-md"
            onClick={() => setAccionSelect(acc)}
          >
            <div className="w-12 h-12 rounded-full bg-[#4E4F50] p-1 flex items-center justify-center">
              <img
                src="https://static.vecteezy.com/system/resources/previews/013/167/057/original/investment-growth-3d-illustration-free-png.png"
                alt=""
              />
            </div>
            <div className="ml-3">
              <p className="font-medium ">{acc.symbol}</p>
              <p className="text-sm ">Price:${acc.price}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="p-2 lg:p-0">
        <div className="mb-6">
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Cantidad a invertir
          </label>
          <input
            type="number"
            step="0.01"
            onChange={handleInputChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block lg:w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="$1.000.000"
            required
          ></input>
        </div>
        <div>
          <button
            onClick={() => onPrediccion(accionSelect)}
            className="text-white bg-gradient-to-r mb-5 from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 shadow-lg shadow-green-500/50 dark:shadow-lg dark:shadow-green-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 "
          >
            Invertir
          </button>
        </div>
      </div>
      <div className=" w-28 flex lg:block">
        <span className="font-bold ml-2 text-[#06C270]">
          Prediccion: <br />
          <span className="font-bold ml-2 text-[#06C270]">
            ${ultimo ? ultimo.yhat.toFixed(2) : ""}{" "}
          </span>
          <br />
          <span className="font-bold ml-2 text-[#06C270]">
            {ultimo
              ? (
                  ((ultimo.yhat - accionSelect.price) / accionSelect.price) *
                  100
                ).toFixed(2)
              : ""}{" "}
            %
          </span>
        </span>

        <br />

        <span className="font-bold ml-2  text-[#FFCC00] ">
          <div className="w-12 h-12 rounded-full bg-[#4E4F50] p-1 flex items-center justify-center">
            <img
              src="https://static.vecteezy.com/system/resources/thumbnails/025/212/422/small/3d-rendering-cash-flow-isolated-useful-for-business-analytics-money-and-finance-design-element-png.png"
              alt=""
            />
          </div>
          Accion: {accionSelect.symbol}
        </span>
        <span> inversion:${valor.toLocaleString()} </span>
      </div>
      <span className="font-bold flex  p-2 lg:p-0 w-28 text-[#06C270]">
        Ganancias:
        <br />$
        {ultimo
          ? calcularGanancias().ganancia
            ? calcularGanancias().value
            : 0
          : ""}{" "}
      </span>
      <span className="font-bold w-28 flex lg:block p-2 lg:p-0 text-[#CF0921]">
        Perdidas:
        <br />$
        {ultimo
          ? calcularGanancias().ganancia
            ? 0
            : calcularGanancias().value
          : ""}{" "}
      </span>
    </div>
  );
}
