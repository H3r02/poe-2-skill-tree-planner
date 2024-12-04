import React, { useRef, useState } from 'react';
import { NodeData } from '../../types';
import { useNodes } from '@/contexts/NodesContext';
import Tooltip from './Tooltip';
import { useAscendancy } from '@/contexts/AscendancyContext';


interface NodeProps {
  node: NodeData;
}

const Node: React.FC<NodeProps> = ({ node }) => {
  const { setSelectedNodes, selectedNodes, highlightedNodes, displayedNodes } = useNodes();
  const {ascendancy} = useAscendancy();

  const [isHovered, setIsHovered] = useState<boolean>(false);
  const isHighlighted = highlightedNodes.has(node.id);
  const isSelected = selectedNodes.has(node.id);
  const isVisible = displayedNodes.has(node.id);

  const handleClick = () => {
    const updatedSelectedNodes = new Set(selectedNodes);

    if (updatedSelectedNodes.has(node.id)) {
      updatedSelectedNodes.delete(node.id);
    } else {
      updatedSelectedNodes.add(node.id);
    }

    setSelectedNodes(updatedSelectedNodes);
  };


  const handleMouseEnter = () => {
    setIsHovered(true);
  }

  const handleMouseLeave = () => {
    setIsHovered(false);
  };


  return (
    <div
      className="absolute"
      style={{
        aspectRatio: '1',
        left: `${node.x * 100}%`,
        top: `${node.y * 100}%`,
      }}

    >
      <div
        id={`passive-${node.id}`}
        onClick={handleClick}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className={` 
          transform 
          -translate-x-1/2 
          -translate-y-1/2 
          cursor-pointer 
          rounded-full
          
          ${isHighlighted ? "border border-red-600" : ""}
          ${isSelected ? "bg-yellow-600 opacity-70" : ""}

          ${node.type === 'small' ? 'w-[2px] custom-m:w-[4px]' : 'custom-m:w-[7px] w-[4px]'}
          ${node.stats.length === 0 ? 'bg-black opacity-80' : ''}

          ${node.ascendancy && !node.id.includes(ascendancy) ? "hidden" : ""}
          ${!isVisible ? 'bg-black opacity-80' : ''}
          
        `}
        style={{
          aspectRatio: '1',
          left: `${node.x * 100}%`,
          top: `${node.y * 100}%`,
        }}
      />
      {isHovered && <Tooltip node={node} />}
    </div>

  );
};

export default Node;
