import React, { useMemo } from "react"
import { Formik } from "formik"
import { isEqual } from "lodash"
import { useCentersUIContext } from "../../CentersUIContext"

const prepareFilter = (secondQueryParams, values) => {
  const { status, type, searchText } = values
  const newQueryParams = { ...secondQueryParams }
  const filter = {}
  // Filter by status
  filter.status = status !== "" ? +status : undefined
  // Filter by type
  filter.type = type !== "" ? +type : undefined
  // Filter by all fields
  filter.searchQuery = searchText
  if (searchText) {
    filter.searchQuery = searchText
  }
  newQueryParams.filter = filter
  return newQueryParams
}

export function CenterVehiclesFilter({ listLoading }) {
  const centersUIContext = useCentersUIContext()
  const centersUIProps = useMemo(() => {
    return {
      queryParams: centersUIContext.secondQueryParams,
      setQueryParams: centersUIContext.setSecondQueryParams,
    }
  }, [centersUIContext])

  // queryParams, setQueryParams,
  const applyFilter = (values) => {
    const newQueryParams = prepareFilter(centersUIProps.queryParams, values)
    if (!isEqual(newQueryParams, centersUIProps.queryParams)) {
      newQueryParams.pageNumber = 1
      // update list by queryParams
      centersUIProps.setQueryParams(newQueryParams)
    }
  }

  return (
    <>
      <Formik
        initialValues={{
          status: "", // values => All=""/Susspended=0/Active=1/Pending=2
          type: "", // values => All=""/Business=0/Individual=1
          searchText: "",
        }}
        onSubmit={(values) => {
          //console.log("Filter Value", values)
          applyFilter(values)
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
            <div className="form-group row">
              {/* <div className="col-lg-2">
                <select
                  className="form-control"
                  name="status"
                  placeholder="Filter by Status"
                  // TODO: Change this code
                  onChange={(e) => {
                    setFieldValue("status", e.target.value);
                    handleSubmit();
                  }}
                  onBlur={handleBlur}
                  value={values.status}
                >
                  <option value="">All</option>
                  <option value="0">Susspended</option>
                  <option value="1">Active</option>
                  <option value="2">Pending</option>
                </select>
                <small className="form-text text-muted">
                  <b>Filter</b> by Status
                </small>
              </div>
              <div className="col-lg-2">
                <select
                  className="form-control"
                  placeholder="Filter by Type"
                  name="type"
                  onBlur={handleBlur}
                  onChange={(e) => {
                    setFieldValue("type", e.target.value);
                    handleSubmit();
                  }}
                  value={values.type}
                >
                  <option value="">All</option>
                  <option value="0">Business</option>
                  <option value="1">Individual</option>
                </select>
                <small className="form-text text-muted">
                  <b>Filter</b> by Type
                </small>
              </div> */}
              <div className="col-lg-4">
                <input
                  type="text"
                  className="form-control"
                  name="searchText"
                  placeholder="Search"
                  onBlur={handleBlur}
                  value={values.searchText}
                  onChange={(e) => {
                    setFieldValue("searchText", e.target.value)
                    handleSubmit()
                  }}
                />
                <small className="form-text text-muted">
                  <b>Search</b> in all fields
                </small>
              </div>
            </div>
          </form>
        )}
      </Formik>
    </>
  )
}
