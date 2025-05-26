const ExperienceSection = ({ experience, onChange, onAdd, onRemove }) => (
  <div className="mb-4">
    <label className="block text-sm font-medium">Work Experience</label>
    {experience.map((exp, i) => (
      <div key={i} className="mb-2">
        {["company", "role", "from", "to", "location", "description"].map((field) => (
          <input
            key={field}
            placeholder={field}
            value={exp[field]}
            onChange={(e) => onChange(i, field, e.target.value)}
            className="w-full border px-3 py-1 my-1"
          />
        ))}
        <button
          onClick={() => onRemove(i)}
          type="button"
          className="bg-red-500 text-white px-2 py-1 rounded"
        >
          Remove
        </button>
      </div>
    ))}
    <button type="button" onClick={onAdd} className="bg-blue-600 text-white px-4 py-2 rounded mt-2">
      + Add Experience
    </button>
  </div>
);

export default ExperienceSection;
