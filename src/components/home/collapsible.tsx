
import React from "react";
import {Accordion, AccordionItem} from "@heroui/react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronCircleDown, faChevronCircleUp } from '@fortawesome/pro-light-svg-icons';

export default function HomeCollapsible() {
  const defaultContent =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.";

  return (
    <Accordion defaultExpandedKeys={["1"]}>

      <AccordionItem key="1" aria-label="Pedagogically Sound" indicator={({ isOpen }) => (isOpen ? <FontAwesomeIcon icon={faChevronCircleUp} className="h-6" /> : <FontAwesomeIcon icon={faChevronCircleDown} className="h-6" />)} title="Pedagogically Sound" className="font-bold">
        <div className="font-normal">Berklee Open's Music Education resources are based on educator best practices, are standards-aligned, and are designed to support student learning in the classroom.</div>
      </AccordionItem>

      <AccordionItem key="2" aria-label="Interactive" indicator={({ isOpen }) => (isOpen ? <FontAwesomeIcon icon={faChevronCircleUp} className="h-6" /> : <FontAwesomeIcon icon={faChevronCircleDown} className="h-6" />)}  title="Interactive" className="font-bold">
        <div className="font-normal">Berklee Open's lessons are comprised of engaging, relevant, multimedia, and in-classroom activities. Explore music with your students using animations, audio files, flashcards, and our digital piano.</div>
      </AccordionItem>

      <AccordionItem key="3" aria-label="Accessible" indicator={({ isOpen }) => (isOpen ? <FontAwesomeIcon icon={faChevronCircleUp} className="h-6" /> : <FontAwesomeIcon icon={faChevronCircleDown} className="h-6" />)}  title="Accessible" className="font-bold">
        <div className="font-normal">Berklee Open is free to use, and our lessons are available digitally and as printable PDFs. In addition, every lesson includes Accessible and Extension Strategies to help meet students where they are.</div>
      </AccordionItem>

      <AccordionItem key="4" aria-label="Flexible" indicator={({ isOpen }) => (isOpen ? <FontAwesomeIcon icon={faChevronCircleUp} className="h-6" /> : <FontAwesomeIcon icon={faChevronCircleDown} className="h-6" />)}  title="Flexible" className="font-bold">
        <div className="font-normal">Berklee Open's music lessons and resources are designed to be modular. Use one lesson, or one hundred, to support your existing curriculum and reinforce key concepts based on your classroom and students' unique needs.</div>
      </AccordionItem>

    </Accordion>
  );
}
