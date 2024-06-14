import React from 'react';
import { Chip } from "@nextui-org/react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconChip } from "../elements/IconChip";
import { faScroll } from '@fortawesome/pro-light-svg-icons';

interface SyllabusLessonProps {
  lesson: {
    sys: {
      id: string;
    };
    fields: {
      lesson_title: string;
      lesson_description: string;
      lesson_audience: string;
      lesson_duration: string;
      lesson_concepts: Array<{ fields: { concept_name: string } }>;
    };
  };
}

const SyllabusLesson: React.FC<SyllabusLessonProps> = ({ lesson, index }) => {
  return (
    <li className="pb-16 relative" key={index}>
      <div className="absolute top-[-15px] left-11"><IconChip icon={faScroll} label="Lesson" contentType="lesson" href="/lessons" /></div>
      <a href={`/lessons/${lesson.sys.id}`} class="no-underline hover:text-blue-800">
        <div className="flex flex-row gap-2">
          <div>
            <img src="https://dummyimage.com/135x75/eeeeef/aaaaaa.jpg&text=135x75" class="rounded-lg mr-4" />
          </div>
          <div className="flex flex-col gap-1">
            <div className="text-md font-bold">{lesson.fields.lesson_title}</div>
            <div className="text-sm text-default-50">{lesson.fields.lesson_short_description}</div>
            <div className="text-sm text-default-500">{lesson.fields.lesson_audience} • {lesson.fields.lesson_duration}</div>
            <div className="mt-2">
                {lesson.fields.lesson_concepts.map((concept, index) => (
                <Chip key={index} variant="flat" className="mb-3 mr-3">{concept.fields.concept_name}</Chip>
                ))}
            </div>
          </div>
        </div>
      </a>
    </li>
  )
};

export default SyllabusLesson;