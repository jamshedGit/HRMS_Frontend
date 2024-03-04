import { async } from "q";
import * as requestFromServer from "./dashboardCrud";
import { dashboardSlice } from "./dashboardSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const { actions } = dashboardSlice;

export const fetchAllCenters = () => async (dispatch) => {
  return await requestFromServer
    .getAllCeters()
    .then((response) => {
      const entities = response.data?.data;
      dispatch(actions.AllCentersFetch(entities));
    })
    .catch((error) => {
      toast.error("Some thing went wrong");
    });
};

export const fetchAllSubCenter = (centerId) => async (dispatch) => {
  return await requestFromServer
    .getAllSubcenter(centerId)
    .then((response) => {
      const entities = response.data?.data;
      dispatch(actions.AllSubCenterFetch(entities));
    })
    .catch((error) => {
      toast.error("Some thing went wrong");
    });
};

export const fetchAllCountry = () => async (dispatch) => {
  return await requestFromServer
    .getAllCountry()
    .then((response) => {
      const entities = response.data?.data;
      dispatch(actions.AllCountryFetch(entities));
    })
    .catch((error) => {
      toast.error("Something went wrong");
    });
};

export const fetchAllCity = (cityId) => async (dispatch) => {
  // console.log("DashboardAction", cityId);
  return await requestFromServer
    .getCityByCountryId(cityId)
    .then((response) => {
      // console.log("DashboardAction response", response);
      const entities = response.data?.data;
      dispatch(actions.AllCityFetch(entities));
    })
    .catch((error) => {
      toast.error("Something went wrong");
    });
};

export const fetchAllCityCenters = (cityId) => async (dispatch) => {
  return await requestFromServer
    .getCentersByCityId(cityId)
    .then((response) => {
      const entities = response.data?.data;
      dispatch(actions.AllCentersByCityIdFetch(entities));
    })
    .catch((error) => {
      toast.error("something went wrong");
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

export const fetchDashboardVehicles = (body) => async (dispatch) => {
  return await requestFromServer
    .getDashboardVehicle(body)
    .then((response) => {
      const entities = response.data.data;
      dispatch(actions.dashboardVehicles(entities));
    })
    .catch((error) => {
      toast.error("Something went wrong");
    });
};

export const updateVehicelStatus = (body) => async (dispatch) => {
  return await requestFromServer
    .updateVehicleStatus(body)
    .then((response) => {
      toast.success("Successfully Updated");
    })
    .catch((error) => {
      toast.error("Something went wrong");
    });
};

export const getLastTrips = (body) => async (dispatch) => {
  return await requestFromServer
    .getLastTrips(body)
    .then((response) => {
      dispatch(actions.lastTripsVehicles(response?.data?.data));
    })
    .catch((error) => {
      toast.error("Something went wrong");
    });
};

export const updateTripLog = (payload) => async (dispatch) => {
  return await requestFromServer
    .updateTripLog(payload)
    .then((response) => {
      const updatedUser = response?.data?.data;
      dispatch(actions.updateData(response?.data?.data));
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
      toast.error(error?.response?.data?.message);
    });
};

export const alaramTime = () => async (dispatch) => {
  return await requestFromServer
    .getAlaramTime()
    .then((response) => {
      dispatch(actions.AlaramTime(response?.data?.data));
    })
    .catch((error) => {
      toast.error(error?.response?.data?.message);
    });
};

export const incidentTypes = () => async (dispatch) => {
  return await requestFromServer
    .getIncidentTypes()
    .then((response) => {
      dispatch(actions.AllIncidentTypes(response.data?.data));
    })
    .catch((error) => {
      toast.error(error?.response?.data?.message);
    });
};
