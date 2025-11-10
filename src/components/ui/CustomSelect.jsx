export default function CustomSelect({
  onSelectChange,
  selectedValue,
  optionValues = [],
  defaultOptionLabel,
  showDefaultOption = true,
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
      {showDefaultOption && (
        <option value="" disabled>
          {defaultOptionLabel || "Seleccione una opción"}
        </option>
      )}
      {optionValues.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
}
