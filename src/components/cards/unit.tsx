import React from 'react';
import { Card, CardBody, CardFooter, Image } from "@nextui-org/react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconChip } from "../../elements/IconChip";
import { AddToLibraryButton } from "../../elements/AddToLibraryButton";
import { ShareButton } from "../../elements/ShareButton";
import { faHeart, faShare, faBookBlank, faScroll } from '@fortawesome/pro-light-svg-icons';
import { getImageUrl } from '../../utils/getImageUrl';

import AuthLink from "../AuthLink";

type UnitCardProps = {
  id: string;
  title: string;
  image: string;
  shortDescription: string;
  level: string[];
  lessonsCount: number;
  index: number;
};

const UnitCard: React.FC<UnitCardProps> = ({ 
  id, 
  title,
  image,
  shortDescription,
  lessonsCount,
  index
}) => {
  // console.log('UnitCard props:', { id, title, image, shortDescription, level, lessonsCount });
  // Create a Contentful-like structure if image is a string
  const imageObj = typeof image === 'string' ? {
    fields: {
      file: {
        url: image
      }
    }
  } : image;

  const { url: unitImageUrl, placeholderStyle } = getImageUrl(imageObj, index);
  return (
    <AuthLink href={`/units/${id}`} className="no-underline flex flex-col h-full">
      <Card className="h-full pb-8 w-full relative" shadow="0">
        <CardBody className="overflow-visible p-0 relative">
          <div className="absolute bottom-[-15px] left-0 z-20">
            <IconChip icon={faBookBlank} label="Unit" contentType="unit" href="" />
          </div>
          {unitImageUrl ? (
              <Image src={unitImageUrl} alt={title} className="rounded-lg mr-8 object-cover" />
            ) : (
              <div 
                className="rounded-lg mr-8 object-cover w-full" 
                style={{
                  ...placeholderStyle,
                  aspectRatio: '475/258'
                }} 
              />
            )}
        </CardBody>
        <CardFooter className="h-full text-small flex-col">
          <div className="flex w-full mb-2 justify-between">
            <h3 className="font-bold text-lg text-left mt-4">{title}</h3>
            <div className="flex flex-row gap-4">
              <div className="p-2 flex text-default-500 text-left rounded-full w-[30px] h-[30px] items-center justify-center text-center">
                <AddToLibraryButton type="units" hrefId={`${id}`} client:load />
              </div>
              <div className="p-2 flex text-default-500 text-left rounded-full w-[30px] h-[30px] items-center justify-center text-center">
                <ShareButton type="units" hrefId={`${id}`} client:load />
              </div>
            </div>
          </div>
          <div className="description mb-4 text-left">{shortDescription}</div>
          <div className="flex w-full justify-start items-center absolute bottom-2 left-[12px] h-[40px]">
            <div className="text-baseline flex flex-row items-center font-bold">
              <FontAwesomeIcon icon={faScroll} className="w-4 mr-2" />
              {lessonsCount} {lessonsCount === 1 ? 'Lesson' : 'Lessons'}
            </div>
          </div>
        </CardFooter>
      </Card>
    </AuthLink>
  );
};

export default UnitCard;
