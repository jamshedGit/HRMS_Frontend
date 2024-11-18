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
};

export const callTypes = {
    list: "list",
    action: "action",
};

export const AttendanceSlice = createSlice({
    name: "Attendance",
    initialState: initialState,
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
        AttendanceDeleted: (state, action) => {
            state.error = null;
            state.actionsLoading = false;
            state.entities = state.entities.filter(
                (el) => el.Id != action.payload.id
            );
            state.totalCount--;
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
