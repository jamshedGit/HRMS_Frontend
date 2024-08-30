import * as requestFromServer from "./bankCrud";
import { compensationBenefitsSlice, callTypes } from "./compensationBenefitsSlice";
import { toast } from "react-toastify";
import axios from 'axios';
export const USERS_URL = process.env.REACT_APP_API_URL;

const { actions } = compensationBenefitsSlice;
// const { roleActions } = getAllrolesSlice

export const fetchUsers = (queryparm) => async (dispatch) => {
  // console.log("Receive QPsss", queryparm)
  dispatch(actions.startCall({ callType: callTypes.list }));
  console.log("test query param", queryparm)
  return requestFromServer.getAllCompensationBenefits({ ...queryparm, id: 'null' })

    .then((response) => {
      //  console.log("user action receipt fetched 321")
      console.log("response 123", response)
      console.log("response 12345", actions)
      dispatch(actions.compensationBenefitsFetched(response));
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
    return dispatch(actions.compensationBenefitsFetchedForEdit({ userForEdit: undefined }));
  }

  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .getCompensationBenefitsById({ Id: id })
    .then((response) => {
      const entities = response.data?.data;

      console.log("User fetched for search ", entities)
      dispatch(actions.compensationBenefitsFetchedForEdit({ userForEdit: entities }));
    })
    .catch((error) => {
      error.clientMessage = "Can't find user";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const deleteCompensationBenefits = (id) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deleteCompensationBenefits({ Id: id })
    .then((response) => {
      //console.log("response from delete user ", response.data.message)
      dispatch(actions.compensationBenefitsDeleted({ Id: id }));
      toast.success("Successfully Deactivated", {
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
    .deleteCompensationBenefits({ receiptId: id })
    .then((response) => {
      //console.log("response from delete user ", response.data.message)
      dispatch(actions.compensationBenefitsDeleted({ id: id }));
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

export const createCompensationBenefits = (bankForCreation, earning_deduction_Obj, disbaleLoading, onHide) => (
  dispatch
) => {
  // bankForCreation.phNo = bankForCreation.phNo.toString();
  // bankForCreation.cnic = bankForCreation.cnic.toString();

  console.log("createCompensationBenefits for creation", bankForCreation);
  return requestFromServer
    .createCompensationBenefits(bankForCreation)
    .then((res) => {
      dispatch(actions.startCall({ callType: callTypes.action }));
      const obj = res.data?.data;
      console.log("new compensation", obj);

      // For Inserting Compensation EArning Deductions in Bulk

      const list = earning_deduction_Obj.map(res => {

        return {
          ...res,
         compensationId: obj.Id, createdBy: obj.createdBy, createdAt: obj.createdAt, isPartOfGrossSalary: obj.isPartOfGrossSalary, isActive: true
        }

      })
      console.log("arrayList", list);
      const response = axios.post(`${USERS_URL}/compensation/update-compensation-heads-bulk`, { data: {list , compensationId: obj.Id }});
      console.log("bulk res", response);


      dispatch(actions.compensationBenefitsCreated(obj));
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

export const updateCompensationBenefits = (user, disbaleLoading, onHide) => (dispatch) => {
  return requestFromServer
    .updateCompensationBenefits(user)
    .then((response) => {
      console.log("my response", response?.config?.data);
      const updateCompensationBenefitsObj = response?.config?.data; // response.data?.data;
      console.log("updateCompensationBenefitsObj Res", response)
      dispatch(actions.compensationBenefitsUpdated({ updateCompensationBenefitsObj }));
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


