
import React, { createContext, useContext, useState, useEffect, useMemo } from "react";
import { loadNodes } from "../utils/loadNodes";
import { NodeData } from "../types";
import { tree } from "next/dist/build/templates/app-page";
import { parse } from "path";

export type TreeSave = {
  ascendancy: string;
  tree: Set<string>;
};

interface SaveContextType {
  treeSaves: Map<string, TreeSave>;
  lastVersion: number;
  baseSave: string;

  setTreeSaves: React.Dispatch<React.SetStateAction<Map<string, TreeSave>>>;
  setLastVersion: React.Dispatch<React.SetStateAction<number>>;


  addSave: (name: string, ascendancy: string, tree: Set<string>) => void;
  removeSave: (name: string) => void;
  permSave: () => void;

  exportSave: (name: string) => string;
  importSave: (encodedSave: string) => void;
}

const SaveContext = createContext<SaveContextType | undefined>(undefined);


export const SaveProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [treeSaves, setTreeSaves] = useState<Map<string, TreeSave>>(new Map());
  const [lastVersion, setLastVersion] = useState<number>(0);
  const [baseSave, setBaseSave] = useState<string>("");

  // load saves on startup
  useEffect(() => {
    async function loadSave() {

      const sTrees = localStorage.getItem("saves");
      const oldTrees = localStorage.getItem("savedTree");

      if (sTrees) {
        const parsedTreeObject = JSON.parse(sTrees);

        const treeMap = new Map(
          Object.entries(parsedTreeObject).map(([key, value]) => {
            return [
              key,
              {
                ascendancy: (value as TreeSave).ascendancy,
                tree: new Set((value as TreeSave).tree)
              }
            ]
          })
        );
        
        setTreeSaves(new Map(treeMap));

      } else if (oldTrees) {
        const newTreeSaves = new Map<string, TreeSave>();
        const parsedOldTrees = new Map<string, Set<string>>(
          Object.entries(JSON.parse(oldTrees)) // Convert object to array of key-value pairs
        );

        parsedOldTrees.forEach((tree, key) => {
          newTreeSaves.set(key, {
            ascendancy: "gemlinglegionnaire",
            tree: tree,
          });
        });

        setTreeSaves(new Map(newTreeSaves));
      } else {
        const defaultTreeSave: TreeSave = {
          ascendancy: "gemlinglegionnaire",  // You can adjust this as needed
          tree: new Set<string>(),  // Default empty tree, or provide any default nodes
        };

        setTreeSaves(new Map<string, TreeSave>([["default tree", defaultTreeSave],]));
      }

      const sLastVersion = localStorage.getItem("lastVersion");
      if (sLastVersion) {
        setLastVersion(Number(sLastVersion));
      }

    }
    loadSave();
  }, []);

  useEffect(() => {
    if(!baseSave){
      const val =treeSaves.keys().next().value!;

      setBaseSave(val);
    }
  }, [treeSaves])


  // on every save update, post them to local storage
  const permSave = () => {
    async function saveState() {

      const treeObject = Object.fromEntries(
        Array.from(treeSaves.entries()).map(([key, value]) => [
          key,
          {
            ascendancy: value.ascendancy,  // Ensure ascendancy is saved correctly
            tree: Array.from(value.tree)   // Convert Set to Array
          }
        ])
      );

      localStorage.setItem("saves", JSON.stringify(treeObject));
    }

    saveState();

  };

  // on last version update persist it
  useEffect(() => {
    async function saveState() {
      localStorage.setItem("savedLastVersion", lastVersion.toString());
    }

    saveState();

  }, [lastVersion]);


  const addSave = (name: string, ascendancy: string, tree: Set<string>) => {
    if(!name){
      console.log("cant create empty name save!");
      return;
    }

    if (treeSaves.has(name)) {
      //TODO better notif
      console.log("already have a save with that name");
      return;
    }

    const updatedTrees = new Map(treeSaves);
    updatedTrees.set(name, { ascendancy, tree });
    setTreeSaves(updatedTrees);
    permSave();
  };

  const removeSave = (name: string) => {
    if(treeSaves.size <= 1){
      return;
    }
    const updatedTrees = new Map(treeSaves);
    updatedTrees.delete(name);
    setTreeSaves(updatedTrees);
    permSave();
  };

  const exportSave = (name: string) => {
    return "";
  };

  const importSave = (encodedSave: string) => {
  };


  const contextValue = useMemo(
    () => ({
      treeSaves,
      lastVersion,
      baseSave,

      setTreeSaves,
      setLastVersion,

      addSave,
      removeSave,
      permSave,

      exportSave,
      importSave
    }),
    [treeSaves, lastVersion]
  );

  return (
    <SaveContext.Provider value={contextValue}>
      {children}
    </SaveContext.Provider>
  );
};

export const useSave = (): SaveContextType => {
  const context = useContext(SaveContext);
  if (!context) {
    throw new Error("useNodes must be used within a NodesProvider");
  }
  return context;
};
