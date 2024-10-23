import { createSlice } from "@reduxjs/toolkit";
//import { ActionsColumnFormatter } from "../../ECommerce/pages/customers/customers-table/column-formatters";

const initialVehiclesState = {
  listLoading: false,
  actionsLoading: false,
  totalCount: 0,
  entities: null,
  itemForEdit: undefined,
  lastError: null,
  itemForRead: false,
  centers: null,
  categories: null,
  drivers: null,
};

export const callTypes = {
  list: "list",
  action: "action",
};

export const vehiclesSlice = createSlice({
  name: "vehicles",
  initialState: initialVehiclesState,
  reducers: {
    catchError: (state, action) => {
      state.error = `${action.type}: ${action.payload.error}`;
      if (action.payload.callType === callTypes.list) {
        state.listLoading = false;
      } else {
        state.actionsLoading = false;
      }
    },
    startCall: (state, action) => {
      state.error = null;
      if (action.payload.callType === callTypes.list) {
        state.listLoading = true;
      } else {
        state.actionsLoading = true;
      }
    },
    vehiclesFetched: (state, action) => {
      const entities = action.payload.rows;
      const totalResults = action.payload.totalResults;
      state.listLoading = false;
      state.error = null;
      state.entities = entities;
      state.totalCount = totalResults;
    },
    //get User By ID
    vehicleFetched: (state, action) => {
      // console.log("Action Payload vehicleFetched", action.payload.itemForEdit)
      const readVehicle = action.payload.itemForEdit;
      state.actionsLoading = false;
      state.itemForEdit = readVehicle;
      state.error = null;
    },
    vehicleDeleted: (state, action) => {
      //console.log("slicepayload", action.payload)
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) => el.id !== action.payload.id
      );
    },
    vehicleCreated: (state, action) => {
      //console.log("action.payload", action.payload)
      state.actionsLoading = false;
      state.error = null;
      state.entities.unshift(action.payload.vehicle);
    },
    vehicleUpdated: (state, action) => {
      //debugger
      //console.log("updatedVehicle slice", action.payload.updatedVehicle.id)
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.map((entity) => {
        if (entity.id === action.payload.updatedVehicle.id) {
          return action.payload.updatedVehicle;
        }

        return entity;
      });
    },
    CenterFetched: (state, action) => {
      state.actionsLoading = false;
      state.centers = action.payload;
      state.error = null;
    },
    vehicleCategoryFetched: (state, action) => {
      state.actionsLoading = false;
      state.categories = action.payload;
      state.error = null;
    },
    driversByCetner: (state, action) => {
      state.listLoading = false;
      state.drivers = action.payload;
      state.error = null;
    },
  },
});
