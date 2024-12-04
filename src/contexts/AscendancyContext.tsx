import { createContext, useContext, useState } from "react";
import { useNodes } from "./NodesContext";
import { useAllNodes } from "./AllNodesContext";

type AscendancyContextType = {
    ascendancy: string;
    setAscendancy: (ascendancy: string) => void;
    characterClass: string;
    ASCENDANCY_WITH_TEXT: Readonly<Record<string, string>>;
    getClasses: () => string[];
  };
  
  const AscendancyContext = createContext<AscendancyContextType | undefined>(undefined);

  // Ascendancy to Class Mapping
  const ASCENDANCY_TO_CLASS: Record<string, string> = {
    gemlinglegionnaire: 'mercenary',
    witchhunter: 'mercenary',
    acolyteofchayula: 'monk',
    invoker: 'monk',
    deadeye: 'ranger',
    pathfinder: 'ranger',
    chronomancer: 'sorceress',
    stormweaver: 'sorceress',
    titan: 'warrior',
    warbringer: 'warrior',
    bloodmage: 'witch',
    infernalist: 'witch'
  };

  const ASCENDANCY_WITH_TEXT: Readonly<Record<string, string>> = {
    gemlinglegionnaire: 'Gemling Legionnaire',
    witchhunter: 'Witch Hunter',
    acolyteofchayula: 'Acolyte Of Chayula',
    invoker: 'Invoker',
    deadeye: 'Deadeye',
    pathfinder: 'Pathfinder',
    chronomancer: 'Chronomancer',
    stormweaver: 'Stormweaver',
    titan: 'Titan',
    warbringer: 'Warbringer',
    bloodmage: 'Bloodmage',
    infernalist: 'Infernalist'
  };
  
  export const AscendancyProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const {setSelectedNodes, selectedNodes} = useNodes();
    const {allNodes} = useAllNodes();

    const [ascendancy, setAscendancyState] = useState<string>("gemlinglegionnaire");
    const [characterClass, setCharacterClass] = useState<string>("mercenary");

  
    const setAscendancy = (newAscendancy: string) => {
        if(newAscendancy == ascendancy) return;
        

        const newClass = ASCENDANCY_TO_CLASS[newAscendancy];
        const newSelectedNodes = Array.from(selectedNodes).filter((nodeId) => {
          return (nodeId.at(0) != "A");
        }).map((nodeId) => {
          const baseId = nodeId.split('-')[0];
          if(allNodes.has(`${baseId}-${newClass}`)) {
            return `${baseId}-${newClass}`;
          }

          return baseId;
        });
        setSelectedNodes(new Set(newSelectedNodes));


        setAscendancyState(newAscendancy);
        setCharacterClass(newClass);

    };

    const getClasses = () => Array.from(new Set(Object.values(ASCENDANCY_TO_CLASS)));
  
    return (
      <AscendancyContext.Provider value={{ ascendancy, setAscendancy, characterClass ,ASCENDANCY_WITH_TEXT, getClasses }}>
        {children}
      </AscendancyContext.Provider>
    );
  };
  

  export const useAscendancy = () => {
    const context = useContext(AscendancyContext);
    if (!context) {
      throw new Error('useAscendancy must be used within an AscendancyProvider');
    }
    return context;
  };