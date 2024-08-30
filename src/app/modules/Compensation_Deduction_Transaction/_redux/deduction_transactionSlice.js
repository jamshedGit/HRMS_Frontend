import { createSlice } from "@reduxjs/toolkit";

const initialEarningTranState = {
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

export const deduction_transactionSlice = createSlice({
    name: "earnings",
    initialState: initialEarningTranState,
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
        earning_deduction_tran_Fetched: (state, action) => {
            // console.log(action)
            console.log("user slice",action.payload)
            
            const entities = action.payload.data?.data.rows;
            console.log("ent earning_deduction_tran_",entities)
            const totalResult = action.payload.data?.data.totalResults;
            console.log(entities);
            state.listLoading = false;
            state.error = null;
            state.entities = entities;
            state.totalCount = totalResult;
        },

         //get User By ID
         earning_deduction_tran_FetchedForEdit: (state, action) => {
            console.log("get user detail from receipt slice")
            console.log(action);
            state.actionsLoading = false;
            state.userForEdit = action.payload.userForEdit;
            state.error = null;
        },

        //get User By ID
        userFetched: (state, action) => {
            console.log("get user detail from receipt slice")
            console.log(action);
            state.actionsLoading = false;
            state.userForEdit = action.payload.userForEdit;
            state.error = null;
        },
        earning_deduction_tran_Deleted: (state, action) => {

            state.error = null;
            state.actionsLoading = false;
            console.log("earning_deduction_tran_ deleted ")
            console.log(state.entities);
            state.entities = state.entities.filter(
                (el) => el.Id !== action.payload.Id
            );
        },
        earning_deduction_tran_Created: (state, action) => {
             console.log("action payload for earning_deduction_tran_", action.payload);
            state.actionsLoading = false;
            state.error = null;
            state.entities.unshift(action.payload);
        },
        earning_deduction_tran_Updated: (state, action) => {
            state.error = null;
            state.actionsLoading = false;
            // state.entities.push(action.payload)
          
            state.entities = state.entities.map((entity) => {
                console.log("payload aca",action.payload);
                //const payload = { ...action.payload };
                let payload = JSON.stringify(action.payload)
                let payloadObj = JSON.parse(payload);
                let finalObj = JSON.parse(payloadObj.updatedEarning);
                if (entity.Id === finalObj.Id) {
                    return finalObj; //action.payload.updatedearning;
                }
                return entity;
            });
           
        },
        RolesFetched: (state, action) => {
            const entities = action.payload;
            state.listLoading = false;
            state.error = null;
            state.roles = entities;
        },
        CentersFetched: (state, action) => {
            const entities = action.payload;
            state.listLoading = false;
            state.error = null;
            state.centers = entities;
        },
        UserStatusTypesFetched: (state, action) => {
            const entities = action.payload;
            state.listLoading = false;
            state.error = null;
            state.userStatusTypes = entities;
        },
        donationReportFetch: (state, action) => {
            state.donationReportFetch = action.payload;
        },
        MaxIdFetchForReceipt: (state, action) => {
            state.donationReportFetch = action.payload;
        },
    },
});

// export const RoleSlice = createSlice({
//   name: "getAllRole",
//   initialState: initialRolesState,
//   reducers: {
//     catchError: (state, action) => {
//       state.error = `${action.type}: ${action.payload.error}`
//       if (action.payload.callType === callTypes.list) {
//         state.listLoading = false
//       } else {
//         state.actionsLoading = false
//       }
//     },
//     startCall: (state, action) => {
//       state.error = null
//       if (action.payload.callType === callTypes.list) {
//         state.listLoading = true
//       } else {
//         state.actionsLoading = true
//       }
//     },
//     dataFetched: (state, action) => {
//       const entities = action.payload
//       state.listLoading = false
//       state.error = null
//       state.entities = entities
//       state.totalCount = entities.length
//     },
//   },
// })
