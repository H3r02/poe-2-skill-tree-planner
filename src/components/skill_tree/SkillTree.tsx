import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { TransformComponent, useTransformContext } from 'react-zoom-pan-pinch';
import { useAscendancy } from '@/contexts/AscendancyContext';
import NodeList from './NodeList';
import AscendancyImage from './AscendancyImage';

interface SkillTreeProps {
}

const SkillTree: React.FC<SkillTreeProps> = () => {
  const { transformState} = useTransformContext(); 
  const { ascendancy} = useAscendancy();

  const [windowWidth, setWindowWidth] = useState<number>(0);
  const [windowHeight, setWindowHeight] = useState<number>(0);


  const imageWidth = 2750;
  const imageHeight = 2864;

  const scale = Math.min(windowWidth / imageWidth, (windowHeight - 100) / imageHeight);

  const scaledWidth = imageWidth * scale;
  const scaledHeight = imageHeight * scale;

  const scaledMidWidth = scaledWidth * 0.16;

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setWindowWidth(window.innerWidth);
      setWindowHeight(window.innerHeight);
      
      const handleResize = () => {
        setWindowWidth(window.innerWidth);

        setWindowHeight(window.innerHeight);
      };

      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }
  }, []);




  const [isGrabbing, setIsGrabbing] = useState(false);

  const handleMouseDown = () => setIsGrabbing(true);
  const handleMouseUp = () => setIsGrabbing(false);

  const divRef = useRef<HTMLDivElement | null>(null);
  const handleClick = (event: { clientX: number; clientY: number; }) => {
    if (divRef.current) {
      const rect = divRef.current.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      //console.log(x/scaledWidth/transformState.scale, y/scaledHeight/transformState.scale);
    }
  };


  return (
    <div
      style={{
        position: 'relative',
        width: '100vw', 
        height: '100vh', 
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',

      }}>


      <TransformComponent>

      <div
      style={{
        position: 'relative',
        width: '100vw', 
        height: '100vh', 
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        

      }}

      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp} // Reset on mouse leave
      className={`${
        isGrabbing ? 'cursor-grabbing' : 'cursor-grab'
      }`}
    >
      <div
        style={{
          position: 'relative',
          width: `${scaledWidth}px`,
          height: `${scaledHeight}px`,
        }}

        ref={divRef}
        onClick={handleClick}
      >
        <img
          src="/skill-tree.webp"
          alt="Skill Tree Background"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'contain',
          }}
        />
        <AscendancyImage hidden={ascendancy != 'gemlinglegionnaire'} ascendancy={'gemlinglegionnaire'} width={scaledMidWidth}/>
        <AscendancyImage hidden={ascendancy != 'acolyteofchayula'} ascendancy={'acolyteofchayula'} width={scaledMidWidth}/>
        <AscendancyImage hidden={ascendancy != 'bloodmage'} ascendancy={'bloodmage'} width={scaledMidWidth}/>
        <AscendancyImage hidden={ascendancy != 'chronomancer'} ascendancy={'chronomancer'} width={scaledMidWidth}/>
        <AscendancyImage hidden={ascendancy != 'deadeye'} ascendancy={'deadeye'} width={scaledMidWidth}/>
        <AscendancyImage hidden={ascendancy != 'infernalist'} ascendancy={'infernalist'} width={scaledMidWidth}/>
        <AscendancyImage hidden={ascendancy != 'invoker'} ascendancy={'invoker'} width={scaledMidWidth}/>
        <AscendancyImage hidden={ascendancy != 'pathfinder'} ascendancy={'pathfinder'} width={scaledMidWidth}/>
        <AscendancyImage hidden={ascendancy != 'stormweaver'} ascendancy={'stormweaver'} width={scaledMidWidth}/>
        <AscendancyImage hidden={ascendancy != 'titan'} ascendancy={'titan'} width={scaledMidWidth}/>
        <AscendancyImage hidden={ascendancy != 'warbringer'} ascendancy={'warbringer'} width={scaledMidWidth}/>
        <AscendancyImage hidden={ascendancy != 'witchhunter'} ascendancy={'witchhunter'} width={scaledMidWidth}/>
  

        <NodeList/>

      </div>
      </div>

      </TransformComponent>
    </div>

  );
};

export default React.memo(SkillTree);
