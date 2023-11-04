import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { createChart } from "lightweight-charts";
import TablaPib from "./TablaPib";
const ChartPib = () => {
  const containerRef = useRef(null);
  const tooltipRef = useRef(null);
  const chartRef = useRef(null);
  var data = [];
  const [midata, setMidata] = useState();
  const [loading, setLoading] = useState(false);
  const columnas = [
    { name: "Año-mes-dia" },
    { name: "Pib %" },
    { name: "valor mas bajo %" },
    { name: "valor mas alto %" },
  ];
  const getIndicadores = async () => {
    const res = await axios.get("https://api-monitoreo.onrender.com/getindicadores");
    console.log(res.data[2].datos);
    const ipc = res.data[2].datos;
    data = ipc.map((ip, index) => {
      console.log("fecha pip", ip.ds);
      return { time: ip.ds, value: ip.yhat };
    });
    console.log("mi data PIB", data);
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
          color: "#202123",
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
      topColor: "rgba(255, 82, 82, 0.56)",
      bottomColor: "rgba(255, 82, 82, 0.04)",
      lineColor: "rgba(255, 82, 82, 1)",
      lineWidth: 2,
      symbol: "AAPL",
    });
    const areaSeries2 = chartRef.current.addAreaSeries({
      topColor: "rgba(82, 255, 82, 0.56)",
      bottomColor: "rgba(82, 255, 82, 0.04)",
      lineColor: "rgba(82, 255, 82, 1)",
      lineWidth: 2,
      symbol: "Series 2",
    });

    if (midata) {
      areaSeries.setData(midata);
    } else {
      console.log("mi data?", midata);
    }
    areaSeries2.setData([]);

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
          ${Math.round(100 * price) / 100}
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
      window.removeEventListener("resize", resizeChart);
    };
  }, [midata]);

  return (
    <div className="lg:w-full p-2 sm:grid sm:grid-rows-2 lg:flex justify-center gap-4">
      {midata ? (
        <TablaPib columnas={columnas} defaultData={midata}></TablaPib>
      ) : (
        ""
      )}
      <div className="" ref={containerRef} />
      <div
        ref={tooltipRef}
        className="w-48 h-40 absolute hidden p-2 box-border text-sm text-left z-10 top-12 left-12 border border-[rgba(255, 82, 82, 1)] bg-white text-black"
      />
      
    </div>
  );
};

export default ChartPib;
