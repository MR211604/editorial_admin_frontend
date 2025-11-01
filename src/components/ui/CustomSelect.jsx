export default function CustomSelect({
  onSelectChange,
  selectedValue,
  optionValues = [],
  ...props
}) {
  return (
    <select
      name="archived"
      id="archived"
      onChange={onSelectChange}
      value={selectedValue}
      {...props}
    >
      {optionValues.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
}
