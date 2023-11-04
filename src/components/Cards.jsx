import React from "react";
import GoogleIcon from "@mui/icons-material/Google";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";

export default function Cards({ ingeniero }) {
  return (
    <div className="relative mt-5  w-auto xl:w-96 md:w-96 md:p-2   mx-auto rounded-lg   ">
      <div className="bg-gradient-to-r from-rose-700 to-pink-600 rounded-full h-28 w-28 z-0 -left-4 -top-4  absolute"></div>
      <div className="bg-gradient-to-r from-purple-800 via-violet-900 to-purple-800 rounded-full h-28 w-28 z-0  -bottom-0 -right-4  absolute"></div>
      <div className="block lg:w-full sm:w-full    h-auto bg-white bg-opacity-10  backdrop-blur-sm  drop-shadow-2xl rounded-lg">
        <div className="flex justify-center w-full">
          <div className="rounded-full h-32 w-32 mt-5 bg-[#605B63] p-2 drop-shadow-2xl">
            <img className="rounded-full " src={ingeniero.img} alt="" />
          </div>
        </div>

        <span className="flex text-center justify-center font-bold text-[20px] mt-5">
          {ingeniero.nombre}
        </span>
        <span className="flex justify-center">{ingeniero.carrera}</span>
        <span className="flex justify-center">{ingeniero.cc}</span>
        <span className="flex justify-center">{ingeniero.dir} </span>
        <div className=" flex justify-center w-full mt-5 gap-4">
          <div className="w-12 h-12 bg-[#605B63] rounded-full flex justify-center items-center ">
            <GoogleIcon style={{ color: "#FBBC04" }}></GoogleIcon>
          </div>
          <span className=" flex items-center">{ingeniero.correo}</span>
        </div>
        <div className="flex justify-center w-full  gap-4">
          <div className="w-12 h-12 bg-[#605B63] rounded-full flex justify-center items-center ">
            <WhatsAppIcon style={{ color: "#34A853" }}></WhatsAppIcon>
          </div>
          <span className=" flex items-center">{ingeniero.telefono}</span>
        </div>
        <div className="bg-inherit h-16 rounded-b-lg mt-4 flex justify-center items-center ">
          <img
            className="h-12"
            src="https://nueva.unicesar.edu.co/wp-content/uploads/2023/04/LOGO-UPC.png"
            alt=""
          />
        </div>
      </div>
    </div>
  );
}
