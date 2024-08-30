import { createSlice } from "@reduxjs/toolkit";

const initialBranchState = {
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

export const branchSlice = createSlice({
    name: "branch",
    initialState: initialBranchState,
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
        branchFetched: (state, action) => {
            // console.log(action)
            console.log("user slice",action.payload)
            const entities = action.payload.data?.data.rows;
            console.log("ent branch",entities)
            const totalResult = action.payload.data?.data.totalResults;
            console.log(entities);
            state.listLoading = false;
            state.error = null;
            state.entities = entities;
            state.totalCount = totalResult;
        },

         //get User By ID
         branchFetchedForEdit: (state, action) => {
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
        branchDeleted: (state, action) => {

            state.error = null;
            state.actionsLoading = false;
            console.log("branch deleted ")
            console.log(state.entities);
            state.entities = state.entities.filter(
                (el) => el.Id !== action.payload.Id
            );
        },
        branchCreated: (state, action) => {
             console.log("action payload for branch", action.payload);
            state.actionsLoading = false;
            state.error = null;
            state.entities.unshift(action.payload);
        },
        branchUpdated: (state, action) => {
            state.error = null;
            state.actionsLoading = false;
            // state.entities.push(action.payload)
          
            state.entities = state.entities.map((entity) => {
                
                console.log("entity.Id",entity.Id);
                console.log("action.payload.updatedBank.Id",action.payload.updatedBank)
                if (entity.Id === action.payload.updatedBank.Id) {
                    console.log("return val",action.payload.updatedBank)
                    return action.payload.updatedBank;
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
