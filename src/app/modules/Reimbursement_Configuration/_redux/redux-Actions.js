import * as requestFromServer from "./redux-Crud";
import {reimbursement_configurationSlice, callTypes } from "./redux-Slice";
import { toast } from "react-toastify";

const { actions } = reimbursement_configurationSlice;


export const fetchReimbursementConfigs = (queryparm) => async (dispatch) => {

 
  return requestFromServer.getAllReimbursementConfig(queryparm)

    .then((response) => {
   
  
      dispatch(actions.reimbursementConfigFetched(response));
    })
    .catch((error) => {
     
      error.clientMessage = "Can't find ";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};

export const fetchReimbursementConfig = (id) => (dispatch) => {


  if (!id) {
    return dispatch(actions.ReimbursementConfigFetchedForEdit({ userForEdit: undefined }));
  }


  return requestFromServer
    .getReimbursementConfigById({ Id: id })
    .then((response) => {
      const entities = response.data?.data;

   
      dispatch(actions.ReimbursementConfigFetchedForEdit({ userForEdit: entities }));
    })
    .catch((error) => {
      error.clientMessage = "Can't find user";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const deleteReimbursementConfig = (id) => (dispatch) => {

  return requestFromServer
    .deleteReimbursementConfig({ Id: id })
    .then((response) => {

      dispatch(actions.ReimbursementConfigDeleted({ Id: id }));
      toast.success("Successfully Deleted", {
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
      toast.error(error.response.data.message);
    });
};


export const createReimbursementConfig = (reimbursementConfigForCreation, disbaleLoading, onHide) => (
  dispatch
) => {

  
  return requestFromServer
    .createReimbursementConfig(reimbursementConfigForCreation)
    .then((res) => {

      const user = res.data?.data;
     
   
      dispatch(actions.reimbursementConfigCreated(user));
      disbaleLoading();
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

export const updateReimbursementConfig = (user, disbaleLoading, onHide) => (dispatch) => {
  return requestFromServer
    .updateReimbursementConfig(user)
    .then((response) => {
      
      const updatedReimbursementConfig = response?.config?.data; // response.data?.data;
   
      dispatch(actions.reimbursementConfigUpdated({ updatedReimbursementConfig }));
    
      disbaleLoading();
      onHide();
      toast.success(response.data.message , {
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
