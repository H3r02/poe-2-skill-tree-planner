import { useAscendancy } from "@/contexts/AscendancyContext";
import { useNodes } from "@/contexts/NodesContext";
import { useSave, TreeSave } from "@/contexts/SaveContext";
import React, { useEffect, useState } from "react";

interface SavesProps {
}

const Saves: React.FC<SavesProps> = ({ }) => {
  const { selectedNodes, setSelectedNodes } = useNodes();
  const { treeSaves, setTreeSaves, addSave, baseSave} = useSave();
  const { ascendancy, setAscendancy } = useAscendancy();

  const [currentSave, setCurrentSave] = useState<string>("");

  const [newSaveName, setNewSaveName] = useState<string>("");
  const [copyCurrentTree, setCopyCurrentTree] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);


  const handleSaveSelection = (event: React.ChangeEvent<HTMLSelectElement>) => {
    if (event.target.value == "new") {
      setIsOpen(true);
    } else {
      setCurrentSave(event.target.value);
      changeToSave(event.target.value);
    }

  };

  useEffect(() => {
    if(currentSave){
      const updatedSaves = new Map(treeSaves);
      const save = updatedSaves.get(currentSave)!.tree;
      updatedSaves.set(currentSave, { tree: save, ascendancy: ascendancy });
      setTreeSaves(updatedSaves);
    }

  }
    , [ascendancy]);

  useEffect(() => {
    if (currentSave) {
      const updatedSaves = new Map(treeSaves);
      updatedSaves.set(currentSave, { tree: selectedNodes, ascendancy: ascendancy });
      setTreeSaves(updatedSaves);
    }

  }, [selectedNodes]);

  const changeToSave = (newSaveName: string) => {
    const newSave = treeSaves.get(newSaveName);

    if (!newSave) return;
    setSelectedNodes(newSave.tree);
    setAscendancy(newSave.ascendancy);
  }

  useEffect(() => {
    if(!currentSave){
      const newCurrSave = treeSaves.keys().next().value;
      if(newCurrSave){
        setCurrentSave(newCurrSave);
      }
    }
  })

  const handleCreate = () => {
    const newAscendancy = copyCurrentTree ? ascendancy : "gemlinglegionnaire";
    const newSelected = copyCurrentTree ? new Set<string>(selectedNodes) : new Set<string>();
    addSave(newSaveName, newAscendancy, newSelected);
    changeToSave(newSaveName);

    setIsOpen(false);
    setNewSaveName("");
    setCopyCurrentTree(false);
  }


  return (
    <div className="flex flex-row items-center justify-center space-x-0">
      {/* Dropdown to select a save */}
      <select
        id="saveSelector"
        value={currentSave}
        onChange={handleSaveSelection}
        className="p-1  rounded-md bg-gray-700 cursor-pointer w-[200px] focus:outline-none"
      >
        {Array.from(treeSaves.keys()).map((saveName) => (
          <option key={saveName} value={saveName}>
            {saveName}
          </option>
        ))}
        <option key="new" value="new" className="bg-green-800 py-2 text-center">[new tree]</option>
      </select>

      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 space-x-0 text-white">
          <div className="bg-gray-700 p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-semibold mb-4 text-center">Create New Save</h2>

            {/* Input for New Name */}
            <label className="block mb-4 text-lg">
              <span className="">New Name:</span>
              <input
                type="text"
                value={newSaveName}
                onChange={(e) => setNewSaveName(e.target.value)}
                className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
              />
            </label>

            {/* Checkbox */}
            <label className="flex items-center mb-4">
              <input
                type="checkbox"
                checked={copyCurrentTree}
                onChange={(e) => setCopyCurrentTree(e.target.checked)}
                className="mr-2"
              />
              <span className="">Copy current tree</span>
            </label>

            {/* Buttons */}
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setIsOpen(false)}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handleCreate}
                className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
              >
                Create
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}


export default Saves;