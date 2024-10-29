import React from 'react';
import { View, Text } from '@react-pdf/renderer';

export const Footer: React.FC = () => {
  return (
    <View>
      <View>
        <Text style={{fontSize: 10}}>Copyright 2001 - {new Date().getFullYear()} Berklee College of Music</Text>
      </View>
    </View>
  );
};

