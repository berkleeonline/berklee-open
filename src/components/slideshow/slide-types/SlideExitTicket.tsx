import React from 'react';

interface SlideExitTicketProps {
    title: string;
    questions: string[];
}

export const SlideExitTicket: React.FC<SlideExitTicketProps> = ({ title, questions }) => {
    return (
        <div className="flex flex-1 flex-col items-center w-screen py-10">
            <h1 className="font-sans text-[3vw] font-bold">{title}</h1>

            <div className="flex flex-col mt-10 w-[50%] mx-auto">
                <h2 className="font-sans text-[2.5vw] font-bold mb-4">Questions</h2>
                {questions.map((question, index) => (
                    <div key={index} className="text-[2.5vw] mb-4 flex gap-4">
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
