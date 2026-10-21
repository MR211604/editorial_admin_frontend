import { Children, forwardRef, isValidElement } from "react";
import { Dropdown } from "react-bootstrap";
import "./FormDropdownSelect.css";

const FormDropdownSelect = forwardRef(function FormDropdownSelect(
  {
    children,
    className = "",
    disabled = false,
    id,
    name,
    onBlur,
    onChange,
    value,
    ...toggleProps
  },
  ref,
) {
  const options = Children.toArray(children).filter(
    (child) => isValidElement(child) && child.type === "option",
  );
  const selectedValue = String(value ?? options[0]?.props.value ?? "");
  const selectedOption = options.find(
    (option) => String(option.props.value ?? option.props.children) === selectedValue,
  );

  const handleSelect = (selectedKey) => {
    const event = { target: { name, value: selectedKey } };
    onChange?.(event);
    onBlur?.(event);
  };

  return (
    <Dropdown className="form-dropdown-select w-100" onSelect={handleSelect}>
      <Dropdown.Toggle
        {...toggleProps}
        ref={ref}
        id={id}
        name={name}
        disabled={disabled}
        className={`form-select text-start w-100 ${className}`.trim()}
        onBlur={onBlur}
      >
        {selectedOption?.props.children ?? "-"}
      </Dropdown.Toggle>

      <Dropdown.Menu className="w-100">
        {options.map((option) => {
          const optionValue = String(option.props.value ?? option.props.children);

          return (
            <Dropdown.Item
              key={optionValue}
              as="button"
              type="button"
              eventKey={optionValue}
              active={optionValue === selectedValue}
              disabled={disabled || option.props.disabled}
            >
              {option.props.children}
            </Dropdown.Item>
          );
        })}
      </Dropdown.Menu>

      {name && (
        <input
          type="hidden"
          name={name}
          value={selectedValue}
          disabled={disabled}
        />
      )}
    </Dropdown>
  );
});

export default FormDropdownSelect;
