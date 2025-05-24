"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import axios from "axios";

const ResumeTemplate = ({ data }) => {
  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <div className="text-center mb-6">
        <h1 className="text-3xl font-bold">{data.name || "Your Name"}</h1>
        <p className="text-gray-600">
          {data.email || "Your Email"} | {data.phone || "Your Phone"}
        </p>
        {data.linkedin && (
          <p>
            <a href={data.linkedin} className="text-blue-500">
              LinkedIn
            </a>
          </p>
        )}
      </div>
      <div className="mb-4">
        <h2 className="text-xl font-semibold border-b pb-2">Summary</h2>
        <p>{data.summary || "Write a brief professional summary here."}</p>
      </div>
      <div className="mb-4">
        <h2 className="text-xl font-semibold border-b pb-2">Work Experience</h2>
        {data.experience.map((exp, index) => (
          <div key={index} className="mb-2">
            <p className="font-semibold">
              {exp.company} ({exp.from} - {exp.to})
            </p>
            <p className="text-gray-600">
              {exp.role}, {exp.location}
            </p>
            <p>{exp.description}</p>
          </div>
        ))}
      </div>
      <div className="mb-4">
        <h2 className="text-xl font-semibold border-b pb-2">Education</h2>
        {data.education.map((edu, index) => (
          <div key={index} className="mb-2">
            <p className="font-semibold">
              {edu.institution} ({edu.from} - {edu.to})
            </p>
            <p className="text-gray-600">
              {edu.degree}, {edu.location}
            </p>
          </div>
        ))}
      </div>
      <div className="mb-4">
        <h2 className="text-xl font-semibold border-b pb-2">Skills</h2>
        <p>{data.skills.join(", ") || "List your skills here."}</p>
      </div>
    </div>
  );
};

export default function CreateResumePage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    linkedin: "",
    summary: "",
    experience: [],
    education: [],
    skills: [],
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleExperienceChange = (index, field, value) => {
    const updated = [...formData.experience];
    updated[index][field] = value;
    setFormData({ ...formData, experience: updated });
  };

  const handleEducationChange = (index, field, value) => {
    const updated = [...formData.education];
    updated[index][field] = value;
    setFormData({ ...formData, education: updated });
  };

  const addExperience = () =>
    setFormData({
      ...formData,
      experience: [
        ...formData.experience,
        { company: "", role: "", from: "", to: "", location: "", description: "" },
      ],
    });

  const addEducation = () =>
    setFormData({
      ...formData,
      education: [
        ...formData.education,
        { institution: "", degree: "", from: "", to: "", location: "" },
      ],
    });

  const removeExperience = (index) =>
    setFormData({ ...formData, experience: formData.experience.filter((_, i) => i !== index) });

  const removeEducation = (index) =>
    setFormData({ ...formData, education: formData.education.filter((_, i) => i !== index) });

  const handleSkillChange = (e) => {
    if (e.key === "Enter" && e.target.value.trim() !== "") {
      setFormData({
        ...formData,
        skills: [...formData.skills, e.target.value.trim()],
      });
      e.target.value = "";
    }
  };

  const removeSkill = (index) =>
    setFormData({ ...formData, skills: formData.skills.filter((_, i) => i !== index) });

  const searchParams = useSearchParams();
  const resumeId = searchParams.get("resumeId");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formattedExperience = formData.experience.map(
      (exp) =>
        `${exp.role} at ${exp.company} (${exp.from} - ${exp.to}), ${exp.location}. ${exp.description}`
    );

    const formattedEducation = formData.education.map(
      (edu) =>
        `${edu.degree} from ${edu.institution} (${edu.from} - ${edu.to}), ${edu.location}`
    );

    const payload = {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      linkedin: formData.linkedin,
      summary: formData.summary,
      experience: formattedExperience,
      education: formattedEducation,
      skills: formData.skills,
    };
    console.log("payload", payload);
    try {
      await axios.post(`http://localhost:8081/api/v1/resume/${resumeId}/versions`, 
        payload,
        {
          withCredentials: true,
        }
      );
      router.push("/resume");
    } catch (error) {
      console.error("Resume submission failed:", error);
      alert("Failed to submit resume. Please try again.");
    }
  };

  return (
    <div className="flex min-h-screen p-6 bg-gray-50">
      <div className="w-1/2 pr-6">
        <h1 className="text-2xl font-semibold mb-6">Create Your Resume</h1>
        <form onSubmit={handleSubmit} className="bg-white shadow-lg rounded-xl p-6">
          <div className="mb-4">
            <label className="block text-sm font-medium">Full Name</label>
            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-lg px-3 py-2"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-lg px-3 py-2"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium">Phone</label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium">LinkedIn</label>
            <input
              type="text"
              name="linkedin"
              value={formData.linkedin}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium">Summary</label>
            <textarea
              name="summary"
              value={formData.summary}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2"
            />
          </div>

          {/* Experience */}
          <div className="mb-4">
            <label className="block text-sm font-medium">Work Experience</label>
            {formData.experience.map((exp, i) => (
              <div key={i} className="mb-2">
                {["company", "role", "from", "to", "location", "description"].map((field) => (
                  <input
                    key={field}
                    placeholder={field}
                    value={exp[field]}
                    onChange={(e) => handleExperienceChange(i, field, e.target.value)}
                    className="w-full border px-3 py-1 my-1"
                  />
                ))}
                <button
                  onClick={() => removeExperience(i)}
                  type="button"
                  className="bg-red-500 text-white px-2 py-1 rounded"
                >
                  Remove
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={addExperience}
              className="bg-blue-600 text-white px-4 py-2 rounded mt-2"
            >
              + Add Experience
            </button>
          </div>

          {/* Education */}
          <div className="mb-4">
            <label className="block text-sm font-medium">Education</label>
            {formData.education.map((edu, i) => (
              <div key={i} className="mb-2">
                {["institution", "degree", "from", "to", "location"].map((field) => (
                  <input
                    key={field}
                    placeholder={field}
                    value={edu[field]}
                    onChange={(e) => handleEducationChange(i, field, e.target.value)}
                    className="w-full border px-3 py-1 my-1"
                  />
                ))}
                <button
                  onClick={() => removeEducation(i)}
                  type="button"
                  className="bg-red-500 text-white px-2 py-1 rounded"
                >
                  Remove
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={addEducation}
              className="bg-blue-600 text-white px-4 py-2 rounded mt-2"
            >
              + Add Education
            </button>
          </div>

          {/* Skills */}
          <div className="mb-4">
            <label className="block text-sm font-medium">Skills</label>
            <input
              type="text"
              onKeyDown={handleSkillChange}
              placeholder="Press Enter to add skill"
              className="w-full border border-gray-300 rounded-lg px-3 py-2"
            />
            <div className="flex flex-wrap gap-2 mt-2">
              {formData.skills.map((skill, index) => (
                <span
                  key={index}
                  className="bg-gray-200 px-3 py-1 rounded-lg text-sm flex items-center"
                >
                  {skill}
                  <button
                    type="button"
                    onClick={() => removeSkill(index)}
                    className="ml-2 text-red-500"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
          >
            Submit Resume
          </button>
        </form>
      </div>
      <div className="w-1/2 pl-6">
        <ResumeTemplate data={formData} />
      </div>
    </div>
  );
}
