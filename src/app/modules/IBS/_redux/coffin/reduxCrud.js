import axios from "axios";
import moment from "moment";
import { func } from "prop-types";

export const USERS_URL = process.env.REACT_APP_API_URL;

export function getAllHospital(body) {
  return axios.post(
    `${USERS_URL}/settings/read-all-hospitals-master-data`,
    body
  );
}

export function getAllPoliceStations(body) {
  return axios.post(
    `${USERS_URL}/settings/read-all-police-stations-master-data`,
    body
  );
}

export async function createRequest(body) {
  if (body.dateTime) {
    try {
      if (moment(body.dateTime, moment.ISO_8601).isValid()) {
        body.dateTime = moment.utc(body.dateTime).format("DD.MM.YYYY HH:mm");
        //formData.append("dateTime", formattedDate);
      } else {
        console.log("Invalid date string");
      }
    } catch (error) {
      console.log("Error", error);
    }
  }
  if (body.dateTimeofDeath) {
    try {
      if (moment(body.dateTimeofDeath, moment.ISO_8601).isValid()) {
        body.dateTimeofDeath = moment
          .utc(body.dateTimeofDeath)
          .format("DD.MM.YYYY HH:mm");
        // formData.append("dateTime", formattedDate);
      } else {
        console.log("Invalid date string");
      }
    } catch (error) {
      console.log("Error", error);
    }
  }
  return await axios.post(`${USERS_URL}/ibs/create-coffinform`, body);
}

export const getVehiclesByCenterAndSubcenterId = async (body) => {
  return await axios.post(
    `${USERS_URL}/settings/read-all-vehicles-by-centerId-master-data`,
    body
  );
};

export function getAllRequest(body) {
  return axios.post(`${USERS_URL}/ibs/read-all-coffinforms`, body);
}

export const getById = async (id) => {
  // console.log("getUserById id", id)
  return await axios.post(`${USERS_URL}/ibs/read-coffinform`, id);
};

export async function updateRequest(body) {
  if (body.dateTime) {
    try {
      if (moment(body.dateTime, moment.ISO_8601).isValid()) {
        body.dateTime = moment.utc(body.dateTime).format("DD.MM.YYYY HH:mm");
        //formData.append("dateTime", formattedDate);
      } else {
        console.log("Invalid date string");
      }
    } catch (error) {
      console.log("Error", error);
    }
  }
  if (body.dateTimeofDeath) {
    try {
      if (moment(body.dateTimeofDeath, moment.ISO_8601).isValid()) {
        body.dateTimeofDeath = moment
          .utc(body.dateTimeofDeath)
          .format("DD.MM.YYYY HH:mm");
        // formData.append("dateTime", formattedDate);
      } else {
        console.log("Invalid date string");
      }
    } catch (error) {
      console.log("Error", error);
    }
  }
  return axios.patch(`${USERS_URL}/ibs/update-coffinform`, body);
}

export function deleteRequest(body) {
  return axios.patch(`${USERS_URL}/ibs/delete-coffinform`, body);
}

//Get Vehice By Center ID

export function getVehiclesById(body) {
  return axios.post(
    `${USERS_URL}/vehicles/read-all-vehicles-by-centerId`,
    body
  );
}

export function getAllCountry() {
  return axios.get(
    "https://app-8e308de5-0daf-4f85-ac89-7ce29bdad705.cleverapps.io/apis/settings/read-all-countries-master-data"
  );
}

export const getAllCity = async (body) => {
  return await axios.post(
    `https://app-8e308de5-0daf-4f85-ac89-7ce29bdad705.cleverapps.io/apis/settings/read-all-cities-master-data`,
    { countryId: body }
  );
};
