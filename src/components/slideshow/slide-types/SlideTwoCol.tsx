import React, { useEffect } from 'react';
import { documentToHtmlString } from "@contentful/rich-text-html-renderer";

interface SlideTwoColProps {
    title: string;
    leftColumn?: {};
    rightColumn?: {};
}

export const SlideTwoCol: React.FC<SlideTwoColProps> = ({ title, leftColumn, rightColumn }: SlideTwoColProps) => {
    
    useEffect(() => {
        const leftColumnElement = document.getElementById('left-column');
        const rightColumnElement = document.getElementById('right-column');

        if (leftColumnElement && rightColumnElement) {
            const leftOLs = leftColumnElement.querySelectorAll('ol');
            let lastNumber = 0;

            if (leftOLs.length > 0) {
                const lastLeftOL = leftOLs[leftOLs.length - 1];
                const lastLeftItems = lastLeftOL.querySelectorAll('li');
                lastNumber = lastLeftItems.length;
            }

            const rightOL = rightColumnElement.querySelector('ol');
            if (rightOL) {
                rightOL.setAttribute('start', (lastNumber + 1).toString());
            }
        }
    }, [leftColumn, rightColumn]);

    return (
        <div className="flex flex-col items-center pt-12 mr-24 ml-24">
            <h1 className="font-sans text-[3vw] font-bold mb-24">{title}</h1>
            <div className="grid grid-cols-2 gap-2">
                <div id="left-column" className="text-lg font-sans text-[2vw]" dangerouslySetInnerHTML={{ __html: documentToHtmlString(leftColumn)}}></div>
                <div id="right-column" className="text-lg font-sans text-[2vw]" dangerouslySetInnerHTML={{ __html: documentToHtmlString(rightColumn)}}></div>
            </div>
        </div>
    );
};
