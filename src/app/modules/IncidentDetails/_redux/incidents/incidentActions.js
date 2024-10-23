import * as requestFromServer from "./incidentCrud";
import { incidentSlice, callTypes } from "./incidentSlice";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const { actions } = incidentSlice;

export const fetchIncidents = (queryparm) => async (dispatch) => {
  //console.log("Receive QP", queryparm)
  dispatch(actions.startCall({ callType: callTypes.list }));

  return await requestFromServer
    .getAllIncidents(queryparm)
    .then((response) => {
      dispatch(actions.incidentsFetched(response));
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
export const fetchIncident = (id) => async (dispatch) => {
  if (!id) {
    return await dispatch(
      actions.incidentFetched({ incidentForEdit: undefined })
    );
  }

  dispatch(actions.startCall({ callType: callTypes.action }));
  return await requestFromServer
    .getIncidentById({ id: id })
    .then((response) => {
      //console.log("getIncidentById", response)
      const entities = response.data?.data;
      dispatch(actions.incidentFetched({ incidentForEdit: entities }));
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
export const reInitialIncident = () => (dispatch) => {
  dispatch(actions.incidentReinitial());
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
      toast.error("Error 😣");
    });
};
export const createIncident = (incidentForCreation) => (dispatch) => {
  //console.log("incidentForCreation", incidentForCreation);
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .createIncident(incidentForCreation)
    .then((res) => {
      const incident = res.data?.data;
      console.log("incident", incident);
      dispatch(actions.incidentCreated(incident));

      toast.success("Incident Created Successfully", {
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
      toast.error(error, {
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
export const updateIncident = (incident) => (dispatch) => {
  console.log("updatedIncident data", incident);
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .updateIncident(incident)
    .then((response) => {
      const updatedIncident = response.data?.data;
      console.log("IncidentAction Res::", response);
      dispatch(actions.incidentUpdated({ updatedIncident }));
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
export const fetchIncidentTypes = () => async (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return await requestFromServer
    .getAllIncidentTypes()
    .then((response) => {
      const incidentTypes = response.data?.data;
      dispatch(actions.IncidentTypesFetched(incidentTypes));
    })
    .catch((error) => {
      error.clientMessage = "Can't find roles";
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
export const fetchSeverityTypes = () => async (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return await requestFromServer
    .getIncidentSeveritiesType()
    .then((response) => {
      const entities = response.data?.data;
      dispatch(actions.incidentSeverityfetched(entities));
    });
};
export const fetchCenters = () => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer.getAllCenters().then((response) => {
    const entities = response.data?.data;
    dispatch(actions.CentersFetched(entities));
  });
};
export const fetchVehicleById = (queryParams) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer.getVehicleById(queryParams).then((response) => {
    const entities = response.data?.data?.rows;
    dispatch(actions.vehicleFetchedByCenterId(entities));
  });
};
export const fetchVehicleByDropdown = (queryParams) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer
    .getVehicleForDropdown(queryParams)
    .then((response) => {
      const entities = response.data?.data;
      dispatch(actions.fetchVehiclesForDropdown(entities));
    });
};
export const fetchTripLog = (queryparm) => async (dispatch) => {
  //console.log("Receive QP", queryparm)
  dispatch(actions.startCall({ callType: callTypes.list }));

  return requestFromServer
    .getTripLogByIncidentId(queryparm)
    .then((response) => {
      dispatch(actions.tripLogFetched(response));
    })
    .catch((error) => {
      error.clientMessage = "Can't find TripLog";
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
