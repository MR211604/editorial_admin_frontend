import { Dropdown } from "react-bootstrap";
import "./HierarchicalCategorySelect.css";

const isLayoutClass = (className) =>
  /^(?:w-|m(?:s|e|t|b|x|y)?-)/.test(className);

export default function HierarchicalCategorySelect({
  options,
  selectedValue,
  onChange,
  className = "",
  ...props
}) {
  const classNames = className.split(/\s+/).filter(Boolean);
  const layoutClassNames = classNames.filter(isLayoutClass);
  const controlClassNames = classNames.filter(
    (className) => !isLayoutClass(className),
  );
  const isInvalid = controlClassNames.includes("is-invalid");
  const selectedOption = options.find(
    (option) => String(option.value) === String(selectedValue ?? ""),
  );

  const handleSelect = (selectedKey) => {
    const option = options.find(
      (item) => String(item.value) === String(selectedKey),
    );

    if (!option || option.disabled) return;

    onChange?.({ target: { value: String(option.value) } });
  };

  const { disabled, id, name, ...toggleProps } = props;

  return (
    <Dropdown
      className={`hierarchical-category-select${isInvalid ? " is-invalid" : ""} ${layoutClassNames.join(" ")}`}
      onSelect={handleSelect}
    >
      <Dropdown.Toggle
        {...toggleProps}
        id={id}
        disabled={disabled}
        className={`form-select text-start w-100 ${controlClassNames.join(" ")}`.trim()}
      >
        {selectedOption?.label ?? "-"}
      </Dropdown.Toggle>

      <Dropdown.Menu className="w-100">
        {options.map((option) => (
          <Dropdown.Item
            key={String(option.value)}
            as="button"
            type="button"
            eventKey={String(option.value)}
            active={String(option.value) === String(selectedValue ?? "")}
            disabled={option.disabled || disabled}
            className={option.hasChildren ? "fw-bold" : undefined}
            style={{
              paddingLeft: `${0.75 + (option.depth ?? 0) * 1.25}rem`,
            }}
          >
            {option.label}
          </Dropdown.Item>
        ))}
      </Dropdown.Menu>

      {name && (
        <input
          type="hidden"
          name={name}
          value={selectedValue ?? ""}
          disabled={disabled}
        />
      )}
    </Dropdown>
  );
}
