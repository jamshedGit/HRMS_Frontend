import { createSlice } from "@reduxjs/toolkit";

const initialCentersState = {
  listLoading: false,
  actionsLoading: false,
  totalCount: 0,
  entities: [],
  AllCountry: [],
  AllCity: [],
  centerForEdit: "",
  lastError: null,
  centerForRead: false,
  vehiclesForCenter: undefined,
};

export const callTypes = {
  list: "list",
  action: "action",
};

export const centersSlice = createSlice({
  name: "centers",
  initialState: initialCentersState,
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
    centersFetched: (state, action) => {
      const entities = action.payload?.rows;
      const totalResults = action.payload?.totalResults;
      state.listLoading = false;
      state.error = null;
      state.entities = entities;
      state.totalCount = totalResults;
    },
    //get User By ID
    centerFetched: (state, action) => {
      // console.log("action", action);
      state.listLoading = false;
      state.centerForEdit = action.payload;
      state.error = null;
    },
    centerDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) => el.id !== action.payload.id
      );
    },
    centerCreated: (state, action) => {
      //console.log("action.payload", action.payload);
      state.actionsLoading = false;
      state.listLoading = false;
      state.error = null;
      state.entities.unshift(action.payload);
    },
    centerUpdated: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      //console.log("action.payload", action.payload);
      // state.entities.push(action.payload)
      state.entities = state.entities.map((entity) => {
        if (entity.id === action.payload.updatedUser[0].id) {
          return action.payload.updatedUser[0];
        }

        return entity;
      });
    },
    vehiclesFetched: (state, action) => {
      const entities = action.payload;
      state.error = null;
      state.actionsLoading = false;
      state.vehiclesForCenter = entities;
    },
    AllCountryFetched: (state, action) => {
      state.AllCountry = action.payload;
    },
    allCitiesFetched: (state, action) => {
      state.listLoading = true;
      state.AllCity = action.payload;
    },
    statusFalse: (state, action) => {
      state.listLoading = false;
    },
    // RolesFetched: (state, action) => {
    //   const entities = action.payload
    //   state.listLoading = false
    //   state.error = null
    //   state.roles = entities
    // },
    // CentersFetched: (state, action) => {
    //   const entities = action.payload
    //   state.listLoading = false
    //   state.error = null
    //   state.centers = entities
    // },
  },
});
