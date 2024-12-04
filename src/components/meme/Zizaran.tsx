import React, { LegacyRef, Ref, useEffect, useMemo, useRef, useState } from 'react';
import { useAllNodes } from '@/contexts/AllNodesContext';
import { useNodes } from '@/contexts/NodesContext';
import { close } from 'node:inspector/promises';


interface ZizaranProps {
  term: string;
}

const MemeZizaran: React.FC<ZizaranProps> = ({term}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpen2, setIsOpen2] = useState(false);
  const [isOpen3, setIsOpen3] = useState(false);
  const [isOpen4, setIsOpen4] = useState(false);
  const [isOpen5, setIsOpen5] = useState(false);
  const [counter, setCounter] = useState(1);

  useEffect(() => {
    if(term == "zizaran" && !isOpen && !isOpen2 && !isOpen3 && !isOpen3 && !isOpen4 && !isOpen5) {
      setIsOpen(true);
    }
  
  }, [term]);


  const open = () => {
    setIsOpen(true);
    setIsOpen2(false);
    setIsOpen3(false);
    setIsOpen4(false);
    setIsOpen5(false);
  }

  const open2 = () => {
    setIsOpen(false);
    setIsOpen2(true);
    setIsOpen3(false);
    setIsOpen4(false);
    setIsOpen5(false);
  }

  const open3 = () => {
    setIsOpen(false);
    setIsOpen2(false);
    setIsOpen3(true);
    setIsOpen4(false);
    setIsOpen5(false);
  }

  const open4 = () => {
    setIsOpen(false);
    setIsOpen2(false);
    setIsOpen3(false);

    setCounter(counter+1);
    if(counter < 10){
      setIsOpen4(true);
      setIsOpen5(false);
    }else {
      setIsOpen4(false);
      setIsOpen5(true);
    }
  }

  const open5 = () => {
    setIsOpen(false);
    setIsOpen2(false);
    setIsOpen3(false);
    setIsOpen4(false);
    setIsOpen5(true);

  }

  const closeAll = () => {
    setIsOpen(false);
    setIsOpen2(false);
    setIsOpen3(false);
    setIsOpen4(false);
    setIsOpen5(false);
  }

  return (
    <div>
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 space-x-0 text-white">
          <div className="bg-gray-700 p-6 rounded-lg shadow-lg w-96">
          <button
              onClick={closeAll}
              className="text-white font-bold ml-4"
            >
              X
            </button>
            <h2 className="text-xl font-semibold mb-4 text-center">Are you Zizaran?</h2>

            {/* Buttons */}
            <div className="flex justify-around space-x-4">
              <button
                onClick={() => open2()}
                className="px-4 py-2 bg-red-300 text-gray-700 rounded-md hover:bg-red-400"
              >
                Yes
              </button>
              <button
                onClick={() => closeAll()}
                className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}
      

{isOpen2 && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 space-x-0 text-white">
          <div className="bg-gray-700 p-6 rounded-lg shadow-lg w-96">
          <button
              onClick={()=> closeAll()}
              className="text-white font-bold ml-4"
            >
              X
            </button>
            <h2 className="text-xl font-semibold mb-4 text-center">Are you MAD?</h2>

            {/* Buttons */}
            <div className="flex justify-around space-x-4">
              <button
                onClick={() => open5()}
                className="px-4 py-2 bg-red-300 text-white rounded-md hover:bg-red-400 "
              >
                Yes
              </button>
              <button
                onClick={() => open3()}
                className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}

{isOpen3 && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 space-x-0 text-white">
          <div className="bg-gray-700 p-6 rounded-lg shadow-lg w-96">
          <button
              onClick={() => open4()}
              className="text-white font-bold ml-4"
            >
              X
            </button>
            <h2 className="text-xl font-semibold mb-4 text-center">Are you MAD?</h2>

            {/* Buttons */}
            <div className="flex space-x-4 justify-around">
              <button
                onClick={() => open4()}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
              >
                Yes
              </button>
              <button
                onClick={() => open4()}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
              >
                Yes
              </button>

            </div>
          </div>
        </div>
      )}

{isOpen4 && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 space-x-0 text-white">
          <div className="bg-gray-700 p-6 rounded-lg shadow-lg w-96">
          <button
                onClick={() => open4()}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
              >
                Yes
              </button>

            <h2 className="text-xl font-semibold mb-4 text-center">{`Are you MAD?${'?'.repeat(counter)}`}</h2>

            {/* Buttons */}
            <div className="flex justify-around space-x-4">
              <button
                onClick={() => open4()}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
              >
                Yes
              </button>
              <button
                onClick={() => open4()}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
              >
                Yes
              </button>
            </div>
          </div>
        </div>
      )}

{isOpen5 && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 space-x-0 text-white">
          <div className="bg-gray-700 p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-semibold mb-4 text-center">Good</h2>

            <div className="flex justify-around space-x-4">
              <button
                onClick={() => closeAll()}
                className="px-4 py-2 bg-gray-300 text-white rounded-md hover:bg-gray-400"
              >
                Yes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )

};

export default MemeZizaran;
