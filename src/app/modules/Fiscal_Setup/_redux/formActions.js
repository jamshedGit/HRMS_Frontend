import * as requestFromServer from "./formCrud";
import { fiscalSetupSlice, callTypes } from "./fiscalSetupSlice";
import { toast } from "react-toastify";
import { format } from 'date-fns';
const { actions } = fiscalSetupSlice;
// const { roleActions } = getAllrolesSlice

export const fetchUsers = (queryparm) => async (dispatch) => {
  // console.log("Receive QPsss", queryparm)
  dispatch(actions.startCall({ callType: callTypes.list }));
  
  return requestFromServer.getAllfiscalSetup(queryparm)
   
    .then((response) => {
      //  console.log("user action receipt fetched 321")
     

      const formatDates = (dataArray) => {
        return dataArray.map(item => ({
            ...item,
            startDate: format(new Date(item.startDate), 'dd-MMM-yyyy') ,
            endDate: format(new Date(item.endDate), 'dd-MMM-yyyy') ,
            isActive: item.isActive == true ? "Yes" : "No"
        }));
    };
    
    // Format the dates in the response
    response.data.data.rows = formatDates(response.data?.data?.rows);
      
      dispatch(actions.FiscalSetupFetched(response));
    })
    .catch((error) => {
      //console.log("Can't find user", error)
      error.clientMessage = "Can't find receipts";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};

export const fetchUser = (id) => (dispatch) => {

  
  if (!id) {
    return dispatch(actions.FiscalSetupFetchedForEdit({ userForEdit: undefined }));
  }

  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .getfiscalSetupById({ Id: id })
    .then((response) => {
      const entities = response.data?.data;

      console.log("User fetched for search " + id)
      dispatch(actions.FiscalSetupFetchedForEdit({ userForEdit: entities }));
    })
    .catch((error) => {
      error.clientMessage = "Can't find user";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const deleteFiscalSetup = (id) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deletefiscalSetup({ Id: id })
    .then((response) => {
      //console.log("response from delete user ", response.data.message)
      dispatch(actions.FiscalSetupDeleted({ Id: id }));
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
    .deletefiscalSetup({ receiptId: id })
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

export const createFiscalSetup = (FiscalSetupForCreation, disbaleLoading, onHide) => (
  dispatch
) => {
  // FiscalSetupForCreation.phNo = FiscalSetupForCreation.phNo.toString();
  // FiscalSetupForCreation.cnic = FiscalSetupForCreation.cnic.toString();

  console.log("FiscalSetup for creation", FiscalSetupForCreation);
  return requestFromServer
    .createfiscalSetup(FiscalSetupForCreation)
    .then((res) => {
      dispatch(actions.startCall({ callType: callTypes.action }));
      const user = res.data?.data;
      console.log("FiscalSetup data");
      console.log(user);
      dispatch(actions.FiscalSetupCreated(user));
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

export const updateFiscalSetup = (user, disbaleLoading, onHide) => (dispatch) => {
  return requestFromServer
    .updatefiscalSetup(user)
    .then((response) => {
      console.log("my response",response?.config?.data);
      const updatedFiscalSetup = response?.config?.data; // response.data?.data;
      console.log("bnkAction Res", response)
      dispatch(actions.FiscalSetupUpdated({ updatedFiscalSetup }));
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
