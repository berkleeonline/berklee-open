import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTicket, faCircleCheck } from '@fortawesome/pro-light-svg-icons';

interface SlideExitTicketProps {
    title: string;
    questions: string[];
}

export const SlideExitTicket: React.FC<SlideExitTicketProps> = ({ title, questions }) => {
    return (
        <div className="flex flex-1 flex-col items-center w-screen py-10">
            <div className="flex items-center gap-4 text-[5vw] relative mb-16">
                <FontAwesomeIcon className="-rotate-45 mr-6" icon={faTicket} />
                <h1 className="font-sans text-[3vw] font-bold">{title}</h1>
            </div>

            <div className="flex flex-col mt-10 w-[50%] mx-auto">
                <h3 className="font-sans font-bold mb-4">Questions</h3>
                {questions.map((question, index) => (
                    <div key={index} className="text-[2vw] mb-4 flex gap-4">
                        <div className="w-[30px] font-bold">
                            {index + 1}.
                        </div>
                        <div className="flex-1">
                            {question}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
