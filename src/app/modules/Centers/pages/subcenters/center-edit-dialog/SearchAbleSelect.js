import React, { useEffect, useState } from "react";
import AsyncSelect from "react-select/async";

export function SearchAbleSelect({
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
  const filterColors = (inputValue) => {
    return options.filter((i) =>
      i.label.toLowerCase().includes(inputValue.toLowerCase())
    );
  };

  const promiseOptions = (inputValue) => {
    // return filterColors(inputValue);

    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(filterColors(inputValue));
      }, 500);
    });
  };

  return (
    <>
      {label && <label> {label}</label>}
      <AsyncSelect
        name={name}
        label={label}
        id={id}
        onBlure={onBlure}
        onChange={onChange}
        defaultValue={options && options.filter((item) => item.value === value)}
        defaultOptions={options}
        loadOptions={promiseOptions}
      />

      {error && touched ? <div className="form-feedBack">{error}</div> : null}
      {/* {JSON.stringify(options)} */}
    </>
  );
}
