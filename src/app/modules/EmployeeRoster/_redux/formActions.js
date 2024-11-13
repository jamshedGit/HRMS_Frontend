import * as requestFromServer from "./formCrud";
import { EmployeeRosterSlice, callTypes } from "./EmployeeRosterSlice";
import { toast } from "react-toastify";
const { actions } = EmployeeRosterSlice;

/**
 * 
 * Fetch All Employee Roster Paginated from the server
 * 
 * @param {Object} queryparm 
 * @returns 
 */
export const fetchEmployeeRoster = (queryparm) => async (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer.getAllEmployeeRosterSetup(queryparm)
    .then((response) => {
      dispatch(actions.EmployeeRosterFetched(response));
    })
    .catch((error) => {
      error.clientMessage = "Can't find Employee Rosters";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};

/**
 * 
 * Fetch Single Employee Roster Record by Id
 * 
 * @param {string|number} id 
 * @returns
 */
export const fetchEditRecord = (id) => (dispatch) => {
  if (!id) {
    return dispatch(actions.EmployeeRosterFetchedForEdit(null));
  }
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .getEmployeeRosterSetupById(id)
    .then((response) => {

      const entities = response.data?.data;
      dispatch(actions.EmployeeRosterFetchedForEdit({ userForEdit: entities }));
    })
    .catch((error) => {
      error.clientMessage = "Can't find Employee Roster";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

/**
 * 
 * Save or update Employee Roster Record
 * 
 * @param {Object} data 
 * @param {String|Number|Null} id 
 * @param {Function} disableLoading 
 * @param {Function} resetForm 
 * @returns 
 */
export const saveRecord = (data, id, disableLoading, resetForm) => (dispatch) => {
  if (!id) {
    return requestFromServer.createEmployeeRosterSetup(data)
      .then((res) => {
        const EmployeeRosterData = res.data?.data;
        if (EmployeeRosterData) {
          dispatch(actions.EmployeeRosterCreated(EmployeeRosterData));
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
          resetForm();
        }
      })
      .catch((error) => {
        disableLoading();
        error.clientMessage = "Can't Create Employee Roster";
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
    return requestFromServer.updateEmployeeRosterSetup(data)
      .then((res) => {
        const EmployeeRosterData = res.data?.data;
        if (EmployeeRosterData) {
          dispatch(actions.EmployeeRosterUpdated(EmployeeRosterData));
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
        }
      })
      .catch((error) => {
        disableLoading();
        error.clientMessage = "Can't Update Employee Roster";
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
 * Delete Single Employee Roster Record By Id
 * 
 * @param {String|Number} id 
 * @param {Function} disableLoading 
 * @param {Function} onHide 
 * @returns 
 */
export const deleteRecord = (id, disableLoading, onHide) => (dispatch) => {
  return requestFromServer.deleteEmployeeRosterSetup(id)
    .then((res) => {
      dispatch(actions.EmployeeRosterDeleted({ id }));
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
      error.clientMessage = "Can't Delete Employee Roster";
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

