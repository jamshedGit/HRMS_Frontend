import * as requestFromServer from "./formCrud";
import { payroll_policySlice, callTypes } from "./payroll_policySlice";
import { toast } from "react-toastify";
import { format } from 'date-fns';
const { actions } = payroll_policySlice;
// const { roleActions } = getAllrolesSlice

export const fetchUsers = (queryparm) => async (dispatch) => {
  // console.log("Receive QPsss", queryparm)
  dispatch(actions.startCall({ callType: callTypes.list }));
  console.log("test query param", queryparm)
  return requestFromServer.getAll_Payroll_Policy(queryparm)
   
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
      console.log("response", response)
      dispatch(actions.Payroll_Policy_Fetched(response));
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
    return dispatch(actions.Payroll_Policy_FetchedForEdit({ userForEdit: undefined }));
  }

  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .get_Payroll_Policy_ById({ Id: id })
    .then((response) => {
      const entities = response.data?.data;

      console.log("User fetched for search " + id)
      dispatch(actions.Payroll_Policy_FetchedForEdit({ userForEdit: entities }));
    })
    .catch((error) => {
      error.clientMessage = "Can't find user";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const delete_Payroll_Policy = (id) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .delete_Payroll_Policy({ Id: id })
    .then((response) => {
      //console.log("response from delete user ", response.data.message)
      dispatch(actions.Payroll_Policy_Deleted({ Id: id }));
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
    .delete_Payroll_Policy({ receiptId: id })
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

export const create_Payroll_Policy = (Payroll_Policy_ForCreation, disbaleLoading, onHide) => (
  dispatch
) => {
  // Payroll_Policy_ForCreation.phNo = Payroll_Policy_ForCreation.phNo.toString();
  // Payroll_Policy_ForCreation.cnic = Payroll_Policy_ForCreation.cnic.toString();

  console.log("_Payroll_Policy_ for creation", Payroll_Policy_ForCreation);
  return requestFromServer
    .create_Payroll_Policy(Payroll_Policy_ForCreation)
    .then((res) => {
      dispatch(actions.startCall({ callType: callTypes.action }));
      const user = res.data?.data;
      console.log("_Payroll_Policy_ data");
      console.log(user);
      dispatch(actions.Payroll_Policy_Created(user));
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

export const update_Payroll_Policy = (user, disbaleLoading, onHide) => (dispatch) => {
  return requestFromServer
    .update_Payroll_Policy(user)
    .then((response) => {
      console.log("my response",response?.config?.data);
      const updated_Payroll_Policy_ = response?.config?.data; // response.data?.data;
      console.log("bnkAction Res", response)
      dispatch(actions.Payroll_Policy_Updated({ updated_Payroll_Policy_ }));
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
