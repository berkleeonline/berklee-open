import React from 'react';
import { documentToHtmlString } from "@contentful/rich-text-html-renderer";

interface SlideTwoColProps {
    title: string;
    leftColumn?: {};
    rightColumn?: {};
}

export const SlideTwoCol: React.FC<SlideTwoColProps> = ({ title, leftColumn, rightColumn }: SlideTwoColProps) => {
    return (
        <div className="flex flex-col items-center pt-12 mr-24 ml-24">
            <h1 className="font-sans text-[3vw] font-bold mb-24">{title}</h1>
            <div className="grid grid-cols-2 gap-2">
                <div className="text-lg font-sans text-[2vw]" dangerouslySetInnerHTML={{ __html: documentToHtmlString(leftColumn)}}></div>
                <div className="text-lg font-sans text-[2vw]" dangerouslySetInnerHTML={{ __html: documentToHtmlString(rightColumn)}}></div>
            </div>
        </div>
    );
};
