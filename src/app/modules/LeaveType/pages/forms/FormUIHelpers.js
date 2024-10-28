export const CustomerStatusCssClasses = ["danger", "success", "info", ""]
export const CustomerStatusTitles = ["Suspended", "Active", "Pending", ""]
export const CustomerTypeCssClasses = ["success", "primary", ""]
export const CustomerTypeTitles = ["Business", "Individual", ""]
export const defaultSorted = [{ dataField: "id", order: "asc" }]
export const sizePerPageList = [
  { text: "20", value: 20 },
  { text: "50", value: 50 },
  { text: "100", value: 100 },
]

export const initialFilter = {
  filter: {
    searchQuery: ""
  },

  sortOrder: "asc",
  pageSize: 20,
  pageNumber: 1
}