import React, { useState } from 'react';
import { Chip, Button, Image } from "@nextui-org/react";
import { IconChip } from "../../elements/IconChip";
import SyllabusLesson from './syllabus-lesson';
import { faBookBlank, faChevronDown, faChevronUp } from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { getImageUrl } from '../../utils/getImageUrl';

interface SyllabusUnitProps {
  unit: {
    sys: {
      id: string;
    };
    fields: {
      unit_title: string;
      unit_short_description: string;
      unit_description: any;
      unit_concept: Array<{ fields: { concept_name: string } }>;
      unit_lessons: Array<any>; // full lesson data passed from parent
      unit_image?: any; // unit image
    };
  };
  index: number;
}

const SyllabusUnit: React.FC<SyllabusUnitProps> = ({ unit, index }) => {
  const [collapsed, setCollapsed] = useState(true);

  const handleToggle = () => {
    setCollapsed(!collapsed);
  };

  if (!unit || !unit.fields) {
    console.error("Unit or unit fields are undefined:", unit);
    return <p>Unit data is unavailable</p>;
  }

  const { unit_title, unit_short_description, unit_concept, unit_lessons, unit_image } = unit.fields;
  const hasLessons = unit_lessons && unit_lessons.length > 0;
  const { url: unitImageUrl, placeholderStyle } = getImageUrl(unit_image, index);

  return (
    <li className="pb-20 relative">
      <div className="flex md:flex-row gap-3">
        <div className="min-w-[160px] flex-shrink-0 mr-4 relative" style={{ flexBasis: '160px' }}>
          <div className="absolute top-[-17px] left-0 z-50"><IconChip icon={faBookBlank} label="Unit" contentType="unit" href="/units" /></div>
          <a href={`/units/${unit.sys.id}`} className="no-underline hover:text-blue-800">
            {unitImageUrl ? (
              <Image src={unitImageUrl} alt={unit_title} className="rounded-lg mr-8 object-cover" />
            ) : (
              <div 
                className="rounded-lg mr-8" 
                style={{
                  ...placeholderStyle,
                  width: 160,
                  height: 102
                }} 
              />
            )}
          </a>
        </div>
        <div className="flex flex-col gap-1 size-full">
          <div className="flex justify-between">
            <a href={`/units/${unit.sys.id}`} className="no-underline hover:text-blue-800">
              <div className="text-md font-bold">{unit_title}</div>
              <div className="text-base mr-8">{unit_short_description}</div>
            </a>
            <Button isIconOnly onPress={handleToggle} className="p-2 hover:bg-slate-100" radius="full" variant="bordered" color="default" aria-label="Expand unit row to view lessons that make up the unit.">
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
                  <SyllabusLesson 
                    key={lessonIndex} 
                    lesson={lesson} 
                    index={lessonIndex}
                    imageUrl={getImageUrl(lesson.fields.lesson_image)}
                  />
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