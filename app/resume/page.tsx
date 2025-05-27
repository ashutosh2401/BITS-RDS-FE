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

type Vertical = {
  id: string;
  name: string;
};

type AuthUser = {
  employeeId: string;
  companyId: string;
};

export default function ResumePage() {
  const router = useRouter();

  const [authUser, setAuthUser] = useState<AuthUser | null>(null);
  const [resumes, setResumes] = useState<Resume[]>([]);
  const [verticals, setVerticals] = useState<Vertical[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchAuthAndData = async () => {
      try {
        // Fetch authenticated user details
        const authRes = await axios.get("http://localhost:8081/api/v1/auth/me", {
          withCredentials: true,
        });
        const { employeeId, companyId } = authRes.data;
        setAuthUser({ employeeId, companyId });

        // Fetch resumes
        const resumesRes = await axios.get("http://localhost:8081/api/v1/resume", {
          withCredentials: true,
        });
        setResumes(resumesRes.data);

        // Fetch verticals by organization
        const verticalsRes = await axios.get(
          `http://localhost:8081/api/v1/verticals/by-org/${companyId}`,
          { withCredentials: true }
        );
        setVerticals(verticalsRes.data);
      } catch (error) {
        console.error("Failed to fetch initial data", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAuthAndData();
  }, []);

  const handleResumeCreate = async (resumeId: string) => {
    try {
      const res = await axios.post(
        `http://localhost:8081/api/v1/resume/${resumeId}/versions`,
        {},
        { withCredentials: true }
      );
      router.push(`/resume/${resumeId}/version/${res.data?.versionId}`);
    } catch (error) {
      console.error("Failed to create version", error);
    }
  };

  const handleResumeUpdate = (resumeId: string, versionId: string) => {
    router.push(`/resume/${resumeId}/version/${versionId}`);
  };

  if (isLoading || !authUser) {
    return <p className="text-center mt-10">Loading...</p>;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-gray-50">
      <h1 className="text-2xl font-semibold mb-6">Manage Your Resumes</h1>

      <CreateResumeForm
        verticals={verticals}
        employeeId={authUser.employeeId}
        companyId={authUser.companyId}
      />

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
                    <p className="text-sm text-gray-500">
                      Vertical: {resume.vertical}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleResumeUpdate(resume.id, resume.latestVersionId)}
                      className="text-blue-600 hover:underline text-sm"
                    >
                      View
                    </button>
                    <button
                      onClick={() => handleResumeCreate(resume.id)}
                      className="text-green-600 hover:underline text-sm"
                    >
                      ➕ New Version
                    </button>
                    <button
                      onClick={() => router.push(`/resume/${resume.id}/versions`)}
                      className="text-purple-600 hover:underline text-sm"
                    >
                      📜 View Versions
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
