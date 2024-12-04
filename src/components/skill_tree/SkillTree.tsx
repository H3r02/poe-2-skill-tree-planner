import React, { LegacyRef, Ref, useEffect, useMemo, useRef, useState } from 'react';
import Image from 'next/image';
import { TransformWrapper, TransformComponent, ReactZoomPanPinchContentRef, useTransformContext } from 'react-zoom-pan-pinch';
import { useAscendancy } from '@/contexts/AscendancyContext';
import NodeList from './NodeList';

interface SkillTreeProps {
}

const SkillTree: React.FC<SkillTreeProps> = () => {
  const { transformState} = useTransformContext(); 
  const { ascendancy} = useAscendancy();

  const [prevAscImg, setPrevAscImg] = useState<string>("");
  const [currAscImg, setCurrAscImg] = useState<string>("");

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

  useEffect(() => {
    setCurrAscImg(`/ascendancies/${ascendancy}.webp`);
  }, [ascendancy, setPrevAscImg, setCurrAscImg]);
  
  const [isGrabbing, setIsGrabbing] = useState(false);

  const handleMouseDown = () => setIsGrabbing(true);
  const handleMouseUp = () => setIsGrabbing(false);

  const divRef = useRef<HTMLDivElement | null>(null);
  const handleClick = (event: { clientX: number; clientY: number; }) => {
    if (divRef.current) {
      const rect = divRef.current.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      console.log(x/scaledWidth/transformState.scale, y/scaledHeight/transformState.scale);
    }
  };

  const updatePrev = () => {
    setPrevAscImg(currAscImg);
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
          {
            
          }

          {prevAscImg && 
          <div
              style={{
                position: 'absolute',
                top: '50.4%',
                left: '50.15%',
                transform: 'translate(-50%, -50%)',
                width:`${scaledMidWidth}px`, 
                aspectRatio: '1',
                borderRadius: '50%', // Makes it a circle
                overflow: 'hidden', // Ensures the image is clipped to the circle
              }}
            >
                <Image
                src={prevAscImg}
                alt="asc"
                fill={true}
                
                priority={true}
                quality={30}
                sizes="width: 30vw"

                className="transition-opacity duration-500 opacity-100"
                style={{ objectFit: 'cover' }}
              />
          </div>
          }
            { currAscImg && 

            <div
                style={{
                  position: 'absolute',
                  top: '50.4%',
                  left: '50.15%',
                  transform: 'translate(-50%, -50%)',
                  width:`${scaledMidWidth}px`, 
                  aspectRatio: '1',
                  borderRadius: '50%', // Makes it a circle
                  overflow: 'hidden', // Ensures the image is clipped to the circle
                }}
              >
            <Image
              src={currAscImg}
              alt="asc"
              fill={true}
              
              priority={true}
              loading="eager"
              sizes="(max-width: 2000px) 100vw, (max-width: 2000px) 50vw, 33vw"
              quality={75}
              onLoad={updatePrev}

              className="transition-opacity duration-500 opacity-100"
              style={{ objectFit: 'cover' }}
            />
          </div>

        }

  

        <NodeList/>

      </div>
      </div>

      </TransformComponent>
    </div>

  );
};

export default React.memo(SkillTree);
