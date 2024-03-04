import { createSlice } from "@reduxjs/toolkit";

const initialIncidentState = {
  listLoading: false,
  actionsLoading: false,
  totalCount: 0,
  entities: [],
  incidentTypes: null,
  incidentSeverity: null,
  centers: null,
  vehicleByCenterId: null,
  incidentForEdit: undefined,
  lastError: null,
  TripLog: null,
  vehiclesForDropdown: null,
};

export const callTypes = {
  list: "list",
  action: "action",
};

export const incidentSlice = createSlice({
  name: "incidents",
  initialState: initialIncidentState,
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
    incidentsFetched: (state, action) => {
      const entities = action.payload.data?.data.rows;
      const totalResult = action.payload.data?.data.totalResults;
      state.listLoading = false;
      state.error = null;
      state.entities = entities;
      state.totalCount = totalResult;
    },
    //get Incident By ID
    incidentFetched: (state, action) => {
      state.actionsLoading = false;
      state.incidentForEdit = action.payload.incidentForEdit;
      state.error = null;
    },
    incidentDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) => el.id !== action.payload.id
      );
    },
    incidentCreated: (state, action) => {
      const data = action.payload;
      // console.log("state.entities", state.entities);
      // console.log("action.payload", action.payload);
      state.actionsLoading = false;
      state.error = null;
      state.entities.push(action.payload);
    },
    incidentUpdated: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      // state.entities.push(action.payload)
      state.entities = state.entities.map((entity) => {
        if (entity.id === action.payload.updatedIncident.id) {
          return action.payload.updatedIncident;
        }

        return entity;
      });
    },
    IncidentTypesFetched: (state, action) => {
      const incidentTypes = action.payload;
      state.listLoading = false;
      state.error = null;
      state.incidentTypes = incidentTypes;
    },
    incidentSeverityfetched: (state, action) => {
      const incidentSeverity = action.payload;
      state.listLoading = false;
      state.error = null;
      state.incidentSeverity = incidentSeverity;
    },
    CentersFetched: (state, action) => {
      const entities = action.payload;
      state.listLoading = false;
      state.error = null;
      state.centers = entities;
    },
    vehicleFetchedByCenterId: (state, action) => {
      const entities = action.payload;
      // console.log("action.payload", action.payload)
      state.listLoading = false;
      state.error = null;
      state.vehicleByCenterId = entities;
    },
    fetchVehiclesForDropdown: (state, action) => {
      const entities = action.payload;
      // console.log("action.payload", action.payload)
      state.listLoading = false;
      state.error = null;
      state.vehiclesForDropdown = entities;
    },
    tripLogFetched: (state, action) => {
      const entities = action.payload.data?.data.rows;
      const totalResult = action.payload.data?.data.totalResults;
      state.listLoading = false;
      state.error = null;
      state.TripLog = entities;
      // state.totalCount = totalResult
    },
    incidentReinitial: (state, action) => {
      state.actionsLoading = false;
      state.incidentForEdit = undefined;
      state.error = null;
    },
  },
});
