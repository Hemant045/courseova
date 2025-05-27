interface LockedNoteCardProps {
  note?: {
    id: string;
    title: string;
    locked: boolean;
  };
}

export default function LockedNoteCard({ note }: LockedNoteCardProps) {
  if (!note) {
    return (
      <div className="relative border rounded-lg overflow-hidden p-4 backdrop-blur-md bg-muted/20 text-center">
        <div className="absolute inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center">
          <p className="text-white text-sm">🔒 Premium Notes - Unlock to Access</p>
        </div>
        <div className="opacity-30">
          <p className="text-muted">Note data not available</p>
          <div className="h-40 bg-gray-300 rounded-md mt-2" />
        </div>
      </div>
    );
  }

  return (
    <div className="relative border rounded-lg overflow-hidden p-4 backdrop-blur-md bg-muted/20 text-center">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center">
        <p className="text-white text-sm">🔒 Premium Notes - Unlock to Access</p>
      </div>
      <div className="opacity-30">
        <p className="text-muted">{note.title}</p>
        <div className="h-40 bg-gray-300 rounded-md mt-2" />
      </div>
    </div>
  );
}
