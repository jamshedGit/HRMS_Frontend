import * as requestFromServer from "./formCrud";
import { leaveManagementConfigurationSlice, callTypes } from "./leaveManagementConfigurationSlice";
import { toast } from "react-toastify";
const { actions } = leaveManagementConfigurationSlice;

/**
 * 
 * Fetch All Leave Configurations Paginated from the server
 * 
 * @param {Object} queryparm 
 * @returns 
 */
export const fetchleaveManagementConfiguration = (queryparm) => async (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer.getAllleaveManagementConfigurationSetup(queryparm)
    .then((response) => {
      dispatch(actions.leaveManagementConfigurationFetched(response));
    })
    .catch((error) => {
      error.clientMessage = "Can't find Leave Configurations";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};

/**
 * 
 * Fetch Single Leave Configurations Record by Id
 * 
 * @param {string|number} id 
 * @returns
 */
export const fetchEditRecord = (id) => (dispatch) => {
  if (!id) {
    return dispatch(actions.leaveManagementConfigurationFetchedForEdit(null));
  }
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .getleaveManagementConfigurationSetupById(id)
    .then((response) => {

      const entities = response.data?.data;
      dispatch(actions.leaveManagementConfigurationFetchedForEdit({ userForEdit: entities }));
    })
    .catch((error) => {
      error.clientMessage = "Can't find Leave Configurations";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

/**
 * 
 * Fetch Leave Configurations Dropdown Data
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
 * Save or update Leave Configurations Record
 * 
 * @param {Object} data 
 * @param {String|Number|Null} id 
 * @param {Function} disableLoading 
 * @param {Function} onHide 
 * @returns 
 */
export const saveRecord = (data, id, disableLoading, onHide) => (dispatch) => {
  if (!id) {
    return requestFromServer.createleaveManagementConfigurationSetup(data)
      .then((res) => {
        const leaveManagementConfigurationData = res.data?.data;
        if (leaveManagementConfigurationData) {
          dispatch(actions.leaveManagementConfigurationCreated(leaveManagementConfigurationData));
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
        error.clientMessage = "Can't Create Leave Configurations";
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
    return requestFromServer.updateleaveManagementConfigurationSetup(data)
      .then((res) => {
        const leaveManagementConfigurationData = res.data?.data;
        if (leaveManagementConfigurationData) {
          dispatch(actions.leaveManagementConfigurationUpdated(leaveManagementConfigurationData));
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
        error.clientMessage = "Can't Update Leave Configurations";
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
 * Delete Single Leave Configurations Record By Id
 * 
 * @param {String|Number} id 
 * @param {Function} disableLoading 
 * @param {Function} onHide 
 * @returns 
 */
export const deleteRecord = (id, disableLoading, onHide) => (dispatch) => {
  return requestFromServer.deleteleaveManagementConfigurationSetup(id)
    .then((res) => {
      dispatch(actions.leaveManagementConfigurationDeleted({ id }));
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
      error.clientMessage = "Can't Delete Leave Configurations";
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
