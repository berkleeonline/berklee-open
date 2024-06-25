import React, { useState } from 'react';
import FlashCard from '../../cards/flash';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
    faArrowLeft,
    faArrowRight,
} from "@fortawesome/pro-light-svg-icons";

interface SlideFlashCardProps {
    cards: {
        sys: {
            id: string;
            linkType: string;
            type: string;
        };
    }[];
}

export const SlideFlashCard: React.FC<SlideFlashCardProps> = ({ cards }) => {
    const [currentCardIndex, setCurrentCardIndex] = useState(0);
    const totalCards = cards.length;

    const goToNextCard = () => {
        setCurrentCardIndex((prevCard) => (prevCard + 1) % totalCards);
    };

    const goToPreviousCard = () => {
        setCurrentCardIndex((prevCard) => (prevCard - 1 + totalCards) % totalCards);
    };

    const currentCard = cards[currentCardIndex];
    
    return (
        <div className="flex flex-1 flex-col items-center justify-center w-screen py-10">
            <FlashCard card={currentCard} />
            <div className="hidden sm:flex gap-4 items-center rounded-xl bg-[rgba(0,0,0,0.5)] text-white py-6 px-10 mt-10">
                <button onClick={goToNextCard} disabled={currentCardIndex === 0} className="rounded-full p-0 h-10 w-10 border border-white border-2 disabled:opacity-50">
                    <FontAwesomeIcon icon={faArrowLeft} />
                </button>
                <div className="flex-1">
                    <p>{currentCardIndex + 1} / {totalCards}</p>
                </div>
                <button onClick={goToPreviousCard} disabled={currentCardIndex === totalCards - 1} className="rounded-full p-0 h-10 w-10 border border-white border-2 disabled:opacity-50">
                    <FontAwesomeIcon icon={faArrowRight} />
                </button>
            </div>
        </div>
    );
};
