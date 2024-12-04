import React, { useEffect, useState } from 'react';
import { NodeData } from '@/types';
import {useTransformContext, useTransformEffect } from 'react-zoom-pan-pinch';


interface TooltipProps {
  node: NodeData;
  
}

const Tooltip: React.FC<TooltipProps> = ({node}) => {
  const { transformState} = useTransformContext(); 

  return (
    <div className={`select-none absolute bg-black text-white p-2 rounded-lg text-sm max-w-[500px] z-10`}
    style={{
        position: 'relative',
        backgroundColor: 'rgba(0, 0, 0, 1)',
       // transform: `translate(${transform_x},${transform_y})`,
        color: 'white',
        padding: '8px',
        borderRadius: '5px',
        fontSize: '1em',
        maxWidth: '500px',
        overflow: 'hidden',
        transformOrigin: "top left",
        scale: 1/transformState.scale,
        zIndex: 1000, // Make sure it's on top of other elements
        pointerEvents: 'none', // Prevent tooltip from blocking mouse events
      }}
    >
    <div>
          <strong>{node.name}</strong>
          <ul>
            {node.stats.map((stat, index) => (
              <li key={index}>{stat}</li>
            ))}
          </ul>
        </div>
    </div>
  );
};

export default Tooltip;
