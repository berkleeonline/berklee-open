import React from 'react';
import { Card, CardBody, CardFooter, Image } from "@nextui-org/react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faBook, faSignal4, faBooks } from '@fortawesome/pro-light-svg-icons';
import { IconChip } from "../../elements/IconChip";
import { calculateLevel } from "../../lib/calculateLevel";

type ModuleCardProps = {
  id: string;
  title: string;
  image: string;
  shortDescription: string;
  level: string[];
  unitsCount: number;
  index: number;
};

const ModuleCard: React.FC<ModuleCardProps> = ({ 
  id, 
  title,
  image,
  shortDescription,
  level,
  unitsCount,
  index 
}) => {
  console.log('ModuleCard props:', { id, title, image, shortDescription, level, unitsCount, index });
  if (level.length > 0) {
    level = calculateLevel(level);
  }

  return (
    <a href={`/modules/${id}`} className="no-underline h-full">
      <Card className="h-full w-full relative pb-8" shadow="0" key={index} isPressable>
        <CardBody className="overflow-visible p-0">
          <div className="absolute bottom-[-15px] left-0 z-20">
            <IconChip icon={faBooks} label="Module" contentType="module" href="" />
          </div>
          <Image
            radius="lg"
            width="100%"
            alt={title}
            className="w-full object-cover h-[265px] opacity-100"
            src={image}
          />
        </CardBody>
        <CardFooter className="text-small flex-col h-full">
          <div className="flex w-full mb-2 justify-between">
            <h3 className="font-bold text-lg text-left mt-4">{title}</h3>
            <div className="p-2 flex text-default-500 text-left border rounded-full w-[30px] h-[30px] items-center justify-center text-center">
              <FontAwesomeIcon icon={faHeart} />
            </div>
          </div>
          <div className="description w-full mb-4 text-left">{shortDescription}</div>
          <div className="flex w-full justify-start items-center absolute bottom-2 left-[12px] h-[40px] flex-row">
            <div className="text-baseline gap-1 pr-2 font-bold flex flex-row items-center">
              <FontAwesomeIcon icon={faSignal4} className="w-4" />
              {level}
            </div>

            <div className="text-baseline gap-1 pl-2 flex flex-row items-center font-bold">
              <FontAwesomeIcon icon={faBook} className="w-3 mr-1" />
              {unitsCount} {unitsCount === 1 ? 'Unit' : 'Units'}
            </div>
          </div>
        </CardFooter>
      </Card>
    </a>
  );
};

export default ModuleCard;
