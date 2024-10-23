import { createSlice } from "@reduxjs/toolkit";

const initialTripLogState = {
  listLoading: false,
  actionsLoading: false,
  totalCount: 0,
  entities: null,
  driverTripForEdit: undefined,
  // incidentTypes: null,
  // incidentSeverity: null,
  // centers: null,
  // vehicleByCenterId: null,
  // incidentForEdit: undefined,
  lastError: null,
};

export const callTypes = {
  list: "list",
  action: "action",
};

export const TriplogSlice = createSlice({
  name: "triplogs",
  initialState: initialTripLogState,
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
    TripLogsFetched: (state, action) => {
      const entities = action.payload.data?.data.rows;
      const totalResult = action.payload.data?.data.totalResults;
      state.listLoading = false;
      state.error = null;
      state.entities = entities;
      state.totalCount = totalResult;
    },
    //get Incident By ID
    driverTripFetched: (state, action) => {
      state.actionsLoading = false;
      state.driverTripForEdit = action.payload.driverTripForEdit;
      state.error = null;
    },
    // incidentDeleted: (state, action) => {
    //   state.error = null
    //   state.actionsLoading = false
    //   state.entities = state.entities.filter(
    //     (el) => el.id !== action.payload.id
    //   )
    // },
    // incidentCreated: (state, action) => {
    //   const entities = action.payload
    //   state.actionsLoading = false
    //   state.error = null
    //   state.entities.push(entities)
    // },
    tripUpdated: (state, action) => {
      // console.log("state", state.driverTripForEdit);
      state.error = null;
      state.actionsLoading = false;
      // state.entities.push(action.payload);
      // state.entities = state.entities.map((entity) => {
      //   if (entity.id === action.payload.updatedTrip.id) {
      //     return action.payload.updatedTrip;
      //   }

      //   return entity;
      // });
    },
    // IncidentTypesFetched: (state, action) => {
    //   const incidentTypes = action.payload
    //   state.listLoading = false
    //   state.error = null
    //   state.incidentTypes = incidentTypes
    // },
    // incidentSeverityfetched: (state, action) => {
    //   const incidentSeverity = action.payload
    //   state.listLoading = false
    //   state.error = null
    //   state.incidentSeverity = incidentSeverity
    // },
    // CentersFetched: (state, action) => {
    //   const entities = action.payload
    //   state.listLoading = false
    //   state.error = null
    //   state.centers = entities
    // },
    // vehicleFetchedByCenterId: (state, action) => {
    //   const entities = action.payload
    //   // console.log("action.payload", action.payload)
    //   state.listLoading = false
    //   state.error = null
    //   state.vehicleByCenterId = entities
    // },
  },
});
