import * as requestFromServer from "./triplogCrud";
import { TriplogSlice, callTypes } from "./triplogSlice";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const { actions } = TriplogSlice;

export const fetchTripLogs = (queryparm) => async (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer
    .getAllTripLogs(queryparm)
    .then((response) => {
      dispatch(actions.TripLogsFetched(response));
    })
    .catch((error) => {
      error.clientMessage = "Can't find customers";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
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

export const fetchTripLog = (id) => (dispatch) => {
  if (!id) {
    return dispatch(
      actions.driverTripFetched({ driverTripForEdit: undefined })
    );
  }

  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .getDriverTripById({ id: id })
    .then((response) => {
      const entities = response.data?.data;

      dispatch(actions.driverTripFetched({ driverTripForEdit: entities }));
    })
    .catch((error) => {
      error.clientMessage = "Can't find Incident";
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

export const deleteIncident = (id) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deleteIncident({ id: id })
    .then((response) => {
      //console.log("response from delete user ", response.data.message)
      dispatch(actions.incidentDeleted({ id: id }));
      toast.success(response.data.message + " Deleted", {
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

export const createIncident = (incidentForCreation) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .createIncident(incidentForCreation)
    .then((res) => {
      const incident = res.data?.data;
      dispatch(actions.incidentCreated(incident));
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
      error.clientMessage = "Can't create incident";
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

export const updateTrip = (updatedData, disabledLoading, onHide) => (
  dispatch
) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .updateTripLog(updatedData)
    .then((response) => {
      const updatedTrip = response.data?.data;
      dispatch(actions.tripUpdated({ updatedTrip }));
      toast.success(response.data.message + " Updated", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      disabledLoading();
      onHide();
    })
    .catch((error) => {
      console.log("error", error);
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
      disabledLoading();
    });
};
// export const fetchIncidentTypes = () => (dispatch) => {
//   dispatch(actions.startCall({ callType: callTypes.list }))
//   return requestFromServer
//     .getAllIncidentTypes()
//     .then((response) => {
//       const incidentTypes = response.data?.data
//       dispatch(actions.IncidentTypesFetched(incidentTypes))
//     })
//     .catch((error) => {
//       error.clientMessage = "Can't find roles"
//       dispatch(actions.catchError({ error, callType: callTypes.list }))
//     })
// }
// export const fetchSeverityTypes = () => (dispatch) => {
//   dispatch(actions.startCall({ callType: callTypes.list }))
//   return requestFromServer.getIncidentSeveritiesType().then((response) => {
//     const entities = response.data?.data
//     dispatch(actions.incidentSeverityfetched(entities))
//   })
// }
// export const fetchCenters = () => (dispatch) => {
//   dispatch(actions.startCall({ callType: callTypes.list }))
//   return requestFromServer.getAllCenters().then((response) => {
//     const entities = response.data?.data
//     dispatch(actions.CentersFetched(entities))
//   })
// }

// export const fetchVehicleById = (queryParams) => (dispatch) => {
//   // console.log("queryparams is", queryParams)
//   dispatch(actions.startCall({ callType: callTypes.list }))
//   return requestFromServer.getVhicleById(queryParams).then((response) => {
//     const entities = response.data?.data?.rows
//     dispatch(actions.vehicleFetchedByCenterId(entities))
//   })
// }
