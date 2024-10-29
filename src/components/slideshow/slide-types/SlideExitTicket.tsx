import React from 'react';
import { documentToHtmlString } from "@contentful/rich-text-html-renderer";

interface SlideExitTicketProps {
    title: string;
    questions: string[];
}

export const SlideExitTicket: React.FC<SlideExitTicketProps> = ({ title, questions }) => {
    return (
        <div className="flex flex-1 flex-col items-center w-screen py-10">
            <div className="flex items-center gap-4 text-[5vw] relative mb-16">
                <img className="-rotate-45 mr-6 w-28" src="https://images.ctfassets.net/6btxhuby5qg9/25mk1ADAe8KQHJylXvH5ZU/de8aaad21b96cb88872417247b7c3941/exit-ticket.svg" alt="Exit Ticket Icon" />
                <h1 className="font-sans text-[3vw] font-bold">{title}</h1>
            </div>

            <div className="flex flex-col mt-10 w-[50%] mx-auto">
                <h3 className="font-sans font-bold mb-4">Questions</h3>
                <div className="text-lg font-sans text-[2.5vw] mb-24" dangerouslySetInnerHTML={{ __html: documentToHtmlString(questions)}}></div>
            </div>
        </div>
    );
};
