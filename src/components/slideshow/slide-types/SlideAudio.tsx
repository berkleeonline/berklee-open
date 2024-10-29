import React, { useState, useEffect } from 'react';
import LoadingIndicator from '../LoadingIndicator'; // Make sure to import the LoadingIndicator component

interface SlideAudioProps {
    title: string;
    embed: string;
}

export const SlideAudio: React.FC<SlideAudioProps> = ({ title, embed }) => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const container = document.getElementById('audio-embed-container');
        if (container) {
            const iframes = container.getElementsByTagName('iframe');
            for (let i = 0; i < iframes.length; i++) {
                iframes[i].onload = () => setLoading(false);
                if (i === 1) {
                    iframes[i].classList.add('second-iframe');
                }
            }
        }
    }, [embed]);

    return (
        <div className="flex flex-1 flex-col items-center w-screen py-10">
            <h1 className="font-sans text-[3vw] font-bold mb-8">{title}asdf</h1>
            
            {loading && <LoadingIndicator />} {/* Loading indicator */}
            
            <div id="audio-embed-container" style={{ display: loading ? 'none' : 'block' }} dangerouslySetInnerHTML={{ __html: embed }} />
        </div>
    );
};
