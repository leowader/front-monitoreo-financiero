import React from "react";

export default function Acciones() {
  const nvdaData = [
    408.55, 437.53, 439.4, 434.86, 433.435, 432.99, 469.67, 456.68, 471.16,
    471.63, 460.18, 468.35, 487.84, 492.64, 493.55, 485.09, 485.48, 470.61,
    462.41, 455.72, 451.78, 448.7, 454.85, 455.81, 439, 439.66, 435.2, 422.39,
    410.17, 416.1, 422.22, 419.11, 424.68, 430.89, 434.99, 447.82, 435.17,
    440.41, 446.88, 457.62, 452.73, 457.98, 468.06, 469.45, 454.61, 460.95,
    439.38, 421.96, 421.01, 413.87, 429.75, 436.63, 417.79, 403.26, 405, 411.61,
    407.8, 423.25, 435.06, 450.05, 457.51, 459.55, 465.74, 469.5, 483.35,
  ];
  console.log(nvdaData.length);

  function calcularCrecimientoPorcentaje(datos) {
    const porcentajesCrecimiento = [];

    for (let i = 1; i < datos.length; i++) {
      const crecimiento = ((datos[i] - datos[i - 1]) / datos[i - 1]) * 100;
      porcentajesCrecimiento.push(crecimiento);
    }

    return porcentajesCrecimiento;
  }

  const porcentajesCrecimiento = calcularCrecimientoPorcentaje(nvdaData);
  console.log("acciiones",porcentajesCrecimiento);

  return <div>acciones</div>;
}
