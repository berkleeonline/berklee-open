import React from 'react';
import { documentToHtmlString } from "@contentful/rich-text-html-renderer";

interface SlideTextProps {
    title: string;
    text?: {};
}

export const SlideText: React.FC<SlideTextProps> = ({ title, text }) => {
    return (
        <div className="flex flex-1 flex-col items-center w-screen py-10">
            <h1 className="font-sans text-[3vw] font-bold mb-24">{title}</h1>
            <div className="text-lg font-sans text-[2.5vw] mb-24" dangerouslySetInnerHTML={{ __html: documentToHtmlString(text)}}></div>
        </div>
    );
};
