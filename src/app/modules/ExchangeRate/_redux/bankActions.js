import * as requestFromServer from "./bankCrud";
import { exchangeRateSlice, callTypes } from "./exchangeRateSlice";
import { toast } from "react-toastify";

const { actions } = exchangeRateSlice;
// const { roleActions } = getAllrolesSlice

export const fetchUsers = (queryparm) => async (dispatch) => {
  // console.log("Receive QPsss", queryparm)
  dispatch(actions.startCall({ callType: callTypes.list }));
  console.log("test query param", queryparm)
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
      //  console.log("user action receipt fetched 321")
      console.log("response", response)
      dispatch(actions.exchangeRateFetched(response));
    })
    .catch((error) => {
      //console.log("Can't find user", error)
      error.clientMessage = "Can't find receipts";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};

export const fetchUser = (id) => (dispatch) => {

  console.log("User Action id " + id)
  if (!id) {
    return dispatch(actions.exchangeRateFetchedForEdit({ userForEdit: undefined }));
  }

  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .getExchangeRateById({ Id: id })
    .then((response) => {
      const entities = response.data?.data;

      console.log("User fetched for search " ,entities)
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
      //console.log("response from delete user ", response.data.message)
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
      //console.log("response from delete user ", response.data.message)
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

  console.log("createExchangeRate for creation", bankForCreation);
  return requestFromServer
    .createExchangeRate(bankForCreation)
    .then((res) => {
      dispatch(actions.startCall({ callType: callTypes.action }));
      const user = res.data?.data;
      console.log("mira",user);
      console.log("academic data");
      console.log(user);
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
      console.log("my response",response?.config?.data);
      const updateExchangeRateObj = response?.config?.data; // response.data?.data;
      console.log("stoppage_allowanceUpdated Res", response)
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
      // console.log("error User update", error)
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


