const BasicInfoSection = ({ formData, onChange }) => (
  <>
    {["name", "email", "phone", "linkedin"].map((field) => (
      <div className="mb-4" key={field}>
        <label className="block text-sm font-medium">{field[0].toUpperCase() + field.slice(1)}</label>
        <input
          type={field === "email" ? "email" : "text"}
          name={field}
          value={formData[field]}
          onChange={onChange}
          required={field !== "linkedin"}
          className="w-full border border-gray-300 rounded-lg px-3 py-2"
        />
      </div>
    ))}
  </>
);

export default BasicInfoSection;
