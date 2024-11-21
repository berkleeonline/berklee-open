import React from 'react';
import { View, Text, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  contentContainer: {
    width: '70%'
  },
  paragraph: {
    fontSize: '11pt',
    fontWeight: 300,
    marginBottom: 10,
  },
  heading3: {
    fontSize: '14pt',
    fontWeight: 500,
    marginBottom: 10,
  },
  heading4: {
    fontSize: '12pt',
    fontWeight: 400,
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
    listStyleType: 'disc'
  },
  listItem: {
    fontSize: '11pt',
    fontWeight: 300,
    marginBottom: 4,
  },
  hr: {
    borderBottomWidth: 1,
    borderBottomColor: '#000',
    marginVertical: 10,
  }
});

export const Rendering = ({ content }) => {
    if (!content || content.length === 0) {
        return <Text>No content available</Text>; // Add a fallback for empty content
    }

    return (
        <View>
            {content?.map((contentItem, contentIndex) => {
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
                        <View style={{ flexDirection: 'row' }}>
                            <View style={{ width: 15 }}>
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
                        <View style={{ flexDirection: 'row' }}>
                            <View style={{ width: 15 }}>
                            <Text key={listIndex} style={{ textAlign: 'center' }}>
                                &bull;
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
    );
};
