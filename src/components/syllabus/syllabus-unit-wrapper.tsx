import React, { useState } from 'react';
import SyllabusUnit from './syllabus-unit';
import { Button } from "@nextui-org/react";

const SyllabusUnitWrapper = ({ module_units }) => {
  const [showAll, setShowAll] = useState(false);

  const handleShowAll = () => {
    setShowAll(true);
  };

  const unitsToDisplay = showAll ? module_units : module_units.slice(0, 5);

  return (
    <>
      <ul>
        {unitsToDisplay.map((unit, index) => (
          <SyllabusUnit key={index} unit={unit} index={index} />
        ))}
      </ul>
      {!showAll && module_units.length > 5 && (
        <div className="bg-gradient-to-t from-white from-80% to-transparent text-center relative -mt-56 pt-16">
          <Button onClick={handleShowAll} variant="bordered" color="default" className="w-80 border-black font-bold" client:load>
            View Full Syllabus
          </Button>
        </div>
      )}
    </>
  );
};

export default SyllabusUnitWrapper;
