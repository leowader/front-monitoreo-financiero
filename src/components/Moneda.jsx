import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { createChart } from "lightweight-charts";
const ChartMoneda = () => {
  const containerRef = useRef(null);
  const tooltipRef = useRef(null);
  const chartRef = useRef(null);
  var data = [];
  const [midata, setMidata] = useState();
  const [prediccion, setPrediccion] = useState({});
  const [loading, setLoading] = useState(false);
  // const columnas = [
  //   { name: "Año-mes-dia" },
  //   { name: "Pib %" },
  //   { name: "valor mas bajo %" },
  //   { name: "valor mas alto %" },
  // ];
  const getIndicadores = async () => {
    const res = await axios.get(
      "https://deploy-api-production-3131.up.railway.app/predicciones"
    );
    // const MSFT = await axios.get(
    //   "http://api.marketstack.com/v1/eod?access_key=b2b6a982038bddd78ab29659ee0e665a&symbols=MSFT&ORCL"
    // );

    // console.log(
    //   "valor",
    //   MSFT.data.data[0].adj_close,
    //   "name:",
    //   MSFT.data.data[0].symbol
    // );
    // console.log("predicion dolar peralta", dolar.data.datos);
    // console.log("dolar mañana", dolarMañana[dolarMañana.length - 1]);
    // console.log("Monedaaaa en chart", res.data.datos);
    const ipc = res.data.datos;
    let tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() +1);
    let tomorrowFormatted = tomorrow.toISOString().split('T')[0];
    let objetoManana = ipc.find(item => item.ds === tomorrowFormatted);
    console.log("predi dolar ",objetoManana);
    setPrediccion(objetoManana);
    const dolarFiltrados = ipc.filter(objeto => objeto.ds <= tomorrowFormatted);
    console.log("dolar filter",dolarFiltrados);
    data = dolarFiltrados.map((ip, index) => {
      // const fecha = new Date(ip.ds);
      // const fechaFormateada = fecha.toISOString().slice(0, 10); // Extrae el año, mes y día
      return { time: ip.ds, value: parseFloat(ip.yhat) };
    });
    // console.log("mi data Moneda", data);
   
    
    setMidata(data);
  };
  if (loading === false) {
    getIndicadores();
    setLoading(true);
  }
  useEffect(() => {
    const width = 600;
    const height = 430;
    const resizeChart = () => {
      if (chartRef.current) {
        const containerWidth = containerRef.current.offsetWidth;
        chartRef.current.resize(containerWidth, height);
      }
    };
    chartRef.current = createChart(containerRef.current, {
      width,
      height,
      rightPriceScale: {
        scaleMargins: {
          top: 0.2,
          bottom: 0.2,
        },
        borderVisible: false,
      },
      timeScale: {
        borderVisible: false,
      },
      layout: {
        background: {
          type: "solid",
          color: "#18191A",
        },
        textColor: "white",
      },
      grid: {
        horzLines: {
          color: "#4D4D4F",
        },
        vertLines: {
          color: "#4D4D4F",
        },
      },
    });

    const areaSeries = chartRef.current.addAreaSeries({
      topColor: "rgba(156, 39, 176, 0.56)",
      bottomColor: "rgba(156, 39, 176, 0.04)",
      lineColor: "rgba(156, 39, 176, 1)",
      lineWidth: 2,
      symbol: "AAPL",
    });

    if (midata) {
      areaSeries.setData(midata);
      // console.log("PRDICCION DOLAR", prediccion);
    } else {
      // console.log("mi data?", midata);
    }

    const toolTipWidth = 80;
    const toolTipHeight = 80;
    const toolTipMargin = 15;

    chartRef.current.subscribeCrosshairMove((param) => {
      if (
        param.point === undefined ||
        !param.time ||
        param.point.x < 0 ||
        param.point.x > width ||
        param.point.y < 0 ||
        param.point.y > height
      ) {
        tooltipRef.current.style.display = "none";
      } else {
        const dateStr = param.time;
        tooltipRef.current.style.display = "block";
        const data = param.seriesData.get(areaSeries);
        const price = data.value !== undefined ? data.value : data.close;
        tooltipRef.current.innerHTML = `<div style="color: ${"rgba(255, 82, 82, 1)"}">ABC Inc.</div><div style="font-size: 24px; margin: 4px 0px; color: ${"black"}">
          ${Math.round(100 * price)}
          </div><div style="color: ${"black"}">
          ${dateStr}
          </div>`;

        const y = param.point.y;
        let left = param.point.x + toolTipMargin;
        if (left > width - toolTipWidth) {
          left = param.point.x - toolTipMargin - toolTipWidth;
        }

        let top = y + toolTipMargin;
        if (top > height - toolTipHeight) {
          top = y - toolTipHeight - toolTipMargin;
        }
        tooltipRef.current.style.left = left + "px";
        tooltipRef.current.style.top = top + "px";
      }
    });
    window.addEventListener("resize", resizeChart);

    // Llamar a la función de redimensionamiento inicialmente
    resizeChart();

    // Devuelve una función de limpieza al desmontar el componente
    return () => {
      if (chartRef.current) {
        chartRef.current.remove();
      }
      // Eliminar el oyente de cambio de tamaño de la ventana
      window.removeEventListener("resize", resizeChart);
    };
  }, [midata, prediccion]);

  return (
    <div className="lg:w-full sm:grid sm:grid-rows-2 p-2 lg:flex justify-center ">
      <div ref={containerRef} />
      <div
        ref={tooltipRef}
        className="w-48 h-40 absolute hidden p-2 box-border text-sm text-left z-10 top-12 left-12 border border-[rgba(255, 82, 82, 1)] bg-white text-black"
      />
      <div className="h-28 block ">
        <h3>Prediccion del dolar para la fecha {prediccion.ds}</h3>
        <h2>Valor </h2>
        <span className="text-[#9C27B0] font-bold">
          {prediccion.yhat ? prediccion.yhat.toFixed(2) : prediccion.yhat} COP
        </span>
      </div>
    </div>
  );
};

export default ChartMoneda;
