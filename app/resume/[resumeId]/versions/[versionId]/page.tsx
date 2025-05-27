"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { ResumeTemplate } from "@/app/components/ResumeTemplate";
import axios from "axios";

export default function ResumeVersionPage() {
  const { resumeId, versionId } = useParams();
  const router = useRouter();
  const [resumeData, setResumeData] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchVersionData() {
      try {
        const response = await axios.get(
          `http://localhost:8081/api/v1/resume/${resumeId}`,
          { withCredentials: true }
        );

        // Ensure we got both resume and version data
        if (response?.data) {
          setResumeData(response.data);
        }
      } catch (error) {
        console.error("Failed to fetch version data", error);
      }
    }

    if (resumeId && versionId) {
      fetchVersionData();
    }
  }, [resumeId, versionId]);

  const handleValidationClick = async () => {
    try {
      setLoading(true);
      await axios.post(
        "http://localhost:8081/api/v1/validation",
        {
          resumeId,
          versionId,
        },
        {
          withCredentials: true,
        }
      );
      router.push("/validation-requests");
    } catch (error) {
      console.error("Validation request failed", error);
      alert("Failed to send for validation.");
    } finally {
      setLoading(false);
    }
  };

  if (!resumeData) {
    return <p>Loading...</p>;
  }

  return (
    <main className="p-4">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">Viewing Resume: {resumeData.title}</h1>
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          onClick={handleValidationClick}
          disabled={loading}
        >
          {loading ? "Sending..." : "Send for Validation"}
        </button>
      </div>

      {/* Prefill ResumeTemplate with primaryVersion */}
      <div className="mt-6">
        <ResumeTemplate />
      </div>
    </main>
  );
}

