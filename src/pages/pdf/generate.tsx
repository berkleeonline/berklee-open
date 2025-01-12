import { buffer as streamToBuffer } from 'node:stream/consumers';
import ReactPDF from '@react-pdf/renderer';
import { Lesson } from '../../components/pdf/Lesson';

export const generate = async (pdfProps, pdfName) => {
  // Generate the PDF
  try {
    const stream = await ReactPDF.renderToStream(<Lesson {...pdfProps} />);
    const buffer = await streamToBuffer(stream);
    console.log(`Successfully generated PDF [${pdfName}]`);
    return buffer;
  } catch (error) {
    console.error(`Error generating PDF [${pdfName}]: ${error.message}`);
  }
};
