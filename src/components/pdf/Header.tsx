import React from 'react';
import { View, Text, Image, StyleSheet } from '@react-pdf/renderer';
import { Logo } from './logo'

interface HeaderProps {
  lessonTitle: string;
}

const styles = StyleSheet.create({
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
  headerSectionRight: {
    alignItems: 'flex-end',
    justifyContent: 'center'
  }
});

export const Header: React.FC<HeaderProps> = ({ lessonTitle }) => {
  return (
    <View style={styles.header} fixed>
      <View style={{...styles.headerSection}}>
        <Logo />
      </View>
      <View style={{...styles.headerSection, ...styles.headerSectionRight}}>
        <Text>{lessonTitle}</Text>
      </View>
    </View>
  );
};

