import React from 'react';
import { View, Text, Document, Page } from '@react-pdf/renderer';

export const Footer: React.FC = () => {
  return (
    <View fixed style={{borderTop: 1, paddingTop: 7, marginTop: 10, borderColor: '#DDD', display: 'flex', flexDirection: 'row', justifyContent: "space-between" }}>
      <View>
        <Text style={{fontSize: 9}}>
        (c) Copyright 2001 - {new Date().getFullYear()} Berklee College of Music
        </Text>
      </View>
      <View>
        <Text style={{fontSize: 9}} render={({ pageNumber, totalPages }) => (
          `${pageNumber} / ${totalPages}`
        )} />
      </View>
    </View>
  );
};

