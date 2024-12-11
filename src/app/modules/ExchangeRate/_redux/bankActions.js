import * as requestFromServer from "./bankCrud";
import { exchangeRateSlice, callTypes } from "./exchangeRateSlice";
import { toast } from "react-toastify";

const { actions } = exchangeRateSlice;
// const { roleActions } = getAllrolesSlice

export const fetchUsers = (queryparm) => async (dispatch) => {

  dispatch(actions.startCall({ callType: callTypes.list }));

  return requestFromServer.getAllExchangeRate({...queryparm,id:'null'})
    // .getAllReceipts({
    //   filter: {
    //     searchQuery: ""
    //   },
    //   sortBy: "receiptNo",
    //   limit: 10,
    //   page: 1
    // })
    .then((response) => {
    

      dispatch(actions.exchangeRateFetched(response));
    })
    .catch((error) => {
   
      error.clientMessage = "Can't find receipts";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};

export const fetchUser = (id) => (dispatch) => {

  if (!id) {
    return dispatch(actions.exchangeRateFetchedForEdit({ userForEdit: undefined }));
  }

  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .getExchangeRateById({ Id: id })
    .then((response) => {
      const entities = response.data?.data;

   
      dispatch(actions.exchangeRateFetchedForEdit({ userForEdit: entities }));
    })
    .catch((error) => {
      error.clientMessage = "Can't find user";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const deleteExchangeRate = (id) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deleteExchangeRate({ Id: id })
    .then((response) => {

      dispatch(actions.exchangeRateDeleted({ Id: id }));
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

export const activeUser = (id) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deleteExchangeRate({ receiptId: id })
    .then((response) => {
 
      dispatch(actions.exchangeRateDeleted({ id: id }));
      toast.success("Successfully Activated", {
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

export const createExchangeRate = (bankForCreation, disbaleLoading, onHide) => (
  dispatch
) => {
  // bankForCreation.phNo = bankForCreation.phNo.toString();
  // bankForCreation.cnic = bankForCreation.cnic.toString();


  return requestFromServer
    .createExchangeRate(bankForCreation)
    .then((res) => {
      dispatch(actions.startCall({ callType: callTypes.action }));
      const user = res.data?.data;

    
      dispatch(actions.exchangeRateCreated(user));
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

export const updateExchangeRate = (user, disbaleLoading, onHide) => (dispatch) => {
  return requestFromServer
    .updateExchangeRate(user)
    .then((response) => {

      const updateExchangeRateObj = response?.config?.data; // response.data?.data;
     
      dispatch(actions.exchangeRateUpdated({ updateExchangeRateObj }));
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
  
      //error.clientMessage = "Can't update User"
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


