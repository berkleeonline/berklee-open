import React, { useEffect, useState } from 'react';
import { documentToHtmlString } from "@contentful/rich-text-html-renderer";
import LoadingIndicator from '../LoadingIndicator';

interface SlideTwoColEmbedProps {
    title: string;
    leftColumn?: any; // Use `any` to allow different types, or define a more specific type if needed
    rightColumn?: any;
}

export const SlideTwoColEmbed: React.FC<SlideTwoColEmbedProps> = ({ title, leftColumn, rightColumn }) => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const container = document.getElementById('embed-container');
        if (container) {
            const iframes = container.getElementsByTagName('iframe');
            for (let i = 0; i < iframes.length; i++) {
                iframes[i].onload = () => setLoading(false);
            }
        }
    }, [leftColumn]);

    return (
        <div className="flex flex-col items-center pt-12">
            <h1 className="font-sans text-[3vw] font-bold mb-24">{title}</h1>
            {loading && <LoadingIndicator />} {/* Loading indicator */}
            <div className="grid grid-cols-2 flex items-center gap-2">
                <div id="embed-container" className="w-40%" style={{ opacity: loading ? 0 : 1 }} dangerouslySetInnerHTML={{ __html: leftColumn }}></div>
                <div id="right-column" className="text-lg font-sans text-[2vw]" style={{ opacity: loading ? 0 : 1 }} dangerouslySetInnerHTML={{ __html: documentToHtmlString(rightColumn) }}></div>
            </div>
        </div>
    );
};
