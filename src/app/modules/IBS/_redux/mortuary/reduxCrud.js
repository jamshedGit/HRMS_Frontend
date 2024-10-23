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
  // console.log("body", body);
  const formData = new FormData();
  if (body.sN) {
    formData.append("sN", body.sN);
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

  if (body.statusId) {
    formData.append("statusId", body.statusId);
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
    body.dateTime = moment(body.dateTime).format("DD.MM.YYYY HH:mm");
    formData.append("dateTime", body.dateTime);
  }
  if (body.description) {
    formData.append("description", body.description);
  }
  if (body.hospitalId) {
    formData.append("hospitalId", body.hospitalId);
  }
  if (body.mortuaryReachdateTime) {
    body.mortuaryReachdateTime = moment(body.mortuaryReachdateTime).format(
      "DD.MM.YYYY HH:mm"
    );
    formData.append("mortuaryReachdateTime", body.mortuaryReachdateTime);
  }
  if (body.Address) {
    formData.append("Address", body.Address);
  }
  if (body.dischargeFromMortuaryDateTime) {
    body.dischargeFromMortuaryDateTime = moment(
      body.dischargeFromMortuaryDateTime
    ).format("DD:MM:YYYY HH:mm");
    formData.append(
      "dischargeFromMortuaryDateTime",
      body.dischargeFromMortuaryDateTime
    );
  }
  if (body.fullNameOfTheDeceased) {
    formData.append("fullNameOfTheDeceased", body.fullNameOfTheDeceased);
  }
  if (body.fatherNameOfTheDeceased) {
    formData.append("fatherNameOfTheDeceased", body.fatherNameOfTheDeceased);
  }
  if (body.ibfId) {
    formData.append("ibfId", body.ibfId);
  }

  try {
    const response = await axios.post(
      `${USERS_URL}/ibs/create-mortuaryform`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    return response;
    // Handle success
    //console.log(response.data);
  } catch (error) {
    console.error(error);
  }
}

export const getVehiclesByCenterAndSubcenterId = async (body) => {
  return await axios.post(
    `${USERS_URL}/settings/read-all-vehicles-by-centerId-master-data`,
    body
  );
};

export function getAllRequest(body) {
  return axios.post(`${USERS_URL}/ibs/read-all-mortuaryforms`, body);
}

export const getById = async (id) => {
  // console.log("getUserById id", id)
  return await axios.post(`${USERS_URL}/ibs/read-mortuaryform`, id);
};

export async function updateRequest(body) {
  // console.log("body", body);
  const formData = new FormData();
  if (body.oldImages) {
    body.oldImages.forEach((element) => {
      formData.append("oldImages", element);
    });
  }
  if (body.sN) {
    formData.append("sN", body.sN);
  }
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

  if (body.statusId) {
    formData.append("statusId", body.statusId);
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
  // if (body.dateTime) {
  //   body.dateTime = moment(body.dateTime).format("DD.MM.YYYY HH:mm");
  //   formData.append("dateTime", body.dateTime);
  // }
  if (body.description) {
    formData.append("description", body.description);
  }
  if (body.hospitalId) {
    formData.append("hospitalId", body.hospitalId);
  }
  if (body.mortuaryReachdateTime) {
    try {
      if (moment(body.mortuaryReachdateTime, moment.ISO_8601).isValid()) {
        const formattedDate = moment
          .utc(body.mortuaryReachdateTime)
          .format("DD.MM.YYYY HH:mm");
        formData.append("mortuaryReachdateTime", formattedDate);
      } else {
        console.log("Invalid date string");
      }
    } catch (error) {
      console.log("Error", error);
    }
  }
  // if (body.mortuaryReachdateTime) {
  //   body.mortuaryReachdateTime = moment(body.mortuaryReachdateTime).format(
  //     "DD.MM.YYYY HH:mm"
  //   );
  //   formData.append("mortuaryReachdateTime", body.mortuaryReachdateTime);
  // }
  if (body.Address) {
    formData.append("Address", body.Address);
  }
  if (body.dischargeFromMortuaryDateTime) {
    try {
      if (
        moment(body.dischargeFromMortuaryDateTime, moment.ISO_8601).isValid()
      ) {
        const formattedDate = moment
          .utc(body.dischargeFromMortuaryDateTime)
          .format("DD.MM.YYYY HH:mm");
        formData.append("dischargeFromMortuaryDateTime", formattedDate);
      } else {
        console.log("Invalid date string");
      }
    } catch (error) {
      console.log("Error", error);
    }
  }
  // if (body.dischargeFromMortuaryDateTime) {
  //   body.dischargeFromMortuaryDateTime = moment(
  //     body.dischargeFromMortuaryDateTime
  //   ).format("DD:MM:YYYY HH:mm");
  //   formData.append(
  //     "dischargeFromMortuaryDateTime",
  //     body.dischargeFromMortuaryDateTime
  //   );
  // }
  if (body.fullNameOfTheDeceased) {
    formData.append("fullNameOfTheDeceased", body.fullNameOfTheDeceased);
  }
  if (body.fatherNameOfTheDeceased) {
    formData.append("fatherNameOfTheDeceased", body.fatherNameOfTheDeceased);
  }
  if (body.ibfId) {
    formData.append("ibfId", body.ibfId);
  }

  try {
    const response = await axios.patch(
      `${USERS_URL}/ibs/update-mortuaryform`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    return response;
    // Handle success
    //console.log(response.data);
  } catch (error) {
    console.error(error);
  }
  // return axios.put(`${USERS_URL}/ibs/update-ibform`, body);
}

export function deleteRequest(body) {
  return axios.patch(`${USERS_URL}/ibs/delete-mortuaryform`, body);
}

//Get Vehice By Center ID

export function getVehiclesById(body) {
  return axios.post(
    `${USERS_URL}/vehicles/read-all-vehicles-by-centerId`,
    body
  );
}

export function getAllCountry() {
  return axios.get(`${USERS_URL}/settings/read-all-countries-master-data`);
}

export const getAllCity = async (body) => {
  return await axios.post(
    `https://app-8e308de5-0daf-4f85-ac89-7ce29bdad705.cleverapps.io/apis/settings/read-all-cities-master-data`,
    { countryId: body }
  );
};
