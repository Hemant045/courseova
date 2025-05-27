import React, { useState, useRef, useEffect } from "react";
import HTMLFlipBook from "react-pageflip";
import { Document, Page, pdfjs } from "react-pdf";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

export default function PDFSlider({ file }: { file: string }) {
  const flipBook = useRef<any>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const [numPages, setNumPages] = useState<number>(0);
  const [page, setPage] = useState(0);
  const [scale, setScale] = useState(1.0);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const onDocumentLoadSuccess = ({ numPages }: any) => {
    setNumPages(numPages);
  };

  const prevPage = () => {
    flipBook.current?.pageFlip().flipPrev();
  };

  const nextPage = () => {
    flipBook.current?.pageFlip().flipNext();
  };

  const onFlip = (e: any) => {
    setPage(e.data);
  };

  const zoomIn = () => setScale((prev) => Math.min(prev + 0.25, 3));
  const zoomOut = () => setScale((prev) => Math.max(prev - 0.25, 0.5));

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      containerRef.current?.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
    };
  }, []);

  // ✅ Force Flipbook to Resize When Fullscreen or Zoom Changes
  useEffect(() => {
    if (flipBook.current) {
      setTimeout(() => {
        flipBook.current.pageFlip().update();
      }, 300); // delay for DOM to settle
    }
  }, [isFullscreen, scale]);

  const share = () => {
    const url = window.location.href.split("#")[0];
    const shareUrl = `${url}#page=${page + 1}`;
    navigator.clipboard.writeText(shareUrl).then(() => {
      alert("Page link copied to clipboard!");
    });
  };

  const downloadPDF = () => {
    const link = document.createElement("a");
    link.href = file;
    link.download = "notes.pdf";
    link.click();
  };

  return (
    <div
  ref={containerRef}
  className="relative bg-gray-900 mt-5 -mb-8 p-4 rounded-lg shadow-lg mx-auto transition-all duration-500"
  style={{
    width: isFullscreen ? 650 : 350,
    height: isFullscreen ? 900 : 600,
  }}
>
      <Document file={file} onLoadSuccess={onDocumentLoadSuccess}>
        {numPages > 0 && (
          <>
            <HTMLFlipBook
              width={isFullscreen ? 700 * scale : 300 * scale}
              height={isFullscreen ? 800 * scale : 500 * scale}
              showCover={false}
              maxShadowOpacity={0.5}
              className="shadow-lg rounded-lg mx-auto"
              ref={flipBook}
              flippingTime={700}
              onFlip={onFlip}
              page={page}
              dragOrientation="horizontal"
            >
              {Array.from({ length: numPages }, (_, i) => (
                <div
                  key={i}
                  className="page flex items-center justify-center bg-white p-2"
                  style={{ userSelect: "none" }}
                >
                  <Page
                    pageNumber={i + 1}
                    width={isFullscreen ? 580 * scale : 280 * scale}
                  />
                </div>
              ))}
            </HTMLFlipBook>

            {/* Navigation Arrows */}
            <button
              onClick={prevPage}
              disabled={page === 0}
              className="absolute top-1/2 left-0 -translate-y-1/2 p-4 bg-black bg-opacity-50 text-white text-2xl rounded-r hover:bg-opacity-75 transition disabled:bg-gray-300 disabled:text-gray-500"
              aria-label="Previous Page"
            >
              ◀
            </button>

            <button
              onClick={nextPage}
              disabled={page === numPages - 1}
              className="absolute top-1/2 right-0 -translate-y-1/2 p-4 bg-black bg-opacity-50 text-white text-2xl rounded-l hover:bg-opacity-75 transition disabled:bg-gray-300 disabled:text-gray-500"
              aria-label="Next Page"
            >
              ▶
            </button>

            {/* Page Indicator */}
            <div className="absolute bottom-28 left-1/2 -translate-x-1/2 text-white bg-black bg-opacity-50 rounded-full px-4 py-1 text-lg select-none">
              {page + 1} / {numPages}
            </div>

            {/* Control Panel Below */}
            <div className="absolute bottom-4 left-0 right-0 flex items-center justify-center gap-4">
              <button
                onClick={zoomOut}
                className="bg-black bg-opacity-60 text-white rounded-full p-2 hover:bg-gray-600"
                aria-label="Zoom Out"
              >
                ➖
              </button>

              <button
                onClick={zoomIn}
                className="bg-black bg-opacity-60 text-white rounded-full p-2 hover:bg-gray-600"
                aria-label="Zoom In"
              >
                ➕
              </button>

              <button
                onClick={toggleFullscreen}
                className="bg-black bg-opacity-60 text-white rounded-full p-2 hover:bg-gray-600"
                aria-label="Toggle Fullscreen"
              >
                {isFullscreen ? "⛶" : "⛶"}
              </button>

              <button
                onClick={share}
                className="bg-black bg-opacity-60 text-white rounded-full p-2 hover:bg-gray-600"
                aria-label="Share"
              >
                🔗
              </button>

              <button
                onClick={downloadPDF}
                className="bg-black bg-opacity-60 text-white p-2 rounded-full hover:bg-gray-600"
                title="Download"
              >
                ⬇️
              </button>
            </div>
          </>
        )}
      </Document>
    </div>
  );
}
