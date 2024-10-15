import React, {useEffect, useState} from 'react';
import { Page, Text, View, Document, StyleSheet, Stop, Svg, G, Path, ClipPath, Defs, LinearGradient, Font } from '@react-pdf/renderer';
import { contentfulClient } from "../../lib/contentful";
import { FontAwesomeIcon } from './FontAwesomeIcon';
import { faSignalBarsStrong, faClock } from '@fortawesome/pro-light-svg-icons';
import { IconText } from './IconText';

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
    fontFamily: 'Nunito Sans'
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
    borderBottomWidth: 4,
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
    fontSize: '16pt',
    fontWeight: 'normal'
  },
  contentContainer: {
    width: '70%'
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
  },
  unorderedList: {
    fontSize: '11pt',
    fontWeight: 300,
    marginBottom: 10,
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

  return (
    <Document>
      <Page size="LETTER" style={styles.page} wrap>
        <View style={styles.header} fixed>
          <View style={styles.headerSection}>
            <Svg xmlns="http://www.w3.org/2000/svg" width="195.323" height="37.841">
              <G data-name="Group 7760">
                <G data-name="Group 7759">
                  <Path fill="#fff" d="m22.109 11.261-8.773 3.193a1.425 1.425 0 0 1-1.912-1.339V0H5.712v29.63a3.21 3.21 0 0 0 4.308 3.017l10.685-3.889v9.083h5.712V14.277a3.21 3.21 0 0 0-4.308-3.017m-1.4 11.181a1.426 1.426 0 0 1-.94 1.339l-7.87 2.864a.354.354 0 0 1-.475-.332v-5.6a.354.354 0 0 1 .233-.333l8.574-3.121a.354.354 0 0 1 .475.332Z" data-name="Path 5378"></Path>
                  <Path fill="#ee243c" d="m20.231 17.263-8.574 3.12a.354.354 0 0 0-.233.333v5.6a.354.354 0 0 0 .475.332l7.869-2.864a1.426 1.426 0 0 0 .937-1.339v-4.85a.354.354 0 0 0-.475-.332" data-name="Path 5379"></Path>
                  <Path fill="#ee243c" d="M10.02 32.647a3.21 3.21 0 0 1-4.308-3.017V0H0v37.841h20.705v-9.083Z" data-name="Path 5380"></Path>
                  <Path fill="#ee243c" d="M11.424 13.115a1.425 1.425 0 0 0 1.913 1.339l8.773-3.193a3.21 3.21 0 0 1 4.308 3.017v23.563h11.419V0H11.424Z" data-name="Path 5381"></Path>
                  <Path fill="#4c5960" d="M62.517 19.037v-.051a3.816 3.816 0 0 0 3.088-3.887c0-3.089-2.471-4.221-5.662-4.221h-6.846v1.467a11.789 11.789 0 0 0 2.033.206v13.8a11.87 11.87 0 0 0-2.033.206v1.467h6.769c3.835 0 6.486-1.389 6.486-4.839 0-2.394-1.725-3.784-3.835-4.144m-5.1-6.409h2.317c2.29 0 3.526.849 3.526 2.728 0 1.9-1.081 2.909-3.577 2.909h-2.265Zm2.368 13.615h-2.368v-6.309h2.5c2.857 0 4.041 1.21 4.041 3.217 0 2.111-1.313 3.089-4.169 3.089" data-name="Path 5382"></Path>
                  <Path fill="#4c5960" d="M73.922 15.331c-3.449 0-5.868 2.574-5.868 6.666 0 3.681 2.11 6.332 5.971 6.332a7.5 7.5 0 0 0 4.349-1.262l-.8-1.545a5.7 5.7 0 0 1-3.166 1.056c-2.6 0-3.989-1.776-4.015-4.684h8.288c.025-.284.051-.9.051-1.21 0-3.268-1.776-5.353-4.813-5.353m-3.449 4.994c.206-2.034 1.416-3.346 3.243-3.346 2.033 0 2.754 1.518 2.754 3.346Z" data-name="Path 5383"></Path>
                  <Path fill="#4c5960" d="M87.41 15.331a3.751 3.751 0 0 0-3.243 2.42h-.052l.1-2.265a37.141 37.141 0 0 0-4.247.206v1.442c.387 0 1.184.025 2.008.1v9.111a11.531 11.531 0 0 0-2.008.206v1.467h6.435v-1.465a15.246 15.246 0 0 0-2.265-.206V19.63c.206-.412 1.312-2.24 2.985-2.24a2.369 2.369 0 0 1 1.133.232l.541-2.033a3.23 3.23 0 0 0-1.39-.258" data-name="Path 5384"></Path>
                  <Path fill="#4c5960" d="m107.251 11.444.129-2.033c-1.828 0-3.577.129-4.3.206v1.467c.387 0 1.184.025 2.008.1v15.162a11.184 11.184 0 0 0-1.982.206v1.467h6.126v-1.467a11.184 11.184 0 0 0-1.982-.206Z" data-name="Path 5385"></Path>
                  <Path fill="#4c5960" d="M115.514 15.331c-3.45 0-5.868 2.574-5.868 6.666 0 3.681 2.11 6.332 5.971 6.332a7.5 7.5 0 0 0 4.349-1.262l-.8-1.545a5.7 5.7 0 0 1-3.165 1.056c-2.6 0-3.989-1.776-4.015-4.684h8.288c.025-.284.051-.9.051-1.21 0-3.268-1.776-5.353-4.812-5.353m-3.45 4.994c.206-2.034 1.416-3.346 3.243-3.346 2.033 0 2.754 1.518 2.754 3.346Z" data-name="Path 5386"></Path>
                  <Path fill="#4c5960" d="M127.536 15.331c-3.449 0-5.868 2.574-5.868 6.666 0 3.681 2.11 6.332 5.971 6.332a7.5 7.5 0 0 0 4.349-1.262l-.8-1.545a5.7 5.7 0 0 1-3.165 1.056c-2.6 0-3.99-1.776-4.015-4.684h8.288c.025-.284.051-.9.051-1.21 0-3.268-1.776-5.353-4.812-5.353m-3.449 4.994c.206-2.034 1.416-3.346 3.243-3.346 2.033 0 2.754 1.518 2.754 3.346Z" data-name="Path 5387"></Path>
                  <Path fill="#4c5960" d="M101.319 26.459a2.215 2.215 0 0 1-1.714-.478 10.239 10.239 0 0 1-1.5-1.932l-2.148-3.365 3.45-3.4a12.527 12.527 0 0 0 1.9-.206v-1.439h-5.868v1.442a10.245 10.245 0 0 0 1.518.206l-4.3 4.38V11.444l.129-2.033c-1.827 0-3.578.129-4.3.206v1.467c.386 0 1.184.025 2.007.1v15.162a11.179 11.179 0 0 0-1.982.206v1.467h5.894v-1.467a8.577 8.577 0 0 0-1.75-.206v-2.418l1.912-1.883 2.153 3.391a9.344 9.344 0 0 0 1.424 1.83 3.721 3.721 0 0 0 2.647.854 6.671 6.671 0 0 0 1.271-.153l-.115-1.56a3.05 3.05 0 0 1-.635.05" data-name="Path 5388"></Path>
                  <G fill="#7b8b96" data-name="Group 7758">
                    <Path d="M154.086 17.908a8.95 8.95 0 0 0-1.874-4.334 7.81 7.81 0 0 0-4.017-2.644 8.817 8.817 0 0 0-2.349-.324 8.071 8.071 0 0 0-5.234 1.682 8.176 8.176 0 0 0-2.327 2.884 9.573 9.573 0 0 0-.973 4.293 9.909 9.909 0 0 0 .542 3.329 8.435 8.435 0 0 0 2.223 3.463 8.12 8.12 0 0 0 5.341 2.132c.116 0 .232.007.35.007a9.673 9.673 0 0 0 1.537-.126 7.767 7.767 0 0 0 3.545-1.509 8.454 8.454 0 0 0 2.983-4.517 10.107 10.107 0 0 0 .253-4.336Zm-2.71 4.3a6.26 6.26 0 0 1-1.927 2.956 5.468 5.468 0 0 1-3.01 1.254 6.463 6.463 0 0 1-2.414-.2 5.233 5.233 0 0 1-2.479-1.55 6.792 6.792 0 0 1-1.613-3.283 8.738 8.738 0 0 1-.191-1.92 7.778 7.778 0 0 1 .818-3.7 5.654 5.654 0 0 1 3.152-2.87 5.927 5.927 0 0 1 1.818-.342c.094 0 .188-.006.281-.006a5.766 5.766 0 0 1 2.573.578 5.355 5.355 0 0 1 2.1 1.839 7.354 7.354 0 0 1 1.195 3.138 8.9 8.9 0 0 1-.303 4.108Z" data-name="Path 5389"></Path>
                    <Path d="m167.967 20.45-.01-.091a6.765 6.765 0 0 0-.876-2.713 4.642 4.642 0 0 0-4.876-2.278 4.369 4.369 0 0 0-2.6 1.352l.075-1.228-.178-.016a25.556 25.556 0 0 0-3.974.218l-.135.037v1.515l1.973.112c.043 1.479.039 13.2 0 14.609a13.6 13.6 0 0 0-1.776.2l-.121.024-.025.12a4.731 4.731 0 0 0 0 1.317l.033.141h6.1v-1.56l-.145-.031a12.735 12.735 0 0 0-1.769-.211l-.073-.005c0-1.492 0-2.984.008-4.481a4.066 4.066 0 0 0 2.309.894 5.166 5.166 0 0 0 4.685-2.042 7.282 7.282 0 0 0 1.455-4.782c0-.371-.041-.742-.08-1.101Zm-8.378-1.447a.556.556 0 0 1 .134-.392 3.55 3.55 0 0 1 2.429-1.368 2.853 2.853 0 0 1 2.956 1.543 4.877 4.877 0 0 1 .537 1.809 13.274 13.274 0 0 1 .064 1.622 5.566 5.566 0 0 1-.638 2.546 2.973 2.973 0 0 1-1.9 1.595 3.4 3.4 0 0 1-.743.116 3.93 3.93 0 0 1-2.2-.5 5.087 5.087 0 0 1-.478-.333l-.156-.116v-1.594q-.001-2.465-.005-4.928Z" data-name="Path 5390"></Path>
                    <Path d="M195.18 26.494a10.823 10.823 0 0 0-1.723-.208l-.106-.007v-6.927a5.153 5.153 0 0 0-.33-1.915 3.163 3.163 0 0 0-2.215-1.974 4.9 4.9 0 0 0-3.716.571 5.643 5.643 0 0 0-1.259 1.121l.078-1.67-.18-.012a21.773 21.773 0 0 0-3.973.243l-.117.046v1.5l.567.017c.485.013.945.025 1.4.083.036 1.08.026 7.876-.011 8.919l-.158.012c-.219.017-.437.033-.656.054l-.136.012a3.522 3.522 0 0 0-.887.155l-.122.044v1.52h6.173v-1.557l-.146-.031a11.211 11.211 0 0 0-1.84-.208v-6.79a.326.326 0 0 1 .039-.214 6.049 6.049 0 0 1 1.477-1.464 3.169 3.169 0 0 1 2.084-.576 1.656 1.656 0 0 1 1.592 1.275 4.412 4.412 0 0 1 .135 1.2q.011 2.664 0 5.328v1.19a.483.483 0 0 1 0 .052 9.4 9.4 0 0 0-1.841.218l-.139.035v1.545h6.153v-1.55Z" data-name="Path 5391"></Path>
                    <Path d="M180.219 20.136a5.867 5.867 0 0 0-.533-2.233 4.225 4.225 0 0 0-2.5-2.312 5.744 5.744 0 0 0-5.343.995 5.9 5.9 0 0 0-1.841 2.91 8.948 8.948 0 0 0-.226 4.047 6.271 6.271 0 0 0 .925 2.422 5.18 5.18 0 0 0 3.762 2.349 8.54 8.54 0 0 0 1.189.085 7.5 7.5 0 0 0 3.895-1.074c.065-.039.128-.081.195-.126l.233-.154-.895-1.693-.237.148-.105.066a4.984 4.984 0 0 1-3.222.922 3.656 3.656 0 0 1-1.8-.574 3.59 3.59 0 0 1-1.37-1.8 6.856 6.856 0 0 1-.372-2.162h8.252v-.71c.002-.379.005-.744-.007-1.106Zm-8.117.039c0-.036.01-.071.016-.105a4.045 4.045 0 0 1 .525-1.478 2.876 2.876 0 0 1 2.228-1.434 3.374 3.374 0 0 1 1.057.036 2.191 2.191 0 0 1 1.506 1.032 3.971 3.971 0 0 1 .508 1.949Z" data-name="Path 5392"></Path>
                  </G>
                </G>
              </G>
            </Svg>
          </View>
          <View style={{...styles.headerSection, ...styles.headerSectionCenter}}>
            <Text style={styles.headerSectionText}>{fields.lesson_title}</Text>
          </View>
          <View style={{...styles.headerSection, ...styles.headerSectionRight}}>
            <Text>{fields.lesson_step}</Text>
          </View>
        </View>
        <View style={{flexGrow: 1}}>
          <View style={{display: 'flex', flexDirection: 'row', gap: 10, marginBottom: 5}}>
            <View style={{width: '65%'}}>
              <Text style={{fontSize: 28, lineHeight: 1.14, marginBottom: 10, fontWeight: 700}}>{fields.lesson_title}</Text>
              <View style={{display: 'flex', flexDirection: 'row', gap: 10, marginBottom: 10}}>  
                <IconText icon={faSignalBarsStrong} text={fields.lesson_audience} />
                <IconText icon={faClock} text={fields.lesson_duration} />
              </View>
              <View style={{display: 'flex', flexDirection: 'row', gap: 10}}>
                {fields.lesson_concepts.map(concept => (
                  <View key={concept.fields.concept_name} style={{backgroundColor: '#eff1f3', paddingHorizontal: 10, paddingVertical: 3, borderRadius: 100}}>
                    <Text style={{fontSize: 10, fontWeight: 'black'}}>{concept.fields.concept_name}</Text>
                  </View>
                ))}
              </View>
            </View>
          </View>
        </View>
      </Page>
      <Page size="LETTER" style={styles.page} wrap>
        <View style={styles.header} fixed>
          <View style={styles.headerSection}>
            <Svg xmlns="http://www.w3.org/2000/svg" width="195.323" height="37.841">
              <G data-name="Group 7760">
                <G data-name="Group 7759">
                  <Path fill="#fff" d="m22.109 11.261-8.773 3.193a1.425 1.425 0 0 1-1.912-1.339V0H5.712v29.63a3.21 3.21 0 0 0 4.308 3.017l10.685-3.889v9.083h5.712V14.277a3.21 3.21 0 0 0-4.308-3.017m-1.4 11.181a1.426 1.426 0 0 1-.94 1.339l-7.87 2.864a.354.354 0 0 1-.475-.332v-5.6a.354.354 0 0 1 .233-.333l8.574-3.121a.354.354 0 0 1 .475.332Z" data-name="Path 5378"></Path>
                  <Path fill="#ee243c" d="m20.231 17.263-8.574 3.12a.354.354 0 0 0-.233.333v5.6a.354.354 0 0 0 .475.332l7.869-2.864a1.426 1.426 0 0 0 .937-1.339v-4.85a.354.354 0 0 0-.475-.332" data-name="Path 5379"></Path>
                  <Path fill="#ee243c" d="M10.02 32.647a3.21 3.21 0 0 1-4.308-3.017V0H0v37.841h20.705v-9.083Z" data-name="Path 5380"></Path>
                  <Path fill="#ee243c" d="M11.424 13.115a1.425 1.425 0 0 0 1.913 1.339l8.773-3.193a3.21 3.21 0 0 1 4.308 3.017v23.563h11.419V0H11.424Z" data-name="Path 5381"></Path>
                  <Path fill="#4c5960" d="M62.517 19.037v-.051a3.816 3.816 0 0 0 3.088-3.887c0-3.089-2.471-4.221-5.662-4.221h-6.846v1.467a11.789 11.789 0 0 0 2.033.206v13.8a11.87 11.87 0 0 0-2.033.206v1.467h6.769c3.835 0 6.486-1.389 6.486-4.839 0-2.394-1.725-3.784-3.835-4.144m-5.1-6.409h2.317c2.29 0 3.526.849 3.526 2.728 0 1.9-1.081 2.909-3.577 2.909h-2.265Zm2.368 13.615h-2.368v-6.309h2.5c2.857 0 4.041 1.21 4.041 3.217 0 2.111-1.313 3.089-4.169 3.089" data-name="Path 5382"></Path>
                  <Path fill="#4c5960" d="M73.922 15.331c-3.449 0-5.868 2.574-5.868 6.666 0 3.681 2.11 6.332 5.971 6.332a7.5 7.5 0 0 0 4.349-1.262l-.8-1.545a5.7 5.7 0 0 1-3.166 1.056c-2.6 0-3.989-1.776-4.015-4.684h8.288c.025-.284.051-.9.051-1.21 0-3.268-1.776-5.353-4.813-5.353m-3.449 4.994c.206-2.034 1.416-3.346 3.243-3.346 2.033 0 2.754 1.518 2.754 3.346Z" data-name="Path 5383"></Path>
                  <Path fill="#4c5960" d="M87.41 15.331a3.751 3.751 0 0 0-3.243 2.42h-.052l.1-2.265a37.141 37.141 0 0 0-4.247.206v1.442c.387 0 1.184.025 2.008.1v9.111a11.531 11.531 0 0 0-2.008.206v1.467h6.435v-1.465a15.246 15.246 0 0 0-2.265-.206V19.63c.206-.412 1.312-2.24 2.985-2.24a2.369 2.369 0 0 1 1.133.232l.541-2.033a3.23 3.23 0 0 0-1.39-.258" data-name="Path 5384"></Path>
                  <Path fill="#4c5960" d="m107.251 11.444.129-2.033c-1.828 0-3.577.129-4.3.206v1.467c.387 0 1.184.025 2.008.1v15.162a11.184 11.184 0 0 0-1.982.206v1.467h6.126v-1.467a11.184 11.184 0 0 0-1.982-.206Z" data-name="Path 5385"></Path>
                  <Path fill="#4c5960" d="M115.514 15.331c-3.45 0-5.868 2.574-5.868 6.666 0 3.681 2.11 6.332 5.971 6.332a7.5 7.5 0 0 0 4.349-1.262l-.8-1.545a5.7 5.7 0 0 1-3.165 1.056c-2.6 0-3.989-1.776-4.015-4.684h8.288c.025-.284.051-.9.051-1.21 0-3.268-1.776-5.353-4.812-5.353m-3.45 4.994c.206-2.034 1.416-3.346 3.243-3.346 2.033 0 2.754 1.518 2.754 3.346Z" data-name="Path 5386"></Path>
                  <Path fill="#4c5960" d="M127.536 15.331c-3.449 0-5.868 2.574-5.868 6.666 0 3.681 2.11 6.332 5.971 6.332a7.5 7.5 0 0 0 4.349-1.262l-.8-1.545a5.7 5.7 0 0 1-3.165 1.056c-2.6 0-3.99-1.776-4.015-4.684h8.288c.025-.284.051-.9.051-1.21 0-3.268-1.776-5.353-4.812-5.353m-3.449 4.994c.206-2.034 1.416-3.346 3.243-3.346 2.033 0 2.754 1.518 2.754 3.346Z" data-name="Path 5387"></Path>
                  <Path fill="#4c5960" d="M101.319 26.459a2.215 2.215 0 0 1-1.714-.478 10.239 10.239 0 0 1-1.5-1.932l-2.148-3.365 3.45-3.4a12.527 12.527 0 0 0 1.9-.206v-1.439h-5.868v1.442a10.245 10.245 0 0 0 1.518.206l-4.3 4.38V11.444l.129-2.033c-1.827 0-3.578.129-4.3.206v1.467c.386 0 1.184.025 2.007.1v15.162a11.179 11.179 0 0 0-1.982.206v1.467h5.894v-1.467a8.577 8.577 0 0 0-1.75-.206v-2.418l1.912-1.883 2.153 3.391a9.344 9.344 0 0 0 1.424 1.83 3.721 3.721 0 0 0 2.647.854 6.671 6.671 0 0 0 1.271-.153l-.115-1.56a3.05 3.05 0 0 1-.635.05" data-name="Path 5388"></Path>
                  <G fill="#7b8b96" data-name="Group 7758">
                    <Path d="M154.086 17.908a8.95 8.95 0 0 0-1.874-4.334 7.81 7.81 0 0 0-4.017-2.644 8.817 8.817 0 0 0-2.349-.324 8.071 8.071 0 0 0-5.234 1.682 8.176 8.176 0 0 0-2.327 2.884 9.573 9.573 0 0 0-.973 4.293 9.909 9.909 0 0 0 .542 3.329 8.435 8.435 0 0 0 2.223 3.463 8.12 8.12 0 0 0 5.341 2.132c.116 0 .232.007.35.007a9.673 9.673 0 0 0 1.537-.126 7.767 7.767 0 0 0 3.545-1.509 8.454 8.454 0 0 0 2.983-4.517 10.107 10.107 0 0 0 .253-4.336Zm-2.71 4.3a6.26 6.26 0 0 1-1.927 2.956 5.468 5.468 0 0 1-3.01 1.254 6.463 6.463 0 0 1-2.414-.2 5.233 5.233 0 0 1-2.479-1.55 6.792 6.792 0 0 1-1.613-3.283 8.738 8.738 0 0 1-.191-1.92 7.778 7.778 0 0 1 .818-3.7 5.654 5.654 0 0 1 3.152-2.87 5.927 5.927 0 0 1 1.818-.342c.094 0 .188-.006.281-.006a5.766 5.766 0 0 1 2.573.578 5.355 5.355 0 0 1 2.1 1.839 7.354 7.354 0 0 1 1.195 3.138 8.9 8.9 0 0 1-.303 4.108Z" data-name="Path 5389"></Path>
                    <Path d="m167.967 20.45-.01-.091a6.765 6.765 0 0 0-.876-2.713 4.642 4.642 0 0 0-4.876-2.278 4.369 4.369 0 0 0-2.6 1.352l.075-1.228-.178-.016a25.556 25.556 0 0 0-3.974.218l-.135.037v1.515l1.973.112c.043 1.479.039 13.2 0 14.609a13.6 13.6 0 0 0-1.776.2l-.121.024-.025.12a4.731 4.731 0 0 0 0 1.317l.033.141h6.1v-1.56l-.145-.031a12.735 12.735 0 0 0-1.769-.211l-.073-.005c0-1.492 0-2.984.008-4.481a4.066 4.066 0 0 0 2.309.894 5.166 5.166 0 0 0 4.685-2.042 7.282 7.282 0 0 0 1.455-4.782c0-.371-.041-.742-.08-1.101Zm-8.378-1.447a.556.556 0 0 1 .134-.392 3.55 3.55 0 0 1 2.429-1.368 2.853 2.853 0 0 1 2.956 1.543 4.877 4.877 0 0 1 .537 1.809 13.274 13.274 0 0 1 .064 1.622 5.566 5.566 0 0 1-.638 2.546 2.973 2.973 0 0 1-1.9 1.595 3.4 3.4 0 0 1-.743.116 3.93 3.93 0 0 1-2.2-.5 5.087 5.087 0 0 1-.478-.333l-.156-.116v-1.594q-.001-2.465-.005-4.928Z" data-name="Path 5390"></Path>
                    <Path d="M195.18 26.494a10.823 10.823 0 0 0-1.723-.208l-.106-.007v-6.927a5.153 5.153 0 0 0-.33-1.915 3.163 3.163 0 0 0-2.215-1.974 4.9 4.9 0 0 0-3.716.571 5.643 5.643 0 0 0-1.259 1.121l.078-1.67-.18-.012a21.773 21.773 0 0 0-3.973.243l-.117.046v1.5l.567.017c.485.013.945.025 1.4.083.036 1.08.026 7.876-.011 8.919l-.158.012c-.219.017-.437.033-.656.054l-.136.012a3.522 3.522 0 0 0-.887.155l-.122.044v1.52h6.173v-1.557l-.146-.031a11.211 11.211 0 0 0-1.84-.208v-6.79a.326.326 0 0 1 .039-.214 6.049 6.049 0 0 1 1.477-1.464 3.169 3.169 0 0 1 2.084-.576 1.656 1.656 0 0 1 1.592 1.275 4.412 4.412 0 0 1 .135 1.2q.011 2.664 0 5.328v1.19a.483.483 0 0 1 0 .052 9.4 9.4 0 0 0-1.841.218l-.139.035v1.545h6.153v-1.55Z" data-name="Path 5391"></Path>
                    <Path d="M180.219 20.136a5.867 5.867 0 0 0-.533-2.233 4.225 4.225 0 0 0-2.5-2.312 5.744 5.744 0 0 0-5.343.995 5.9 5.9 0 0 0-1.841 2.91 8.948 8.948 0 0 0-.226 4.047 6.271 6.271 0 0 0 .925 2.422 5.18 5.18 0 0 0 3.762 2.349 8.54 8.54 0 0 0 1.189.085 7.5 7.5 0 0 0 3.895-1.074c.065-.039.128-.081.195-.126l.233-.154-.895-1.693-.237.148-.105.066a4.984 4.984 0 0 1-3.222.922 3.656 3.656 0 0 1-1.8-.574 3.59 3.59 0 0 1-1.37-1.8 6.856 6.856 0 0 1-.372-2.162h8.252v-.71c.002-.379.005-.744-.007-1.106Zm-8.117.039c0-.036.01-.071.016-.105a4.045 4.045 0 0 1 .525-1.478 2.876 2.876 0 0 1 2.228-1.434 3.374 3.374 0 0 1 1.057.036 2.191 2.191 0 0 1 1.506 1.032 3.971 3.971 0 0 1 .508 1.949Z" data-name="Path 5392"></Path>
                  </G>
                </G>
              </G>
            </Svg>
          </View>
          <View style={{...styles.headerSection, ...styles.headerSectionCenter}}>
            <Text style={styles.headerSectionText}>{fields.lesson_title}</Text>
          </View>
          <View style={{...styles.headerSection, ...styles.headerSectionRight}}>
            <Text>{fields.lesson_step}</Text>
          </View>
        </View>
        <View style={{flexGrow: 1}}>
          {/* Start Lesson section */}
          <View>
            <View>
              <Text style={{fontWeight: 900, fontSize: '19pt', marginBottom: 10}}>Running the Lesson {instructions.length}</Text>
            </View>

            <View style={{backgroundColor: '#eff1f3', borderRadius: '100%', flexDirection: 'row', marginBottom: 15}}>
                <View style={{width: '70%'}}>
                  <Text style={{fontSize: '11pt', fontWeight: 900, padding: 10, paddingLeft: 15, borderRight: '1', borderColor: '#fff'}}>Lesson Breakdown</Text>
                </View>
                <View style={{width: '25%'}}>
                  <Text style={{fontSize: '11pt', fontWeight: 900, padding: 10, paddingLeft: 15}}>Notes</Text>
                </View>
            </View>

            <View style={styles.sectionContainer}>
              {instructions.map((instruction, instructionIndex) => {
                return (
                  <View key={instructionIndex} style={styles.contentContainer}>
                    <View key={instructionIndex}>
                      <Text style={{fontWeight: 700, marginBottom: 15}}>{instruction.fields.instruction_title}</Text>
                    </View>
                    <View>
                      {instruction?.fields?.instruction_content?.content?.map((contentItem, contentIndex) => {
                        switch (contentItem.nodeType) {
                          case 'paragraph':
                            return (
                              <Text key={contentIndex} style={styles.paragraph}>
                                {contentItem.content.map((textItem, textIndex) => textItem.value).join('')}
                              </Text>
                            );
                          case 'heading-3':
                            return (
                              <Text key={contentIndex} style={styles.heading3}>
                                {contentItem.content.map((textItem, textIndex) => textItem.value).join('')}
                              </Text>
                            );
                          case 'heading-4':
                            return (
                              <Text key={contentIndex} style={styles.heading4}>
                                {contentItem.content.map((textItem, textIndex) => textItem.value).join('')}
                              </Text>
                            );
                          case 'ordered-list':
                            return (
                              <View key={contentIndex} style={styles.orderedList}>
                                {contentItem.content.map((listItem, listIndex) => (
                                  <View style={{flexDirection: 'row'}}>
                                    <View style={{width: 15}}>
                                      <Text key={listIndex} style={styles.listItem}>
                                        {`${listIndex + 1}.`}
                                      </Text>
                                    </View>
                                    <View>
                                      <Text key={listIndex} style={styles.listItem}>
                                        {`${listItem.content[0].content[0].value}`}
                                      </Text>
                                    </View>
                                  </View>
                                ))}
                              </View>
                            );
                          case 'unordered-list':
                            return (
                              <View key={contentIndex} style={styles.unorderedList}>
                                {contentItem.content.map((listItem, listIndex) => (
                                  <View style={{flexDirection: 'row'}}>
                                    <View style={{width: 15}}>
                                      <Text key={listIndex} style={{textAlign: 'center'}}>
                                        &middot;
                                      </Text>
                                    </View>
                                    <View>
                                      <Text key={listIndex} style={styles.listItem}>
                                        {`${listItem.content[0].content[0].value}`}
                                      </Text>
                                    </View>
                                  </View>
                                ))}
                              </View>
                            );
                          case 'hr':
                            return <View key={contentIndex} style={styles.hr} />;
                          default:
                            return null;
                        }
                      })}
                    </View>
                  </View>
                );
              })}
            </View>
          </View>
          {/* End Prep section */}
        </View>
      </Page>
    </Document>
  );
};