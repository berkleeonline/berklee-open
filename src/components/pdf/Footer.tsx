import React from 'react';
import { View, Text, Document, Page} from '@react-pdf/renderer';

export const Footer: React.FC = () => {
  return (
    <View>
      <View>
        <Text style={{fontSize: 10}}>Copyright 2001 - {new Date().getFullYear()} Berklee College of Music</Text>
      </View>
      <View>
        <Text fixed>
          {/* This will render the page number and total pages */}
          {({ pageNumber, totalPages }) => `${pageNumber} / ${totalPages}`}
        </Text>
      </View>
    </View>
  );
};

