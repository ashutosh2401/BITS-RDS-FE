const EducationSection = ({ education, onChange, onAdd, onRemove }) => (
  <div className="mb-4">
    <label className="block text-sm font-medium">Education</label>
    {education.map((edu, i) => (
      <div key={i} className="mb-2">
        {["institution", "degree", "from", "to", "location"].map((field) => (
          <input
            key={field}
            placeholder={field}
            value={edu[field]}
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
      + Add Education
    </button>
  </div>
);

export default EducationSection;
