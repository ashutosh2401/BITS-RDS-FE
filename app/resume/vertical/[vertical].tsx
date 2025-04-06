"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function VerticalResumes({ params }: { params: { vertical: string } }) {
  const router = useRouter();
  const { vertical } = params;
  const [resumes, setResumes] = useState<string[]>([]);

  useEffect(() => {
    // Fetch resumes for this vertical (Replace with actual API call)
    setResumes(["Resume 1", "Resume 2", "Resume 3"]); 
  }, [vertical]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-gray-50">
      <h1 className="text-2xl font-semibold mb-6">
        Resumes for {vertical.charAt(0).toUpperCase() + vertical.slice(1)}
      </h1>
      
      <div className="w-full max-w-md bg-white shadow-lg rounded-xl p-6">
        {resumes.length === 0 ? (
          <p>No resumes found for this vertical.</p>
        ) : (
          <ul className="space-y-2">
            {resumes.map((resume, index) => (
              <li key={index} className="border border-gray-300 rounded-lg p-3">
                {resume}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
