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
        <div className="text-center mt-8 relative -mt-120">
          <Button onClick={handleShowAll} variant="bordered" color="default" className="w-80 border-black font-bold">
            View Full Syllabus
          </Button>
        </div>
      )}
    </>
  );
};

export default SyllabusUnitWrapper;
