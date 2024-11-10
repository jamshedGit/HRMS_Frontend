import * as requestFromServer from "./redux-Crud";
import { reimbursement_claimSlice, callTypes } from "./redux-Slice";
import { toast } from "react-toastify";

const { actions } = reimbursement_claimSlice;


export const fetchReimbursementClaim = (params) => async (dispatch) => {


  

  return requestFromServer.getAllReimbursementClaim(params)

    .then((response) => {

     
      dispatch(actions.reimbursementClaimFetched(response));
    })
    .catch((error) => {

      error.clientMessage = "Can't find ";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};

export const fetchmoduledata = (id) => (dispatch) => {


  if (!id) {
    return dispatch(actions.ReimbursementClaimFetchedForEdit({ userForEdit: undefined }));
  }

  return requestFromServer
    .getReimbursementClaimById({ Id: id })
    .then((response) => {
      const entities = response.data?.data;


      dispatch(actions.ReimbursementClaimFetchedForEdit({ userForEdit: entities }));
    })
    .catch((error) => {
      error.clientMessage = "Can't find user";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const deleteReimbursementClaim= (id) => (dispatch) => {

  return requestFromServer
    .deleteReimbursementClaim({ Id: id })
    .then((response) => {

      dispatch(actions.ReimbursementClaimDeleted({ Id: id }));
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


export const createReimbursementClaim = (reimbursementClaimForCreation, disbaleLoading, onHide) => (
  dispatch
) => {

  return requestFromServer
    .createReimbursementClaim(reimbursementClaimForCreation)
    .then((res) => {
     
      const user = res.data?.data;


      dispatch(actions.reimbursementClaimCreated(user));
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


export const getAllReimbursementConfigPolicy = (employeeId) => (

  dispatch
) => {

  return requestFromServer
    .getAllReimbursementConfigPolicy(employeeId)
    .then((res) => {

      const user = res.data?.data;


      dispatch(actions.getReimbursementConfigPolicies(user));

      // toast.success("Successfully", {
      //   position: "top-right",
      //   autoClose: 5000,
      //   hideProgressBar: false,
      //   closeOnClick: true,
      //   pauseOnHover: true,
      //   draggable: true,
      //   progress: undefined,
      // });
  
    })
    .catch((error) => {
      error.clientMessage = "Can't create user";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      dispatch(actions.getReimbursementConfigPolicies(null));
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



export const updateReimbursementClaim = (user, disbaleLoading, onHide) => (dispatch) => {
  return requestFromServer
    .updateReimbursementClaim(user)
    .then((response) => {

      const updatedReimbursementClaim = response?.config?.data; // response.data?.data;


      dispatch(actions.clearUserForEdit());
      dispatch(actions.reimbursementClaimUpdated({ updatedReimbursementClaim }));

    
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
