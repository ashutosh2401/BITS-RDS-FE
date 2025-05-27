import axios from "axios";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export const ResumeTemplate = () => {
    const { resumeId, versionId } = useParams();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [skills, setSkills] = useState("");
    const [experiences, setExperiences] = useState([]);
    const [education, setEducation] = useState([]);
    const [customSections, setCustomSections] = useState({});

    useEffect(() => {
        const fetchVersionData = async () => {
            try {
                const response = await axios.get(`http://localhost:8081/api/v1/resume/${resumeId}/versions/${versionId}`, {
                    withCredentials: true
                });

                const version = response.data;

                setName(version.name || "");
                setEmail(version.email || "");
                setPhone(version.phone || "");
                setSkills(version.skills?.join(", ") || "");

                // experience strings mapped to editable fields
                setExperiences(
                    version.experiences?.map((desc) => ({
                        company: "",
                        role: "",
                        from: "",
                        to: "",
                        location: "",
                        description: desc
                    })) || []
                );

                setEducation(
                    version.education?.map((desc) => ({
                        institution: "",
                        degree: "",
                        from: "",
                        to: "",
                        location: ""
                    })) || []
                );

                setCustomSections(version.customSections || {});
            } catch (err) {
                console.error("Failed to fetch version data:", err);
            }
        };

        if (resumeId && versionId) {
            fetchVersionData();
        }
    }, [resumeId, versionId]);


    // Helper handlers
    const handleExperienceChange = (index, field, value) => {
    const updated = [...experiences];
    updated[index][field] = value;
    setExperiences(updated);
    };

    const handleEducationChange = (index, field, value) => {
    const updated = [...education];
    updated[index][field] = value;
    setEducation(updated);
    };

    const handleSaveVersion = async (isDraft) => {
        const payload = {
            name,
            email,
            phone,
            skills: skills.split(",").map((skill) => skill.trim()),
            experiences,
            education,
            isDraft,
        };

        console.log(payload, JSON.stringify(payload));
        try {
            const response = await axios.put(
            `http://localhost:8081/api/v1/resume/${resumeId}/versions/${versionId}`,
            payload,
            { withCredentials: true }
            );

            if (response.status >= 200 && response.status < 300) {
            alert(isDraft ? "Resume draft saved successfully!" : "Resume saved successfully!");
            } else {
            alert("Save failed.");
            }
        } catch (error) {
            console.error("Error saving resume:", error);
            alert(`Failed to save: ${error.message}`);
        }
    };

    return (
    <div className="flex flex-col lg:flex-row gap-6 max-w-7xl mx-auto p-6">
        {/* LEFT: Editable Fields */}
        <div className="w-full lg:w-1/2 bg-gray-100 p-4 rounded shadow-md overflow-y-auto max-h-screen">
        <h2 className="text-xl font-bold mb-4">Edit Resume</h2>

        {/* Basic Info */}
        {[
            { label: "Name", value: name, setter: setName, type: "text" },
            { label: "Email", value: email, setter: setEmail, type: "email" },
            { label: "Phone", value: phone, setter: setPhone, type: "text" },
        ].map(({ label, value, setter, type }) => (
            <div className="mb-4" key={label}>
            <label className="block font-medium">{label}</label>
            <input
                type={type}
                value={value}
                onChange={(e) => setter(e.target.value)}
                className="w-full border rounded p-2"
            />
            </div>
        ))}

        {/* Skills */}
        <div className="mb-4">
            <label className="block font-medium">Skills (comma separated)</label>
            <input
            type="text"
            value={skills}
            onChange={(e) => setSkills(e.target.value)}
            className="w-full border rounded p-2"
            />
        </div>

        {/* Work Experience Section */}
        <h3 className="text-lg font-semibold mt-6 mb-2">Work Experience</h3>
        {experiences.map((exp, index) => (
            <div key={index} className="mb-4 p-3 bg-white rounded shadow">
            {["company", "role", "from", "to", "location", "description"].map((field) => (
                <input
                key={field}
                type="text"
                placeholder={field}
                value={exp[field]}
                onChange={(e) => handleExperienceChange(index, field, e.target.value)}
                className="w-full border rounded p-1 mb-1"
                />
            ))}
            <button
                onClick={() => setExperiences(experiences.filter((_, i) => i !== index))}
                className="text-red-600 text-sm mt-1"
            >
                Remove
            </button>
            </div>
        ))}
        <button
            onClick={() =>
            setExperiences([
                ...experiences,
                { company: "", role: "", from: "", to: "", location: "", description: "" }
            ])
            }
            className="bg-blue-500 text-white px-3 py-1 rounded text-sm"
        >
            Add Experience
        </button>

        {/* Education Section */}
        <h3 className="text-lg font-semibold mt-6 mb-2">Education</h3>
        {education.map((edu, index) => (
            <div key={index} className="mb-4 p-3 bg-white rounded shadow">
            {["institution", "degree", "from", "to", "location"].map((field) => (
                <input
                key={field}
                type="text"
                placeholder={field}
                value={edu[field]}
                onChange={(e) => handleEducationChange(index, field, e.target.value)}
                className="w-full border rounded p-1 mb-1"
                />
            ))}
            <button
                onClick={() => setEducation(education.filter((_, i) => i !== index))}
                className="text-red-600 text-sm mt-1"
            >
                Remove
            </button>
            </div>
        ))}
        <button
            onClick={() =>
            setEducation([
                ...education,
                { institution: "", degree: "", from: "", to: "", location: "" }
            ])
            }
            className="bg-blue-500 text-white px-3 py-1 rounded text-sm"
        >
            Add Education
        </button><br></br>
        <div className="flex gap-4 mt-6">
            <button
                onClick={() => handleSaveVersion(false)} // Save as final
                className="bg-blue-600 text-white px-4 py-2 rounded font-semibold hover:bg-blue-700 transition"
            >
                Save
            </button>

            <button
                onClick={() => handleSaveVersion(true)} // Save as draft
                className="bg-green-600 text-white px-4 py-2 rounded font-semibold hover:bg-green-700 transition"
            >
                Save as Draft
            </button>
        </div>
        </div>

        {/* RIGHT: Resume Preview */}
        <div className="w-full lg:w-1/2 bg-white p-6 shadow-md rounded">
        <div className="text-center mb-6">
            <h1 className="text-3xl font-bold">{name || "Your Name"}</h1>
            <p className="text-gray-600">
            {email || "Your Email"} | {phone || "Your Phone"}
            </p>
        </div>

        <Section title="Work Experience">
            {experiences.map((exp, index) => (
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
        </Section>

        <Section title="Education">
            {education.map((edu, index) => (
            <div key={index} className="mb-2">
                <p className="font-semibold">
                {edu.institution} ({edu.from} - {edu.to})
                </p>
                <p className="text-gray-600">
                {edu.degree}, {edu.location}
                </p>
            </div>
            ))}
        </Section>

        <Section title="Skills">
            <p>{skills || "List your skills here."}</p>
        </Section>

        {customSections &&
            Object.entries(customSections).map(([sectionTitle, contents], index) => (
                <Section key={index} title={sectionTitle}>
                {contents.map((item, idx) => (
                    <p key={idx} className="mb-1">{item}</p>
                ))}
                </Section>
        ))}
        </div>
    </div>
    );
    };

const Section = ({ title, children }) => (
    <div className="mb-4">
    <h2 className="text-xl font-semibold border-b pb-2">{title}</h2>
    {children}
    </div>
);
