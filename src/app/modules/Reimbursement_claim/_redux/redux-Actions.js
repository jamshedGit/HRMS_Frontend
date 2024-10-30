import * as requestFromServer from "./redux-Crud";
import {reimbursement_claimSlice, callTypes } from "./redux-Slice";
import { toast } from "react-toastify";

const { actions } = reimbursement_claimSlice;


export const fetchSalarypolicies = (params) => async (dispatch) => {


  dispatch(actions.startCall({ callType: callTypes.list }));

  return requestFromServer.getAllSalarypolicy(params)

    .then((response) => {
   
      console.log("response",response)
      dispatch(actions.salarypolicyFetched(response));
    })
    .catch((error) => {
     
      error.clientMessage = "Can't find ";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};

export const fetchmoduledata = (id) => (dispatch) => {
console.log("fetchmoduledata",fetchmoduledata)

  if (!id) {
    return dispatch(actions.SalarypolicyFetchedForEdit({ userForEdit: undefined }));
  }

  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .getSalarypolicyById({ Id: id })
    .then((response) => {
      const entities = response.data?.data;


      dispatch(actions.SalarypolicyFetchedForEdit({ userForEdit: entities }));
    })
    .catch((error) => {
      error.clientMessage = "Can't find user";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const deleteSalarypolicy = (id) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deleteSalarypolicy({ Id: id })
    .then((response) => {
  
      dispatch(actions.SalarypolicyDeleted({ Id: id }));
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

export const uploadImage = async (file) => {
  const formData = new FormData()
  formData.append('file', file)
  return await requestFromServer.uploadImage(formData)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      error.clientMessage = "File not Uploaded";
      // dispatch(actions.catchError({ error, callType: callTypes.list }));
    });

};


export const createSalarypolicy = (salarypolicyForCreation, disbaleLoading, onHide) => (
  dispatch
) => {
  // salarypolicyForCreation.phNo = salarypolicyForCreation.phNo.toString();
  // salarypolicyForCreation.cnic = salarypolicyForCreation.cnic.toString();

  
  return requestFromServer
    .createSalarypolicy(salarypolicyForCreation)
    .then((res) => {
      dispatch(actions.startCall({ callType: callTypes.action }));
      const user = res.data?.data;
     

      dispatch(actions.salarypolicyCreated(user));
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

export const updateSalarypolicy = (user, disbaleLoading, onHide) => (dispatch) => {
  return requestFromServer
    .updateSalarypolicy(user)
    .then((response) => {

      const updatedSalarypolicy = response?.config?.data; // response.data?.data;

      dispatch(actions.salarypolicyUpdated({ updatedSalarypolicy }));
      dispatch(actions.startCall({ callType: callTypes.action }));
      disbaleLoading();
      onHide();
      toast.success(response.data.message + " Updated", {
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
