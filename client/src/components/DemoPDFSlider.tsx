import { useState, useRef } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import HTMLFlipBook from "react-pageflip";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import "react-pdf/dist/esm/Page/TextLayer.css";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

type DemoPDFSliderProps = {
  file: string;
  previewPageLimit: number;
  unlockPrice: number; // fallback price if you want
};

export default function DemoPDFSlider({
  file,
  previewPageLimit,
  unlockPrice,
}: DemoPDFSliderProps) {
  const [numPages, setNumPages] = useState<number | null>(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [isPaid, setIsPaid] = useState(false);
  const flipBook = useRef<any>(null);

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
    setPageNumber(1);
  };

  const onFlip = (e: any) => {
    setPageNumber(e.data + 1);
  };

  const totalPagesToShow = isPaid
    ? numPages || 1
    : Math.min(previewPageLimit, numPages || 1);

  const handleUnlockRedirect = () => {
    const confirmUnlock = window.confirm(
      "This is paid content. Do you want to unlock the full PDF?"
    );
    if (confirmUnlock) {
      // Decide route based on filename
      if (file.includes("DSA")) {
        window.location.href = "/WebNotePayment2";
      } else if (file.includes("SQL")) {
        window.location.href = "/WebNotePayment3";
      } else if (file.toLowerCase().includes("fullstack")) {
        window.location.href = "/WebNotePayment";
      } else {
        // Default fallback route
        window.location.href = "/WebNotePayment";
      }
    }
  };

  let displayPages = 85;
  let displayPrice = 29;
  let topicName = "these notes";

  if (file.includes("DSA")) {
    displayPages = 110;
    displayPrice = 39;
    topicName = "DSA Notes";
  } else if (file.includes("SQL")) {
    displayPages = 50;
    displayPrice = 19;
    topicName = "SQL Notes";
  } else if (file.toLowerCase().includes("fullstack")) {
    displayPages = 150;
    displayPrice = 49;
    topicName = "Full Stack Notes";
  }

  return (
    <div className="relative max-w-[600px] mx-auto p-4 rounded-lg shadow-md bg-white select-none">
      {file ? (
        <Document
          file={file}
          onLoadSuccess={onDocumentLoadSuccess}
          loading={<p className="text-center">Loading PDF... (Wait just 5 sec)</p>}
        >
          {typeof numPages === "number" ? (
            <div className="flex justify-center">
              <HTMLFlipBook
                width={250}
                height={350}
                maxShadowOpacity={0.3}
                showCover={false}
                mobileScrollSupport={true}
                onFlip={onFlip}
                ref={flipBook}
                className="shadow-lg"
              >
                {Array.from(new Array(totalPagesToShow), (_, index) => (
                  <div
                    key={index}
                    className="w-full h-full flex justify-center items-center bg-white"
                  >
                    <Page
                      pageNumber={index + 1}
                      width={250}
                      height={400}
                      renderTextLayer={false}
                      renderAnnotationLayer={false}
                      className="drop-shadow-md"
                    />
                  </div>
                ))}
              </HTMLFlipBook>
            </div>
          ) : (
            <p className="text-center">Loading PDF pages...</p>
          )}
        </Document>
      ) : (
        <p className="text-center text-red-500">No PDF file provided.</p>
      )}

      {/* Navigation Buttons */}
      <button
        onClick={handlePrev}
        disabled={pageNumber === 1}
        className="absolute top-1/3 left-[-5vw] transform translate-y-2/3 bg-blue-600 text-white p-3 rounded-full shadow hover:bg-blue-700 disabled:opacity-50 transition"
        aria-label="Previous Page"
      >
        <FaArrowLeft size={22} />
      </button>

      <button
        onClick={handleNext}
        className="absolute top-1/3 right-[-5vw] transform translate-y-2/3 bg-blue-600 text-white p-3 rounded-full shadow hover:bg-blue-700 transition"
        aria-label="Next Page"
      >
        <FaArrowRight size={22} />
      </button>

      <p className="text-center mt-4 text-gray-700 font-medium">
        Page {pageNumber} of {totalPagesToShow}
      </p>

      {!isPaid && numPages && (
        <div className="mt-6 bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 rounded max-w-[600px] mx-auto text-center">
          <p className="mb-4 font-semibold">
            You're viewing a free preview of <strong>{topicName}</strong>. Unlock
            all <strong>{displayPages}</strong> pages:
          </p>
          <button
            onClick={handleUnlockRedirect}
            className="px-5 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          >
            🔓 Unlock Full Notes (₹{displayPrice} UPI)
          </button>
        </div>
      )}
    </div>
  );

  function handleNext() {
    if (pageNumber < totalPagesToShow) {
      flipBook.current.pageFlip().flipNext();
    } else {
      handleUnlockRedirect();
    }
  }

  function handlePrev() {
    if (pageNumber > 1) {
      flipBook.current.pageFlip().flipPrev();
    }
  }
}
