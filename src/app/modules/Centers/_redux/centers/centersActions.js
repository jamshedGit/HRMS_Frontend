import * as requestFromServer from "./centersCrud";
import { centersSlice, callTypes } from "./centersSlice";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const { actions } = centersSlice;
// const { roleActions } = getAllrolesSlice

export const fetchCenters = (queryparm) => async (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return await requestFromServer
    .getAllRequest(queryparm)
    .then((response) => {
      // console.log("Fetch center Response is: ", response)
      const entities = response.data?.data;
      //console.log("User entities: ", entities)
      dispatch(actions.centersFetched(entities));
    })
    .catch((error) => {
      //console.log("Can't find user", error)
      error.clientMessage = "Can't find customers";
      toast.error("Some thing went wrong");
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};

export const fetchCenter = (id) => async (dispatch) => {
  if (!id) {
    return await dispatch(actions.centerFetched(""));
  }

  dispatch(actions.startCall({ callType: callTypes.action }));
  return await requestFromServer
    .getById({ id: id })
    .then((response) => {
      // console.log("get center by Id response", response);
      const entities = response.data?.data;
      dispatch(actions.centerFetched(entities));
    })
    .catch((error) => {
      error.clientMessage = "Can't find user";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const deleteCenter = (id) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deleteRequest({ id: id })
    .then((response) => {
      //console.log("response from delete user ", response.data.message);
      dispatch(actions.centerDeleted({ id: id }));

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

export const activeCenter = (id) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deleteRequest({ id: id })
    .then((response) => {
      //console.log("response from delete user ", response.data.message);
      dispatch(actions.centerDeleted({ id: id }));

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

export const createCenter = (userForCreation) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .createRequest(userForCreation)
    .then((res) => {
      const user = res.data?.data;
      // console.log("user", user);
      dispatch(actions.centerCreated(user[0]));
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
      toast.error("Something went wrong..!");
    });
};

export const updateCenter = (user) => (dispatch) => {
  //console.log("updatedUser data", user)
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .updateRequest(user)
    .then((response) => {
      const updatedUser = response.data?.data;
      // console.log("userAction Res", response)
      dispatch(actions.centerUpdated({ updatedUser }));
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
      // error.clientMessage = "Can't update User"
      toast.error(error, {
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

export const fetchVehicles = (queryparm) => (dispatch) => {
  // console.log("queryparm", queryparm);
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .getVehiclesById(queryparm)
    .then((response) => {
      const entities = response.data?.data;
      dispatch(actions.vehiclesFetched(entities));
    })
    .catch((error) => {
      error.clientMessage = "Can't get Vehicles";
    });
};

export const fetchAllCountry = () => async (dispatch) => {
  return await requestFromServer
    .getAllCountry()
    .then((response) => {
      const entities = response.data?.data;
      dispatch(actions.AllCountryFetched(entities));
    })
    .catch((error) => {
      toast("Something went wrong");
    });
};

export const fetchAllCity = (body) => async (dispatch) => {
  if (!body) {
    return actions.statusFalse({});
  }
  return await requestFromServer
    .getAllCity(body)
    .then((response) => {
      const entities = response.data?.data;
      dispatch(actions.allCitiesFetched(entities));
    })
    .catch((error) => {
      console.error(error);
      toast("error");
    });
};

// export const fetchRoles = () => (dispatch) => {
//   dispatch(actions.startCall({ callType: callTypes.list }))

//   return requestFromServer
//     .getAllRoles()
//     .then((response) => {
//       const entities = response.data?.data
//       // console.log("User entities: ", entities)
//       dispatch(actions.RolesFetched(entities))
//     })
//     .catch((error) => {
//       error.clientMessage = "Can't find roles"
//       dispatch(actions.catchError({ error, callType: callTypes.list }))
//     })
// }

// export const fetchCenters = () => (dispatch) => {
//   dispatch(actions.startCall({ callType: callTypes.list }))
//   return requestFromServer.getAllCenters().then((response) => {
//     const entities = response.data?.data
//     dispatch(actions.CentersFetched(entities))
//   })
// }
