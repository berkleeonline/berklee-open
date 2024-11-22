import React, { useState, useEffect } from 'react';
import { SlideshowHeader } from './SlideshowHeader';
import { Slide } from './Slide';

type SlideshowProps = {
  content: any; // Use a more specific type if possible
};

const Slideshow = ({ content }: SlideshowProps) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [hasNotes, setHasNotes] = useState(false);
  const slides = content?.fields?.slides || [];
  const slidesBgColor = content?.fields?.slideshow_background || '#eeeff5';
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
          <p>${notes}</p>
        `);
      }
    }
  };

  useEffect(() => {
    if (slides && slides[currentSlide] && slides[currentSlide].fields) {
      const notesExist = slides[currentSlide].fields.slide_instructor_notes ? true : false;
      setHasNotes(notesExist);
    } else {
      console.warn('Slide or fields do not yet exist');
      setHasNotes(false);
    }
  }, [slides, currentSlide]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowRight') {
        goToNextSlide();
      } else if (event.key === 'ArrowLeft') {
        goToPreviousSlide();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [currentSlide]);

  useEffect(() => {
    console.log('Current slide index:', currentSlide);
    console.log('Current slide data:', slides[currentSlide]);
  }, [currentSlide]);

  return (
    <div className="h-screen w-screen flex flex-col" style={{ backgroundColor: 'red' }}>
      <SlideshowHeader
        currentSlide={currentSlide}
        totalSlides={totalSlides}
        goToNextSlide={goToNextSlide}
        goToPreviousSlide={goToPreviousSlide}
        hasNotes={hasNotes}
        openNotes={openNotes}
        className="slide-header"
      />
      
      <div className="flex flex-1 w-full mx-auto slide-body" style={{ backgroundColor: slidesBgColor }}>
        <Slide slide={slides[currentSlide]} />
      </div>
    </div>
  );
};

export default Slideshow;
