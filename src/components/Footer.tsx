import { useState } from "react";
import Saves from "./header/saves/Saves";
import AscendancySelect from "./header/saves/AscendancySelect";


interface FooterProps {
}

export default function Footer({ }: FooterProps) {

  return (
    <div className="absolute bottom-0 left-0 z-20 bg-gray-800 select-none text-white w-[100vw] h-[50px] flex flex-row items-center justify-evenly space-x-3 text-s block custom-m:hidden">
        <Saves />
        <AscendancySelect />

    </div >
  );
}
