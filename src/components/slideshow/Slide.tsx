import React from 'react';
import { SlideTitle } from './slide-types/SlideTitle';
import { SlideFlashCard } from './slide-types/SlideFlashCard';
import { SlideExitTicket } from './slide-types/SlideExitTicket';
import { SlideImage } from './slide-types/SlideImage';
import { SlideText } from './slide-types/SlideText';
import { SlideVideo } from './slide-types/SlideVideo';
import { SlideTwoCol } from './slide-types/SlideTwoCol';
import { SlideTwoColEmbed } from './slide-types/SlideTwoColEmbed';
import { SlideEmbedAudio } from './slide-types/SlideEmbedAudio';
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
        audio?: string;
        title_embed?: string;
        slide_embedded_audio?: { sys: { id: string }, fields?: { title?: string, file?: { url?: string, fileName?: string } } }[];
        flashCards?: { question: string, answer: string }[];
    }
  };
}

export const Slide: React.FC<SlideProps> = ({ slide }) => {
    // Check if slides are prepared yet - keeps the build from breaking
    if (!slide || !slide.sys || !slide.sys.contentType || !slide.sys.contentType.sys) {
        console.warn('No slideshow prepared yet. (Not an error).'); // Log the unprepared slide
        return <h3 className="grid gap-4 place-content-center h-48 w-full txt-lg">Presentation not yet prepared for this lesson.</h3>;
    }
  
    const slideType = slide.sys.contentType.sys.id;
    let slideContent;
  
    // Handle slide types with a safe fallback for unknown types
    switch (slideType) {
      case 'slideTitle': {
        const title = slide.fields.title || '';
        const imageUrl = slide.fields.image?.fields?.file?.url || '';
        const embed = slide.fields.embed || '';
  
        slideContent = <SlideTitle title={title} image={imageUrl} embed={embed} />;
        break;
      }
      case 'slideFlashCard': {
        slideContent = <SlideFlashCard cards={slide.fields.flashCards || []} />;
        break;
      }
      case 'slideExitTicket': {
        const title = slide.fields.title || '';
        const questions = slide.fields.questions || [];
        slideContent = <SlideExitTicket title={title} questions={questions} />;
        break;
      }
      case 'slideImage': {
        const title = slide.fields.title || '';
        const imageUrl = slide.fields.image?.fields?.file?.url || '';
        slideContent = <SlideImage title={title} image={imageUrl} />;
        break;
      }
      case 'slideText': {
        const title = slide.fields.title || '';
        const content = slide.fields.content || '';
        slideContent = <SlideText title={title} text={content} />;
        break;
      }
      case 'slideVideo': {
        const title = slide.fields.title || '';
        const embed = slide.fields.embed || '';
        slideContent = <SlideVideo title={title} embed={embed} />;
        break;
      }
      case 'slide_two_column': {
        const title = slide.fields.title || '';
        const leftColumn = slide.fields.left_column || '';
        const rightColumn = slide.fields.right_column || '';
        slideContent = <SlideTwoCol title={title} leftColumn={leftColumn} rightColumn={rightColumn} />;
        break;
      }
      case 'slide_embed_audio': {
        const title = slide.fields.title || '';
        const embed = slide.fields.embed || '';
        const slide_embedded_audio = slide.fields.slide_embedded_audio || [];
        slideContent = (
          <SlideEmbedAudio 
            title={title} 
            embed={embed} 
            slide_embedded_audio={slide_embedded_audio}
            fullEntries={{}} 
          />
        );
        break;
      }
      case 'slide_two_column_embed': {
        const title = slide.fields.title || '';
        const leftColumn = slide.fields.left_column || '';
        const rightColumn = slide.fields.right_column || '';
        slideContent = <SlideTwoColEmbed title={title} leftColumn={leftColumn} rightColumn={rightColumn} />;
        break;
      }
      default: {
        console.warn('Unknown slide type:', slideType);
        slideContent = <div>Unknown slide type: {slideType}</div>;
        break;
      }
    }
  
    return (
      <div className="flex flex-col w-full mx-auto">
        {slideContent}
      </div>
    );
  };
  
