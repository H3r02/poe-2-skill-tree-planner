import { useAllNodes } from "@/contexts/AllNodesContext";
import { useNodes } from "@/contexts/NodesContext";
import { useEffect, useRef, useState } from "react";
import { useControls } from "react-zoom-pan-pinch";
import Zizaran from "../meme/Zizaran";

interface SearchBarProps {
}

export default function SearchBar({ }: SearchBarProps) {
    const { allNodes } = useAllNodes();
    const {zoomToElement} = useControls();
    const { highlightedNodes, setHighlightedNodes, displayedNodes } = useNodes();
    const [searchQuery, setSearchQuery] = useState<string>("");
    const [highlightIndex, setHighlightIndex] = useState<number>(0);
    const searchInputRef = useRef<HTMLInputElement>(null);
    const [zizOn, setZizOn] = useState(false);


    useEffect(() => {
        const handleKeyDown = (event: { ctrlKey: any; metaKey: any; key: string; preventDefault: () => void; }) => {
            if ((event.ctrlKey || event.metaKey) && event.key === "f") {
                event.preventDefault(); // Prevent the default browser search behavior
                searchInputRef.current?.focus(); // Focus the custom search bar
            }
        };

        window.addEventListener("keydown", handleKeyDown);

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        }
    })

    useEffect(() => {  
        if (!searchQuery){
          setHighlightedNodes(new Set());
          return;
        }


  
        const highlightedNodeIds = Array.from(allNodes.values())
        .filter((node) => displayedNodes.has(node.id))
          .filter((node) => {
            const nameMatch = node.name?.toLowerCase().includes(searchQuery.toLowerCase());
            const statsMatch = node.stats.some((stat) =>
              stat.toLowerCase().includes(searchQuery.toLowerCase())
            );
            return nameMatch || statsMatch;
          })
          .map((node) => node.id);
    
        setHighlightedNodes(new Set(highlightedNodeIds));

        if(searchQuery == "zizaran"){
          setSearchQuery("");
        }
    
      }, [allNodes, searchQuery, displayedNodes]);
  

    function onSearchChange(value: string): void {
        setHighlightIndex(0);
        setSearchQuery(value);
    }

    const onEnter = () => {
        if(searchQuery == "zizaran"){
          setSearchQuery("");
        }

        const nodeId = Array.from(highlightedNodes)[highlightIndex];
        const node = allNodes.get(nodeId);
        if (node) {
          zoomToElement(`passive-${node.id}`);
        }
        setHighlightIndex((highlightIndex+1) % highlightedNodes.size);
      };

    return (
        <div className="flex flex-row space-x-2">
            <input
                ref={searchInputRef}
                type="text"
                placeholder="Search nodes"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                onKeyDown={(event) => {
                    if (event.key === "Enter") {
                        onEnter();
                    }
                }}
                className="w-full p-1 rounded-md border-gray-300 bg-gray-700 bg-opacity-80 "
            />
            <label className="p-1">
                {`${highlightIndex}/${highlightedNodes.size}`}
            </label>
            <Zizaran term={searchQuery}/>
        </div>
    );
}
