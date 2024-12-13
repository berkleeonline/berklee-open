import React from 'react';
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';
import { Rendering } from './Rendering'; 
import { FontAwesomeIcon } from './FontAwesomeIcon'; 

import {
  faStar,
  faFiles,
  faPianoKeyboard,
  faPhotoFilmMusic,
  faDrum,
  faTriangleInstrument,
  faMusicMagnifyingGlass,
  faMusic,
  faImages,
  faGuitar,
  faSeedling,
  faChalkboard,
  faQuestionCircle,
} from '@fortawesome/pro-light-svg-icons';

const styles = StyleSheet.create({
  h3: {
    fontSize: 14,
    fontWeight: 900
  },
  h4: {
    fontSize: 12,
    fontWeight: 900
  }
});

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

export const Details = ({
  lesson_outcome,
  lesson_evidence,
  lesson_essential_questions,
  lesson_prep,
  lesson_materials,
  lesson_repertoire,
}) => {
  return (
    <View>
      {lesson_essential_questions?.content && (
        <View style={{flexDirection: 'row', marginBottom: 20}}>
          <View style={{width: 20, marginRight: 10}}>
            <FontAwesomeIcon faIcon={faStar} />
          </View>
          <View style={{flexGrow: 1}}>
            <View style={{marginBottom: 5}}>
              <Text style={styles.h3}>Material Preparation</Text>
            </View>
            <Rendering content={lesson_essential_questions.content} />
          </View>
        </View>
      )}
      {lesson_outcome.content && (
        <View style={{flexDirection: 'row'}}>
          <View style={{width: 20, marginRight: 10}}>
            <FontAwesomeIcon faIcon={faSeedling} />
          </View>
          <View style={{flexGrow: 1}}>
            <View style={{marginBottom: 5}}>
              <Text style={styles.h3}>Learning Outcomes</Text>
              <Text style={{fontSize: 11, fontWeight: 700}}>Upon completion of this lesson, students will be able to:</Text>
            </View>
            <Rendering content={lesson_outcome.content} />
          </View>
        </View>
      )}
      {(lesson_prep || lesson_materials.length > 0) && (
        <View style={{flexDirection: 'row', marginBottom: 20}}>
          <View style={{width: 20, marginRight: 10}}>
            <FontAwesomeIcon faIcon={faChalkboard} />
          </View>
          <View style={{flexGrow: 1}}>
            <View style={{marginBottom: 5}}>
              <Text style={styles.h3}>Materials</Text>
            </View>
            {lesson_materials.length > 0 && (
              <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 15, marginBottom: 20 }}>
                {lesson_materials.map((material, index) => (
                  <View key={index} style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <View style={{width: 12, marginRight: 10}}>
                      <FontAwesomeIcon faIcon={materialIcons[material] || faQuestionCircle} />
                    </View>
                    <Text style={{fontSize: 12, lineHeight: '1.3'}}>{material}</Text>
                  </View>
                ))}
              </View>
            )}
            {lesson_prep && lesson_prep.content.length > 0 && (
              <View style={{ marginBottom: 15 }}>
                <Rendering content={lesson_prep.content} />
              </View>
            )}
          </View>
        </View>
      )}
      {lesson_evidence?.content && (
        <View style={{flexDirection: 'row', marginBottom: 20}}>
          <View style={{width: 20, marginRight: 10}}>
            <FontAwesomeIcon faIcon={faMusicMagnifyingGlass} />
          </View>
          <View style={{flexGrow: 1}}>
            <View style={{marginBottom: 5}}>
              <Text style={styles.h3}>Evidence of Learning</Text>
            </View>
            <Rendering content={lesson_evidence.content} />
          </View>
        </View>
      )}
    </View>
  );
};
