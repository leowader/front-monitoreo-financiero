import { useEffect, useState } from "react";
import axios from "axios";
// import AccountCircleIcon from "@mui/icons-material/AccountCircle";
export default function TablaDeuda({ columnas, defaultData }) {
  const [midata, setMidata] = useState();
  const [interna, setInterna] = useState();
  const [total, setTotal] = useState();
  const getIndicadores = async () => {
    const res = await axios.get("https://api-monitoreo.up.railway.app/getindicadores");
    // console.log(res.data[1].datos);
    const externa = res.data[7].datos;
    const inter = res.data[4].datos;
    const tot = res.data[5].datos;
    // console.log("mi data2", ipc);
    setMidata(externa);
    setInterna(inter);
    setTotal(tot);
  };
  useEffect(() => {
    getIndicadores();
  }, []);
  //   if (midata) {
  //     defaultData = midata;
  //   }
  // console.log("res back", midata);
  if (midata) {
    defaultData = [...midata].reverse();
  }
  const [currentPage, setCurrentPage] = useState(1); //pagina actual
  const recordsPerPage = 5; //numero de filas
  const lastIndex = currentPage * recordsPerPage; //ultimo indice
  const firstIndex = lastIndex - recordsPerPage; //primer indice
  const records = defaultData.slice(firstIndex, lastIndex); //registros
  // const name= "leooo";
  //   const probar = "asdfs";
  const nPages = Math.ceil(defaultData.length / recordsPerPage);
  const numbers = [...Array(nPages + 1).keys()].slice(1);
  function changeCPage(id) {
    setCurrentPage(id);
  }
  function prePage() {
    if (currentPage !== 1) {
      setCurrentPage(currentPage - 1);
    }
  }
  function nextPage() {
    if (currentPage !== nPages) {
      setCurrentPage(currentPage + 1);
    }
  }
  //

  return (
    <div className=" p-2 ">
      <div className="relative overflow-x-auto sm:rounded-lg flex justify-center animate-fade-down">
        <table className="text-sm w-auto  text-left text-white dark:text-gray-400">
          <thead className="text-xs text-white uppercase dark:bg-[#4E4F50] dark:text-gray-400">
            <tr className=" w-10">
              {columnas.map((col, index) => (
                <th scope="col" className="p-2 " key={index}>
                  <span className="flex justify-center ">{col.name}</span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {records.map((data, index) => (
              <tr className=" border-b border-[#3A3B3C] " key={index}>
                <th
                  key={index}
                  scope="row"
                  className="px-5 py-4 flex justify-center items-center font-medium text-white whitespace-nowrap dark:text-white"
                >
                  <div className="flex justify-start w-full">
                    <div className="bg-[#3A3B3C] rounded-lg w-10 h-10 p-2 mr-2">
                      <img
                        src="https://static.vecteezy.com/system/resources/thumbnails/021/951/759/small/3d-calendar-event-date-day-schedule-icon-illustration-png.png"
                        alt=""
                      />
                    </div>
                    <div className="ml-2 flex justify-center items-center">
                      {midata ? data.ds : data.time}
                    </div>
                  </div>
                </th>
                <td>
                  <span className="flex justify-center">
                    {midata ? data.yhat.toFixed(2) : data.value.toFixed(2)}
                    {/* {data.value.toFixed(2)} */}
                  </span>
                </td>
                <td>
                  <span className="flex justify-center">
                    {interna
                      ? interna[index].yhat.toFixed(2)
                      : data.value.toFixed(2)}
                    {/* {data.value.toFixed(2)} */}
                  </span>
                </td>
                <td>
                  <span className="flex justify-center">
                    {midata
                      ? total[index].yhat.toFixed(2)
                      : data.value.toFixed(2)}
                    {/* {data.value.toFixed(2)} */}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* pagination */}
      <nav className="w-full flex justify-center mt-5 animate-fade-down">
        <ul className="pagination w-48 flex justify-center items-center ">
          <li className="page-item inline-block rounded-full">
            <a
              href="#!"
              className="relative block rounded-full p-2 text-sm transition-all duration-300 text-white  hover:text-[#2374E1] "
              onClick={prePage}
            >
              {" "}
              {"<"}
            </a>
          </li>
          {numbers
            .slice(
              Math.max(currentPage - 4, 0),
              Math.min(currentPage, defaultData.length)
            )
            .map((n, i) => (
              <li
                className={`page-item p-1 inline-block rounded-full ${
                  currentPage === n
                    ? "bg-[#2374E1] hover:scale-105 duration-300"
                    : "transition-all duration-300 hover:bg-neutral-700 dark:text-white"
                }`}
                key={i}
              >
                <a
                  href="#!"
                  onClick={() => changeCPage(n)}
                  className={`flex rounded-full gap-3 px-3 py-1.5 text-sm `}
                >
                  {n}
                </a>
              </li>
            ))}

          <li className="page-item inline-block">
            <a
              href="#!"
              className="relative block rounded-full p-2 text-sm transition-all duration-300 text-white hover:text-[#2374E1]  pl-2"
              onClick={nextPage}
            >
              {" "}
              {">"}
            </a>
          </li>
        </ul>
        <div className=" flex justify-center ml-6 items-center">
          <span className="text-sm ">Total registros {defaultData.length}</span>
        </div>
      </nav>
      <div className="absolute bottom-0 right-0  ">
        <div className="flex justify-center"></div>
      </div>
    </div>
  );
}
