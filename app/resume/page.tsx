// "use client";

// import { useState } from "react";
// import { useRouter } from "next/navigation";

// export default function ResumePage() {
//   const router = useRouter();
//   const [searchQuery, setSearchQuery] = useState("");

//   const handleCreateNew = () => {
//     router.push("/resume/new");
//   };

//   const handleSearch = (e) => {
//     e.preventDefault();
//     if (searchQuery.trim()) {
//       router.push(`/resume/search?query=${encodeURIComponent(searchQuery)}`);
//     }
//   };

//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-gray-50">
//       <h1 className="text-2xl font-semibold mb-6">Manage Your Resumes</h1>
//       <div className="w-full max-w-md bg-white shadow-lg rounded-xl p-6">
//         {/* Create New Resume Button */}
//         <button
//           onClick={handleCreateNew}
//           className="w-full bg-blue-600 text-white font-medium py-2 px-4 rounded-lg hover:bg-blue-700 transition"
//         >
//           ➕ Create New Resume
//         </button>

//         {/* Search Form */}
//         <form onSubmit={handleSearch} className="flex gap-2 mt-4">
//           <input
//             type="text"
//             placeholder="Search existing resumes..."
//             value={searchQuery}
//             onChange={(e) => setSearchQuery(e.target.value)}
//             className="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
//           />
//           <button
//             type="submit"
//             className="bg-gray-800 text-white font-medium py-2 px-4 rounded-lg hover:bg-gray-900 transition"
//           >
//             🔍 Search
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

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

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-gray-50">
      <h1 className="text-2xl font-semibold mb-6">Manage Your Resumes</h1>
      
      <div className="w-full max-w-md bg-white shadow-lg rounded-xl p-6">
        {/* Create New Resume Button */}
        <button
          onClick={handleCreateNew}
          className="w-full bg-blue-600 text-white font-medium py-2 px-4 rounded-lg hover:bg-blue-700 transition"
        >
          ➕ Create New Resume
        </button>

        {/* Search Form */}
        <form onSubmit={handleSearch} className="flex gap-2 mt-4">
          <input
            type="text"
            placeholder="Search existing resumes..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="bg-gray-800 text-white font-medium py-2 px-4 rounded-lg hover:bg-gray-900 transition"
          >
            🔍 Search
          </button>
        </form>
      </div>

      {/* Vertical Selection */}
      <div className="w-full max-w-md bg-white shadow-lg rounded-xl p-6 mt-6">
        <h2 className="text-lg font-medium mb-4">Select a Vertical</h2>
        <div className="grid grid-cols-2 gap-3">
          {verticals.map((vertical) => (
            <button
              key={vertical}
              onClick={() => handleVerticalClick(vertical)}
              className="bg-gray-200 text-gray-800 font-medium py-2 px-4 rounded-lg hover:bg-gray-300 transition"
            >
              {vertical}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
