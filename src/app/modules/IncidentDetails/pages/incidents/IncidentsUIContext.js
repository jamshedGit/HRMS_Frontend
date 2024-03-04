import React, { createContext, useContext, useState, useCallback } from "react";
import { isEqual, isFunction } from "lodash";
import { initialFilter, initialTripLogFilter } from "./IncidentsUIHelpers";

const IncidentsUIContext = createContext();

export function useIncidentsUIContext() {
  return useContext(IncidentsUIContext);
}

export const IncidentsUIConsumer = IncidentsUIContext.Consumer;

export function IncidentsUIProvider({ incidentsUIEvents, children }) {
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

  const [secondQueryParams, setSecondQueryParamsBase] = useState(
    initialTripLogFilter
  );
  const setSecondQueryParams = useCallback((nextQueryParams) => {
    setSecondQueryParamsBase((prevQueryParams) => {
      if (isFunction(nextQueryParams)) {
        nextQueryParams = nextQueryParams(prevQueryParams);
      }

      if (isEqual(prevQueryParams, nextQueryParams)) {
        return prevQueryParams;
      }

      return nextQueryParams;
    });
  }, []);

  const initIncident = {
    callerName: "",
    callerCNIC: "",
    callerPhoneNo: "",
    patientName: "",
    patientCNIC: "",
    shortDescription: "",
    location: "",
    area: "",
    incidentTypeId: undefined,
    incidentSeverityId: undefined,
    centerId: undefined,
    vehicleId: undefined,
  };

  const value = {
    queryParams,
    setQueryParamsBase,
    setQueryParams,
    setSecondQueryParamsBase,
    setSecondQueryParams,
    ids,
    setIds,
    initIncident,
    newUserButtonClick: incidentsUIEvents.newUserButtonClick,
    openEditUserDialog: incidentsUIEvents.openEditUserDialog,
    openDeleteUserDialog: incidentsUIEvents.openDeleteUserDialog,
    openReadUserDialog: incidentsUIEvents.openReadUserDialog,
    openTripLogDialog: incidentsUIEvents.openTripLogDialog,
  };
  return (
    <IncidentsUIContext.Provider value={value}>
      {children}
    </IncidentsUIContext.Provider>
  );
}
