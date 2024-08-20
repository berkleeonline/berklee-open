import ReactPDF from '@react-pdf/renderer';
import LessonPDF from '../../components/pdf';
import path from 'path';

export const generate = async (pdfProps) => {
  const outputPath = path.resolve(`./public/${pdfProps.fields.Lesson_id}.pdf`);
  await ReactPDF.render(<LessonPDF {...pdfProps} />, outputPath);
};