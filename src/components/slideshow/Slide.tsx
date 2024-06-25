import React from 'react';
import { SlideTitle } from './slide-types/SlideTitle';
import { SlideFlashCard } from './slide-types/SlideFlashCard';
import { SlideExitTicket } from './slide-types/SlideExitTicket';
import { SlideImage } from './slide-types/SlideImage';
import { SlideText } from './slide-types/SlideText';
import { SlideVideo } from './slide-types/SlideVideo';

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
        content?: {}
        embed?: string;
    }
  };
}

export const Slide: React.FC<SlideProps> = ({ slide }) => {
    const slideType = slide.sys.contentType.sys.id;
    let slideContent;

    if (slideType === 'slideTitle') {
        const title = slide.fields.title || '';
        const imageUrl = slide.fields.image ? slide.fields.image.fields.file.url : '';
        slideContent = <SlideTitle title={title} image={imageUrl} />;
    }

    if (slideType === 'slideFlashCard') {
        slideContent = <SlideFlashCard cards={slide.fields.flashCards} />;
    }

    if (slideType === 'slideExitTicket') {
        const title = slide.fields.title || '';
        const questions = slide.fields.questions || [''];
        slideContent = <SlideExitTicket title={title} questions={questions} />;
    }

    if (slideType === 'slideImage') {
        const title = slide.fields.title || '';
        const imageUrl = slide.fields.image ? slide.fields.image.fields.file.url : '';
        slideContent = <SlideImage title={title} image={imageUrl} />;
    }

    if (slideType === 'slideText') {
        const title = slide.fields.title || '';
        const content = slide?.fields.content || '';
        slideContent = <SlideText title={title} text={content} />;
    }

    if (slideType === 'slideVideo') {
        const title = slide.fields.title || '';
        const embed = slide?.fields.embed || '';
        slideContent = <SlideVideo title={title} embed={embed} />;
    }

    return (
        <div className="flex flex-col">
            {slideContent}
        </div>
    );
};
