import { createSlice } from "@reduxjs/toolkit";

const initialSalarypolicyState = {
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

export const gratuity_configurationSlice = createSlice({
    name: "gratuity_configuration",
    initialState: initialSalarypolicyState,
    reducers: {
        catchError: (state, action) => {
            state.error = `${action.type}: ${action.payload.error}`;
            if (action.payload.callType === callTypes.list) {
                state.listLoading = false;
            } else {
                state.actionsLoading = false;
            }
        },
        // startCall: (state, action) => {
        //     state.error = null;
        //     if (action.payload.callType === callTypes.list) {
        //         state.listLoading = true;
        //     } else {
        //         state.actionsLoading = true;
        //     }
        // },
        salarypolicyFetched: (state, action) => {
        
  
            const entities = action.payload.data?.data.rows;
           
            const totalResult = action.payload.data?.data.totalResults;
            const updatedEntities = entities.map(entity => {
                // Check the basis_of_gratuityId and assign 'Gross' or 'Basis'
                const basis_of_gratuity = entity.basis_of_gratuityId === 0 ? 'Gross' : 'Basis';
                
                // Add the calculated salaryType to the entity
                return {
                    ...entity,
                    basis_of_gratuity // Add the new field to the entity
                };
            });
          
            state.listLoading = false;
            state.error = null;
            state.entities = updatedEntities;
            state.totalCount = totalResult;
           
        },

         //get User By ID
         SalarypolicyFetchedForEdit: (state, action) => {
           
   
            state.actionsLoading = false;
            state.userForEdit = action.payload.userForEdit;
            state.error = null;
        },

      
        SalarypolicyDeleted: (state, action) => {

            state.error = null;
            state.actionsLoading = false;
         
          
            state.entities = state.entities.filter(
                (el) => el.Id !== action.payload.Id
            );
        },





        // salarypolicyCreated: (state, action) => {
           
        //     state.actionsLoading = false;
        //     state.error = null;
        //     state.entities.unshift(action.payload);
        // },


        salarypolicyCreated: (state, action) => {
            state.actionsLoading = false;
            state.error = null;
        
            // Clone the payload to avoid direct mutation
            let payload = JSON.stringify(action.payload);
            let payloadObj = JSON.parse(payload);
        
            // If basis_of_gratuityId is 0, set "Gross", if 1, set "Basis"
            if (payloadObj.basis_of_gratuityId == 0) {
             
                payloadObj.basis_of_gratuity = "Gross";
            } else if (payloadObj.basis_of_gratuityId == 1) {
          
                payloadObj.basis_of_gratuity = "Basis";
            }
        
            // Add the modified payload to the beginning of the entities list
            state.entities.unshift(payloadObj);
        },
        



        salarypolicyUpdated: (state, action) => {
            state.error = null;
            state.actionsLoading = false;
            // state.entities.push(action.payload)
            
          
            state.entities = state.entities.map((entity) => {
                
                //const payload = { ...action.payload };
                let payload = JSON.stringify(action.payload)
                let payloadObj = JSON.parse(payload);
                let finalObj = JSON.parse(payloadObj.updatedSalarypolicy);
                if (entity.Id === finalObj.Id) {
                    return finalObj; //action.payload.updatedSalarypolicy;
                }
                return entity;
            });
           
        },


        // salarypolicyUpdated: (state, action) => {
        //     state.error = null;
        //     state.actionsLoading = false;
            
        //     // Iterate over the existing entities to update the one with the matching ID
        //     state.entities = state.entities.map((entity) => {
                
        //         // Create a deep clone of the payload to work with
        //         let payload = JSON.stringify(action.payload);
        //         let payloadObj = JSON.parse(payload);
        //         let finalObj = JSON.parse(payloadObj.updatedSalarypolicy);
                
        //         // Check if the current entity matches the updated entity by ID
        //         if (entity.Id === finalObj.Id) {
                    
        //             // Based on basis_of_gratuityId, we set Gross or Basis
        //             if (finalObj.basis_of_gratuityId === 0) {
        //                 // If basis_of_gratuityId is 0, set "Gross"
        //                 finalObj.salaryType = "Gross";
        //             } else if (finalObj.basis_of_gratuityId === 1) {
        //                 // If basis_of_gratuityId is 1, set "Basis"
        //                 finalObj.salaryType = "Basis";
        //             }
        
        //             // Return the updated entity with the new salaryType (Gross/Basis)
        //             return finalObj;
        //         }
                
        //         // If no match, return the entity as is
        //         return entity;
        //     });
        // },
        

    },
});
