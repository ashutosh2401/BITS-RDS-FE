const SummaryInput = ({ summary, onChange }) => (
  <div className="mb-4">
    <label className="block text-sm font-medium">Summary</label>
    <textarea
      name="summary"
      value={summary}
      onChange={onChange}
      className="w-full border border-gray-300 rounded-lg px-3 py-2"
    />
  </div>
);

export default SummaryInput;
