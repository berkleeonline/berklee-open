import { useState, useEffect } from 'react';
import { SlideshowHeader } from './SlideshowHeader';
import { Slide } from './Slide';

type SlideshowProps = {
  content: object;
}

const Slideshow = ({ content }: SlideshowProps) => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [hasNotes, setHasNotes] = useState(false);
    const slides = content.fields.slides;
    const totalSlides = slides.length;

    const goToNextSlide = () => {
        setCurrentSlide((prevSlide) => (prevSlide + 1) % totalSlides);
    };

    const goToPreviousSlide = () => {
        setCurrentSlide((prevSlide) => (prevSlide - 1 + totalSlides) % totalSlides);
    };

    const openNotes = () => {
        const notes = slides[currentSlide].fields.slide_instructor_notes;
        if (notes) {
            const notesWindow = window.open("", "Instructor Notes", "width=300,height=400,location=no");
            if (notesWindow) {
                notesWindow.document.write(`
                    <div>Instructor Notes</div>
                    <h1>${slides[currentSlide].fields.title}</h1>
                    <p>${slides[currentSlide].fields.slide_instructor_notes}</p>
                `);
            }
        }
    }

    useEffect(() => {
        const notesExist:boolean = slides[currentSlide].fields.slide_instructor_notes ? true : false;
        setHasNotes(notesExist) 
    }, [currentSlide]);

    return (
        <div className={`h-screen w-screen bg-red-500 flex flex-col`}>
            <SlideshowHeader
                currentSlide={currentSlide}
                totalSlides={totalSlides}
                goToNextSlide={goToNextSlide}
                goToPreviousSlide={goToPreviousSlide}
                hasNotes={hasNotes}
                openNotes={openNotes}
            />
            <div className="flex flex-1 bg-[#DDEDFD]">
                <Slide slide={slides[currentSlide]} />
            </div>
        </div>
    );
};

export default Slideshow;