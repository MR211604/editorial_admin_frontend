export default function SelectArchivedPublishings({
  onSelectChange,
  selectedValue,
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
      <option value="">Todos</option>
      <option value="0">No Archivados</option>
      <option value="1">Archivados</option>
    </select>
  );
}
