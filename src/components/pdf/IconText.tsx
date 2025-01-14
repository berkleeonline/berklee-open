import React from 'react';
import { View, Text } from '@react-pdf/renderer';
import { FontAwesomeIcon } from './FontAwesomeIcon';

interface IconTextProps {
  icon: any;
  text: string;
}

export const IconText: React.FC<IconTextProps> = ({ icon, text }) => {
  return (
    <View style={{ display: 'flex', flexDirection: 'row', gap: 3, alignItems: 'center' }}>
      <FontAwesomeIcon 
        faIcon={icon} 
        style={{ color: '#000', width: '10px', height: '11px', paddingTop: '1px' }}
      />
      <Text style={{ fontSize: 11, lineHeight: 1.1 }}>{text}</Text>
    </View>
  );
};