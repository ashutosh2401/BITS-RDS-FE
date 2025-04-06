import { Document, Packer, Paragraph, TextRun } from "docx";
import { saveAs } from "file-saver";

export function generateDOCX(data: any) {
  const doc = new Document({
    sections: [
      {
        properties: {},
        children: [
          new Paragraph({
            children: [
              new TextRun("Resume"),
              new TextRun({ text: `Name: ${data.name}`, break: 1 }),
            ],
          }),
        ],
      },
    ],
  });

  Packer.toBlob(doc).then((blob) => {
    saveAs(blob, "resume.docx");
  });
}