import * as requestFromServer from "./reduxCrud";
import { coffinSlice, callTypes } from "./reduxSlice";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import * as action from "../mortuary/reduxActions";

const { actions } = coffinSlice;

export const fetchAllHospitals = (body) => async (dispatch) => {
  return await requestFromServer.getAllHospital(body).then((response) => {
    dispatch(actions.hospitalFetched(response.data?.data));
  });
};

export const fetchAllPoliceStations = (body) => async (dispatch) => {
  return await requestFromServer.getAllPoliceStations(body).then((response) => {
    dispatch(actions.policeStationsFetched(response.data?.data));
  });
};

export const fetchIbs = (queryparm) => async (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return await requestFromServer
    .getAllRequest(queryparm)
    .then((response) => {
      const entities = response.data?.data;
      dispatch(actions.ibsFetched(entities));
    })
    .catch((error) => {
      toast.error("Some thing went wrong");
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};

export const fetchInfoById = (id) => async (dispatch) => {
  if (!id) {
    return await dispatch(actions.infoFetched(""));
  }

  dispatch(actions.startCall({ callType: callTypes.action }));
  return await requestFromServer
    .getById({ id: id })
    .then((response) => {
      // console.log("get center by Id response", response);
      const entities = response.data?.data;
      dispatch(actions.infoFetched(entities));
    })
    .catch((error) => {
      error.clientMessage = "Can't find user";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const deleteRecord = (id) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deleteRequest({ id: id })
    .then((response) => {
      dispatch(actions.recordDeleted(response?.data?.data));
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

export const activeRecord = (id) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deleteRequest({ id: id })
    .then((response) => {
      dispatch(actions.recordDeleted(response?.data?.data));
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

export const fetchStandByVehicles = (body) => async (dispatch) => {
  return await requestFromServer
    .getVehiclesByCenterAndSubcenterId(body)
    .then((response) => {
      const entities = response.data?.data;
      dispatch(actions.AllVehiclesByCenterAndSubCenterId(entities));
    })
    .catch((error) => {
      toast.error("Something went wrong.");
    });
};

export const createInfo = (data, onHide, disabledloading) => (dispatch) => {
  const queryParams = {
    filter: {
      searchQuery: "",
    },
    sortOrder: "name",
    pageSize: 10,
    pageNumber: 1,
  };
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .createRequest(data)
    .then((res) => {
      console.log("res", res);
      dispatch(actions.infoCreated(res.data?.data));
      dispatch(action.fetchIbs(queryParams));
      toast.success(`${res.data.message} Created`, {
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
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      toast.error("Something went wrong...!");
      disabledloading();
    });
};

export const updateInfo = (body, onHide, queryParams, disabledloading) => (
  dispatch
) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .updateRequest(body)
    .then((response) => {
      console.log("Getting response", response);
      const updatedUser = response.data?.data;
      // console.log("userAction Res", response)
      dispatch(actions.infoUpdated({ updatedUser }));
      toast.success(response.data.message + " Updated", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      dispatch(action.fetchIbs(queryParams));
      disabledloading();
      onHide();
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
      disabledloading();
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
