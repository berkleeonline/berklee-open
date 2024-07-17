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
      lesson_image?: any; // Ensure lesson_image is included in the fields
    };
  };
  index: number;
}

const SyllabusLesson: React.FC<SyllabusLessonProps> = ({ lesson, index }) => {

  console.log('SyllabusLesson component is rendering');

  const getImageUrl = (image: any): string => {
    if (!image || !image.fields || !image.fields.file || !image.fields.file.url) {
      console.log('No valid image URL found. Using placeholder.');
      return 'https://placehold.co/135x75';
    }
    const url = image.fields.file.url;
    const fullUrl = url.startsWith('//') ? `https:${url}` : url;
    console.log('Image URL:', fullUrl);
    return fullUrl;
  };

  if (!lesson || !lesson.fields) {
    console.error("Lesson or lesson fields are undefined:", lesson);
    return <p>Lesson information is unavailable</p>;
  }

  console.log('Lesson Data:', lesson);
  const lessonImageUrl = lesson.fields.lesson_image ? getImageUrl(lesson.fields.lesson_image) : 'https://placehold.co/135x75';
  console.log('Final Image URL:', lessonImageUrl);
  
  const { lesson_title, lesson_image, lesson_short_description, lesson_audience, lesson_duration, lesson_concepts } = lesson.fields;

  return (
    <li className="pb-12 last:pb-0 relative" key={index}>
      <div className="absolute top-[-15px] left-11"><IconChip icon={faScroll} label="Lesson" contentType="lesson" href="/lessons" /></div>
        <div className="flex flex-row gap-2">
          <div>
            <a href={`/lessons/${lesson.sys.id}`} className="no-underline hover:text-blue-800">
              <img 
                src={lesson.fields.lesson_image ? (lesson.fields.lesson_image.fields.file.url.startsWith('//') ? `https:${lesson.fields.lesson_image.fields.file.url}` : lesson.fields.lesson_image.fields.file.url) : 'https://placehold.co/135x75'} 
                alt={lesson_title} 
                className="rounded-lg mr-4 w-[135px] h-[75px] object-cover" 
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.onerror = null;
                  target.src = 'https://placehold.co/135x75';
                  console.log('Error loading image, using fallback');
                }}
              />
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
