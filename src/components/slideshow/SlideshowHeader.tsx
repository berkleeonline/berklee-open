import React, { useState } from "react";
import { Navbar, NavbarContent, NavbarItem, Button } from "@nextui-org/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Keyboard } from "../music/keyboard/keyboard";
import { Metronome } from "../metronome";
import { 
    faArrowLeft,
    faArrowRight,
    faNoteSticky,
    faPianoKeyboard,
    faHeart,
    faShare,
    faClose
} from "@fortawesome/pro-light-svg-icons";

interface SlideshowHeaderProps {
    currentSlide: number;
    totalSlides: number;
    goToNextSlide: () => void;
    goToPreviousSlide: () => void;
    openNotes: () => void;
    hasNotes: boolean;
}

export const SlideshowHeader: React.FC<SlideshowHeaderProps> = ({ 
    currentSlide, 
    totalSlides, 
    goToNextSlide, 
    goToPreviousSlide,
    hasNotes,
    openNotes
}) => {
  const [showKeyboard, setShowKeyboard] = useState(false);

  return (
    <>
    <div className="relative">
      <Navbar className="bg-white" maxWidth="full">
        <NavbarContent className="hidden sm:flex gap-4" justify="start">
          <NavbarItem className="mr-[40px] font-bold">Features</NavbarItem>
          {hasNotes && (
            <NavbarItem>
              <Button onClick={openNotes} className="text-md font-bold rounded-full border bg-white flex items-center">
                <FontAwesomeIcon icon={faNoteSticky} />
                <span>Instructor Notes</span>
              </Button>
            </NavbarItem>
          )}
        </NavbarContent>
        <NavbarContent className="hidden sm:flex gap-4" justify="center">
          <button onClick={goToPreviousSlide} disabled={currentSlide === 0} className="rounded-full p-0 h-10 w-10 border border-[#CAD4DB] border-2 disabled:opacity-50">
              <FontAwesomeIcon icon={faArrowLeft} />
          </button>
          <div className="flex-1">
            <p>{currentSlide + 1} of {totalSlides}</p>
          </div>
          <button onClick={goToNextSlide} disabled={currentSlide === totalSlides - 1} className="rounded-full p-0 h-10 w-10 border border-[#CAD4DB] border-2 disabled:opacity-50">
              <FontAwesomeIcon icon={faArrowRight} />
          </button>
        </NavbarContent>
        <NavbarContent justify="end" className="sm:flex">
          <NavbarItem className="hidden lg:flex border-r pr-5">
            <Metronome />
          </NavbarItem>
          <NavbarItem className="hidden lg:flex border-r pr-5">
            <Button onClick={() => setShowKeyboard(!showKeyboard)} isIconOnly className="header-piano-toggle bg-white text-xl">
              <FontAwesomeIcon icon={faPianoKeyboard} />
            </Button>
          </NavbarItem>
          <NavbarItem className="hidden lg:flex">
            <Button isIconOnly className="bg-white text-xl">
              <FontAwesomeIcon icon={faHeart} />
            </Button>
          </NavbarItem>
          <NavbarItem className="hidden lg:flex border-r pr-5">
            <Button isIconOnly className="bg-white text-xl">
              <FontAwesomeIcon icon={faShare} />
            </Button>
          </NavbarItem>
          <NavbarItem className="hidden lg:flex">
            <Button isIconOnly className="bg-white text-xl">
              <FontAwesomeIcon icon={faClose} />
            </Button>
          </NavbarItem>
        </NavbarContent>
      </Navbar>
    </div>
    <div>
      <Keyboard isVisible={showKeyboard}  />
    </div>
    </>
  );
};
