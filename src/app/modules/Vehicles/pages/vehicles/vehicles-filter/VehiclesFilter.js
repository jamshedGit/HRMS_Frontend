import React, { useMemo, useState } from "react";
import { Formik } from "formik";
import { isEqual } from "lodash";
import { useItemUIContext } from "../ItemUIContext";

const prepareFilter = (queryParams, values) => {
  const { status, type, searchText } = values;
  const newQueryParams = { ...queryParams };
  const filter = {};
  // Filter by status
  filter.status = status !== "" ? +status : undefined;
  // Filter by type
  filter.type = type !== "" ? +type : undefined;
  // Filter by all fields
  filter.searchQuery = searchText;
  if (searchText) {
    filter.searchQuery = searchText;
  }
  newQueryParams.filter = filter;
  return newQueryParams;
};

export function VehicleFilter({ listLoading }) {
  const [searchT, setSearchT] = useState("");
  const itemUIContext = useItemUIContext();
  const usersUIProps = useMemo(() => {
    return {
      queryParams: itemUIContext.queryParams,
      setQueryParams: itemUIContext.setQueryParams,
    };
  }, [itemUIContext]);

  // queryParams, setQueryParams,
  const applyFilter = (values) => {
    const newQueryParams = prepareFilter(usersUIProps.queryParams, values);
    if (!isEqual(newQueryParams, usersUIProps.queryParams)) {
      newQueryParams.pageNumber = 1;
      // update list by queryParams
      usersUIProps.setQueryParams(newQueryParams);
    }
  };

  return (
    <>
      <Formik
        initialValues={{
          searchText: "",
        }}
        onSubmit={(values) => {
          applyFilter(values);
        }}
      >
        {({
          values,
          handleSubmit,
          handleBlur,
          handleChange,
          setFieldValue,
        }) => (
          <form onSubmit={handleSubmit} className="form form-label-right">
            <div className="row">
              <div className="col-12">
                <input
                  type="text"
                  className="form-control"
                  name="searchText"
                  placeholder="Search"
                  onBlur={handleBlur}
                  value={values.searchText}
                  onChange={(e) => {
                    setFieldValue("searchText", e.target.value);
                    setSearchT(e.target.value);
                    handleSubmit();
                  }}
                />
                <small className="form-text text-muted">
                  <b>Search {searchT}</b> in all fields
                </small>
              </div>
            </div>
          </form>
        )}
      </Formik>
    </>
  );
}
