import * as requestFromServer from "./formCrud";
import { EmployeeLeaveBalanceSlice, callTypes } from "./EmployeeLeaveBalanceSlice";
import { toast } from "react-toastify";
const { actions } = EmployeeLeaveBalanceSlice;

/**
 * 
 * Fetch All Employee Leave Balance Paginated from the server
 * 
 * @param {Object} queryparm 
 * @returns 
 */
export const fetchEmployeeLeaveBalance = (queryparm) => async (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer.getAllEmployeeLeaveBalanceSetup(queryparm)
    .then((response) => {
      dispatch(actions.EmployeeLeaveBalanceFetched(response));
    })
    .catch((error) => {
      error.clientMessage = "Can't find Employee Leave Balances";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};

/**
 * 
 * Fetch Single Employee Leave Balance Record by Id
 * 
 * @param {string|number} id 
 * @returns
 */
export const fetchEditRecord = (data) => (dispatch) => {
  if (!(data.employeeId && data.leaveType && data.yearId)) {
    return dispatch(actions.EmployeeLeaveBalanceFetchedForEdit(null));
  }
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .getEmployeeLeaveBalanceSetupByFilters(data)
    .then((response) => {

      const entities = response.data?.data;
      dispatch(actions.EmployeeLeaveBalanceFetchedForEdit(entities));
    })
    .catch((error) => {
      error.clientMessage = "Can't find Employee Leave Balance";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

/**
 * 
 * Save or update Employee Leave Balance Record
 * 
 * @param {Object} data 
 * @param {String|Number|Null} id 
 * @param {Function} disableLoading 
 * @param {Function} onHide 
 * @returns 
 */
export const saveRecord = (data, disableLoading) => (dispatch) => {
    return requestFromServer.createEmployeeLeaveBalanceSetup(data)
      .then((res) => {
        const EmployeeLeaveBalanceData = res.data?.data;
        if (EmployeeLeaveBalanceData) {
          dispatch(actions.EmployeeLeaveBalanceCreated(EmployeeLeaveBalanceData));
          disableLoading();
          toast.success("Successfully Created", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        }
      })
      .catch((error) => {
        disableLoading();
        error.clientMessage = "Can't Create Employee Leave Balance";
        toast.error(error?.response?.data?.message, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      });
};

/**
 * 
 * Delete Single Employee Leave Balance Record By Id
 * 
 * @param {String|Number} id 
 * @param {Function} disableLoading 
 * @param {Function} onHide 
 * @returns 
 */
export const deleteRecord = (id, disableLoading, onHide) => (dispatch) => {
  return requestFromServer.deleteEmployeeLeaveBalanceSetup(id)
    .then((res) => {
      dispatch(actions.EmployeeLeaveBalanceDeleted({ id }));
      disableLoading();
      toast.success("Successfully Deleted", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      onHide();
    })
    .catch((error) => {
      disableLoading();
      error.clientMessage = "Can't Delete Employee Leave Balance";
      toast.error(error?.response?.data?.message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    });
}
