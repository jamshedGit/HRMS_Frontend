import axios from "axios";
export const USERS_URL = process.env.REACT_APP_API_URL;

export const getAllCeters = async () => {
  return await axios.get(`${USERS_URL}/settings/read-all-centers-master-data`);
};

export const getAllSubcenter = async (centerId) => {
  return await axios.post(
    `${USERS_URL}/settings/read-all-subcenters-master-data`,
    { centerId: centerId }
  );
};

export const getAllCountry = async () => {
  return await axios.get(
    `${USERS_URL}/settings/read-all-countries-master-data`
  );
};

export const getCityByCountryId = async (countryId) => {
  return await axios.post(`${USERS_URL}/settings/read-all-cities-master-data`, {
    countryId: countryId,
  });
};

export const getCentersByCityId = async (cityId) => {
  return await axios.post(
    `${USERS_URL}/settings/read-all-centers-master-data-by-cityId`,
    { cityId: cityId }
  );
};

export const getVehiclesByCenterAndSubcenterId = async (body) => {
  return await axios.post(
    `${USERS_URL}/settings/read-all-vehicles-by-centerId-master-data`,
    body
  );
};

export const getDashboardVehicle = async (body) => {
  // console.log("Dashboard Request body", body);
  return await axios.post(
    `${USERS_URL}/settings/read-all-vehicles-dashboard`,
    body
  );
};

export const updateVehicleStatus = async (body) => {
  return await axios.put(`${USERS_URL}/vehicles/update-vehicle-status`, body);
};

export const getLastTrips = async (body) => {
  // console.log("Call in crud", body);
  return await axios.post(
    `${USERS_URL}/drivertriplog/read-all-driver-trip-logs-by-vehicleId`,
    body
  );
};

export const updateTripLog = async (payload) => {
  // console.log("payload in crud", payload);
  return await axios.put(
    `${USERS_URL}/drivertriplog/update-driver-trip-log`,
    payload
  );
};

export const getAlaramTime = async () => {
  return await axios.get(
    `${USERS_URL}/settings/read-all-alarmtimes-master-data`
  );
};

export const getIncidentTypes = async () => {
  return await axios.get(
    `${USERS_URL}/settings/read-all-incident-types-master-data`
  );
};
