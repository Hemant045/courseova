// CourseDetail.tsx

import { useLocation } from "wouter";
import Footer from "@/components/footer";
import CourseNotesTab from "@/pages/courses/CourseNotesTab"; // Correct path
import PDFSlider from "@/pages/courses/PDFSlider"; // Correct path
import LockedNoteCard from "@/pages/courses/LockedNoteCard"; // Correct path

const courses = [
  {
    id: "web-development",
    title: "Complete Web Development Bootcamp",
    description: "Learn how to build websites and full-stack applications using HTML, CSS, JavaScript, React, and Node.js.",
    syllabus: [
      "HTML5 & CSS3 Basics",
      "Responsive Web Design",
      "JavaScript ES6+",
      "React Framework",
      "Node.js & Express",
      "MongoDB & Database Basics",
      "Final Project Deployment"
    ],
    notes: [
      { id: "note1", title: "HTML Basics", locked: false },
      { id: "note2", title: "CSS Layouts", locked: true }
    ], // Example notes data
    pdfs: ["/pdfs/html-tutorial.pdf", "/pdfs/css-layout.pdf"] // Example PDF links
  },
  // Other courses...
];

export default function CourseDetail() {
  const [location] = useLocation();
  const courseId = location.split("/").pop();
  const course = courses.find((c) => c.id === courseId);

  if (!course) {
    return (
      <div className="container mx-auto px-4 py-10 text-center">
        <h1 className="text-3xl font-bold text-red-500 mb-4">Course Not Found</h1>
        <p className="text-muted-foreground">Sorry, we couldn't find the course you're looking for.</p>
      </div>
    );
  }

  return (
    <>
      <main className="container mx-auto px-4 py-10">
        <h1 className="text-4xl font-bold mb-4">{course.title}</h1>
        <p className="text-muted-foreground text-lg mb-8">{course.description}</p>

        <h2 className="text-2xl font-semibold mb-4">Syllabus</h2>
        <ul className="list-disc list-inside space-y-2 text-base text-gray-700 dark:text-gray-300">
          {course.syllabus.map((item, idx) => (
            <li key={idx}>{item}</li>
          ))}
        </ul>

        {/* PDFSlider for PDF Files */}
        <h2 className="text-2xl font-semibold mt-8">Course PDF Files</h2>
        <PDFSlider file={course.pdfs[0]} totalPages={3} />

        {/* Course Notes Tab */}
        <CourseNotesTab notes={course.notes} />
      </main>

      <Footer />
    </>
  );
}
