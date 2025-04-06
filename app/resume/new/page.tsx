"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const ResumeTemplate = ({ data }) => {
  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <div className="text-center mb-6">
        <h1 className="text-3xl font-bold">{data.name || "Your Name"}</h1>
        <p className="text-gray-600">{data.email || "Your Email"} | {data.phone || "Your Phone"}</p>
        <p>{data.linkedin && <a href={data.linkedin} className="text-blue-500">LinkedIn</a>}</p>
      </div>
      <div className="mb-4">
        <h2 className="text-xl font-semibold border-b pb-2">Summary</h2>
        <p>{data.summary || "Write a brief professional summary here."}</p>
      </div>
      <div className="mb-4">
        <h2 className="text-xl font-semibold border-b pb-2">Work Experience</h2>
        {data.experience.map((exp, index) => (
          <div key={index} className="mb-2">
            <p className="font-semibold">{exp.company} ({exp.from} - {exp.to})</p>
            <p className="text-gray-600">{exp.role}, {exp.location}</p>
            <p>{exp.description}</p>
          </div>
        ))}
      </div>
      <div className="mb-4">
        <h2 className="text-xl font-semibold border-b pb-2">Education</h2>
        {data.education.map((edu, index) => (
          <div key={index} className="mb-2">
            <p className="font-semibold">{edu.institution} ({edu.from} - {edu.to})</p>
            <p className="text-gray-600">{edu.degree}, {edu.location}</p>
          </div>
        ))}
      </div>
      <div className="mb-4">
        <h2 className="text-xl font-semibold border-b pb-2">Skills</h2>
        <p>{data.skills || "List your skills here."}</p>
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
    const updatedExperience = [...formData.experience];
    updatedExperience[index][field] = value;
    setFormData({ ...formData, experience: updatedExperience });
  };

  const addExperience = () => {
    setFormData({
      ...formData,
      experience: [...formData.experience, { company: "", role: "", from: "", to: "", location: "", description: "" }],
    });
  };

  const removeExperience = (index) => {
    const updatedExperience = formData.experience.filter((_, i) => i !== index);
    setFormData({ ...formData, experience: updatedExperience });
  };

  const removeEducation = (index) => {
    const updatedEducation = formData.education.filter((_, i) => i !== index);
    setFormData({ ...formData, experience: updatedEducation });
  };


  const handleEducationChange = (index, field, value) => {
    const updatedEducation = [...formData.education];
    updatedEducation[index][field] = value;
    setFormData({ ...formData, education: updatedEducation });
  };

  const addEducation = () => {
    setFormData({
      ...formData,
      education: [...formData.education, { institution: "", degree: "", from: "", to: "", location: "" }],
    });
  };

  const handleSkillChange = (e) => {
    if (e.key === "Enter" && e.target.value.trim() !== "") {
      setFormData({
        ...formData,
        skills: [...formData.skills, e.target.value.trim()],
      });
      e.target.value = "";
    }
  };

  const removeSkill = (index) => {
    const updatedSkills = formData.skills.filter((_, i) => i !== index);
    setFormData({ ...formData, skills: updatedSkills });
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Resume Data Submitted:", formData);
    router.push("/resume/success");
  };

  return (
    <div className="flex min-h-screen p-6 bg-gray-50">
      <div className="w-1/2 pr-6">
        <h1 className="text-2xl font-semibold mb-6">Create Your Resume</h1>
        <form onSubmit={handleSubmit} className="bg-white shadow-lg rounded-xl p-6">
          <div className="mb-4">
            <label className="block text-sm font-medium">Full Name</label>
            <input type="text" name="name" value={formData.name} onChange={handleChange} className="w-full border border-gray-300 rounded-lg px-3 py-2" required />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium">Email</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} className="w-full border border-gray-300 rounded-lg px-3 py-2" required />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium">Work Experience</label>
            {formData.experience.map((exp, index) => (
              <div key={index} className="mb-4">
                <input type="text" placeholder="Company" value={exp.company} onChange={(e) => handleExperienceChange(index, "company", e.target.value)} className="w-full border px-3 py-2" />
                <input type="text" placeholder="Role" value={exp.role} onChange={(e) => handleExperienceChange(index, "role", e.target.value)} className="w-full border px-3 py-2 mt-2" />
                <input type="text" placeholder="From Year" value={exp.from} onChange={(e) => handleExperienceChange(index, "from", e.target.value)} className="w-full border px-3 py-2 mt-2" />
                <input type="text" placeholder="To Year" value={exp.to} onChange={(e) => handleExperienceChange(index, "to", e.target.value)} className="w-full border px-3 py-2 mt-2" />
                <input type="text" placeholder="Location" value={exp.location} onChange={(e) => handleExperienceChange(index, "location", e.target.value)} className="w-full border px-3 py-2 mt-2" />
                <button type="button" onClick={() => removeExperience(index)} className="bg-red-500 text-white py-1 px-3 rounded-lg mt-2">Remove</button>
              </div>
            ))}
            <button type="button" onClick={addExperience} className="bg-blue-600 text-white py-2 px-4 rounded-lg mt-2">+ Add Experience</button>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium">Education</label>
            {formData.education.map((edu, index) => (
              <div key={index} className="mb-4">
                <input type="text" placeholder="Institution" value={edu.institution} onChange={(e) => handleEducationChange(index, "institution", e.target.value)} className="w-full border px-3 py-2" />
                <input type="text" placeholder="Degree" value={edu.degree} onChange={(e) => handleEducationChange(index, "degree", e.target.value)} className="w-full border px-3 py-2 mt-2" />
                <input type="text" placeholder="From Year" value={edu.from} onChange={(e) => handleEducationChange(index, "from", e.target.value)} className="w-full border px-3 py-2 mt-2" />
                <input type="text" placeholder="To Year" value={edu.to} onChange={(e) => handleEducationChange(index, "to", e.target.value)} className="w-full border px-3 py-2 mt-2" />
                <input type="text" placeholder="Location" value={edu.location} onChange={(e) => handleEducationChange(index, "location", e.target.value)} className="w-full border px-3 py-2 mt-2" />
                <button type="button" onClick={() => removeEducation(index)} className="bg-red-500 text-white py-1 px-3 rounded-lg mt-2">Remove</button>
              </div>
            ))}
            <button type="button" onClick={addEducation} className="bg-blue-600 text-white py-2 px-4 rounded-lg mt-2">+ Add Education</button>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium">Skills</label>
            <input type="text" placeholder="Press Enter to add a skill" onKeyDown={handleSkillChange} className="w-full border border-gray-300 rounded-lg px-3 py-2" />
            <div className="flex flex-wrap gap-2 mt-2">
              {formData.skills.map((skill, index) => (
                <span key={index} className="bg-gray-200 px-3 py-1 rounded-lg text-sm flex items-center">
                  {skill}
                  <button type="button" onClick={() => removeSkill(index)} className="ml-2 text-red-500">×</button>
                </span>
              ))}
            </div>
          </div>
          <button type="submit" className="w-full bg-blue-600 text-white font-medium py-2 px-4 rounded-lg hover:bg-blue-700">Submit Resume</button>
        </form>
      </div>
      <div className="w-1/2 pl-6">
        <ResumeTemplate data={formData} />
      </div>
    </div>
  );
}
