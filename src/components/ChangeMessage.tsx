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
            <h1 className="text-2xl w-[80%] text-center">Poe Tree Planner V2 - Looks scuffed but works (Full ascendancies out) </h1>
            <button
              onClick={closeMessage}
              className="text-white font-bold ml-4"
            >
              X
            </button>
          </div>

          <div className="max-w-4xl mx-auto p-6   flex-col gap-y-10  overflow-y-scroll  h-[80vh]">

            <div className="mb-8 shadow-xl bg-blue-500 rounded-lg p-5">
              <h2 className="text-2xl font-bold  mb-4">!Important Missable Controls</h2>
              <p className="">
                CTRL+F focuses search bar, no need to click it to search
              </p>
              <p className="">
                Enter while searching will cycle over searched passives and pan to them
              </p>
              <p className="">
                Create tree by opening dropdown and clicking on new tree
              </p>
              <p className="">
                Show all merged stats from passives eg. +5 to attributes x2 will be +10 to attributes in Show stats
              </p>
            </div>

            <div className="mb-8 shadow-xl bg-blue-500 rounded-lg p-5">
              <h2 className="text-2xl font-bold  mb-4">Features</h2>
              <p className="">
                More or less mobile support
              </p>

              <p className="">
                Radically improved visiblity of nodes
              </p>

              <p className="">
                Hiding different types of passives

              </p>
              <p className="">
                Search passives which highlight them
              </p>
              <p className="">
                Cycle over highlighted passives
              </p>
              <p className="">
                Create new tree (can choose between copying current tree or not)
              </p>
              <p className="">
                Swap to an existing tree
              </p>
              <p className="">
                Change ascendancy
              </p>
              <p className="">
                Show selected passives with the ability to filter them by name/stats (any substring will do)
              </p>

              <p className="">
                Show all stats from passives, same are merged eg. +5 to attributes x2 will be +10 to attributes (I know that some don't merge because of typos will fix eventually)
              </p>
            </div>
            <div className="mb-8 shadow-xl bg-blue-500 rounded-lg p-5">
              <h2 className="text-2xl font-bold  mb-4">Todos</h2>
              <p className="">
                I already support different passive based on class (you can see in witch vs other starting passive minion+spell dmg vs spell dmg), but haven't had the time to fill them up, will do
              </p>
              <p className="">
                Will add all the nodes that I didn't have time to add due to remaking the site
              </p>
              <p className="">
                Will try to improve performance
              </p>
              <p className="">
                Will add importing,exporting, deleting, renaming trees
              </p>
              <p className="">
                Will add list of dynamically searched passives under search bar
              </p>
              <p className="">
                I do take reccomendations on my github
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
