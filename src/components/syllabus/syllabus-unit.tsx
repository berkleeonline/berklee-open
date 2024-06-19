import React, { useState } from 'react';
import { Chip, Button } from "@nextui-org/react";
import { IconChip } from "../../elements/IconChip";
import SyllabusLesson from './syllabus-lesson';
import { faBookBlank, faChevronDown, faChevronUp } from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface SyllabusUnitProps {
  unit: {
    sys: {
      id: string;
    };
    fields: {
      unit_title: string;
      unit_description: any;
      unit_concept: Array<{ fields: { concept_name: string } }>;
      unit_lessons: Array<any>; // full lesson data passed from parent
    };
  };
  index: number;
}

const SyllabusUnit: React.FC<SyllabusUnitProps> = ({ unit, index }) => {
  const [collapsed, setCollapsed] = useState(true);

  const handleToggle = () => {
    console.log("Toggle expand called"); // Debugging log
    setCollapsed(!collapsed);
  };

  if (!unit || !unit.fields) {
    console.error("Unit or unit fields are undefined:", unit);
    return <p>Unit data is unavailable</p>;
  }

  const { unit_title, unit_concept, unit_lessons } = unit.fields;

  const hasLessons = unit_lessons && unit_lessons.length > 0;

  return (
    <li className="pb-16 relative">
      <div className="absolute top-[-15px] left-16">
        <IconChip icon={faBookBlank} label="Unit" contentType="unit" href="/units" />
      </div>
      
      <div className="flex md:flex-row gap-3">
        <div className="min-w-[160px] flex-shrink-0" style={{ flexBasis: '160px' }}>
          <a href={`/units/${unit.sys.id}`} className="no-underline hover:text-blue-800">
            <img src="https://dummyimage.com/135x75/eeeeef/aaaaaa.jpg&text=135x75" className="rounded-lg mr-4" style={{ width: 135, height: 75 }} />
          </a>
        </div>
        <div className="flex flex-col gap-1 size-full">
          <div className="flex justify-between">
            <a href={`/units/${unit.sys.id}`} className="no-underline hover:text-blue-800">
              <div className="text-md font-bold">{unit_title}</div>
              <div className="text-sm">[unit audience] • [unit duration]</div>
            </a>
            <Button isIconOnly onClick={handleToggle} className="p-2" radius="full" variant="bordered" color="default" aria-label="Expand unit row to view lessons that make up the unit.">
              <FontAwesomeIcon icon={!collapsed ? faChevronUp : faChevronDown} />
            </Button>
          </div>

          {unit_concept && unit_concept.length > 0 && (
            <div className="mt-4">
              {unit_concept.map((concept, index) => (
                <Chip key={index} variant="flat" className="mb-3 mr-3">{concept.fields.concept_name}</Chip>
              ))}
            </div>
          )}
          
          {!collapsed && hasLessons ? (
            <div className="mt-12">
              <ul>
                {unit_lessons.map((lesson, lessonIndex) => (
                  <SyllabusLesson key={lessonIndex} lesson={lesson} index={lessonIndex} />
                ))}
              </ul>
            </div>
          ) : (
            !collapsed && (
              <div className="mt-6">
                <strong>No lessons added to this unit yet.</strong>
              </div>
            )
          )}
        </div>
      </div>
    </li>
  );
};

export default SyllabusUnit;