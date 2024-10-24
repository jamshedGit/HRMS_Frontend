import * as requestFromServer from "./formCrud";
import { LeaveApplicationSlice, callTypes } from "./LeaveApplicationSlice";
import { toast } from "react-toastify";
const { actions } = LeaveApplicationSlice;

/**
 * 
 * Fetch All Leave Application Paginated from the server
 * 
 * @param {Object} queryparm 
 * @returns 
 */
export const uploadImage = (file) => {
  console.log('::::file::::::',file);
  
  const formData = new FormData()
  formData.append('file', file)
  return requestFromServer.uploadImage(formData)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      error.clientMessage = "File not Uploaded";
      // dispatch(actions.catchError({ error, callType: callTypes.list }));
    });

};

/**
 * 
 * Fetch All Leave Application Paginated from the server
 * 
 * @param {Object} queryparm 
 * @returns 
 */
export const fetchLeaveApplication = (queryparm, employeeId) => async (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  if (employeeId) {
    return requestFromServer.getAllLeaveApplicationSetup({ ...queryparm, employeeId })
      .then((response) => {
        dispatch(actions.LeaveApplicationFetched(response));
      })
      .catch((error) => {
        error.clientMessage = "Can't find Leave Applications";
        dispatch(actions.catchError({ error, callType: callTypes.list }));
      });
  }

};

/**
 * 
 * Fetch Single Leave Application Record by Id
 * 
 * @param {string|number} id 
 * @returns
 */
export const fetchEditRecord = (id) => (dispatch) => {
  if (!id) {
    return dispatch(actions.LeaveApplicationFetchedForEdit(null));
  }
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .getLeaveApplicationSetupById(id)
    .then((response) => {

      const entities = response.data?.data;
      dispatch(actions.LeaveApplicationFetchedForEdit({ userForEdit: entities }));
    })
    .catch((error) => {
      error.clientMessage = "Can't find Leave Application";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

/**
 * 
 * Save or update Leave Application Record
 * 
 * @param {Object} data 
 * @param {String|Number|Null} id 
 * @param {Function} disableLoading 
 * @param {Function} onHide 
 * @returns 
 */
export const saveRecord = (data, employeeId, disableLoading) => (dispatch) => {
  if (employeeId) {
    if (!data.Id) {
      return requestFromServer.createLeaveApplicationSetup({...data, employeeId})
        .then((res) => {
          const LeaveApplicationData = res.data?.data;
          console.log('::::::LeaveApplicationData::::', LeaveApplicationData);

          if (LeaveApplicationData) {
            dispatch(actions.LeaveApplicationCreated(LeaveApplicationData));
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
          error.clientMessage = "Can't Create Leave Application";
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
      return requestFromServer.updateLeaveApplicationSetup(data)
        .then((res) => {
          const LeaveApplicationData = res.data?.data;
          if (LeaveApplicationData) {
            dispatch(actions.LeaveApplicationUpdated(LeaveApplicationData));
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
          error.clientMessage = "Can't Update Leave Application";
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
  }

};

/**
 * 
 * Delete Single Leave Application Record By Id
 * 
 * @param {String|Number} id 
 * @param {Function} disableLoading 
 * @param {Function} onHide 
 * @returns 
 */
export const deleteRecord = (id, disableLoading, onHide) => (dispatch) => {
  return requestFromServer.deleteLeaveApplicationSetup(id)
    .then((res) => {
      dispatch(actions.LeaveApplicationDeleted({ id }));
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
      error.clientMessage = "Can't Delete Leave Application";
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
