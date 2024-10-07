import * as requestFromServer from "./salarypolicyCrud";
import { salarypolicySlice, callTypes } from "./salarypolicySlice";
import { toast } from "react-toastify";

const { actions } = salarypolicySlice;
// const { roleActions } = getAllrolesSlice

export const fetchUsers = (queryparm) => async (dispatch) => {
  // console.log("Receive QPsss", queryparm)
  dispatch(actions.startCall({ callType: callTypes.list }));
  console.log("test query param", queryparm)
  return requestFromServer.getAllSalarypolicy(queryparm)
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
      dispatch(actions.salarypolicyFetched(response));
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
    return dispatch(actions.SalarypolicyFetchedForEdit({ userForEdit: undefined }));
  }

  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .getSalarypolicyById({ Id: id })
    .then((response) => {
      const entities = response.data?.data;

      console.log("User fetched for search " + id)
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
      //console.log("response from delete user ", response.data.message)
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

export const activeUser = (id) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deleteSalarypolicy({ receiptId: id })
    .then((response) => {
      //console.log("response from delete user ", response.data.message)
      dispatch(actions.userDeleted({ id: id }));
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
     
      console.log(user);
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
      console.log("my response",response?.config?.data);
      const updatedSalarypolicy = response?.config?.data; // response.data?.data;
      console.log("bnkAction Res", response)
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

export const fetchRoles = () => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.list }));

  return requestFromServer
    .getAllRoles()
    .then((response) => {
      const entities = response.data?.data;
      // console.log("User entities: ", entities)
      dispatch(actions.RolesFetched(entities));
    })
    .catch((error) => {
      error.clientMessage = "Can't find roles";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};

export const fetchCenters = () => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer.getAllCenters().then((response) => {
    const entities = response.data?.data;
    dispatch(actions.CentersFetched(entities));
  });
};

export const fetchUserStatusTypes = (body) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer.getAllUserStatusTypes(body).then((response) => {
    const entities = response.data?.data;
    dispatch(actions.UserStatusTypesFetched(entities));
  });
};


export const fetchDonationReport = (body) => async (dispatch) => {
  return await requestFromServer
    .donationReport(body)
    .then((response) => {
      console.log("Res", response);
      const entities = response?.data?.data;
      dispatch(actions.donationReportFetch(entities));
    })
    .catch((error) => {
      toast("error", "Data not found");
    });
};
