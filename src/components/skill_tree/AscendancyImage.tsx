import React, { LegacyRef, Ref, useEffect, useMemo, useRef, useState } from 'react';
import Image from 'next/image';

interface AscendancyImageProps {
    hidden: boolean,
    ascendancy: string,
    width: number,
}


const AscendancyImage: React.FC<AscendancyImageProps> = ({hidden, ascendancy, width}) => {
    return (
        <div
            style={{
                position: 'absolute',
                top: '50.4%',
                left: '50.15%',
                transform: 'translate(-50%, -50%)',
                width: `${width}px`,
                aspectRatio: '1',
                borderRadius: '50%', // Makes it a circle
                overflow: 'hidden', // Ensures the image is clipped to the circle
            }}
        >
            <Image
                src={`/ascendancies/${ascendancy}.webp`}
                alt="asc"
                fill={true}

                priority={true}
                loading="eager"
                sizes="(max-width: 2000px) 100vw, (max-width: 2000px) 50vw, 33vw"
                quality={75}
                className={`transition-opacity duration-500 opacity-100 ${hidden ? "hidden" : ""}`}
                style={{ objectFit: 'cover' }}
            />
        </div>
    )
};

export default React.memo(AscendancyImage);
