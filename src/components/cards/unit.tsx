import React from 'react';
import { Card, CardBody, CardFooter, Image } from "@nextui-org/react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconChip } from "../../elements/IconChip";
import { faHeart, faBookBlank } from '@fortawesome/pro-light-svg-icons';

type UnitCardProps = {
  id: string;
  title: string;
  image: string;
  shortDescription: string;
  level: string[];
  lessonsCount: number;
};

const UnitCard: React.FC<UnitCardProps> = ({ 
  id, 
  title,
  image,
  shortDescription,
  lessonsCount
}) => {
  // console.log('UnitCard props:', { id, title, image, shortDescription, level, lessonsCount });
  return (
    <a href={`/units/${id}`} className="no-underline flex flex-col">
      <Card className=" w-full h-[480px] relative" shadow="0" isPressable>
        <CardBody className="overflow-visible p-0 relative">
          <div className="absolute bottom-[-15px] left-0 z-20">
            <IconChip icon={faBookBlank} label="Unit" contentType="unit" href="" />
          </div>
          <Image
            radius="lg"
            width="100%"
            alt={title}
            className="w-full object-cover h-[265px] opacity-100"
            src={image}
          />
        </CardBody>
        <CardFooter className="h-full text-small flex-col">
          <div className="flex w-full mb-2 justify-between">
            <h3 className="font-bold text-lg text-left mt-4">{title}</h3>
            <div className="p-2 relative flex text-default-500 text-left border rounded-full w-[30px] h-[30px] items-center justify-center text-center">
              <FontAwesomeIcon icon={faHeart} />
            </div>
          </div>
          <div className="description mb-4 text-left">{shortDescription}</div>
          <div className="flex w-full justify-start items-center absolute bottom-2 left-[12px] h-[40px]">
            <p className="text-sm gap-1">
              {lessonsCount} {lessonsCount === 1 ? 'Lesson' : 'Lessons'}
            </p>
          </div>
        </CardFooter>
      </Card>
    </a>
  );
};

export default UnitCard;