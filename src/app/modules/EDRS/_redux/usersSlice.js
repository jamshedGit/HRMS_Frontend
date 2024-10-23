import { createSlice } from "@reduxjs/toolkit";
import { string } from "prop-types";

const initialUsersState = {
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

export const usersSlice = createSlice({
  name: "receipt",
  initialState: initialUsersState,
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
    test: (string) => {

      console.log(string)
    }
    ,
    receiptFetched: (state, action) => {
     console.log("edrs slice")
      const entities = action.payload.data?.data.rows;
      const totalResult = action.payload.data?.data.totalResults;
      console.log(entities);
      // const entities = action.payload
      //const length = entities.length
      state.listLoading = false;
      state.error = null;
      state.entities = entities;
      state.totalCount = totalResult;
    },
    //get User By ID
    userFetched: (state, action) => {
    console.log("receipt slice")
    console.log(state);
      state.actionsLoading = false;
      state.userForEdit = action.payload.userForEdit;
      state.error = null;
    },
    userDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) => el.id !== action.payload.id
      );
    },
    userCreated: (state, action) => {
      // console.log("action payload for user", action.payload);
      state.actionsLoading = false;
      state.error = null;
      state.entities.unshift(action.payload);
    },
    userUpdated: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      // state.entities.push(action.payload)
       console.log("user update payload", action.payload);
       state.entities = state.entities.map((entity) => {
        if (entity.id === action.payload.updatedUser.id) {
          return action.payload.updatedUser;
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
