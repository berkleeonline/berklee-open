import React from 'react';
import { Card, CardBody, CardFooter, Image } from "@nextui-org/react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconChip } from "../../elements/IconChip";
import { faHeart, faBookBlank } from '@fortawesome/pro-light-svg-icons';

type UnitCardProps = {
  unit: {
    fields: {
      unit_title: string;
      unit_short_description: string;
      unit_level?: string[];
      unit_lessons?: Array<{ metadata: object; sys: object; fields: object; }>;
    };
    sys: {
      id: string;
    };
  };
};

const UnitCard: React.FC<UnitCardProps> = ({ unit }) => {
  const { unit_title, unit_short_description, unit_level, unit_lessons } = unit.fields;

  return (
    <a href={`/units/${unit.sys.id}`} className="no-underline flex flex-col">
      <Card shadow="0" isPressable>
        <CardBody className="overflow-visible p-0 relative">
          <div class="absolute bottom-[-15px] left-0 z-20"><IconChip icon={faBookBlank} label="Unit" contentType="unit" href="" /></div>
          <Image
            radius="lg"
            width="100%"
            alt={unit_title}
            className="w-full object-cover h-[140px] opacity-100"
            src="https://picsum.photos/200/300"
          />
        </CardBody>
        <CardFooter className="text-small flex-col">
          <div className="flex w-full mb-2 justify-between">
            <h3 className="font-bold text-lg text-left mt-2">{unit_title}</h3>
            <p className="text-default-500 w-4">
              <FontAwesomeIcon icon={faHeart} />
            </p>
          </div>
          <div className="description mb-4 text-left">{unit_short_description}</div>
          <div className="flex w-full justify-start items-center">
            <p className="text-xs gap-1 pr-2">
              {unit_level?.map(level => level.charAt(0).toUpperCase() + level.slice(1)).join(', ') || ''}
            </p>
            •
            <p className="text-xs gap-1 pr-2 pl-2">
              [2h, 30m]
            </p>
            •
            <p className="text-xs gap-1 pl-2">
              {unit_lessons?.length || 0} {unit_lessons?.length === 1 ? 'Lesson' : 'Lessons'}
            </p>
          </div>
        </CardFooter>
      </Card>
    </a>
  );
};

export default UnitCard;
