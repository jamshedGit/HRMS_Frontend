import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  Children,
} from "react";
import { isEqual, isFunction } from "lodash";
import { initialFilter } from "./ItemUIHelpers";

const ItemUIContext = createContext();

export function useItemUIContext() {
  return useContext(ItemUIContext);
}

export const ItemUIConsumer = ItemUIContext.Consumer;
// const initialFilter = {
//   sortBy: "name",
//   limit: 10,
//   page: 1,
// }
export function ItemUIProvider({ itemUIEvents, children }) {
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
  const initItem = {
    name: "",
    regNo: "",
    engineCapacity: "",
    registerCity: "",
    chasis: "",
    milleage: "",
    year: "",
    make: "",
    model: "",
    color: "",
    fuelType: "",
    transmission: "",
    status: "",
    centerId: "",
    subCenterId: "",
    vehicleCategoryId: "",
    driverId: "",
    engineNo: "",
    // category: undefined,
    // center: undefined,
  };

  const value = {
    queryParams,
    setQueryParamsBase,
    setQueryParams,
    ids,
    setIds,
    initItem,
    newCenterButtonClick: itemUIEvents.newCenterButtonClick,
    openEditCenterDialog: itemUIEvents.openEditCenterDialog,
    openDeleteCenterDialog: itemUIEvents.openDeleteCenterDialog,
    openActiveDialog: itemUIEvents.openActiveDialog,
    openReadCenterDialog: itemUIEvents.openReadCenterDialog,
  };
  return (
    <ItemUIContext.Provider value={value}>{children}</ItemUIContext.Provider>
  );
}
