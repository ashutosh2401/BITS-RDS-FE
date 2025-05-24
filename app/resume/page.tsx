"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import CreateResumeForm from "../components/CreateResumeForm";
import axios from "axios";

type Resume = {
  id: string;
  title: string;
  vertical: string;
  latestVersionId: string;
  createdAt: string;
};

const verticals = [
  "Engineering",
  "Marketing",
  "Sales",
  "HR",
  "Finance",
  "Design",
];

export default function ResumePage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [resumes, setResumes] = useState<Resume[]>([]);

  // Fetch resumes on page load
  useEffect(() => {
    axios
      .get("http://localhost:8081/api/v1/resume", {
        withCredentials: true,
      })
      .then((response) => setResumes(response.data))
      .catch((error) => console.error("Failed to fetch resumes", error));
  }, []);


  const handleCreateNew = () => {
    router.push("/resume/new");
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/resume/search?query=${encodeURIComponent(searchQuery)}`);
    }
  };

  const handleVerticalClick = (vertical: string) => {
    router.push(`/resume/vertical/${vertical.toLowerCase()}`);
  };

  const handleViewResume = (resumeId: string, versionId: string) => {
    router.push(`/resume/${resumeId}/version/${versionId}`);
  };

  const handleNewVersion = (resumeId: string) => {
    router.push(`/resume/${resumeId}/version/new`);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-gray-50">
      <h1 className="text-2xl font-semibold mb-6">Manage Your Resumes</h1>

      <CreateResumeForm
        verticals={verticals}
        employeeId="emp123" 
        companyId="comp456"
      />

      {/* My Resumes Section */}
      <div className="w-full max-w-md bg-white shadow-lg rounded-xl p-6 mt-6">
        <h2 className="text-lg font-medium mb-4">My Resumes</h2>
        {resumes.length === 0 ? (
          <p className="text-gray-500">No resumes created yet.</p>
        ) : (
          <ul className="space-y-3">
            {resumes.map((resume) => (
              <li key={resume.id} className="border border-gray-200 p-3 rounded-lg">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-semibold">{resume.title}</h3>
                    <p className="text-sm text-gray-500">Vertical: {resume.vertical}</p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleViewResume(resume.id, resume.latestVersionId)}
                      className="text-blue-600 hover:underline text-sm"
                    >
                      View
                    </button>
                    <button
                      onClick={() => handleNewVersion(resume.id)}
                      className="text-green-600 hover:underline text-sm"
                    >
                      ➕ New Version
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
