import { useState, useEffect } from "react";
import PDFSlider from "./PDFSlider";
import LockedNoteCard from "./LockedNoteCard";
import { Button } from "@/components/ui/button";

export default function CourseNotesTab({ notes }: { notes: any[] }) {
  const [hasPurchased, setHasPurchased] = useState(false);

  // Client side pe jab component mount ho jaye, tab localStorage se read karo
  useEffect(() => {
    const purchased = localStorage.getItem("hasPurchased") === "true";
    setHasPurchased(purchased);
  }, []);

  const handleUnlockNotes = () => {
    localStorage.setItem("hasPurchased", "true");
    setHasPurchased(true);  // Reload na karo, state update karke re-render karwa lo
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-semibold mb-4">📘 Demo Notes</h2>
        <PDFSlider file="/attached-assets/demo-note-dsa-Notes.pdf" totalPages={3} />
      </div>

      {!hasPurchased && (
        <div>
          <h2 className="text-2xl font-semibold mb-4">🔒 Premium Notes</h2>
          <LockedNoteCard />
          <div className="text-center mt-4">
            <Button onClick={handleUnlockNotes}>Unlock Notes</Button>
          </div>
        </div>
      )}

      {hasPurchased && (
        <div>
          <h2 className="text-2xl font-semibold mb-4">📕 Premium Notes</h2>
          <PDFSlider file="/attached-assets/full-paid-notes.pdf" totalPages={5} />
        </div>
      )}

      <div>
        {notes.map((note) => (
          <div key={note.id}>
            {note.locked && !hasPurchased ? (
              <LockedNoteCard key={note.id} note={note} />
            ) : (
              <div key={note.id} className="mb-4">
                <h3 className="text-xl font-semibold">{note.title}</h3>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
