import { useRoute } from "wouter"; 
import { useEffect, useState } from "react";
import Footer from "@/components/footer";
import DemoPDFSlider from "@/components/DemoPDFSlider";

const noteData: Record<string, {
  title: string;
  pdf: string;
  topics: string[];
  price: number;
}> = {
  dsa: {
    title: "Data Structures & Algorithms Notes",
    pdf: "/DSA-Handwritten-Notes.pdf",
    topics: [
      "Arrays & Strings",
      "Linked Lists",
      "Stacks & Queues",
      "Trees & Graphs",
      "Sorting & Searching Algorithms",
      "Dynamic Programming",
      "Greedy Algorithms",
    ],
    price: 29,
  },
  sql: {
    title: "SQL Notes",
    pdf: "/SQL-Handwritten-Notes.pdf",
    topics: [
      "Basic SELECT Queries",
      "Joins (INNER, LEFT, RIGHT)",
      "GROUP BY and HAVING",
      "Subqueries",
      "Indexes",
      "Stored Procedures",
      "Normalization",
    ],
    price: 19,
  },
  webdev: {
    title: "Full Stack Development Notes",
    pdf: "/DSA-Handwritten-Notes.pdf",
    topics: [
      "HTML",
      "CSS",
      "JavaScript",
      "React",
      "Node.js",
      "Express",
      "MongoDB",
    ],
    price: 39,
  },
};

export default function NoteDetail() {
  const [match, params] = useRoute<{ topic: string }>("/notes/demo-note/:topic");
  const [pdfError, setPdfError] = useState<string | null>(null);

  if (!match || !params?.topic || !noteData[params.topic]) {
    return (
      <div className="text-center text-xl mt-20 text-red-600">
        ❌ Note not found.<br />
        Use valid paths like: <code>/notes/demo-note/dsa</code>, <code>/notes/demo-note/sql</code>, <code>/notes/demo-note/webdev</code>
      </div>
    );
  }

  const topicKey = params.topic;
  const data = noteData[topicKey];
  const filePath = data.pdf;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [topicKey]);

  useEffect(() => {
  document.title = `${data.title} | Courseova Notes`;
}, [data.title]);

  useEffect(() => {
    fetch(filePath)
      .then((res) => {
        if (!res.ok) throw new Error("File not found");
        setPdfError(null);
      })
      .catch(() => {
        setPdfError("This PDF file doesn't exist on the server.");
      });
  }, [filePath]);

  return (
    <div className="p-4 md:p-6 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-4 text-center">📘 Demo: {data.title}</h1>

      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Topics Covered:</h2>
        <ul className="list-disc list-inside text-gray-700 space-y-1">
          {data.topics.map((topic, index) => (
            <li key={index}>{topic}</li>
          ))}
        </ul>
      </div>

      {pdfError ? (
        <div className="text-red-600 text-center mt-6">{pdfError}</div>
      ) : (
        <DemoPDFSlider
          file={filePath}
          previewPageLimit={9}
          unlockPrice={data.price}
        />
      )}
      <Footer />
    </div>
  );
}
