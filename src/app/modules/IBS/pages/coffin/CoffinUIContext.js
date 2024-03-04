import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  Children,
} from "react";
import { isEqual, isFunction } from "lodash";
import { initialFilter, initialvehicleFilter } from "./CoffinUIHelpers";

const ModuleUIContext = createContext();

export function useModuleUIContext() {
  return useContext(ModuleUIContext);
}

export const ModuleUIConsumer = ModuleUIContext.Consumer;
// const initialFilter = {
//   sortBy: "name",
//   limit: 10,
//   page: 1,
// }
export function MortuaryUIProvider({ moduleUIEvents, children }) {
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
  //console.log("secondQueryParams", secondQueryParams);

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

  const initCenter = {
    images: "",
    SN: "",
    countryId: "",
    cityId: "",
    hospitalId: "",
    statusId: "",
    ibfId: "",
    dateTime: "",
    fullNameOfTheDeceased: "",
    fatherNameOfTheDeceased: "",
    Address: "",
    callerCnic: "",
    callerName: "",
    callerPhNo: "",
    description: "",
    mortuaryReachdateTime: "",
    dischargeFromMortuaryDateTime: "",
  };

  const value = {
    queryParams,
    setQueryParamsBase,
    setQueryParams,
    setSecondQueryParams,
    setSecondQueryParamsBase,
    secondQueryParams,
    ids,
    setIds,
    initCenter,
    addNewButtonClick: moduleUIEvents.addNewButtonClick,
    openEditDialog: moduleUIEvents.openEditDialog,
    openDeleteDialog: moduleUIEvents.openDeleteDialog,
    openActiveDialog: moduleUIEvents.openActiveDialog,
    openReadDialog: moduleUIEvents.openReadDialog,
  };
  return (
    <ModuleUIContext.Provider value={value}>
      {children}
    </ModuleUIContext.Provider>
  );
}
