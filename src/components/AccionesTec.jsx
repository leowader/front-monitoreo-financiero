import React, { useEffect } from "react";
import * as echarts from "echarts";
// import axios from "axios";
import { datos } from "../accionesName";
// import axios from "axios";

const TreemapChart = () => {
  // const [respuestas, setRespuestas] = useState([]);
  // const [data,setData]=useState({})
  useEffect(() => {
    





    const acciones = Object.keys(datos);
    console.log(acciones);
    const list=[]
    // const fetchData = async (symbol) => {
    //   try {
    //     const url = `http://api.marketstack.com/v1/eod?access_key=813cc868cce09f814c1c4b51c1397935&symbols=${symbol}`;
    //     const response = await axios.get(url);
    //     if (response && response.data.data.length > 0) {
    //       const nuevaRespuesta = {
    //         symbol: response.data.data[0].symbol,
    //         adj_close: response.data.data[0].adj_close,
    //       };
    //       list.push(nuevaRespuesta)
    //       setRespuestas((prevRespuestas) => [
    //         ...prevRespuestas,
    //         nuevaRespuesta,
    //       ]);
    //     } else {
    //       console.error(
    //         `Error al obtener datos para ${symbol}. Código de estado: ${response.status}`
    //       );
    //     }
    //   } catch (error) {}
    // };
    console.log("list respuesta",list);
    // acciones.forEach((symbol) => {
    //   fetchData(symbol);
    // });
    const container = document.getElementById("treemap-chart");
    const chart = echarts.init(container);
    const seriesData = Object.entries(datos).map(([nombre, datos]) => ({
      name: nombre,
      value: datos[datos.length - 1], // Usamos el último valor como el valor del Treemap
      data: datos, // Agregamos el conjunto completo de datos como propiedad
    }));

    const options = {
      series: [
        {
          type: "treemap",
          data: seriesData,
          label: {
            show: true,
            formatter: "{b}",
          },
          emphasis: {
            label: {
              show: true,
            },
          },
          breadcrumb: {
            show: false,
          },
          roam: false,
        },
      ],
      tooltip: {
        formatter: function (params) {
          //   const seriesName = params.seriesName;
          const dataName = params.name;
          const value = params.value;
          const data = params.data.data; // Accedemos al conjunto completo de datos

          if (data && data.length >= 2) {
            const lastValue = data[data.length - 1];
            const prevValue = data[data.length - 2];
            const percentageChange =
              ((lastValue - prevValue) / prevValue) * 100;

            return (
              dataName +
              ": " +
              value.toFixed(2) +
              "<br/>Antepenúltimo valor: " +
              prevValue.toFixed(2) +
              "<br/>Último valor: " +
              lastValue.toFixed(2) +
              "<br/>Porcentaje de cambio: " +
              percentageChange.toFixed(2) +
              "%"
            );
          } else {
            return "Datos no disponibles";
          }
        },
      },
    };
    chart.setOption(options);

    return () => {
      chart.dispose();
    };
  }, []);
  // console.log("RESPUESTA STATES ACCIONES",respuestas);

  return (
    <div id="treemap-chart" style={{ width: "100%", height: "500px" }}></div>
  );
};

export default TreemapChart;
