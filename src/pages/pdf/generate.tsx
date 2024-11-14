import ReactPDF from '@react-pdf/renderer';
import { Lesson } from '../../components/pdf/Lesson';
import path from 'path';

export const generate = async (pdfProps) => {
  const outputPath = path.resolve(`./public/lessons/pdfs/${pdfProps.fields.Lesson_id}.pdf`);
  await ReactPDF.render(<Lesson {...pdfProps} />, outputPath);
};