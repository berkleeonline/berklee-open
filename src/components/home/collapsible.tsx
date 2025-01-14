
import React from "react";
import {Accordion, AccordionItem} from "@nextui-org/react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronCircleDown, faChevronCircleUp } from '@fortawesome/pro-light-svg-icons';

export default function HomeCollapsible() {
  const defaultContent =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.";

  return (
    <Accordion defaultExpandedKeys={["1"]}>

      <AccordionItem key="1" aria-label="Pedagogically Sound" indicator={({ isOpen }) => (isOpen ? <FontAwesomeIcon icon={faChevronCircleUp} className="h-6" /> : <FontAwesomeIcon icon={faChevronCircleDown} className="h-6" />)} title="Pedagogically Sound" className="font-bold">
        <div className="font-normal">Resources are based on educator best practices and are designed to support student learning.</div>
      </AccordionItem>

      <AccordionItem key="2" aria-label="Interactive" indicator={({ isOpen }) => (isOpen ? <FontAwesomeIcon icon={faChevronCircleUp} className="h-6" /> : <FontAwesomeIcon icon={faChevronCircleDown} className="h-6" />)}  title="Interactive" className="font-bold">
        <div className="font-normal">{defaultContent}</div>
      </AccordionItem>

      <AccordionItem key="3" aria-label="Accessible" indicator={({ isOpen }) => (isOpen ? <FontAwesomeIcon icon={faChevronCircleUp} className="h-6" /> : <FontAwesomeIcon icon={faChevronCircleDown} className="h-6" />)}  title="Accessible" className="font-bold">
        <div className="font-normal">{defaultContent}</div>
      </AccordionItem>

      <AccordionItem key="4" aria-label="Flexible" indicator={({ isOpen }) => (isOpen ? <FontAwesomeIcon icon={faChevronCircleUp} className="h-6" /> : <FontAwesomeIcon icon={faChevronCircleDown} className="h-6" />)}  title="Flexible" className="font-bold">
        <div className="font-normal">{defaultContent}</div>
      </AccordionItem>

    </Accordion>
  );
}
