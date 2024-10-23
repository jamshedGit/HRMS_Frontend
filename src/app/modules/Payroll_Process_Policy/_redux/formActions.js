import * as requestFromServer from "./formCrud";
import { payroll_policySlice, callTypes } from "./payroll_policySlice";
import { toast } from "react-toastify";
import { format } from 'date-fns';
const { actions } = payroll_policySlice;
// const { roleActions } = getAllrolesSlice

export const fetchUsers = (queryparm) => async (dispatch) => {
  // console.log("Receive QPsss", queryparm)
  dispatch(actions.startCall({ callType: callTypes.list }));
 
  return requestFromServer.getAll_Payroll_Policy(queryparm)

    .then((response) => {
    
      console.log("::fetchted::",response)
      dispatch(actions.Payroll_Policy_Fetched(response));
    })
    .catch((error) => {
      
      error.clientMessage = "Can't find records";
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

      console.log("response::",response);
      console.log("User fetched for search " + entities)
     
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

export const create_Payroll_Policy = (Payroll_Policy_ForCreation, emailRecipentList, eobiAllowancesList,bankInfoList,sessiAllowanceList) => (
  dispatch
) => {
  console.log("::payroll body::", Payroll_Policy_ForCreation, emailRecipentList, eobiAllowancesList,bankInfoList,sessiAllowanceList);
  return requestFromServer
    .create_Payroll_Policy(Payroll_Policy_ForCreation, emailRecipentList, eobiAllowancesList,bankInfoList,sessiAllowanceList)
    .then((res) => {
      dispatch(actions.startCall({ callType: callTypes.action }));
      const user = res.data?.data;
   
      dispatch(actions.Payroll_Policy_Created(user));
     
      toast.success("Successfully Created", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      //  onHide();
    })
    .catch((error) => {
      error.clientMessage = "Can't create user";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      
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

export const update_Payroll_Policy = (user) => (dispatch) => {
  return requestFromServer
    .update_Payroll_Policy(user)
    .then((response) => {
      console.log("my response", response?.config?.data);
      const updated_Payroll_Policy_ = response?.config?.data; // response.data?.data;
      console.log("bnkAction Res", response)
      dispatch(actions.Payroll_Policy_Updated({ updated_Payroll_Policy_ }));
      dispatch(actions.startCall({ callType: callTypes.action }));


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
