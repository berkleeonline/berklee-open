import React from 'react';

interface SlideTitleProps {
    title: string;
    embed: string;
}

export const SlideVideo: React.FC<SlideTitleProps> = ({ title, embed }) => {
    console.log(embed)
    return (
        <div className="flex flex-1 flex-col items-center w-screen py-10">
            <h1 className="font-sans text-[3vw] font-bold mb-24">{title}</h1>
            <div dangerouslySetInnerHTML={{ __html: embed }} />
        </div>
    );
};
