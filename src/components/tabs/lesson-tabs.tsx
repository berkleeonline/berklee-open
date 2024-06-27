import React from "react";
import {Tabs, Tab, Card, CardBody} from "@nextui-org/react";
import { IconHeader } from "../../elements/IconHeader";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { documentToHtmlString } from '@contentful/rich-text-html-renderer';
import { faCompass, 
        faStar,
        faFile,
        faPianoKeyboard,
        faPhotoFilmMusic,
        faDrum,
        faTriangleInstrument,
        faTrafficCone, 
        faMusicMagnifyingGlass, 
        faMusic, 
        faSeedling,
        faChalkboard,
        faSquareCheck,
        faQuestionCircle} 
        from '@fortawesome/pro-light-svg-icons';
import styles from '../../pages/lessons/_lesson.module.scss';

// interface LessonTabsProps {
//     headerId: string;
//     type: string;
//     hrefId: string;
//     [key: string]: any; // To accept any additional props
//   }

// Materials get an icon assigned manually. Add as needed here.
const materialIcons = {
    "Handouts": faFile,
    "Keyboard": faPianoKeyboard,
    "Audio / Video": faPhotoFilmMusic,
    "Unpitched Instrument": faDrum,
    "Metronome" : faTriangleInstrument
    // Add more mappings as needed
};

export const LessonTabs: FC<LessonTabsProps> = ({lesson_outcome, lesson_sticking_points, lesson_evidence, lesson_prerequisites, lesson_outline, lesson_essential_questions, lesson_prep, lesson_materials, lesson_repertoire, ...props }) => {
  return (
    <div className="flex w-full flex-col">
      <Tabs aria-label="Options" variant="underlined"
        classNames={{
            tabList: "gap-6 w-full relative rounded-none p-0 border-b border-divider",
            cursor: "w-full bg-[#ee243c]",
            tab: "max-w-fit px-0 h-12",
            tabContent: "group-data-[selected=true]:text-[#000]"
        }}

      >
        <Tab key="overview" title="Overview" className="text-medium">
            <div class="pt-6">
            {lesson_outcome && lesson_outcome.content.length > 0 && (
                <div class="mb-16">
                <IconHeader headerId="learningOutcomes" icon={faSeedling} label="Learning Outcomes" />
                <h4 class="text-md font-bold pl-10 mb-2">Upon completion of this lesson, students will be able to:</h4>
                <ul class="list-disc list-outside ml-10 pl-4">
                    {lesson_outcome.content.map((outcome, index) => (
                    outcome.nodeType === 'unordered-list' && outcome.content.map((item, idx) => (
                        <li class="pb-3" key={idx}>{item.content[0].content[0].value}</li>
                    ))
                    ))}
                </ul>
                </div>
            )}

            {lesson_outline && lesson_outline.content.length > 0 && (
                <div class="mb-16">
                <IconHeader headerId="lessonOutline" icon={faCompass} label="Lesson Outline" />
                <ol class="list-decimal list-outside ml-10 pl-4">
                    {lesson_outline.content.map((outline, index) => (
                    outline.nodeType === 'ordered-list' && outline.content.map((item, idx) => (
                        <li class="pb-3" key={idx}>{item.content[0].content[0].value}</li>
                    ))
                    ))}
                </ol>
                </div>
            )}


            {lesson_essential_questions && lesson_essential_questions.length > 0 && (
                <div class="mb-16">
                <IconHeader headerId="lessonEssentialQuestions" icon={faStar} label="Essential Questions" />
                <ol class="list-decimal list-outside ml-10 pl-4">
                    {lesson_essential_questions.map((question, index) => (
                    <li class="pb-3" key={index}>
                        {question.fields.question}
                    </li>
                    ))}
                </ol>
                </div>
            )}

            {lesson_repertoire && lesson_repertoire.content.length > 0 && (
                <div class="mb-16">
                <IconHeader headerId="lessonRepertoire" icon={faMusic} label="Repertoire" />
                <div class={`mb-7 ${styles.richContentInnerStyles}`} set:html={documentToHtmlString(lesson_repertoire)}></div>
                </div>
            )}

            {(lesson_prep || lesson_materials.length > 0) && (
                <div class="mb-16">
                <IconHeader headerId="lessonPreparation" icon={faChalkboard} label="Preparation" />

                {lesson_materials.length > 0 && (
                    <div class={`mb-7 border-b pb-7 ${styles.richContentInnerStyles}`}>
                    <h3 class="font-bold text-lg mb-4">Referenced Materials</h3>
                    <div class="grid grid-cols-2 gap-4">
                        {lesson_materials.map((material, index) => (
                        <div key={index} class="mb-1 flex flex-row items-center">
                            <FontAwesomeIcon icon={materialIcons[material] || faQuestionCircle} className="mr-3 w-4 h-4 text-center" />
                            {material}
                        </div>
                        ))}
                    </div>
                    </div>
                )}

                {lesson_prep && lesson_prep.content.length > 0 && (
                    <div class={`mb-7 ${styles.richContentInnerStyles}`} set:html={documentToHtmlString(lesson_prep)}></div>
                )}
                </div>
            )}


            {lesson_prep && lesson_prep.content.length > 0 && (
                <div class="mb-16">
                <IconHeader headerId="lessonStickingPoints" icon={faTrafficCone} label="Sticking Points" />
                <div class={`mb-7 ${styles.richContentInnerStyles}`} set:html={documentToHtmlString(lesson_sticking_points)}></div>
                </div>
            )}

            {lesson_prep && lesson_prep.content.length > 0 && (
                <div class="mb-16">
                <IconHeader headerId="lessonEvidence" icon={faMusicMagnifyingGlass} label="Evidence of Learning" />
                <div class={`mb-7 ${styles.richContentInnerStyles}`} set:html={documentToHtmlString(lesson_evidence)}></div>
                </div>
            )}

            {lesson_prerequisites && lesson_prerequisites.content.length > 0 && (
                <div class="mb-16">
                <IconHeader headerId="lessonPrerequisites" icon={faSquareCheck} label="Prerequisites" />
                <ul class="list-disc list-outside ml-10 pl-4">
                    {lesson_prerequisites.content.map((prerequisite, index) => (
                    prerequisite.nodeType === 'unordered-list' && prerequisite.content.map((item, idx) => (
                        <li class="pb-3" key={idx}>{item.content[0].content[0].value}</li>
                    ))
                    ))}
                </ul>
                </div>
            )}
        </div>
        </Tab>
        <Tab key="instructions" title="Instructions" className="text-medium">
            <div className="mt-4">
                Lesson in instructions will go here.
                <br/><br/>
                Lesson in instructions will go here.
                <br/><br/>
                Lesson in instructions will go here.
                <br/><br/>
                Lesson in instructions will go here.
                <br/><br/>
                Lesson in instructions will go here.
                <br/><br/>
                Lesson in instructions will go here.
                <br/><br/>
                Lesson in instructions will go here.
                <br/><br/>
                Lesson in instructions will go here.
                <br/><br/>
            </div>
        </Tab>
      </Tabs>
    </div>  
  );
}
