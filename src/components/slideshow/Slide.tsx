import React from 'react';
import { SlideTitle } from './slide-types/SlideTitle';
import { SlideFlashCard } from './slide-types/SlideFlashCard';
import { SlideExitTicket } from './slide-types/SlideExitTicket';
import { SlideImage } from './slide-types/SlideImage';
import { SlideText } from './slide-types/SlideText';
import { SlideVideo } from './slide-types/SlideVideo';
import { SlideAudio } from './slide-types/SlideAudio';
import { SlideTwoCol } from './slide-types/SlideTwoCol';
import './_slides.scss';

type SlideProps = {
  slide: {
    sys: {
        contentType: {
            sys: {
                id: string
            }
        }
    }
    fields: {
        image?: {
            fields: {
                file: {
                    url: string
                }
            }
        };
        title?: string;
        description?: string;
        questions?: string[];
        content?: string;
        left_column?: string;
        right_column?: string;
        embed?: string;
        title_embed?: string;
        flashCards?: { question: string, answer: string }[];
    }
  };
}

export const Slide: React.FC<SlideProps> = ({ slide }) => {
    console.log('Slide component rendered'); // Ensure component is rendering
    console.log('Slide data:', slide); // Log the slide data

    const slideType = slide.sys.contentType.sys.id;
    let slideContent;

    console.log('Slide type:', slideType); // Log the slide type

    switch (slideType) {
        case 'slideTitle': {
            const title = slide.fields.title || '';
            const imageUrl = slide.fields.image ? slide.fields.image.fields.file.url : '';
            const embed = slide?.fields.embed || '';

            console.log('Embed content:', embed); // Debug the embed value
            console.log('Title:', title); // Debug title
            console.log('Image URL:', imageUrl); // Debug image URL

            slideContent = <SlideTitle title={title} image={imageUrl} embed={embed} />;
            break;
        }
        case 'slideFlashCard': {
            console.log('Flash cards:', slide.fields.flashCards); // Debug flash cards

            slideContent = <SlideFlashCard cards={slide.fields.flashCards} />;
            break;
        }
        case 'slideExitTicket': {
            const title = slide.fields.title || '';
            const questions = slide.fields.questions || [''];

            console.log('Exit ticket questions:', questions); // Debug questions

            slideContent = <SlideExitTicket title={title} questions={questions} />;
            break;
        }
        case 'slideImage': {
            const title = slide.fields.title || '';
            const imageUrl = slide.fields.image ? slide.fields.image.fields.file.url : '';

            console.log('Image URL:', imageUrl); // Debug image URL

            slideContent = <SlideImage title={title} image={imageUrl} />;
            break;
        }
        case 'slideText': {
            const title = slide.fields.title || '';
            const content = slide?.fields.content || '';

            console.log('Text content:', content); // Debug text content

            slideContent = <SlideText title={title} text={content} />;
            break;
        }
        case 'slideVideo': {
            const title = slide.fields.title || '';
            const embed = slide?.fields.embed || '';

            console.log('Video embed:', embed); // Debug video embed

            slideContent = <SlideVideo title={title} embed={embed} />;
            break;
        }
        case 'slideAudio': {
            const title = slide.fields.title || '';
            const embed = slide?.fields.embed || '';

            console.log('Audio embed:', embed); // Debug audio embed

            slideContent = <SlideAudio title={title} embed={embed} />;
            break;
        }
        case 'slide_two_column': {
            const title = slide.fields.title || '';
            const leftColumn = slide?.fields.left_column || '';
            const rightColumn = slide?.fields.right_column || '';

            console.log('Two col content:', leftColumn, rightColumn); // Debug text content

            slideContent = <SlideTwoCol title={title} leftColumn={leftColumn} rightColumn={rightColumn} />;
            break;
        }
        default: {
            console.error('Unknown slide type:', slideType);
            slideContent = <div>Unknown slide type: {slideType}</div>;
            break;
        }
    }

    return (
        <div className="flex flex-col">
            {slideContent}
        </div>
    );
};
