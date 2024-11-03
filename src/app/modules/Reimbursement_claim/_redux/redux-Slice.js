import { createSlice } from "@reduxjs/toolkit";




const initialReimbursementClaimState = {
    listLoading: false,
    actionsLoading: null,
    totalCount: 0,
    entities: null,
    roles: null,
    userStatusTypes: null,
    userForEdit: undefined,
    lastError: null,
    userForRead: false,
    reimbursement_config_policies_permission:null
};


export const callTypes = {
    list: "list",
    action: "action",
};

export const reimbursement_claimSlice = createSlice({
    name: "reimbursement_claimSlice",
    initialState: initialReimbursementClaimState,
    reducers: {
        catchError: (state, action) => {
            state.error = `${action.type}: ${action.payload.error}`;
            if (action.payload.callType === callTypes.list) {
                state.listLoading = false;
            } else {
                state.actionsLoading = false;
            }
        },

        clearUserForEdit : (state) => {
        
            state.userForEdit = null;
        },
        startCall: (state, action) => {
            state.error = null;
            if (action.payload.callType === callTypes.list) {
                state.listLoading = true;
            } else {
                state.actionsLoading = true;
            }
        },
        reimbursementClaimFetched: (state, action) => {
           
   
            const entities = action.payload.data?.data.rows;

            const totalResult = action.payload.data?.data.totalResults;
           
            state.listLoading = false;
            state.error = null;
            state.entities = entities;
            state.totalCount = totalResult;
        },

         //get User By ID
         ReimbursementClaimFetchedForEdit: (state, action) => {
          
     
            state.actionsLoading = false;
            state.userForEdit = action.payload.userForEdit;
            state.error = null;
        },

      
        ReimbursementClaimDeleted: (state, action) => {

            state.error = null;
            state.actionsLoading = false;
         
          
            state.entities = state.entities.filter(
                (el) => el.Id !== action.payload.Id
            );
        },
        reimbursementClaimCreated: (state, action) => {
           
            state.actionsLoading = false;
            state.error = null;
            state.entities.unshift(action.payload);
        },
        reimbursementClaimUpdated: (state, action) => {
            state.error = null;
            state.actionsLoading = false;
            // state.entities.push(action.payload)
          
            state.entities = state.entities.map((entity) => {
               
                //const payload = { ...action.payload };
                let payload = JSON.stringify(action.payload)
                let payloadObj = JSON.parse(payload);
                let finalObj = JSON.parse(payloadObj.updatedReimbursementClaim);
                if (entity.Id === finalObj.Id) {
                    return finalObj; 
                }
               
                return entity;
            });
           
        },

        getReimbursementConfigPolicies: (state, action) => {
           
            state.actionsLoading = false;
            state.error = null;
            state.reimbursement_config_policies_permission=action.payload;


            
        },


    },
});
