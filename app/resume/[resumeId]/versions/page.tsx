"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";

type ResumeVersion = {
  versionId: string;
  createdAt: string;
  updatedAt: string;
};

export default function ResumeVersionsPage() {
  const router = useRouter();
  const params = useParams();
  const { resumeId } = params as { resumeId: string };

  const [versions, setVersions] = useState<ResumeVersion[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVersions = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8081/api/v1/resume/${resumeId}/versions`,
          { withCredentials: true }
        );
        setVersions(res.data);
      } catch (error) {
        console.error("Failed to fetch resume versions:", error);
      } finally {
        setLoading(false);
      }
    };

    if (resumeId) fetchVersions();
  }, [resumeId]);

  const handleOpenVersion = (versionId: string) => {
    router.push(`/resume/${resumeId}/versions/${versionId}`);
  };

  if (loading) {
    return <p className="text-center mt-10">Loading versions...</p>;
  }

  return (
    <div className="min-h-screen p-6 bg-gray-50">
      <h1 className="text-2xl font-semibold mb-6">Resume Versions</h1>

      {versions.length === 0 ? (
        <p className="text-gray-500">No versions available for this resume.</p>
      ) : (
        <ul className="space-y-4">
          {versions.map((version) => (
            <li
              key={version.versionId}
              className="bg-white shadow rounded-lg p-4 flex justify-between items-center"
            >
              <div>
                <p className="font-medium">Version ID: {version.id}</p>
                {/* <p className="text-sm text-gray-500">Created: {new Date(version.createdAt).toLocaleString()}</p>
                <p className="text-sm text-gray-500">Updated: {new Date(version.updatedAt).toLocaleString()}</p> */}
              </div>
              <button
                onClick={() => handleOpenVersion(version.id)}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
              >
                View
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
