import { createSlice } from "@reduxjs/toolkit";

const initialEmpProfileState = {
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

export const empProfileSlice = createSlice({
    name: "emp profile",
    initialState: initialEmpProfileState,
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
        profileFetched: (state, action) => {
            // console.log(action)
            console.log("user slice", action.payload)
            const entities = action.payload.data?.data.rows;
            console.log("ent emp_profile", entities)
            const totalResult = action.payload.data?.data.totalResults;
            console.log(entities);
            state.listLoading = false;
            state.error = null;
            state.entities = entities;
            state.totalCount = totalResult;
        },

        //get User By ID
        emp_profileFetchedForEdit: (state, action) => {
            console.log("get user detail from emp_profile slice")
            console.log(action);
            state.actionsLoading = false;
            state.userForEdit = action.payload.userForEdit;
            state.error = null;
        },

        //get User By ID
        userFetched: (state, action) => {
            console.log("get user detail from emp_profile slice")
            console.log(action);
            state.actionsLoading = false;
            state.userForEdit = action.payload.userForEdit;
            state.error = null;
        },
        emp_profileDeleted: (state, action) => {

            state.error = null;
            state.actionsLoading = false;
            console.log("bank deleted ")
            console.log(state.entities);
            state.entities = state.entities.filter(
                (el) => el.Id !== action.payload.Id
            );
        },
        emp_profileCreated: (state, action) => {
            console.log("action payload for profile", action.payload);
            state.actionsLoading = false;
            state.error = null;
            state.entities.unshift(action.payload);
        },
        emp_profileUpdated: (state, action) => {
            state.error = null;
            state.actionsLoading = false;
            // state.entities.push(action.payload)
            console.log("emp_profileUpdated");
            state.entities = state.entities.map((entity) => {
                //const payload = { ...action.payload };
                let payload = JSON.stringify(action.payload)
                console.log("::payload", payload)
                let payloadObj = JSON.parse(payload);
                let finalObj   = JSON.parse(payloadObj.updatedProfile);

                if (entity.Id === finalObj.Id) {
                    return finalObj; //action.payload.updatedBank;
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
