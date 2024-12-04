import React, { useRef, useState } from 'react';
import { NodeData } from '../../types';
import { useNodes } from '@/contexts/NodesContext';
import Tooltip from './Tooltip';
import { useTransformContext } from 'react-zoom-pan-pinch';


interface NodeProps {
  node: NodeData;
}

const Node: React.FC<NodeProps> = ({ node})=> {
  const {setSelectedNodes, selectedNodes, highlightedNodes, displayedNodes} = useNodes();

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
          ${!isVisible ? "hidden" : ""}
          ${isHighlighted ? 'border border-red-500' : ""} 
          ${isHighlighted ? 'opacity-90' : isSelected ? 'opacity-100' : 'opacity-35'}
          ${node.type === 'small' ? 'w-[2px] custom-m:w-[3px]' : 'custom-m:w-[5px] w-[4px]'}
          ${isSelected ? "bg-blue-500" :
            node.stats.length === 0 ? 'bg-red-400' :
            isHighlighted && !isSelected ? 'bg-transparent' :
            node.type === 'keystone' ? 'bg-green-400' :
            node.type === 'notable' ? 'bg-yellow-400' : 'bg-white'}

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
