import { useState } from "react";
import AscendancySelect from "./saves/AscendancySelect";
import Saves from "./saves/Saves";
import SearchBar from "./Search";
import LeftSidebar from "../left-sidebar/LeftSidebar";
import RightSidebar from "../right-sidebar/RightSidebar";

interface HeaderProps {
}

export default function Header({ }: HeaderProps) {
  const [isLeftSidebarOpen, setIsLeftSidebarOpen] = useState(true);
  const [isRightSidebarOpen, setIsRightSidebarOpen] = useState(false);

  const toggleLeftSidebar = () => {
    setIsLeftSidebarOpen(!isLeftSidebarOpen);
  }

  const toggleRightSidebar = () => {
    setIsRightSidebarOpen(!isRightSidebarOpen);
  }


  return (
    <div className="absolute top-0 left-0 z-20 bg-gray-800 select-none text-white w-[100vw] h-[50px] flex flex-row items-center justify-between space-x-3 text-s">

      <div className="flex flex-row items-center h-full space-x-3">
        <div className="h-full">
          <button
            onClick={toggleLeftSidebar}
            className=" bg-gray-500 text-white  h-full focus:outline-none w-[100px] custom-m:w-[150px] custom-xl:w-[200px] "
          >
             <span className="inline custom-m:hidden">Settings</span>
             <span className="hidden custom-m:inline">Show Settings</span>
          </button>

          {isLeftSidebarOpen &&
            <LeftSidebar />
          }

        </div>
        <SearchBar />

      </div>


      <div className="flex flex-row items-center space-x-3 custom-m:flex hidden">
        <Saves />
        <label className="text-l custom-xl:block hidden"> poe2 skill tree planner</label>
        <AscendancySelect />
      </div>

      <div className="flex flex-row items-center h-full space-x-3">
      <div className="h-full">
      <button
        onClick={toggleRightSidebar}
        className="p-2 bg-gray-500 text-white focus:outline-none  h-full  w-[100px] custom-m:[150px] custom-xl:w-[200px]"
      >
                     <span className="inline custom-m:hidden">Stats</span>
                     <span className="hidden custom-m:inline">Show Stats</span>
      </button>

      {isRightSidebarOpen &&
        <RightSidebar />
      }
      </div>
      </div>

    </div >
  );
}
