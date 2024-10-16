import * as requestFromServer from "./formCrud";
import { LeaveTypeSlice, callTypes } from "./leaveTypeSlice";
import { toast } from "react-toastify";
const { actions } = LeaveTypeSlice;

/**
 * 
 * Fetch All Leave Type Paginated from the server
 * 
 * @param {Object} queryparm 
 * @returns 
 */
export const fetchLeaveType = (queryparm) => async (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer.getAllLeaveTypeSetup(queryparm)
    .then((response) => {
      dispatch(actions.LeaveTypeFetched(response));
    })
    .catch((error) => {
      error.clientMessage = "Can't find Leave Types";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};

/**
 * 
 * Fetch Single Leave Type Record by Id
 * 
 * @param {string|number} id 
 * @returns
 */
export const fetchEditRecord = (id) => (dispatch) => {
  if (!id) {
    return dispatch(actions.LeaveTypeFetchedForEdit(null));
  }
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .getLeaveTypeSetupById(id)
    .then((response) => {

      const entities = response.data?.data;
      dispatch(actions.LeaveTypeFetchedForEdit({ userForEdit: entities }));
    })
    .catch((error) => {
      error.clientMessage = "Can't find Leave Type";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

/**
 * 
 * Fetch Leave Type Dropdown Data
 * 
 * @returns
 */
export const fetchTypeDropdownData = () => (dispatch) => {
  return requestFromServer
    .getTypeDropdownData()
    .then((response) => {
      const dropdownData = response.data?.data;
      dispatch(actions.typeDropdownFetched({ dropdownData }));
    })
    .catch((error) => {
      error.clientMessage = "Can't find dropdown data";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

/**
 * 
 * Save or update Leave Type Record
 * 
 * @param {Object} data 
 * @param {String|Number|Null} id 
 * @param {Function} disableLoading 
 * @param {Function} onHide 
 * @returns 
 */
export const saveRecord = (data, id, disableLoading, onHide) => (dispatch) => {
  if (!id) {
    return requestFromServer.createLeaveTypeSetup(data)
      .then((res) => {
        const leaveTypeData = res.data?.data;
        if (leaveTypeData) {
          dispatch(actions.LeaveTypeCreated(leaveTypeData));
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
          onHide();
        }
      })
      .catch((error) => {
        disableLoading();
        error.clientMessage = "Can't Create Leave Type";
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
  else {
    return requestFromServer.updateLeaveTypeSetup(data)
      .then((res) => {
        const leaveTypeData = res.data?.data;
        if (leaveTypeData) {
          dispatch(actions.LeaveTypeUpdated(leaveTypeData));
          disableLoading();
          toast.success("Successfully Updated", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          onHide();
        }
      })
      .catch((error) => {
        disableLoading();
        error.clientMessage = "Can't Update Leave Type";
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
};

/**
 * 
 * Delete Single Leave Type Record By Id
 * 
 * @param {String|Number} id 
 * @param {Function} disableLoading 
 * @param {Function} onHide 
 * @returns 
 */
export const deleteRecord = (id, disableLoading, onHide) => (dispatch) => {
  return requestFromServer.deleteLeaveTypeSetup(id)
    .then((res) => {
      dispatch(actions.LeaveTypeDeleted({ id }));
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
      error.clientMessage = "Can't Delete Leave Type";
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