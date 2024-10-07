import React, { createContext, useContext, useState, useCallback } from "react";
import { isEqual, isFunction } from "lodash";
import { initialFilter } from "./SalarypolicyUIHelpers";

const SalarypolicyUIContext = createContext();

export function useSalarypolicyUIContext() {
  return useContext(SalarypolicyUIContext);
}

export const ReceiptUIConsumer = SalarypolicyUIContext.Consumer;
// const initialFilter = {
//   sortBy: "name",
//   limit: 10,
//   page: 1,
// }
export function BanksUIProvider({ BanksUIEvents, children }) {
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
    Id:"",
    type: "",
    value: "",
    multiplier: "",
    divisor: "",
  
  };

  console.log("bank ui events",BanksUIEvents);

  const value = {
    queryParams,
    setQueryParamsBase,
    setQueryParams,
    ids,
    setIds,
    initUser,
    newBankButtonClick: BanksUIEvents.newBankButtonClick,
    openEditBankDialog: BanksUIEvents.openEditBankDialog,
    openDeleteBankDialog: BanksUIEvents.openDeleteBankDialog,
    openActiveBankDialog: BanksUIEvents.openActiveBankDialog,
    openReadBankDialog: BanksUIEvents.openReadBankDialog,
  };
  return (
    <SalarypolicyUIContext.Provider value={value}>{children}</SalarypolicyUIContext.Provider>
  );
}
