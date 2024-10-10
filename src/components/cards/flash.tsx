import React, { useState } from 'react';

interface CardProps {
    card: {
        fields: {
            front: string;
            back: string;
        };
        metadata: {
            tags: any[];
        };
        sys: {
            type: string;
            id: string;
            revision: number;
        };
    };
}

const FlashCard: React.FC<CardProps> = ({ card }) => {
    const [isFront, setIsFront] = useState(true);

    const toggleCard = () => {
        setIsFront(!isFront);
    };

    
    return (
        <div className="border p-4 rounded-lg shadow-lg relative bg-white w-[80%] h-[60%] flex justify-center items-center">
            <div>
                {isFront ? (
                    <div className="text-center text-3xl font-bold">
                        {card.fields.front}
                    </div>
                ) : (
                    <div className="text-center text-3xl">
                        {card.fields.back}
                    </div>
                )}
            </div>
            <button onClick={toggleCard} className="absolute bottom-[2rem] right-[2rem] flex items-center gap-1">
                <span>Flip</span>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    xmlnsXlink="http://www.w3.org/1999/xlink"
                    width={30}
                    height={30}
                >
                    <defs>
                    <pattern id="a" width={1} height={1} viewBox="6.674 6.674 16.653 16.653">
                        <image
                        xlinkHref="data:image/png;base64,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"
                        width={30}
                        height={30}
                        preserveAspectRatio="xMidYMid slice"
                        />
                    </pattern>
                    </defs>
                    <path fill="url(#a)" d="M0 0h30v30H0z" data-name="Rectangle 146718" />
                </svg>
            </button>
        </div>
    );
};

export default FlashCard;
