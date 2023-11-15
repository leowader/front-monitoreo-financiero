import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { createChart } from "lightweight-charts";
import TablaDeuda from "./TablaDeuda";
const ChartDeuda = () => {
  const containerRef = useRef(null);
  const tooltipRef = useRef(null);
  const chartRef = useRef(null);
  var data = [];
  var dataInterna = [];
  var dataTotal = [];
  const columnas = [
    { name: "Año-mes-dia" },
    { name: "Deuda externa " },
    { name: "deuda interna " },
    { name: "deuda total " },
  ];
  const [midata, setMidata] = useState();
  const [interna, setInterna] = useState();
  const [total, setTotal] = useState();
  const [loading, setLoading] = useState(false);
  const getIndicadores = async () => {
    const res = await axios.get("https://api-monitoreo.up.railway.app/getindicadores");
    // console.log(res.data[3].datos);
    const externa = res.data[3].datos;
    const inter = res.data[4].datos;
    const tot = res.data[5].datos;
    data = externa.map((ip, index) => {
      return { time: ip.ds, value: ip.yhat };
    });
    dataInterna = inter.map((ip, index) => {
      return { time: ip.ds, value: ip.yhat };
    });
    dataTotal = tot.map((ip, index) => {
      return { time: ip.ds, value: ip.yhat };
    });
    // console.log("mi data DEUDA INTERNA", data);
    setMidata(data);
    setTotal(dataTotal);
    setInterna(dataInterna);
  };
  if (loading === false) {
    getIndicadores();
    setLoading(true);
  }
  useEffect(() => {
    const width = 550;
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
      topColor: "rgba(171, 71, 188, 0.56)",
      bottomColor: "rgba(171, 71, 188, 0.04)",
      lineColor: "rgba(171, 71, 188, 1)",
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
    const areaSeries3 = chartRef.current.addAreaSeries({
      topColor: "rgba(38,198,218, 0.56)",
      bottomColor: "rgba(38,198,218, 0.04)",
      lineColor: "rgba(38,198,218, 1)",
      lineWidth: 2,
    });

    if (midata && interna) {
      areaSeries.setData(midata);
      areaSeries2.setData(interna);
      areaSeries3.setData(total);
    } else {
      // console.log("mi data?", midata);
    }

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
      }
    });

    // Devuelve una función de limpieza al desmontar el componente
    window.addEventListener("resize", resizeChart);
    // Llamar a la función de redimensionamiento inicialmente
    resizeChart();
    return () => {
      if (chartRef.current) {
        chartRef.current.remove();
      }
      window.removeEventListener("resize", resizeChart);
    };
  }, [midata, interna, total]);

  return (
    <div className="lg:w-full sm:grid p-2 sm:grid-rows-2 lg:flex justify-center gap-4">
      {midata ? (
        <TablaDeuda columnas={columnas} defaultData={midata}></TablaDeuda>
      ) : (
        ""
      )}
      <div
        ref={containerRef}
        
      />
      <div
        ref={tooltipRef}
        className="w-48 h-40 absolute hidden p-2 box-border text-sm text-left z-10 top-12 left-12 border border-[rgba(255, 82, 82, 1)] bg-white text-black"
        />
      <div className=" w-42  rounded-lg">
        <div className="flex">
          <div className=" mt-2 h-3 w-10 bg-[#26C6DA] rounded-lg"></div>
          <span className="w-full ml-2">Deunda Total</span>
        </div>
        <div className="flex">
          <div className="mt-2 h-3 w-10 bg-[#52FF52] rounded-lg"></div>
          <span className="w-full ml-2">Deunda Interna</span>
        </div>
        <div className="flex">
          <div className="mt-2  h-3 w-10 bg-[#AB47BC] rounded-lg"></div>
          <span className="w-full ml-2">Deunda Externa</span>
        </div>
      </div>
    </div>
  );
};

export default ChartDeuda;
