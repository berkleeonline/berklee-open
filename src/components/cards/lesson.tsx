import React from 'react';
import Time from "../../components/time"
import {Card, CardBody, CardFooter, Image} from "@nextui-org/react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/pro-light-svg-icons';


type LessonCardProps = {
  lesson: {
    fields: {
      lesson_title: string;
      lesson_short_description: any;
      lesson_audience: string[];
      lesson_image: any[];
    };
    sys: {
      id: string;
    };
  };
  index: number;
};

//console.log(Astro.props.fields);

const LessonCard: React.FC<LessonCardProps> = ({ lesson, index }) => {
  const { lesson_title, lesson_short_description, lesson_audience } = lesson.fields;
  
  console.log(lesson.fields);
	
  return (
    <a href={`/lessons/${lesson.sys.id}`} className="no-underline flex flex-col">
      <Card shadow="0" key={index} isPressable>
        <CardBody className="overflow-visible p-0">
          <Image
            
            radius="lg"
            width="100%"
            alt={lesson_title}
            className="w-full object-cover h-[140px] opacity-100"
            src="https://placehold.co/450x140"
          />
        </CardBody>
        <CardFooter className="text-small flex-col">
          <div className="flex w-full mb-2 justify-between">
            <h3 className="font-bold text-lg text-left">{lesson_title}</h3>
            <p className="text-default-500 w-4">
              <FontAwesomeIcon icon={faHeart} />
            </p>
          </div>
          <div className="description mb-4 text-left">{lesson_short_description}</div>
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