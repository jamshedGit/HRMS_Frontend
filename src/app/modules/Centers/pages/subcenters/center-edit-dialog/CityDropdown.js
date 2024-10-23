import React, { useEffect, useState } from "react";
import Select from "react-select";

const colourOptions = [
  { value: "ocean", label: "Ocean", color: "#00B8D9", isFixed: true },
  { value: "blue", label: "Blue", color: "#0052CC", isDisabled: true },
  { value: "purple", label: "Purple", color: "#5243AA" },
  { value: "red", label: "Red", color: "#FF5630", isFixed: true },
  { value: "orange", label: "Orange", color: "#FF8B00" },
  { value: "yellow", label: "Yellow", color: "#FFC400" },
  { value: "green", label: "Green", color: "#36B37E" },
  { value: "forest", label: "Forest", color: "#00875A" },
  { value: "slate", label: "Slate", color: "#253858" },
  { value: "silver", label: "Silver", color: "#666666" },
];

export function CityDropdown({
  name,
  label,
  id,
  onChange,
  onBlure,
  error,
  touched,
  options,
  value,
}) {
  console.log("value", value);
  const [ops, setops] = useState([]);
  const [defValue, setdefValue] = useState({});
  const [isClearable, setIsClearable] = useState(true);
  const [isSearchable, setIsSearchable] = useState(true);
  const [isDisabled, setIsDisabled] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isRtl, setIsRtl] = useState(false);

  useEffect(() => {
    setops((item) => [...options]);
    setdefValue((item) => value);
  }, [options]);

  const getDefaultObject = ops.filter((item) => item.value == value);

  console.log("getDefaultObject", getDefaultObject);
  return (
    <>
      {/* <div className="col-12 col-md-4 mb-5">
        {label && <label>Enter {label}</label>}
        <Select
          className="basic-single"
          classNamePrefix="select"
          onBlure={onBlure}
          onChange={onChange}
          isDisabled={isDisabled}
          isLoading={isLoading}
          isClearable={isClearable}
          isRtl={isRtl}
          isSearchable={isSearchable}
          name="color"
          options={ops}
          defaultValue={ops[defValue - 1]}
        />
        {error ? <div className="form-feedBack">{error}</div> : null}
      </div> */}
      {ops.length > 0 && (
        <>
          <div className="col-12 col-md-4 mb-5">
            {label && <label>Enter {label}</label>}
            <Select
              className="basic-single"
              classNamePrefix="select"
              onBlure={onBlure}
              onChange={onChange}
              isDisabled={isDisabled}
              isLoading={isLoading}
              isClearable={isClearable}
              isRtl={isRtl}
              isSearchable={isSearchable}
              name="color"
              options={ops}
              defaultValue={getDefaultObject[0]}
            />
            {error && touched ? (
              <div className="form-feedBack">{error}</div>
            ) : null}
          </div>
        </>
      )}
    </>
  );
}
