import React, { useState, useEffect } from 'react';
import LoadingIndicator from '../LoadingIndicator';
import BoListPlayer from '../../players/BoListPlayer'; // Make sure to import the BoListPlayer component

interface SlideTitleProps {
    title: string;
    image?: string;
    embed?: string;
    htmlContent?: string;
}

export const SlideTitle: React.FC<SlideTitleProps> = ({ title, image, embed, htmlContent }) => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const container = document.getElementById('embed-container');
        if (container) {
            const iframes = container.getElementsByTagName('iframe');
            for (let i = 0; i < iframes.length; i++) {
                iframes[i].onload = () => setLoading(false);
                if (i === 1) {
                    iframes[i].classList.add('second-iframe');
                }
            }
        }
    }, [embed, htmlContent]);

    return (
        <div className="flex flex-1 flex-col items-center w-screen py-10">
            <h1 className="font-sans text-[5vw] font-bold">{title}</h1>
            {/* {image && <img src={image} alt={title} className="slide-title-image" width="55%" />} */}
            <BoListPlayer client:load  />
            
            {loading && <LoadingIndicator />} {/* Loading indicator */}
            
            <div id="embed-container" style={{ display: loading ? 'none' : 'block' }} dangerouslySetInnerHTML={{ __html: embed || htmlContent }} />
        </div>
    );
};
