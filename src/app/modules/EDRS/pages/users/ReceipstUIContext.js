import React, { createContext, useContext, useState, useCallback } from "react";
import { isEqual, isFunction } from "lodash";
import { initialFilter } from "./ReceiptsUIHelpers";

const ReceiptsUIContext = createContext();

export function useReceiptsUIContext() {
  return useContext(ReceiptsUIContext);
}

export const ReceiptUIConsumer = ReceiptsUIContext.Consumer;
// const initialFilter = {
//   sortBy: "name",
//   limit: 10,
//   page: 1,
// }
export function UsersUIProvider({ usersUIEvents, children }) {
  const [queryParams, setQueryParamsBase] = useState(initialFilter);
  const [ids, setIds] = useState([]);
  const setQueryParams = useCallback((nextQueryParams) => {
    setQueryParamsBase((prevQueryParams) => {
      if (isFunction(nextQueryParams)) {
        nextQueryParams = nextQueryParams(prevQueryParams);
      }

      if (isEqual(prevQueryParams, nextQueryParams)) {
        return prevQueryParams;
      }

      return nextQueryParams;
    });
  }, []);
  const initUser = {
    countryId: "",
    cityId: "",
    centerId: "",
    subCenterId: "",
    firstName: "",
    lastName: "",
    email: "",
    cnic: "",
    phNo: "",
    status: "",
    password: "",
    roleId: undefined,
  };

  const value = {
    queryParams,
    setQueryParamsBase,
    setQueryParams,
    ids,
    setIds,
    initUser,
    newUserButtonClick: usersUIEvents.newUserButtonClick,
    openEditUserDialog: usersUIEvents.openEditUserDialog,
    openDeleteUserDialog: usersUIEvents.openDeleteUserDialog,
    openActiveUserDialog: usersUIEvents.openActiveUserDialog,
    openReadUserDialog: usersUIEvents.openReadUserDialog,
  };
  return (
    <ReceiptsUIContext.Provider value={value}>{children}</ReceiptsUIContext.Provider>
  );
}
