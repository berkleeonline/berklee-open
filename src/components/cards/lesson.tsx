import React from 'react';
import Time from "../../components/time";
import { Card, CardBody, CardFooter, Image } from "@nextui-org/react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconChip } from "../../elements/IconChip";
import { faHeart, faScroll } from '@fortawesome/pro-light-svg-icons';

type LessonCardProps = {
  lesson: {
    fields: {
      lesson_title: string;
      lesson_short_description: any;
      lesson_audience: string[];
      lesson_image?: {
        fields: {
          file: {
            url: string;
          };
        };
      };
    };
    sys: {
      id: string;
    };
  };
  index: number;
};

const LessonCard: React.FC<LessonCardProps> = ({ lesson, index }) => {
  const { lesson_title, lesson_short_description, lesson_image, lesson_audience } = lesson.fields;

  const getImageUrl = (image) => {
    if (!image || !image.fields || !image.fields.file || !image.fields.file.url) {
      console.log('No valid image URL found');
      return 'https://placehold.co/290x150';
    }
    const url = image.fields.file.url;
    const fullUrl = url.startsWith('//') ? `https:${url}` : url;
    console.log('Image URL:', fullUrl);
    return fullUrl;
  };

  const imageUrl = lesson_image ? getImageUrl(lesson_image) : 'https://placehold.co/425x265';

  console.log('Lesson Image:', lesson_image);
  console.log('Final Image URL:', imageUrl);

  return (
    <a href={`/lessons/${lesson.sys.id}`} className="no-underline flex flex-col">
      <Card className="h-full w-full" shadow="0" key={index} isPressable>
        <CardBody className="overflow-visible p-0 relative">
          <div className="absolute bottom-[-15px] left-0 z-20">
            <IconChip icon={faScroll} label="Lesson" contentType="lesson" href="" />
          </div>
          <Image
            radius="lg"
            width="100%"
            alt={lesson_title}
            className="w-full object-cover h-[265px] opacity-100"
            src={imageUrl}
          />
        </CardBody>
        <CardFooter className="h-full text-small flex-col">
          <div className="flex w-full mb-2 justify-between">
            <h3 className="font-bold text-lg text-left mt-4">{lesson_title}</h3>
            <p className="text-default-500 text-left w-4">
              <FontAwesomeIcon icon={faHeart} />
            </p>
          </div>
          <div className="description w-full mb-4 text-left">{lesson_short_description}</div>
          <div className="flex w-full justify-start items-center">
            <p className="text-xs gap-1 pr-2">
              {lesson_audience?.map(level => level.charAt(0).toUpperCase() + level.slice(1)).join(', ')}
            </p>
            •
            <p className="text-xs gap-1 pr-2 pl-2">
              [2h, 30m]
            </p>
          </div>
        </CardFooter>
      </Card>
    </a>
  );
};

export default LessonCard;
