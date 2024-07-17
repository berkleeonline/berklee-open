import React from 'react';
import { Card, CardBody, CardFooter, Image } from "@nextui-org/react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconChip } from "../../elements/IconChip";
import { faHeart, faScroll } from '@fortawesome/pro-light-svg-icons';

type LessonCardProps = {
  id: string;
  title: string;
  shortDescription: string;
  audience: string[];
  imageUrl: string;
  index: number;
};

const LessonCard: React.FC<LessonCardProps> = ({ 
  id, 
  title, 
  shortDescription, 
  audience, 
  imageUrl, 
  index 
}) => {
  return (
    <a href={`/lessons/${id}`} className="no-underline flex flex-col">
      <Card className="h-full h-[450px] w-full relative" shadow="0" key={index} isPressable>
        <CardBody className="overflow-visible p-0 relative">
          <div className="absolute bottom-[-15px] left-0 z-20">
            <IconChip icon={faScroll} label="Lesson" contentType="lesson" href="" />
          </div>
          <Image
            radius="lg"
            width="100%"
            alt={title}
            className="w-full object-cover h-[265px] opacity-100"
            src={imageUrl}
          />
        </CardBody>
        <CardFooter className="h-full text-small flex-col">
          <div className="flex w-full mb-2 justify-between">
            <h3 className="font-bold text-lg text-left mt-4">{title}</h3>
            <div className="p-2 flex text-default-500 text-left border rounded-full w-[30px] h-[30px] items-center justify-center text-center">
              <FontAwesomeIcon icon={faHeart} />
            </div>
          </div>
          <div className="description w-full mb-4 text-left">{shortDescription}</div>
          <div className="flex w-full justify-start items-center absolute bottom-2 left-[12px] h-[40px]">
            <p className="text-baseline gap-1 pr-2">
              {audience?.map(level => level.charAt(0).toUpperCase() + level.slice(1)).join(', ')}
            </p>
            •
            <p className="text-baseline gap-1 pr-2 pl-2">
              [2h, 30m]
            </p>
          </div>
        </CardFooter>
      </Card>
    </a>
  );
};

export default LessonCard;