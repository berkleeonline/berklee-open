import React from 'react';
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';
import { Rendering } from './Rendering'; 
import { FontAwesomeIcon } from './FontAwesomeIcon'; 

import {
  faCompass,
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
  faQuestionCircle,
  faCircleDot,
} from '@fortawesome/pro-light-svg-icons';

const styles = StyleSheet.create({
  h3: {
    fontSize: 14,
    fontWeight: 900
  }
});

export const Details = ({
  lesson_outcome,
  lesson_sticking_points,
  lesson_evidence,
  lesson_prerequisites,
  lesson_outline,
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
        <View style={{flexDirection: 'row', marginBottom: 20}}>
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
      {lesson_repertoire.content && (
        <View style={{flexDirection: 'row', marginBottom: 20}}>
          <View style={{width: 20, marginRight: 10}}>
            <FontAwesomeIcon faIcon={faMusic} />
          </View>
          <View style={{flexGrow: 1}}>
            <View style={{marginBottom: 5}}>
              <Text style={styles.h3}>Repertoire</Text>
            </View>
            <Rendering content={lesson_repertoire.content} />
          </View>
        </View>
      )}
    </View>
  );
};
