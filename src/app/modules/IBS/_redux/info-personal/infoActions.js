import * as requestFromServer from "./infoCrud";
import { infoSlice, callTypes } from "./infoSlice";
import { toast } from "react-toastify";
import moment from "moment";
import "react-toastify/dist/ReactToastify.css";

const { actions } = infoSlice;
// const { roleActions } = getAllrolesSlice

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

export const createInfo = (data, onHide) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .createRequest(data)
    .then((res) => {
      const response = res.data?.data;
      dispatch(actions.infoCreated(response));
      toast.success(res.data.message + " " + "Created", {
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
      toast.error("Something went wrong..!");
      toast.error(error?.response?.data?.message);
    });
};

export const updateInfo = (body, onHide) => (dispatch) => {
  const formData = new FormData();
  if (body.id) {
    formData.append("id", body.id);
  }
  if (body.images) {
    body.images.forEach((element) => {
      formData.append("images", element);
    });
  }
  if (body.countryId) {
    formData.append("countryId", body.countryId);
  }
  if (body.cityId) {
    formData.append("cityId", body.cityId);
  }
  if (body.incidentTypeId) {
    formData.append("incidentTypeId", body.incidentTypeId);
  }
  if (body.districtId) {
    formData.append("districtId", body.districtId);
  }
  if (body.areaId) {
    formData.append("areaId", body.areaId);
  }
  if (body.bodyType) {
    formData.append("bodyType", body.bodyType);
  }
  if (body.vehicleType) {
    formData.append("vehicleType", body.vehicleType);
  }
  if (body.statusId) {
    formData.append("statusId", body.statusId);
  }
  if (body.age) {
    formData.append("age", body.age);
  }
  if (body.callerCnic) {
    formData.append("callerCnic", body.callerCnic);
  }
  if (body.callerName) {
    formData.append("callerName", body.callerName);
  }
  if (body.callerPhNo) {
    formData.append("callerPhNo", body.callerPhNo);
  }
  if (body.dateTime) {
    try {
      if (moment(body.dateTime, moment.ISO_8601).isValid()) {
        const formattedDate = moment
          .utc(body.dateTime)
          .format("DD.MM.YYYY HH:mm");
        formData.append("dateTime", formattedDate);
      } else {
        console.log("Invalid date string");
      }
    } catch (error) {
      console.log("Error", error);
    }
  }
  if (body.incidentlocationReachdateTime) {
    try {
      if (
        moment(body.incidentlocationReachdateTime, moment.ISO_8601).isValid()
      ) {
        const formattedDate = moment
          .utc(body.incidentlocationReachdateTime)
          .format("DD.MM.YYYY HH:mm");
        formData.append("incidentlocationReachdateTime", formattedDate);
      } else {
        console.log("Invalid date string");
      }
    } catch (error) {
      console.log("Error", error);
    }
  }
  if (body.hospitalReachdateTime) {
    try {
      if (moment(body.hospitalReachdateTime, moment.ISO_8601).isValid()) {
        const formattedDate = moment
          .utc(body.hospitalReachdateTime)
          .format("DD.MM.YYYY HH:mm");
        formData.append("hospitalReachdateTime", formattedDate);
      } else {
        console.log("Invalid date string");
      }
    } catch (error) {
      console.log("Error", error);
    }
  }
  if (body.description) {
    formData.append("description", body.description);
  }
  if (body.gender) {
    formData.append("gender", body.gender);
  }
  if (body.hospitalId) {
    formData.append("hospitalId", body.hospitalId);
  }
  if (body.incidentAddress) {
    formData.append("incidentAddress", body.incidentAddress);
  }
  if (body.patientName) {
    formData.append("patientName", body.patientName);
  }
  if (body.policeStationId) {
    formData.append("policeStationId", body.policeStationId);
  }
  if (body.VehcileId) {
    formData.append("vehicleId", body.VehcileId);
  }
  if (body.vehicleRegNo) {
    formData.append("vehicleRegNo", body.vehicleRegNo);
  }
  if (body.oldImages) {
    body.oldImages.forEach((element) => {
      formData.append("oldImages", element);
    });
  }

  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .updateRequest(formData)
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

export const fetchAnualReport = (body) => async (dispatch) => {
  return await requestFromServer
    
    .anualReport(body)
    .then((response) => {
      console.log("testing ibs form");
      console.log("Res", response);
      const entities = response?.data?.data;
      dispatch(actions.AnaulReport(entities));
    })
    .catch((error) => {
      toast("error", "Data not found");
    });
};
