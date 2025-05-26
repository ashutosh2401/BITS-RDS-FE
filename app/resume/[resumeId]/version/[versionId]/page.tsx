"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { ResumeTemplate } from "@/app/components/ResumeTemplate";
import axios from "axios";

export default function ResumeVersionPage() {
  const { resumeId, versionId } = useParams();
  const [resumeData, setResumeData] = useState(null);

  useEffect(() => {
    async function fetchVersionData() {
        await axios.get(`http://localhost:8081/api/v1/resume/${resumeId}/versions/${versionId}`,{
            withCredentials:true
        })
        .then((response) => setResumeData(response?.data))
        .catch((error) => console.error("Failed to fetch version data", error));
    }

    if (resumeId && versionId) {
      fetchVersionData();
    }
  }, [resumeId, versionId]);

  if (!resumeData) {
    return <p>Loading...</p>;
  }

  return (
    <main className="p-4">
      <h1 className="text-2xl font-bold mb-4">Viewing Resume Version</h1>
      <p className="text-gray-600">Resume ID: {resumeId}</p>
      <p className="text-gray-600">Version ID: {versionId}</p>

      {/* Render resume content using the ResumeTemplate component */}
      <div className="mt-6">
        <ResumeTemplate resumeData={resumeData} />
      </div>
    </main>
  );
}
