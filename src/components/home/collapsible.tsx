import React, { useState } from "react";
import {Accordion, AccordionItem} from "@heroui/react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronCircleDown, faChevronCircleUp } from '@fortawesome/pro-light-svg-icons';

// Define image mapping
const IMAGES = {
  "1": "//assets.online.berklee.edu/berklee-open-placeholder/bop-pedagogically_sound.png",
  "2": "//assets.online.berklee.edu/berklee-open-placeholder/bop-interactive.png",
  "3": "//assets.online.berklee.edu/berklee-open-placeholder/bop-accessible.jpg",
  "4": "//assets.online.berklee.edu/berklee-open-placeholder/bop-flexible.png"
};

export default function HomeCollapsible() {
  const [currentImage, setCurrentImage] = useState(IMAGES["1"]); // Default image

  const handleSelectionChange = (keys) => {
    // Convert Set to Array and get first item since only one can be open at a time
    const selectedKey = Array.from(keys)[0];
    if (selectedKey && IMAGES[selectedKey]) {
      // Find and update the image in the DOM
      const imageContainer = document.querySelector('.collapsible-related-image img');
      if (imageContainer) {
        imageContainer.src = IMAGES[selectedKey];
        imageContainer.alt = `Berklee Open - ${getAltText(selectedKey)}`;
      }
    }
  };

  // Helper function to get alt text based on key
  const getAltText = (key) => {
    const titles = {
      "1": "Pedagogically Sound",
      "2": "Interactive",
      "3": "Accessible",
      "4": "Flexible"
    };
    return titles[key] || "Berklee Open";
  };

  return (
    <Accordion 
      defaultExpandedKeys={["1"]} 
      onSelectionChange={handleSelectionChange}
    >
      <AccordionItem 
        key="1" 
        aria-label="Pedagogically Sound" 
        indicator={({ isOpen }) => (
          isOpen ? 
            <FontAwesomeIcon icon={faChevronCircleUp} className="h-6" /> : 
            <FontAwesomeIcon icon={faChevronCircleDown} className="h-6" />
        )} 
        title="Pedagogically Sound" 
        className="font-bold"
      >
        <p className="font-normal">Berklee Open's Music Education resources are:</p> 
        <ul className="font-normal list-disc list-outside ml-4 mt-2 mb-4">
          <li>based on educator best practices,</li> 
          <li>standards-aligned, and</li> 
          <li>designed to support student learning in the classroom.</li>
        </ul>
      </AccordionItem>

      <AccordionItem key="2" aria-label="Interactive" indicator={({ isOpen }) => (isOpen ? <FontAwesomeIcon icon={faChevronCircleUp} className="h-6" /> : <FontAwesomeIcon icon={faChevronCircleDown} className="h-6" />)}  title="Interactive" className="font-bold">
        <div className="font-normal mb-4">Berklee Open's lessons are comprised of engaging, relevant, multimedia, and in-classroom activities. Explore music with your students using animations, audio files, flashcards, and our digital piano.</div>
      </AccordionItem>

      <AccordionItem key="3" aria-label="Accessible" indicator={({ isOpen }) => (isOpen ? <FontAwesomeIcon icon={faChevronCircleUp} className="h-6" /> : <FontAwesomeIcon icon={faChevronCircleDown} className="h-6" />)}  title="Accessible" className="font-bold">
        <div className="font-normal mb-4">Berklee Open is free to use, and our lessons are available digitally and as printable PDFs. In addition, every lesson includes Accessible and Extension Strategies to help meet students where they are.</div>
      </AccordionItem>

      <AccordionItem key="4" aria-label="Flexible" indicator={({ isOpen }) => (isOpen ? <FontAwesomeIcon icon={faChevronCircleUp} className="h-6" /> : <FontAwesomeIcon icon={faChevronCircleDown} className="h-6" />)}  title="Flexible" className="font-bold">
        <div className="font-normal mb-4">Berklee Open's music lessons and resources are designed to be modular. Use one lesson, or one hundred, to support your existing curriculum and reinforce key concepts based on your classroom and students' unique needs.</div>
      </AccordionItem>

      {/* Rest of your AccordionItems remain the same */}
    </Accordion>
  );
}