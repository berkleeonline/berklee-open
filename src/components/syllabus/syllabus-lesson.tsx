import React from 'react';
import { Chip } from "@nextui-org/react";
import { IconChip } from "../../elements/IconChip";
import { faScroll } from '@fortawesome/pro-light-svg-icons';

interface SyllabusLessonProps {
  lesson: {
    sys: {
      id: string;
    };
    fields: {
      lesson_title: string;
      lesson_short_description: string;
      lesson_audience: string;
      lesson_duration: string;
      lesson_concepts: Array<{ fields: { concept_name: string } }>;
    };
  };
  index: number;
}

const SyllabusLesson: React.FC<SyllabusLessonProps> = ({ lesson, index }) => {
  if (!lesson || !lesson.fields) {
    console.error("Lesson or lesson fields are undefined:", lesson);
    return <p>Lesson information is unavailable</p>;
  }

  const { lesson_title, lesson_short_description, lesson_audience, lesson_duration, lesson_concepts } = lesson.fields;

  return (
    <li className="pb-12 last:pb-0 relative" key={index}>
      <div className="absolute top-[-15px] left-11"><IconChip icon={faScroll} label="Lesson" contentType="lesson" href="/lessons" /></div>
        <div className="flex flex-row gap-2">
          <div>
            <a href={`/lessons/${lesson.sys.id}`} className="no-underline hover:text-blue-800">
              <img src="https://dummyimage.com/135x75/eeeeef/aaaaaa.jpg&text=135x75" className="rounded-lg mr-4" />
            </a>
          </div>
          <div className="flex flex-col gap-1">
            <a href={`/lessons/${lesson.sys.id}`} className="no-underline hover:text-blue-800">
              <div className="text-md font-bold">{lesson_title}</div>
              <div className="text-sm text-default-500">{lesson_audience} • {lesson_duration}</div>
            </a>
            <div className="mt-2">
              {lesson_concepts.map((concept, index) => (
                <Chip key={index} variant="flat" className="mb-3 mr-3">{concept.fields.concept_name}</Chip>
              ))}
            </div>
          </div>
        </div>
    </li>
  );
};

export default SyllabusLesson;
