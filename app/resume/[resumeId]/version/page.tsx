// "use client";

// import { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";
// import { useParams } from "next/navigation";
// import { ResumeTemplate } from "@/app/components/ResumeTemplate";

// export default function ResumeVersionPage() {
//   const { resumeId, versionId } = useParams();
//   const [resumeData, setResumeData] = useState(null);

//   useEffect(() => {
//     async function fetchVersionData() {
//       try {
//         const res = await axios(`http://localhost:8081/api/v1/resume/${resumeId}/version/${versionId}`);
//         const data = await res.json();
//         setResumeData(data);
//       } catch (error) {
//         console.error("Failed to fetch version data", error);
//       }
//     }

//     if (resumeId && versionId) {
//       fetchVersionData();
//     }
//   }, [resumeId, versionId]);

//   if (!resumeData) {
//     return <p>Loading...</p>;
//   }

//   return (
//     <main className="p-4">
//       <h1 className="text-2xl font-bold mb-4">Viewing Resume Version</h1>
//       <p className="text-gray-600">Resume ID: {resumeId}</p>
//       <p className="text-gray-600">Version ID: {versionId}</p>

//       {/* Render resume content using the ResumeTemplate component */}
//       <div className="mt-6">
//         Heelo
//         <ResumeTemplate resumeData={resumeData} />
//       </div>
//     </main>
//   );
// }
