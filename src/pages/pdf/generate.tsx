import fs from 'fs';
import path from 'path';
import ReactPDF from '@react-pdf/renderer';
import { Lesson } from '../../components/pdf/Lesson';

export const generate = async (pdfProps) => {
  const outputPath = path.resolve(`./public/downloads/pdfs/${pdfProps.fields.Lesson_id}.pdf`);

  // Ensure the directory exists
  const pdfDir = path.dirname(outputPath);
  if (!fs.existsSync(pdfDir)) {
    fs.mkdirSync(pdfDir, { recursive: true });
    console.log(`Created directory: ${pdfDir}`);
  }

  // Delete existing file if it exists
  if (fs.existsSync(outputPath)) {
    fs.unlinkSync(outputPath);
    console.log(`Deleted existing file: ${outputPath}`);
  }

  // Generate the PDF
  try {
    console.log(`Generating PDF: ${outputPath}`);
    await ReactPDF.render(<Lesson {...pdfProps} />, outputPath);
    console.log(`PDF successfully generated: ${outputPath}`);
  } catch (error) {
    console.error(`Error generating PDF: ${error.message}`);
  }
};
