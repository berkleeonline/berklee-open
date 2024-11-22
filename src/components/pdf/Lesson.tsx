import React from 'react';
import { Page, Text, View, Document, StyleSheet, Svg, G, Path, Font, Image } from '@react-pdf/renderer';
import { faSignalBarsStrong, faClock } from '@fortawesome/pro-light-svg-icons';
import { IconText } from './IconText';
import { Details } from './Details';
import { Rendering } from './Rendering';
import { Header } from './Header';
import { Footer } from './Footer';
import { FontAwesomeIcon } from './FontAwesomeIcon';

import {
  faScroll,
  faNoteSticky,
} from '@fortawesome/pro-light-svg-icons';

Font.register({ family: 'Nunito Sans', fonts: [{
    src: 'src/components/pdf/fonts/nunito-sans/NunitoSans_10pt-Regular.ttf'
}, {
    src: 'src/components/pdf/fonts/nunito-sans/NunitoSans_10pt-ExtraBold.ttf'
}] });

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: 'transparent',
    margin: 0,
    padding: 36,
    fontFamily: 'Nunito Sans',
    lineHeight: 1.5
  },
  section: {
    margin: 0,
    padding: 0,
    flexGrow: 1
  },
  header: {
    borderImage: 'linear-gradient(to right, #000, #fff) 1',
    flexDirection: 'row',
    marginBottom: 20,
    paddingBottom: 10,
    borderBottomWidth: 2,
    borderBottomColor: '#000',
  },
  headerSection: {
    flexGrow: 1,
    width: '33.33%'
  },
  headerSectionCenter: {
    flexGrow: 1,
    width: '33.33%',
    textAlign: 'center',
    justifyContent: 'center'
  },
  headerSectionRight: {
    alignItems: 'flex-end',
    justifyContent: 'center'
  },
  headerSectionText: {
    fontSize: '10pt',
    fontWeight: 'normal'
  },
  contentContainer: {
    width: '65%'
  },
  paragraph: {
    fontSize: '11pt',
    fontWeight: 300,
    marginBottom: 10,
  },
  orderedList: {
    fontSize: '11pt',
    fontWeight: 300,
    marginBottom: 10,
    lineHeight: 1.2
  },
  unorderedList: {
    fontSize: '11pt',
    fontWeight: 300,
    marginBottom: 10,
    lineHeight: 1.2
  },
  heading3: {
    fontSize: '14pt',
    fontWeight: 700
  },
  heading4: {
    fontSize: '11pt',
    fontWeight: 700
  }
});

// Define the props interface
interface LessonPDFProps {
  fields: {
    lesson_title?: string;
    lesson_summary?: string;
  };
  sections: Array<{
    fields: {
      title?: string;
      content?: string;
    };
  }>;
}

// Update the component to accept props
// Update the component to accept props
export const Lesson: React.FC<LessonPDFProps> = ({ fields, sections }) => {
  const instructions = sections[0].fields.instructions;

  const {
    lesson_outline,
    lesson_summary,
    lesson_materials,
    lesson_essential_questions,
    lesson_repertoire,
    lesson_prep,
    lesson_sticking_points,
    lesson_evidence,
    lesson_outcome,
    lesson_prerequisites,
  } = fields;

  return (
    <Document>
      <Page size="LETTER" style={styles.page} wrap>
        <Header lessonTitle={fields.lesson_title} />
          <View style={{flexGrow: 1}}>
            <View style={{display: 'flex', flexDirection: 'row', gap: 10, marginBottom: 15}}>
              <View style={{width: '90%'}}>
                <Text style={{fontSize: 24, lineHeight: 1.14, marginBottom: 10, fontWeight: 700, hyphenateLimitChars: '6 8 2'}}>{fields.lesson_title}</Text>
                <View style={{display: 'flex', flexDirection: 'row', gap: 10, marginBottom: 10}}>  
                  <IconText icon={faSignalBarsStrong} text={fields.lesson_audience} />
                  <IconText icon={faClock} text={fields.lesson_duration} />
                </View>
                <View style={{display: 'flex', flexDirection: 'row', marginBottom: 5, gap: 10, width: "100%"}}>
                  <Rendering content={lesson_summary.content} />
                </View>
                <View style={{display: 'flex', flexDirection: 'row', marginBottom: 10, gap: 10}}>
                  {fields.lesson_concepts.map(concept => (
                    <View key={concept.fields.concept_name} style={{backgroundColor: '#eff1f3', paddingHorizontal: 10, paddingVertical: 3, borderRadius: 100}}>
                      <Text style={{fontSize: 10, fontWeight: 'black'}}>{concept.fields.concept_name}</Text>
                    </View>
                  ))}
                </View>
              </View>
            </View>
            <View style={{width: '90%'}}>
              <Details 
                  lesson_outcome={lesson_outcome}
                  lesson_outline={lesson_outline}
                  lesson_essential_questions={lesson_essential_questions}
                  lesson_repertoire={lesson_repertoire}
                  lesson_prep={lesson_prep}
                  lesson_materials={lesson_materials}
                  lesson_sticking_points={lesson_sticking_points}
                  lesson_evidence={lesson_evidence}
                  lesson_prerequisites={lesson_prerequisites}
                />
            </View>
            <View style={{flexGrow: 1}}>
              <View fixed>
                <View style={{backgroundColor: '#fbd3d7', borderRadius: '100%', flexDirection: 'row', marginBottom: 15}}>
                    <View style={{width: '70%', display: "flex", flexDirection: "row", alignItems: "left", paddingHorizontal: 10, borderRight: '1', borderColor: '#f8949d'}}>
                      <FontAwesomeIcon faIcon={faScroll}  style={{ width: 15, marginRight: 8, marginLeft: 5 }} />
                      <Text style={{fontSize: '11pt', fontWeight: 900, padding: 8, paddingLeft: 0}}>Lesson Breakdown</Text>
                    </View>
                    <View style={{ width: '25%', display: "flex", flexDirection: "row", alignItems: "center", paddingHorizontal: 10 }}>
                      <FontAwesomeIcon faIcon={faNoteSticky} style={{ width: 13, marginRight: 8, marginLeft: 5 }} />
                      <Text style={{ fontSize: '11pt', fontWeight: 900  }}>Notes</Text>
                    </View>
                </View>
              </View>
              {instructions.map((instruction, instructionIndex) => {
                return (
                  <View>
                    <View key={instructionIndex} style={styles.contentContainer}>
                      <View key={instructionIndex}>
                        <Text style={{fontWeight: 700, marginBottom: 15}}>{instruction.fields.instruction_title}</Text>
                      </View>
                      <View>
                        {instruction?.fields?.instruction_content?.content && (
                          <Rendering content={instruction.fields.instruction_content.content} />
                        )}
                      </View>
                    </View>
                  </View>
                );
              })}
            </View>
          </View>
        <Footer />
      </Page>
    </Document>
  );
};