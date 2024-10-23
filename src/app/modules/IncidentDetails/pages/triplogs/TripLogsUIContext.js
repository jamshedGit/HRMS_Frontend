import React, { createContext, useContext, useState, useCallback } from "react";
import { isEqual, isFunction } from "lodash";
import { initialFilter } from "./TripLogsUIHelpers";

const TripLogsUIContext = createContext();

export function useTripLogsUIContext() {
  return useContext(TripLogsUIContext);
}

export const TripLogsUIConsumer = TripLogsUIContext.Consumer;

export function TripLogsUIProvider({ TripLogsUIEvents, children }) {
  // console.log("TripLogsUIEvents", TripLogsUIEvents)
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

  const initTripLog = {
    finalReading: "",
    logBookNo: "",
    price: "",
    status: "",
    cityId: "",
    cendestinationCenterId: "",
    destinationSubCenterId: "",
  };

  const value = {
    queryParams,
    setQueryParamsBase,
    setQueryParams,
    ids,
    setIds,
    initTripLog,
    // newUserButtonClick: TripLogsUIEvents.newUserButtonClick,
    openEditUserDialog: TripLogsUIEvents.openEditUserDialog,
    openDeleteUserDialog: TripLogsUIEvents.openDeleteUserDialog,
    openReadUserDialog: TripLogsUIEvents.openReadUserDialog,
  };
  return (
    <TripLogsUIContext.Provider value={value}>
      {children}
    </TripLogsUIContext.Provider>
  );
}
