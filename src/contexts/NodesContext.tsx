"use client";

import React, { createContext, useContext, useState, useEffect, useMemo } from "react";
import { useAllNodes } from "./AllNodesContext";
import { useSave } from "./SaveContext";
import { tree } from "next/dist/build/templates/app-page";

interface NodesContextType {
  displayedNodes: Set<string>;
  selectedNodes: Set<string>;
  highlightedNodes: Set<string>;

  setDisplayedNodes: React.Dispatch<React.SetStateAction<Set<string>>>;
  setSelectedNodes: React.Dispatch<React.SetStateAction<Set<string>>>;
  setHighlightedNodes: React.Dispatch<React.SetStateAction<Set<string>>>;
}

const NodesContext = createContext<NodesContextType | undefined>(undefined);

export const NodesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [displayedNodes, setDisplayedNodes] = useState<Set<string>>(new Set());
  const [selectedNodes, setSelectedNodes] = useState<Set<string>>(new Set());
  const [highlightedNodes, setHighlightedNodes] = useState<Set<string>>(new Set());

  const {baseSave, treeSaves} = useSave();


  const { allNodes } = useAllNodes();

  // load nodes from file
  useEffect(() => {
    async function fetchNodes() {
      const keys = new Set(allNodes.keys());
      setDisplayedNodes(keys);
    }
    fetchNodes();


  }, []);

  useEffect(() => {
    const val = treeSaves.keys().next().value;
    if(val){

      setSelectedNodes(new Set(treeSaves.get(val)?.tree!));
    }

  }, [baseSave]);


  const contextValue = useMemo(
    () => ({
      displayedNodes,
      selectedNodes,
      highlightedNodes,
      setDisplayedNodes,
      setSelectedNodes,
      setHighlightedNodes
    }),
    [displayedNodes, selectedNodes, highlightedNodes]
  );

  return (
    <NodesContext.Provider value={contextValue}>
      {children}
    </NodesContext.Provider>
  );
};

export const useNodes = (): NodesContextType => {
  const context = useContext(NodesContext);
  if (!context) {
    throw new Error("useNodes must be used within a NodesProvider");
  }
  return context;
};
