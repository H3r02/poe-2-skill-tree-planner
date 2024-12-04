import React, { useEffect, useState } from 'react';
import { NodeData } from '@/types';
import { useTransformContext, useTransformEffect } from 'react-zoom-pan-pinch';


interface ChangeMessageProps {
}

const ChangeMessage: React.FC<ChangeMessageProps> = () => {
  const [isVisible, setIsVisible] = useState<boolean>(true);

  const closeMessage = () => {
    setIsVisible(false);
  };

  useEffect(() => {
    const messageVisible = localStorage.getItem("messageVisible");
    if (!messageVisible) {
      setIsVisible(true);
      localStorage.setItem("messageVisible", "true");
    }
  }, []);


  return (
    <div>
      {isVisible && (
        <div
          className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-blue-900 text-white p-4 rounded-md shadow-lg z-50 h-[90vh] w-[90vw] opacity-100 flex-col gap-y-10"
        >
          <div className="flex justify-between items-center  ">
          <h1 className="text-2xl text-center">andrej2431 </h1>
            <h1 className="text-2xl w-[80%] text-center">Poe Tree Planner V2 - Ascendancies + tree import/export </h1>
            <button
              onClick={closeMessage}
              className="text-white font-bold ml-4"
            >
              X
            </button>
          </div>

          <div className="max-w-4xl mx-auto p-6   flex-col gap-y-10  overflow-y-scroll  h-[80vh]">

            <div className="mb-8 shadow-xl bg-blue-500 rounded-lg p-5 text-l">
              <h2 className="text-2xl font-bold  mb-4">Importing/Exporting trees added</h2>
              <p className="">
                CTRL+F focuses search bar, no need to click it to search
              </p>
              <p className="">
                Enter while searching will cycle over searched passives and pan to them
              </p>
              <p className="">
                Create/delete/import/export tree by opening dropdown and clicking on new tree
              </p>
              <p className="">
                Show all merged stats from passives eg. +5 to attributes x2 will be +10 to attributes in Show stats
              </p>
            </div>
          </div>
        </div>

      )
      }

    </div>
  )
};

export default ChangeMessage;
