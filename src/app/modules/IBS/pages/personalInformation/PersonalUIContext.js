import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  Children,
} from "react";
import { isEqual, isFunction } from "lodash";
import { initialFilter, initialvehicleFilter } from "./PersonalUIHelpers";

const InfoUIContext = createContext();

export function useInfoUIContext() {
  return useContext(InfoUIContext);
}

export const InfoUIConsumer = InfoUIContext.Consumer;
// const initialFilter = {
//   sortBy: "name",
//   limit: 10,
//   page: 1,
// }
export function PersonalInformationUIProvider({ centersUIEvents, children }) {
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
    initialvehicleFilter
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

  const value = {
    queryParams,
    setQueryParamsBase,
    setQueryParams,
    setSecondQueryParams,
    setSecondQueryParamsBase,
    secondQueryParams,
    ids,
    setIds,
    //initInfo,
    addNewButtonClick: centersUIEvents.addNewButtonClick,
    openEditDialog: centersUIEvents.openEditDialog,
    openDeleteDialog: centersUIEvents.openDeleteDialog,
    openActiveDialog: centersUIEvents.openActiveDialog,
    openReadDialog: centersUIEvents.openReadDialog,
    openMortuaryDialog: centersUIEvents.openMortuaryDialog,
    openMortuaryEditDialog: centersUIEvents.openMortuaryEditDialog,
    makePDFreport: centersUIEvents.makePDFreport,
  };
  return (
    <InfoUIContext.Provider value={value}>{children}</InfoUIContext.Provider>
  );
}
