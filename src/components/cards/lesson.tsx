import React from 'react';
import { Card, CardBody, CardFooter, Image } from "@nextui-org/react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faShare, faScroll, faClock, faSignal4 } from '@fortawesome/pro-light-svg-icons';
import { IconChip } from "../../elements/IconChip";
import { AddToLibraryButton } from "../../elements/AddToLibraryButton";
import { ShareButton } from "../../elements/ShareButton";
import { calculateDuration } from "../../lib/calculateDuration";
import { getImageUrl } from '../../utils/getImageUrl';

import AuthLink from "../AuthLink";

type LessonCardProps = {
  id: string;
  title: string;
  level: string[];
  duration: number;
  shortDescription: string;
  audience: string[];
  imageUrl: string;
  index: number;
};

const LessonCard: React.FC<LessonCardProps> = ({ 
  id, 
  title, 
  duration,
  shortDescription, 
  audience,
  imageUrl, 
  index 
}) => {
 
  // Create a Contentful-like structure if image is a string
  const imageObj = typeof imageUrl === 'string' ? {
    fields: {
      file: {
        url: imageUrl
      }
    }
  } : imageUrl;

  const { url: lessonImageUrl, placeholderStyle } = getImageUrl(imageObj, index);

  return (
    <AuthLink href={`/lessons/${id}`} className="no-underline flex flex-col h-full">
      <Card className="h-full pb-8 w-full relative" shadow="0" key={index}>
        <CardBody className="overflow-visible p-0 relative">
          <div className="absolute bottom-[-15px] left-0 z-20">
            <IconChip icon={faScroll} label="Lesson" contentType="lesson" href="" />
          </div>
            {lessonImageUrl ? (
              <Image src={lessonImageUrl} alt={title} className="rounded-lg mr-8 object-cover" />
            ) : (
              <div 
                className="rounded-lg mr-8 object-cover w-full" 
                style={{
                  ...placeholderStyle,
                  aspectRatio: '475/301'
                }} 
              />
            )}
        </CardBody>
        <CardFooter className="h-full text-small flex-col">
          <div className="flex w-full mb-2 justify-between">
            <h3 className="font-bold text-lg text-left mt-4 leading-tight">{title}</h3>
            <div className="flex flex-row gap-4">
              <div className="p-2 flex text-default-500 text-left rounded-full w-[30px] h-[30px] items-center justify-center text-center">
                <AddToLibraryButton type="lessons" hrefId={`${id}`} client:load />
              </div>
              <div className="p-2 flex text-default-500 text-left rounded-full w-[30px] h-[30px] items-center justify-center text-center">
                <ShareButton type="lessons" hrefId={`${id}`} client:load />
              </div>
            </div>
          </div>
          <div className="description w-full mb-4 text-left">{shortDescription}</div>
          <div className="flex w-full justify-start items-center absolute bottom-2 left-[12px] h-[40px]">
            <div className="text-baseline gap-1 pr-2 items-center flex flex-row font-bold">
              <FontAwesomeIcon icon={faSignal4} className="w-4" />
              {audience?.map(level => level.charAt(0).toUpperCase() + level.slice(1)).join(', ')}
            </div>

            <div className="text-baseline gap-1 pr-2 pl-2 items-center flex flex-row font-bold">
              <FontAwesomeIcon icon={faClock} className="w-4" />
             {duration && calculateDuration(duration) ? calculateDuration(duration) : 'Not yet entered.'}
            </div>
          </div>
        </CardFooter>
      </Card>
    </AuthLink>
  );
};

export default LessonCard;
