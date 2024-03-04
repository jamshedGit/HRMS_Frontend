import { createSlice } from "@reduxjs/toolkit";

const initialValues = {
  listLoading: false,
  actionsLoading: false,
  entities: [],
  totalCount: 0,
  hospitalList: [],
  policestationList: [],
  allVehicles: [],
  infoForEdit: [],
  lastError: null,
};

export const callTypes = {
  list: "list",
  action: "action",
};

export const coffinSlice = createSlice({
  name: "coffin",
  initialState: initialValues,
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
    hospitalFetched: (state, action) => {
      state.hospitalList = action.payload;
    },
    policeStationsFetched: (state, action) => {
      state.policestationList = action.payload;
    },
    ibsFetched: (state, action) => {
      const entities = action.payload?.rows;
      const totalResults = action.payload?.totalResults;
      state.listLoading = false;
      state.error = null;
      state.entities = entities;
      state.totalCount = totalResults;
    },
    //get User By ID
    infoFetched: (state, action) => {
      // console.log("action", action);
      state.listLoading = false;
      state.actionsLoading = false;
      state.infoForEdit = action.payload;
      state.error = null;
    },
    recordDeleted: (state, action) => {
      console.log("Pay load", action.payload);
      state.error = null;
      state.actionsLoading = false;
      const index = state.entities.findIndex(
        (obj) => obj.id === action.payload.id
      );
      if (index !== -1) {
        state.entities[index] = action.payload;
      }
      // state.entities = state.entities
      // state.entities.unshift(action.payload);
      // // state.entities = state.entities.filter(
      // //   (el) => el.id !== action.payload.id
      // // );
    },
    infoCreated: (state, action) => {
      state.actionsLoading = false;
      state.listLoading = false;
      state.error = null;
      state.entities.unshift(action.payload);
    },
    infoUpdated: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.map((entity) => {
        if (entity.id === action.payload.updatedUser.id) {
          return action.payload.updatedUser;
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

    AllVehiclesByCenterAndSubCenterId: (state, action) => {
      state.allVehicles = action.payload;
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
