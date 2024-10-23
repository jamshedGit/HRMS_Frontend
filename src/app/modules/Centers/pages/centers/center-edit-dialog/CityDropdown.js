import React, { useEffect, useState } from "react";
import Select from "react-select";

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
  isDisabled,
}) {
  // console.log("value", value);
  const [ops, setops] = useState([]);
  const [defValue, setdefValue] = useState({});
  const [isClearable, setIsClearable] = useState(true);
  const [isSearchable, setIsSearchable] = useState(true);
  //const [isDisabled, setIsDisabled] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isRtl, setIsRtl] = useState(false);

  useEffect(() => {
    setops((item) => [...options]);
    setdefValue((item) => value);
  }, [options]);

  const getDefaultObject = ops.filter((item) => item.value == value);

  //console.log("getDefaultObject", getDefaultObject);
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
              defaultValue={getDefaultObject[0] || {}}
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
