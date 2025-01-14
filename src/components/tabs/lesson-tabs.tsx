import React from 'react';
import { Tabs, Tab } from '@nextui-org/react';
import { IconHeader } from '../../elements/IconHeader';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { documentToHtmlString } from '@contentful/rich-text-html-renderer';

import {
  faCompass,
  faStar,
  faImages,
  faGuitar,
  faFiles,
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
  faQuestionCircle,
  faNotebook,
  faChess,
  faSealQuestion,
  faCircleStar,
  faLayerGroupPlus,
  faFileCircleInfo
} from '@fortawesome/pro-light-svg-icons';
import styles from '../../pages/lessons/_lesson.module.scss';

// Materials get an icon assigned manually. Add as needed here.
const materialIcons = {
  Handouts: faFiles,
  Keyboard: faPianoKeyboard,
  Images: faImages,
  'Audio / Video': faPhotoFilmMusic,
  'Unpitched Instrument': faDrum,
  'Pitched Instrument': faGuitar,
  'Audio Examples' : faMusic,
  Metronome: faTriangleInstrument,
  // Add more mappings as needed
};

export const LessonTabs = ({
  lesson_outcome,
  lesson_sel,
  lesson_extension,
  lesson_accessibility,
  lesson_sticking_points,
  lesson_evidence,
  lesson_prerequisites,
  lesson_outline,
  lesson_essential_questions,
  lesson_prep,
  lesson_materials,
  lesson_repertoire,
  lesson_sections,
  lesson_standards,
  lesson_terms,
}) => {
  const renderSlideReferences = (slideRefs) => {
    if (!slideRefs || !Array.isArray(slideRefs) || slideRefs.length === 0) {
      return null;
    }

    return (
      <div>
        Slides referenced: {slideRefs.map((slide, index) => {
          // Check if slide is an object with sys and fields properties
          if (slide && slide.sys && slide.fields) {
            return (
              <span key={slide.sys.id}>
                {slide.fields.slide_number || 'Missing slide number assignment'}
                {index < slideRefs.length - 1 ? ', ' : ''}
              </span>
            );
          }
          // If it's just a string or number, render it directly
          return <span key={index}>{slide}{index < slideRefs.length - 1 ? ', ' : ''}</span>;
        })}
      </div>
    );
  };


  return (
    <div className="flex w-full flex-col relative tab-container">
      <Tabs
        aria-label="Options"
        variant="underlined"
        classNames={{
          base: "sticky top-16 bg-white z-10",
          tabList: 'gap-6 w-full relative rounded-none p-0 border-b border-divider',
          cursor: 'w-full bg-[#ee243c]',
          tab: 'max-w-fit px-0 h-12',
          tabContent: 'group-data-[selected=true]:text-[#000]',
        }}
      >
        <Tab key="overview" title="Overview" className="text-medium tracking-wider font-bold">
          <div className="pt-10 tracking-normal font-normal">
              
              <div className="mb-8 pb-8 border-b">
                {lesson_standards && lesson_standards.content.length > 0 && (
                  <>
                  <IconHeader headerId="lessonStandards" icon={faCircleStar} label="Standards and Competencies" />
                  <div className={` ${styles.richContentInnerStyles}`} dangerouslySetInnerHTML={{ __html: documentToHtmlString(lesson_standards) }}></div>
                  </>
                )}
                {lesson_sel && lesson_sel.length > 0 && (
                  <div className={`mt-8 ${styles.richContentInnerStyles}`}>
                    <h3 className="font-bold text-lg mb-4">Social-emotional Learning</h3>
                    <div className="grid grid-cols-2 gap-2">
                      {lesson_sel.map((sel, index) => (
                        <div key={index} className="mb-1 flex flex-row items-center">
                          <FontAwesomeIcon icon={faStar} className="mr-3 w-4 h-4 text-center" />
                          {sel}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {lesson_prerequisites && lesson_prerequisites.content.length > 0 && (
                <div className="mb-8 pb-8 border-b">
                  <IconHeader headerId="lessonPrerequisites" icon={faSquareCheck} label="Prerequisites" />

                  {lesson_prerequisites.content.map((item, index) => {
                    if (item.nodeType === 'unordered-list') {
                      return (
                        <ul className="list-disc list-outside ml-10 pl-4" key={index}>
                          {item.content.map((listItem, idx) => {
                            if (listItem.nodeType === 'list-item') {
                              const paragraph = listItem.content[0];
                              if (paragraph.nodeType === 'paragraph') {
                                return (
                                  <li className="pb-3" key={idx}>
                                    {paragraph.content.map((contentItem, contentIdx) => {
                                      if (contentItem.nodeType === 'text') {
                                        return <span key={contentIdx}>{contentItem.value}</span>;
                                      } else if (contentItem.nodeType === 'embedded-entry-inline') {
                                        const embeddedEntry = contentItem.data.target;
                                        
                                        // Check if the embedded entry is null
                                        if (!embeddedEntry) {
                                          return <span key={contentIdx}>No link available</span>;
                                        }
                                        
                                        // Check if embedded entry has sys and fields data
                                        return (
                                          <span key={contentIdx}>
                                            <strong>Prerequisite lesson:</strong>{' '}
                                            {embeddedEntry.sys?.id ? (
                                              <a href={`/lessons/${embeddedEntry.sys.id}`} target="_blank" rel="noopener noreferrer" className="underline hover:no-underline">
                                                {embeddedEntry.fields?.lesson_title || 'Related Content'}
                                              </a>
                                            ) : (
                                              'No link available'
                                            )}
                                          </span>
                                        );
                                      }
                                      return null;
                                    })}
                                  </li>
                                );
                              }
                            }
                            return null;
                          })}
                        </ul>
                      );
                    }
                    return null;
                  })}
                </div>
              )}

            {lesson_outcome && lesson_outcome.content.length > 0 && (
              <div className="mb-8 pb-8 border-b">
                <IconHeader headerId="learningOutcomes" icon={faSeedling} label="Learning Outcomes" />
                <h4 className="text-md font-bold pl-10 mb-2">Upon completion of this lesson, students will be able to:</h4>
                <ul className="list-disc list-outside ml-10 pl-4">
                  {lesson_outcome.content?.map((outcome, index) => outcome.nodeType === 'unordered-list' &&
                      outcome.content.map((item, idx) => <li className="pt-3" key={idx}>{item.content[0].content[0].value}</li>))}
                </ul>
              </div>
            )}

            {lesson_terms && lesson_terms.length > 0 && (
              <div className="mb-8 pb-8 border-b">
                <IconHeader headerId="lessonDefinitions" icon={faNotebook} label="Definitions" />
                <ul className="list-disc list-outside ml-10 pl-4">
                  {lesson_terms
                  ?.filter(term => term && term.fields) // Only include valid terms
                  .map((term, index) => (
                    <li className="pt-3" key={index}>
                      <strong>{term.fields.term_name}</strong>
                      {term.fields.term_definition && (
                        <span
                          className={`${styles.richContentInnerStyles}`}
                          dangerouslySetInnerHTML={{
                            __html: documentToHtmlString(term.fields.term_definition),
                          }}
                        />
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {lesson_outline && lesson_outline.content.length > 0 && (
              <div className="mb-8 pb-8 border-b">
                <IconHeader headerId="lessonOutline" icon={faCompass} label="Lesson Outline" />
                <ol className="list-decimal list-outside ml-10 pl-4">
                  {lesson_outline.content?.map((outline, index) => outline.nodeType === 'ordered-list' &&
                      outline.content.map((item, idx) => <li className="pt-3" key={idx}>{item.content[0].content[0].value}</li>))}
                </ol>
              </div>
            )}

            {lesson_essential_questions && lesson_essential_questions.length > 0 && (
              <div className="mb-8 pb-8 border-b">
                <IconHeader headerId="lessonEssentialQuestions" icon={faSealQuestion} label="Essential Questions" />
                <ol className="list-decimal list-outside ml-10 pl-4">
                  {lesson_essential_questions?.map((question, index) => (
                    <li className="pt-3" key={index}>
                      {question.fields?.question}
                    </li>
                  ))}
                </ol>
              </div>
            )}

            {(lesson_prep || lesson_materials.length > 0) && (
              <div className="mb-8 pb-8 border-b">
                <IconHeader headerId="lessonMaterials" icon={faChalkboard} label="Materials" />

                {lesson_materials.length > 0 && (
                  <div className={`${styles.richContentInnerStyles}`}>
                    <div className="grid grid-cols-2 gap-2">
                      {lesson_materials?.map((material, index) => (
                        <div key={index} className="mb-1 flex flex-row items-center">
                          <FontAwesomeIcon icon={materialIcons[material] || faQuestionCircle} className="mr-3 w-4 h-4 text-center" />
                          {material}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {lesson_prep && lesson_prep.content.length > 0 && (
                  <div className={`mb-7 ${styles.richContentInnerStyles}`} dangerouslySetInnerHTML={{ __html: documentToHtmlString(lesson_prep) }}></div>
                )}
              </div>
            )}

            {lesson_repertoire && lesson_repertoire.content.length > 0 && (
              <div className="mb-8 pb-8 border-b">
                <IconHeader headerId="lessonRepertoire" icon={faMusic} label="Repertoire" />
                <div className={` ${styles.richContentInnerStyles}`} dangerouslySetInnerHTML={{ __html: documentToHtmlString(lesson_repertoire) }}></div>
              </div>
            )}

            {lesson_evidence && lesson_evidence.content.length > 0 && (
              <div className="mb-8 pb-8 border-b">
                <IconHeader headerId="lessonEvidence" icon={faMusicMagnifyingGlass} label="Evidence of Learning" />
                <div className={`${styles.richContentInnerStyles}`} dangerouslySetInnerHTML={{ __html: documentToHtmlString(lesson_evidence) }}></div>
              </div>
            )}
          </div>
        </Tab>
        <Tab key="instructions" title="Instructions" className="tab-panel-instructions text-medium tracking-wider font-bold">
          <div className="tracking-normal font-normal">
            {lesson_sections && lesson_sections.length > 0 ? (
              <div className="mb-12 pl-0 pt-10">
                {lesson_sections.map((section, sectionIndex) => (
                  <div key={sectionIndex} className="mb-6">
                    <div className="mb-7">
                      {section.fields.interactiveContent && Array.isArray(section.fields.interactiveContent) 
                        ? section.fields.interactiveContent.map((instruction, idx) => (
                            <div key={idx} className="pb-6 mb-6 border-b-1 border-slate-300">
                              <IconHeader headerId="lessonEvidence" icon={faFileCircleInfo} label={instruction.fields.instruction_title} />
                              <div className={`mb-7 ${styles.instructionInnerStyles}`}>
                                {instruction.fields.slide_ref && instruction.fields.slide_ref.length > 0 && (
                                  <div className="text-sm">
                                    {renderSlideReferences(instruction.fields.slide_ref)}
                                  </div>
                                )}
                                <div className="mb-3" dangerouslySetInnerHTML={{ __html: documentToHtmlString(instruction.fields.instruction_content) }}></div>
                              </div>
                            </div>
                          ))
                        : <p>No interactive content available for this section</p>
                      }
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p>No lesson sections available</p>
            )}
          </div>
        </Tab>
        <Tab key="differentiated-strategies" title="Strategies" className="text-medium tracking-wider font-bold">
          <div className="pt-10 tracking-normal font-normal">
            
          {lesson_sticking_points && lesson_sticking_points.content.length > 0 && (
              <div className="mb-16">
                <IconHeader headerId="lessonSticking" icon={faTrafficCone} label="Sticking Points" />
                <div className={`mb-7 ${styles.richContentInnerStyles}`} dangerouslySetInnerHTML={{ __html: documentToHtmlString(lesson_sticking_points) }}></div>
              </div>
            )}

            {lesson_accessibility && lesson_accessibility.content.length > 0 && (
              <div className="mb-16">
                <IconHeader headerId="lessonAccessibility" icon={faChess} label="Accessibile Strategies" />
                <div className={`mb-7 ${styles.richContentInnerStyles}`} dangerouslySetInnerHTML={{ __html: documentToHtmlString(lesson_accessibility) }}></div>
              </div>
            )}

            {lesson_extension && lesson_extension.content.length > 0 && (
              <div className="mb-16">
                <IconHeader headerId="lessonExtension" icon={faLayerGroupPlus} label="Extension Strategies" />
                <div className={`mb-7 ${styles.richContentInnerStyles}`} dangerouslySetInnerHTML={{ __html: documentToHtmlString(lesson_extension) }}></div>
              </div>
            )}
          </div>
        </Tab>
      </Tabs>
    </div>
  );
};
