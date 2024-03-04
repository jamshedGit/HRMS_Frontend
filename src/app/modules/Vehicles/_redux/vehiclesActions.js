import * as requestFromServer from "./vehiclesCrud";
import { vehiclesSlice, callTypes } from "./vehiclesSlice";
import { toast } from "react-toastify";

const { actions } = vehiclesSlice;
// const { roleActions } = getAllrolesSlice

export const fetchVehicles = (queryparm) => async (dispatch) => {
 
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer
    .getAllRequest(queryparm)
    .then((response) => {
      const entities = response.data?.data;
      dispatch(actions.vehiclesFetched(entities));
    })
    .catch((error) => {
      error.clientMessage = "Can't find customers";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};

export const fetchVehicle = (id) => (dispatch) => {
  if (!id) {
    return dispatch(actions.vehicleFetched({ itemForEdit: undefined }));
  }

  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .getById({ id: id })
    .then((response) => {
      //console.log("get center by Id response", response)
      const entities = response.data?.data;
      dispatch(actions.vehicleFetched({ itemForEdit: entities }));
    })
    .catch((error) => {
      error.clientMessage = "Can't find user";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const deleteVehicle = (id) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deleteRequest({ id: id })
    .then((response) => {
      dispatch(actions.vehicleDeleted({ id: id }));
      // toast.success(response.data.message + " Deleted", {
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
      error.clientMessage = "can't delete user";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      toast.error(error?.response?.data?.message);
    });
};

export const activeVehicle = (id) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deleteRequest({ id: id })
    .then((response) => {
      dispatch(actions.vehicleDeleted({ id: id }));
      // toast.success(response.data.message + " Deleted", {
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
      error.clientMessage = "can't delete user";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      toast.error(error?.response?.data?.message);
    });
};

export const createVehicle = (item) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .createRequest(item)
    .then((res) => {
      // console.log("createRequest", res)
      const vehicle = res.data?.data;
      dispatch(actions.vehicleCreated({ vehicle }));
      toast.success(res.data.message, {
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
      error.clientMessage = "Can't create user";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      toast.error(error.response.data.message, {
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

export const updateVehicle = (user) => (dispatch) => {
  // console.log("Update Vehicle data", user);
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .updateRequest(user)
    .then((response) => {
      const updatedVehicle = response.data?.data;
      // console.log("userAction Res", updatedVehicle);
      dispatch(actions.vehicleUpdated({ updatedVehicle }));
      toast.success("Successfully Updated", {
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
      toast.error(error?.response?.data?.message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const fetchCenters = () => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer.getAllCenters().then((response) => {
    const entities = response.data?.data;
    dispatch(actions.CenterFetched(entities));
  });
};

export const fetchCategory = () => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.list }));

  return (
    requestFromServer
      .getAllCategories()
      .then((response) => {
        dispatch(actions.vehicleCategoryFetched(response.data?.data));
      })
      // .getAllRoles()
      // .then((response) => {
      //   const entities = response.data?.data
      //   // console.log("User entities: ", entities)
      //   dispatch(actions.RolesFetched(entities))
      //})
      .catch((error) => {
        error.clientMessage = "Can't find roles";
        dispatch(actions.catchError({ error, callType: callTypes.list }));
      })
  );
};

export const fetchDrivers = (id) => async (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.list }));

  return await requestFromServer
    .getAllDrivers(id)
    .then((response) => {
      const entities = response?.data?.data;
      dispatch(actions.driversByCetner(entities));
      // if (entities.length == 0) {
      //   toast.error("Driver not found");
      // }
    })
    .catch((error) => {
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};
