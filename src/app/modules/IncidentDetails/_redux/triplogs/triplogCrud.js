import axios from "axios"

export const USERS_URL = process.env.REACT_APP_API_URL

//Create user
export function createIncident(body) {
  return axios.post(`${USERS_URL}/incidentdetails/create-incident-detail`, body)
}

// Read
export function getAllTripLogs(body) {
  return axios.post(
    `${USERS_URL}/drivertriplog/read-all-driver-trip-logs`,
    body
  )
}

export function getDriverTripById(id) {
  return axios.post(`${USERS_URL}/drivertriplog/read-driver-trip-log`, id)
}

//Update
export function updateTripLog(updatedData) {
  return axios.put(
    `${USERS_URL}/drivertriplog/update-driver-trip-log`,
    updatedData
  )
}

//Delete
export function deleteIncident(id) {
  return axios.patch(`${USERS_URL}/incidentdetails/delete-incident-detail`, id)
}

//get All Roles
export function getAllIncidentTypes() {
  return axios.get(`${USERS_URL}/settings/read-all-incident-types-master-data`)
}

//Get Incident
export function getIncidentSeveritiesType() {
  return axios.get(
    `${USERS_URL}/settings/read-all-incident-severities-master-data`
  )
}

//get All Centers
export function getAllCenters() {
  return axios.get(`${USERS_URL}/settings/read-all-centers-master-data`)
}

// get Vehicle By id
export function getVhicleById(body) {
  return axios.post(
    `${USERS_URL}/vehicledetails/read-all-vehicles-by-centerId`,
    body
  )
}
