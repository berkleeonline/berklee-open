import React from 'react';

interface SlideImageProps {
    title: string;
    image?: string;
}

export const SlideImage: React.FC<SlideTitleProps> = ({ title, image }) => {
    return (
        <div className="flex flex-1 flex-col items-center w-screen py-10">
            <h1 className="font-sans text-[3vw] font-bold">{title}</h1>
            {image && <img src={image} alt={title} className="slide-title-image" />}
        </div>
    );
};
