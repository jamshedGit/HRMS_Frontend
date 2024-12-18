import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    listLoading: false,
    actionsLoading: null,
    totalCount: 0,
    entities: null,
    roles: null,
    centers: null,
    userStatusTypes: null,
    userForEdit: undefined,
    lastError: null,
    userForRead: false,
    processLoading: false
};

export const callTypes = {
    list: "list",
    action: "action",
    process: "process"
};

export const AttendanceSlice = createSlice({
    name: "Attendance",
    initialState: initialState,
    reducers: {
        catchError: (state, action) => {
            state.error = `${action.type}: ${action.payload.error}`;
            if (action.payload.callType === callTypes.list) {
                state.listLoading = false;
            } 
            else if(action.payload.callType === callTypes.process){
                state.processLoading = false;
            }
            else {
                state.actionsLoading = false;
            }
        },
        startCall: (state, action) => {
            state.error = null;
            if (action.payload.callType === callTypes.list) {
                state.listLoading = true;
            } 
            else if(action.payload.callType === callTypes.process){
                state.processLoading = true;
            }
            else {
                state.actionsLoading = true;
            }
        },
        stopCall: (state, action) => {
            state.error = null;
            if (action.payload.callType === callTypes.list) {
                state.listLoading = false;
            } 
            else if(action.payload.callType === callTypes.process){
                state.processLoading = false;
            }
            else {
                state.actionsLoading = false;
            }
        },
        AttendanceFetched: (state, action) => {
            const entities = action.payload.data?.data.rows;
            const totalResult = action.payload.data?.data.totalResults;
            state.listLoading = false;
            state.error = null;
            state.entities = entities;
            state.totalCount = totalResult;
        },
        AttendanceFetchedForEdit: (state, action) => {
            const entities = action?.payload?.userForEdit;
            state.actionsLoading = false;
            if (entities) {
                entities.attDateIn = new Date(entities.attDateIn);
                entities.attDateOut = new Date(entities.attDateOut)
            }
            state.userForEdit = entities;
            state.error = null;
        },
        AttendanceCreated: (state, action) => {
            const entities = action?.payload
            state.actionsLoading = false;
            state.error = null;
            if (entities) {
                entities.attDateIn = new Date(entities.attDateIn);
                entities.attDateOut = new Date(entities.attDateOut)
            }
            state.userForEdit = entities;
        },
        AttendanceUpdated: (state, action) => {
            const entities = action?.payload
            state.error = null;
            state.actionsLoading = false;
            if (entities) {
                entities.attDateIn = new Date(entities.attDateIn);
                entities.attDateOut = new Date(entities.attDateOut)
            }
            state.userForEdit = entities;
        }
    },
});
