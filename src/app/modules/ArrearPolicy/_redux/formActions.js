import * as requestFromServer from "./formCrud";
import { ArrearSetupSlice, callTypes } from "./arrearPolicySlice";
import { toast } from "react-toastify";
const { actions } = ArrearSetupSlice;
// const { roleActions } = getAllrolesSlice

export const fetchUsers = (queryparm) => async (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer.getAllArrearSetup(queryparm)
    .then((response) => {
      dispatch(actions.ArrearsFetched(response));
    })
    .catch((error) => {
      error.clientMessage = "Can't find receipts";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};

export const fetchEditRecord = (id) => (dispatch) => {
  if (!id) {
    return dispatch(actions.ArrearsFetchedForEdit({}));
  }
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .getArrearSetupById(id)
    .then((response) => {

      const entities = response.data?.data;
      dispatch(actions.ArrearsFetchedForEdit({ userForEdit: entities }));
    })
    .catch((error) => {
      error.clientMessage = "Can't find user";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const saveRecord = (data, id, disableLoading, onHide) => (dispatch) => {
  if (!id) {
    return requestFromServer.createArrearSetup(data)
      .then((res) => {
        const arrearData = res.data?.data;
        if (arrearData) {
          dispatch(actions.ArrearsCreated(arrearData));
          disableLoading();
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
        }
      })
      .catch((error) => {
        disableLoading();
        error.clientMessage = "Can't Update Arrear";
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
  }
  else {
    return requestFromServer.updateArrearSetup(data)
      .then((res) => {
        const arrearData = res.data?.data;
        if (arrearData) {
          dispatch(actions.ArrearsUpdated(arrearData));
          disableLoading();
          toast.success("Successfully Updated", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          onHide();
        }
      })
      .catch((error) => {
        disableLoading();
        error.clientMessage = "Can't Update Arrear";
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
  }
};

export const deleteRecord = (id, disableLoading, onHide) => (dispatch) => {
  return requestFromServer.deleteArrearSetup(id)
    .then((res) => {
      dispatch(actions.ArrearsDeleted({ id }));
      disableLoading();
      toast.success("Successfully Deleted", {
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
      disableLoading();
      error.clientMessage = "Can't Delete Arrear";
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
}

export const fetchRoles = () => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.list }));

  return requestFromServer
    .getAllRoles()
    .then((response) => {
      const entities = response.data?.data;
      dispatch(actions.RolesFetched(entities));
    })
    .catch((error) => {
      error.clientMessage = "Can't find roles";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};
