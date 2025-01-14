import React from 'react';
import { View, Text, StyleSheet } from '@react-pdf/renderer';
import { Logo } from './Logo'

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
  logoSection: {
    flexGrow: 1,
    width: '33.33%'
  },
  headerSection: {
    flexGrow: 1,
    width: '60%'
  },
  headerSectionRight: {
    alignItems: 'flex-end',
    justifyContent: 'center'
  }
});

export const Header: React.FC<HeaderProps> = ({ lessonTitle }) => {
  return (
    <View style={styles.header} fixed>
      <View style={{...styles.logoSection}}>
        <Logo />
      </View>
      <View style={{...styles.headerSection, ...styles.headerSectionRight}}>
        <Text style={{paddingTop: 2, fontSize: 14}}>{lessonTitle}</Text>
      </View>
    </View>
  );
};

