import * as requestFromServer from "./redux-Crud";
import { payroll_processSlice, callTypes } from "./redux-Slice";
import { toast } from "react-toastify";

const { actions } = payroll_processSlice;


export const fetchPayrollProcess = (params) => async (dispatch) => {


  

  return requestFromServer.getAllPayrollProcess(params)

    .then((response) => {

     
      dispatch(actions.payrollProcessFetched(response));
    })
    .catch((error) => {

      error.clientMessage = "Can't find ";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};

export const fetchmoduledata = (id) => (dispatch) => {


  if (!id) {
    return dispatch(actions.PayrollProcessFetchedForEdit({ userForEdit: undefined }));
  }

  return requestFromServer
    .getPayrollProcessById({ Id: id })
    .then((response) => {
      const entities = response.data?.data;


      dispatch(actions.PayrollProcessFetchedForEdit({ userForEdit: entities }));
    })
    .catch((error) => {
      error.clientMessage = "Can't find user";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const deletePayrollProcess= (id) => (dispatch) => {

  return requestFromServer
    .deletePayrollProcess({ Id: id })
    .then((response) => {

      dispatch(actions.PayrollProcessDeleted({ Id: id }));
      toast.success("Successfully Deleted", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    })
    .catch((error) => {
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      toast.error(error.response.data.message);
    });
};


export const createPayrollProcess = (payrollProcessForCreation, disbaleLoading, onHide) => (
  dispatch
) => {

  return requestFromServer
    .createPayrollProcess(payrollProcessForCreation)
    .then((res) => {
     
      const user = res.data?.data;


      dispatch(actions.payrollProcessCreated(user));
      disbaleLoading();
      toast.success("Successfully Created", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      onHide();
    })
    .catch((error) => {
      error.clientMessage = "Can't create user";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      disbaleLoading();
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





export const updatePayrollProcess = (user, disbaleLoading, onHide) => (dispatch) => {
  return requestFromServer
    .updatePayrollProcess(user)
    .then((response) => {

      const updatedPayrollProcess = response?.config?.data; // response.data?.data;


      dispatch(actions.clearUserForEdit());
      dispatch(actions.payrollProcessUpdated({ updatedPayrollProcess }));

    
      disbaleLoading();
      onHide();
      toast.success(response.data.message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });


    })
    .catch((error) => {

      dispatch(actions.catchError({ error, callType: callTypes.action }));
      disbaleLoading();
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
