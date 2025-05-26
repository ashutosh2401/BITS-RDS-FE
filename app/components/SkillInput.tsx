const SkillInput = ({ skills, onAdd, onRemove }) => (
  <div className="mb-4">
    <label className="block text-sm font-medium">Skills</label>
    <input
      type="text"
      placeholder="Press Enter to add skill"
      onKeyDown={(e) => {
        if (e.key === "Enter" && e.target.value.trim()) {
          onAdd(e.target.value.trim());
          e.target.value = "";
        }
      }}
      className="w-full border border-gray-300 rounded-lg px-3 py-2"
    />
    <div className="flex flex-wrap gap-2 mt-2">
      {skills.map((skill, i) => (
        <span key={i} className="bg-gray-200 px-3 py-1 rounded-full flex items-center">
          {skill}
          <button onClick={() => onRemove(i)} className="ml-2 text-red-500">×</button>
        </span>
      ))}
    </div>
  </div>
);

export default SkillInput;
