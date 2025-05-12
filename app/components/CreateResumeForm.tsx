"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

interface CreateResumeFormProps {
  verticals: string[];
  employeeId: string;
  companyId: string;
}

export default function CreateResumeForm({
  verticals,
  employeeId,
  companyId,
}: CreateResumeFormProps) {
  const [verticalId, setVerticalId] = useState("");
  const [title, setTitle] = useState("");
  const router = useRouter();

  const handleCreate = async () => {
    if (!title || !verticalId) {
        alert("Please fill in all fields.");
        return;
    }

    try {
        console.log(employeeId, companyId, verticalId, title);
        const res = await axios.post("http://localhost:8082/api/v1/resume", {
            employeeId,
            companyId,
            verticalId,
            title,
        });

        const createdResume = res.data;
        console.log(createdResume.id);

        // Redirect to /resume/new with resumeId
        router.push(`/resume/new?resumeId=${createdResume.id}`);
    } catch (error) {
        console.error("Error creating resume:", error);
        alert("Resume creation failed");
    }
    };


  return (
    <div className="w-full max-w-md bg-white shadow-lg rounded-xl p-6 mt-6">
      <h2 className="text-lg font-medium mb-4">Create a New Resume</h2>

      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Resume title"
        className="w-full mb-3 border border-gray-300 rounded-lg px-3 py-2"
      />

      <select
        value={verticalId}
        onChange={(e) => setVerticalId(e.target.value)}
        className="w-full mb-4 border border-gray-300 rounded-lg px-3 py-2"
      >
        <option value="">Select a vertical</option>
        {verticals.map((vertical) => (
          <option key={vertical} value={vertical}>
            {vertical}
          </option>
        ))}
      </select>

      <button
        onClick={handleCreate}
        className="w-full bg-green-600 text-white font-medium py-2 px-4 rounded-lg hover:bg-green-700 transition"
      >
        Create Resume
      </button>
    </div>
  );
}
