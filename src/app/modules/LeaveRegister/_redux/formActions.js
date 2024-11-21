import * as requestFromServer from "./formCrud";
import { LeaveRegisterSlice, callTypes } from "./LeaveRegisterSlice";
const { actions } = LeaveRegisterSlice;

/**
 * 
 * Fetch All Registered Leaves Paginated from the server
 * 
 * @param {Object} queryparm 
 * @returns 
 */
export const fetchLeaveRegister = (queryparm) => async (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer.getAllLeaveRegisterSetup(queryparm)
    .then((response) => {
      dispatch(actions.LeaveRegisterFetched(response));
    })
    .catch((error) => {
      error.clientMessage = "Can't find Registered leaves";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};
