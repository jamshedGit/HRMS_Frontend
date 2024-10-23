export const IncidentStatusCssClasses = ["danger", "success", "info", ""]
export const IncidentStatusTitles = ["Open", "Close", "Pending", ""]
export const CustomerTypeCssClasses = ["success", "primary", ""]
export const CustomerTypeTitles = ["Business", "Individual", ""]
export const defaultSorted = [{ dataField: "id", order: "asc" }]
export const sizePerPageList = [
  { text: "3", value: 3 },
  { text: "5", value: 5 },
  { text: "10", value: 10 },
]
// export const initialFilter = {
//   //   filter: {
//   //     lastName: "",
//   //     firstName: "",
//   //     email: "",
//   //     ipAddress: "",
//   //   },
//   // sortBy: "asc",
//   // page: 1,
//   // limit: 10,

//     sortOrder: "asc", // asc||desc
//     // sortField: "id",
//     pageNumber: 1,
//     pageSize: 10
// }

export const initialFilter = {
  filter: {
    searchQuery: "",
  },

  sortOrder: "asc",
  pageSize: 10,
  pageNumber: 1,
}

export const initialTripLogFilter = {
  filter: {
    searchQuery: "",
  },

  sortOrder: "name",
  pageNumber: 1,
  pageSize: 2,
  incidentId: null,
}
