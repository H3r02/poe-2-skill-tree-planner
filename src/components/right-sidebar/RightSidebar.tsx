import { useNodes } from "@/contexts/NodesContext";
import { useState } from "react";
import { NodeData } from "@/types";
import { useAllNodes } from "@/contexts/AllNodesContext";
import StatList from "./StatList";
import MergedStatList from "./MergedStatList";

// components/Sidebar.tsx
interface RightSidebarProps { }

export default function RightSidebar({ }: RightSidebarProps) {

  const { allNodes } = useAllNodes();
  const { selectedNodes } = useNodes();

  const [isMerged, setIsMerged] = useState<boolean>(false);
  const [filterTerm, setFilterTerm] = useState<string>("");

  const filteredNodeData = Array.from(selectedNodes)
    .map((id) => allNodes.get(id))
    .filter((node) => node !== undefined)
    .filter((node) => {
      const statsMatch = node.stats.some((stat) =>
        stat.toLowerCase().includes(filterTerm.toLowerCase())
      );

      const nameMatch = !isMerged && node.name?.toLowerCase().includes(filterTerm.toLowerCase());

      return statsMatch || nameMatch;

    }) as NodeData[];


  return (
    <div className="flex items-center justify-end  absolute right-0 top-[50px] p-2 bg-gray-700 ">
      <div className="text-white font-sans text-sm  p-4 z-20 "  style={{ minWidth: 'max(400px, 30vw)' }}>
        <div className="flex items-center h-[80px]">
          <input
            type="text"
            value={filterTerm}
            onChange={(e) => setFilterTerm(e.target.value)}
            placeholder="Filter..."
            className="border-2 border-gray-300 rounded p-2 text-xl w-50 mr-2 bg-gray-700"
          />


        </div>
        <div className="flex justify-around">
          <button
            onClick={() => setIsMerged(false)}
            className={`w-[50%] py-2 rounded-t-md  text-xl ${!isMerged ? ' bg-gray-900 text-white' : 'bg-gray-200 text-black'}`}
          >
            Selected Passives
          </button>
          <button
            onClick={() => setIsMerged(true)}
            className={`w-[50%] py-2 rounded-t-md text-xl ${isMerged ? ' bg-gray-900 text-white' : 'bg-gray-200 text-black'}`}
          >
            Merged Stats
          </button>
        </div>
        
        <div className="overflow-y-scroll bg-gray-900 px-2" style={{ height: 'calc(100vh - 300px)' }}>
          {isMerged ? <MergedStatList filteredNodeData={filteredNodeData} filterTerm={filterTerm} /> : <StatList filteredNodeData={filteredNodeData} />

          }

        </div>

      </div>
    </div>
  )
}
