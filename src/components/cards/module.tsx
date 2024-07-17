import React from 'react';
import { Card, CardBody, CardFooter, Image } from "@nextui-org/react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/pro-light-svg-icons';

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

  return (
    <a href={`/modules/${id}`} className="no-underline h-full">
      <Card className="h-full w-full" shadow="0" key={index} isPressable>
        <CardBody className="overflow-visible p-0">
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
            <h3 className="font-bold text-lg text-left">{title}</h3>
            <p className="text-default-500 w-4">
              <FontAwesomeIcon icon={faHeart} />
            </p>
          </div>
          <div className="description w-full mb-4 text-left">{shortDescription}</div>
          <div className="flex w-full justify-start items-center">
            <p className="text-xs gap-1 pr-2">
              {level?.map(l => l.charAt(0).toUpperCase() + l.slice(1)).join(', ')}
            </p>
            •
            <p className="text-xs gap-1 pr-2 pl-2">
              [2h, 30m]
            </p>
            •
            <p className="text-xs gap-1 pl-2">
              {unitsCount} {unitsCount === 1 ? 'Unit' : 'Units'}
            </p>
          </div>
        </CardFooter>
      </Card>
    </a>
  );
};

export default ModuleCard;
