import { jsPDF } from "jspdf";

export function generatePDF(data: any) {
  const doc = new jsPDF();
  doc.text("Resume", 10, 10);
  doc.text(`Name: ${data.name}`, 10, 20);
  doc.save("resume.pdf");
}