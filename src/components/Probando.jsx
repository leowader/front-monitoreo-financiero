import React, { useEffect, useRef, useState } from "react";
import { createChart } from "lightweight-charts";
import axios from "axios";
import TablaIpc from "./TablaIpc";
const ChartComponent = () => {
  const chartContainerRef = useRef(null);
  const toolTipRef = useRef(null);
  const [loading, setLoading] = useState(false);
  //   console.log("mi data", data);
  const [midata, setMidata] = useState();
  var data = [];
  const columnas = [
    { name: "Año-mes-dia" },
    { name: "Inflacion %" },
    { name: "valor mas bajo %" },
    { name: "valor mas alto %" },
  ];

  const getIndicadores = async () => {
    const res = await axios.get("https://api-monitoreo.up.railway.app/getindicadores");
    // console.log(res.data[0].datos);
    const ipc = res.data[4].datos;
    data = ipc.map((ip, index) => {
      return { time: ip.ds, value: ip.yhat };
    });
    // console.log("mi data", data);
    setMidata(data);
  };
  if (loading === false) {
    getIndicadores();
    setLoading(true);
  }

  useEffect(() => {
    const chartContainer = chartContainerRef.current;
    const toolTip = toolTipRef.current;
    chartContainer.style.backgroundColor = "#202123";

    document.body.style.position = "relative";

    var container = document.createElement("div");
    chartContainer.appendChild(container);

    var width = 600;
    var height = 430;
    const resizeChart = () => {
      if (chartContainerRef.current) {
        const containerWidth = container.offsetWidth;
        chart.resize(containerWidth, height);
      }
    };

    // console.log("aaa", midata);
    var chart = createChart(container, {
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
      crosshair: {
        vertLine: {
          labelVisible: false,
        },
      },
    });
    chart.resize(width, height);
    var series = chart.addAreaSeries({
      topColor: "rgba(0, 150, 136, 0.56)",
      bottomColor: "rgba(0, 150, 136, 0.04)",
      lineColor: "rgba(0, 150, 136, 1)",
      lineWidth: 2,
    });
    // console.log("dta al argar ", midata);
    if (midata) {
      series.setData(midata);
    } else {
      // console.log("mi data?", midata);
    }
    chart.subscribeCrosshairMove((param) => {
      if (
        param.point === undefined ||
        !param.time ||
        param.point.x < 0 ||
        param.point.x > container.clientWidth ||
        param.point.y < 0 ||
        param.point.y > container.clientHeight
      ) {
        toolTip.style.display = "none";
      } else {
        // ... (rest of your tooltip code)
      }
    });
    window.addEventListener("resize", resizeChart);

    // Llamar a la función de redimensionamiento inicialmente
    resizeChart();
    return () => {
      chartContainer.removeChild(container);
      window.removeEventListener("resize", resizeChart);
    };
  }, [midata]);

  return (
    <div className="w-full ">
      <div className="w-full lg:w-full sm:grid sm:grid-rows-2 lg:flex p-2 justify-center gap-4">
        {midata ? (
          <TablaIpc columnas={columnas} defaultData={midata}></TablaIpc>
        ) : (
          ""
        )}
        <div ref={chartContainerRef} className="  h-full  rounded-lg "></div>
        <div
          ref={toolTipRef}
          className="w-48 h-40 absolute hidden p-2 box-border text-sm text-left z-10 top-12 left-12 border border-[rgba(255, 82, 82, 1)] bg-white text-black"
        />

        {/* <span className="flex items-center  transform rotate-90 font-bold text-[20px]">Inflacion</span> */}
      </div>
    </div>
  );
};
export default ChartComponent;
