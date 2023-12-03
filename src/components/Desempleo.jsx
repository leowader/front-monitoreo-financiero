import React, { useEffect, useRef, useState } from "react";
import { createChart } from "lightweight-charts";
import axios from "axios";
import TablaDesempleo from "./TablaDEsempleo";
function ChartDesempleo() {
  const chartContainerRef = useRef(null);

  var data = [];
  const [midata, setMidata] = useState();
  const [loading, setLoading] = useState(false);
  const columnas = [
    { name: "Año-mes-dia" },
    { name: "Desempleo %" },
    { name: "valor mas bajo %" },
    { name: "valor mas alto %" },
  ];
  const getIndicadores = async () => {
    const res = await axios.get("https://api-monitoreo.up.railway.app/getindicadores");
    // console.log(res.data[1].datos);
    const ipc = res.data[2].datos;
    data = ipc.map((ip, index) => {
      return { time: ip.ds, value: ip.yhat };
    });
    // console.log("Desempleo", data);
    setMidata(data);
  };
  // const getDolar = async () => {
  //   const res = await axios.get(
  //     "https://www.datos.gov.co/resource/32sa-8pi3.json"
  //   );
  //   console.log("--MONEDA--", res.data);
  // };
  // const doceHorasEnMilisegundos = 12 * 60 * 60 * 1000;

  if (loading === false) {
    getIndicadores();
    console.clear();
    // getDolar();
    setLoading(true);
    // setInterval(getDolar, 50000);
  }

  useEffect(() => {
    const chartElement = document.createElement("div");
    chartContainerRef.current.appendChild(chartElement);
    // console.log("recargague");

    const resizeChart = () => {
      if (chartContainerRef.current) {
        const containerWidth = chartElement.offsetWidth;
        chart.resize(containerWidth, 430);
      }
    };
    const chart = createChart(chartElement, {
      width: 600,
      height: 430,
      layout: {
        textColor: "white",
        background: {
          type: "solid",
          color: "#18191A",
        },
      },
      rightPriceScale: {
        scaleMargins: {
          top: 0.3,
          bottom: 0.25,
        },
      },
      crosshair: {
        vertLine: {
          width: 4,
          color: "rgba(224, 227, 235, 0.1)",
          style: 0,
        },
        horzLine: {
          visible: false,
          labelVisible: false,
        },
      },
      grid: {
        vertLines: {
          color: "rgba(42, 46, 57, 0)",
        },
        horzLines: {
          color: "rgba(42, 46, 57, 0)",
        },
      },
      handleScroll: {
        vertTouchDrag: false,
      },
    });

    const series = chart.addLineSeries({
      color: "#651FFF",
      lineWidth: 2,
      crosshairMarkerVisible: false,
      lastValueVisible: false,
      priceLineVisible: false,
    });

    if (midata) {
      series.setData(midata);
    } else {
      // console.log("mi data?", midata);
    }
    // series.setData(data);
    if (midata) {
      var minimumPrice = midata[0].value;
      var maximumPrice = minimumPrice;
      for (var i = 1; i < midata.length; i++) {
        var price = midata[i].value;
        if (price > maximumPrice) {
          maximumPrice = price;
        }
        if (price < minimumPrice) {
          minimumPrice = price;
        }
      }
      var avgPrice = (maximumPrice + minimumPrice) / 2;

      var lineWidth = 2;
      var minPriceLine = {
        price: minimumPrice,
        color: "#009688",
        lineWidth: lineWidth,

        axisLabelVisible: true,
        title: "porcentaje minimo",
      };
      var avgPriceLine = {
        price: avgPrice,
        color: "#F79903",
        lineWidth: lineWidth,

        axisLabelVisible: true,
        title: "promedio desempleo",
      };
      var maxPriceLine = {
        price: maximumPrice,
        color: "#DE1633",
        lineWidth: lineWidth,

        axisLabelVisible: true,
        title: "porcentaje maximo",
      };

      series.createPriceLine(minPriceLine);
      series.createPriceLine(avgPriceLine);
      series.createPriceLine(maxPriceLine);
    }

    chart.timeScale().fitContent();
    const xcurreent = chartContainerRef.current;
    window.addEventListener("resize", resizeChart);

    // Llamar a la función de redimensionamiento inicialmente
    resizeChart();
    return () => {
      // Limpia el gráfico al desmontar el componente
      xcurreent.removeChild(chartElement);
      window.removeEventListener("resize", resizeChart);
    };
  }, [midata]);

  return (
    <div className="justify-center gap-4 lg:w-full sm:grid sm:grid-rows-2 p-2 lg:flex">
      {midata ? (
        <TablaDesempleo
          columnas={columnas}
          defaultData={midata}
        ></TablaDesempleo>
      ) : (
        ""
      )}
      <div
        ref={chartContainerRef}
        className="  h-full  border-[#4D4D4F] rounded-lg "
      ></div>
    </div>
  );
}

export default ChartDesempleo;
