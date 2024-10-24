import axios from "axios";
export const USERS_URL = process.env.REACT_APP_API_URL;


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


export const getAllEarningDeductionList = async (Id) => {
  console.log('pakistan', Id)
  return await axios.post(
    `${USERS_URL}/stoppage/read-earning-deduction-list`, { flag: Id }
  );
};

export const getAllEmp_Compensation_Benefits_DDL = async () => {
  console.log('getAllEmp_Compensation_Benefits')
  return await axios.post(`${USERS_URL}/compensation/read-all-compensation-benefits-ddl`);
};

export const getAllActiveEmployees = async () => {
  return await axios.post(
    `${USERS_URL}/settings/read-all-profile`
  );
};

export const getAllEmployeeSalaryReviewForDDL = async (employeeId) => {
  return await axios.post(
    `${USERS_URL}/settings/read-salary-revision-by-employeeId`,{employeeId: employeeId}
  );
};



export const getAllActiveEmployeesSalaryForDDL = async (employeeId) => {
  console.log("getAllActiveEmployeesSalaryForDDL", employeeId)
  return await axios.post(
    `${USERS_URL}/employee_salary_earning/read-all-employee-salary-ddl`,{
      employeeId : employeeId
    }
  );
};

export const getCityByCountryId = async (countryId) => {
  return await axios.post(`${USERS_URL}/settings/read-all-cities-master-data`, {
    countryId: countryId,
  });
};

export const getAllBanks = async (Id) => {
  return await axios.get(`${USERS_URL}/settings/read-all-banks`, {
    Id: Id,
  });
};

export const getAllBankBranch = async (Id) => {
  return await axios.get(`${USERS_URL}/settings/read-all-branch`, {
    Id: Id,
  });
};

export const getAllEarningHeads = async (Id) => {
  return await axios.get(`${USERS_URL}/earning/read-all-earning`, {
    Id: Id,
  });
};


export const getAllDepartments = async (Id) => {
  return await axios.get(`${USERS_URL}/settings/read-all-dept`, {
    Id: Id,
  });
};

export const getAllFormMenus = async (Id, text=null) => {
  return await axios.post(`${USERS_URL}/settings/read-all-form`, {
    Id: Id,
    text: text
  });
};

export const getAllLeaveTypes = async (Id) => {
  return await axios.get(`${USERS_URL}/settings/read-all-leave-types`);
};

export const getAllParentDepartments = async (Id) => {
  return await axios.get(`${USERS_URL}/settings/read-all-parentDept`, {
    Id: Id,
  });
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
  return await axios.post(
    `${USERS_URL}/drivertriplog/read-all-driver-trip-logs-by-vehicleId`,
    body
  );
};

export const updateTripLog = async (payload) => {

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


export const getLastBookingNo = async (bookingNo) => {
  return await axios.post(
    `${USERS_URL}/settings/get-max-booking-no`, { bookingNo: bookingNo }
  );
};

export const getLastTableId = async (tableName, prefix) => {
  return await axios.post(
    `${USERS_URL}/settings/get-max-tableId`, { tableName: tableName, prefix: prefix }
  );
};


export const getLastDeductionNo = async (bookingNo) => {
  return await axios.post(
    `${USERS_URL}/settings/get-max-booking-no`, { bookingNo: bookingNo }
  );
};

export const getEmployeeProfileById = async (id) => {
  return await axios.get(`${USERS_URL}/profile/read-profile-view/${id}`);
};