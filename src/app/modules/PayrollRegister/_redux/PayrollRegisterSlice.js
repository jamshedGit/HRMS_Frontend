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
    pdfLoading: false
};

export const callTypes = {
    list: "list",
    action: "action",
    pdf: "pdf",
    register: 'register',
    bankAdvice: 'advice'
};

export const PayrollRegisterSlice = createSlice({
    name: "PayrollRegister",
    initialState: initialState,
    reducers: {
        catchError: (state, action) => {
            state.error = `${action.type}: ${action.payload.error}`;
            if (action.payload.callType === callTypes.list) {
                state.listLoading = false;
            } 
            else if(action.payload.callType === callTypes.pdf){
                state.pdfLoading = false;
            }
            else if(action.payload.callType === callTypes.register){
                state.registerLoading = false;
            }
            else if(action.payload.callType === callTypes.bankAdvice){
                state.adviceLoading = false;
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
            else if(action.payload.callType === callTypes.pdf){
                state.pdfLoading = true;
            }
            else if(action.payload.callType === callTypes.register){
                state.registerLoading = true;
            }
            else if(action.payload.callType === callTypes.bankAdvice){
                state.adviceLoading = true;
            } else {
                state.actionsLoading = true;
            }
        },
        pdfFetched: (state, action) => {
            state.pdfLoading = false;
        },
        registerFetched: (state, action) => {
            state.registerLoading = false;
        },
        adviceFetched: (state, action) => {
            state.adviceLoading = false;
        },
        PayrollRegisterFetched: (state, action) => {
            const entities = action.payload.data?.data.rows;
            const totalResult = action.payload.data?.data.totalResults;
            state.listLoading = false;
            state.error = null;
            state.entities = entities;
            state.totalCount = totalResult;
        }
    },
});
