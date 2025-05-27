import { useState, useEffect } from "react";
import { Document, Page } from "react-pdf";
import { ChevronLeft, ChevronRight } from "lucide-react";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";

interface PDFSliderProps {
  file: string;  // Expecting a single file path
  totalPages: number;
}

export default function PDFSlider({ file, totalPages }: PDFSliderProps) {
  const [pageNumber, setPageNumber] = useState(1);

  useEffect(() => {
    setPageNumber(1); // Reset page number when the PDF file changes
  }, [file]);

  const nextPage = () => {
    if (pageNumber < totalPages) setPageNumber(pageNumber + 1);
  };

  const prevPage = () => {
    if (pageNumber > 1) setPageNumber(pageNumber - 1);
  };

  return (
    <div className="flex items-center justify-center gap-4">
      <button onClick={prevPage} disabled={pageNumber <= 1}>
        <ChevronLeft />
      </button>
      <Document file={file}>
        <Page pageNumber={pageNumber} />
      </Document>
      <button onClick={nextPage} disabled={pageNumber >= totalPages}>
        <ChevronRight />
      </button>
    </div>
  );
}
