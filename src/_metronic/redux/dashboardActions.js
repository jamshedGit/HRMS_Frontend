import { async } from "q";
import * as requestFromServer from "./dashboardCrud";
import { format } from 'date-fns';
import { dashboardSlice, callTypes } from "./dashboardSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { receiptSlice } from "../../app/modules/EDRS/_redux/receiptSlice";

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

export const fetchAllActiveEmployees = () => async (dispatch) => {
  return await requestFromServer
    .getAllActiveEmployees()
    .then((response) => {
      const entities = response.data?.data;

      dispatch(actions.AllActiveEmployeeFetch(entities));
    })
    .catch((error) => {
      toast.error("Something went wrong");
    });
};

export const fetchEmpSalaryRevisionByEmployeeId = (employeeId) => async (dispatch) => {
  return await requestFromServer
    .getAllEmployeeSalaryReviewForDDL(employeeId)
    .then((response) => {
      console.log("review", response);
      //const entities = response.data?.data;

      const formatDates = (dataArray) => {

        return dataArray.map(item => ({
          ...item,
          label: format(new Date(item.label), 'dd/MM/yyyy') // Format to 'Month Year'
        }));
      };

      const entities = formatDates(response.data.data);

      dispatch(actions.AllEmpSalaryReviewDate(entities));
      return response?.data?.data.length || 0;
    })
    .catch((error) => {
      toast.error("Something went wrong");
    });
};


export const fetchAllActiveEmployeesSalaryForDDL = (employeeId) => async (dispatch) => {
  return await requestFromServer
    .getAllActiveEmployeesSalaryForDDL(employeeId)
    .then((response) => {
      const entities = response.data?.data;
      console.log("mega", entities)
      dispatch(actions.AllActiveEmployeeSalaryDDL(entities));
    })
    .catch((error) => {
      toast.error("Something went wrong");
    });
};





export const fetchAllEarningDeductionList = (Id) => async (dispatch) => {
  console.log("max", Id);
  return await requestFromServer
    .getAllEarningDeductionList(Id)
    .then((response) => {
      const entities = response.data?.data;
      console.log("fan", entities);
      dispatch(actions.AllEarningDeductionListFetch(entities));
    })
    .catch((error) => {
      toast.error("Something went wrong");
    });
};

export const fetchAllEarningList = (Id) => async (dispatch) => {
  console.log("max", Id);
  return await requestFromServer
    .getAllEarningDeductionList(Id)
    .then((response) => {
      const entities = response.data?.data;
      console.log("fan", entities);
      dispatch(actions.AllEarningHeadsFetch(entities));
    })
    .catch((error) => {
      toast.error("Something went wrong");
    });
};


export const fetchAllDeductionList = (Id) => async (dispatch) => {
  console.log("max", Id);
  return await requestFromServer
    .getAllEarningDeductionList(Id)
    .then((response) => {
      const entities = response.data?.data;
      console.log("123 heads", entities);
      dispatch(actions.AllDeductionHeadsFetch(entities));
    })
    .catch((error) => {
      toast.error("Something went wrong");
    });
};


export const fetchAllEmpCompensationBenefitsForDDL = (Id) => async (dispatch) => {
  console.log("max", Id);
  return await requestFromServer
    .getAllEmp_Compensation_Benefits_DDL()
    .then((response) => {
      const entities = response.data?.data;
      console.log("com ddl heads", entities);
      dispatch(actions.AllCompensationBenefitsListFetch(entities));
    })
    .catch((error) => {
      toast.error("Something went wrong");
    });
};


export const fetchAllDept = (id) => async (dispatch) => {

  return await requestFromServer
    .getAllDepartments(id)
    .then((response) => {
      const entities = response.data?.data;
      dispatch(actions.AllDeptFetch(entities));
    })
    .catch((error) => {
      toast.error("Something went wrong");
    });
};


export const fetchAllFormsMenu = (id, key) => async (dispatch) => {
  return await requestFromServer
    .getAllFormMenus(id)
    .then((response) => {
      const entities = [...response.data?.data];
      dispatch(actions.AllChildMenusFetch({ entities, key }));
    })
    .catch((error) => {
      toast.error("Something went wrong");
    });
};


export const fetchAllEarningHeads = (id) => async (dispatch) => {
  // console.log("DashboardAction", cityId);
  return await requestFromServer
    .getAllEarningHeads(id)
    .then((response) => {
      const entities = response.data?.data;
      console.log("Get All earning heads ", entities);
      dispatch(actions.AllBanksFetch(entities));
    })
    .catch((error) => {
      toast.error("Something went wrong");
    });
};

export const fetchAllBanks = (id) => async (dispatch) => {
  // console.log("DashboardAction", cityId);
  return await requestFromServer
    .getAllBanks(id)
    .then((response) => {
      const entities = response.data?.data;
      console.log("Get All Banks ", entities);
      dispatch(actions.AllBanksFetch(entities));
    })
    .catch((error) => {
      toast.error("Something went wrong");
    });
};


export const fetchAllCompanyBanks = (id) => async (dispatch) => {
  // console.log("DashboardAction", cityId);
  return await requestFromServer
    .getAllBanks(id)
    .then((response) => {
      const entities = response.data?.data;
      console.log("Get All Company Banks ", entities);
      dispatch(actions.AllCompanyBanksFetch(entities));
    })
    .catch((error) => {
      toast.error("Something went wrong");
    });
};

export const fetchAllBankBranch = (id) => async (dispatch) => {
  // console.log("DashboardAction", cityId);
  return await requestFromServer
    .getAllBankBranch(id)
    .then((response) => {
      const entities = response.data?.data;
      console.log("Get All bb Banks ", entities);
      dispatch(actions.AllBankBranchFetch(entities));
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
      console.log("City Centers", entities);
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
      // console.log("res", response);
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
      //console.log("response?.data?.data", response?.data?.data);
      dispatch(actions.updateData(response?.data?.data));
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

export const getLatestBookingNo = (bookingNo) => async (dispatch) => {
  return await requestFromServer
    .getLastBookingNo(bookingNo)
    .then((response) => {

      return response?.data?.data;
      // dispatch(receiptSlice.MaxIdFetchForReceipt(response?.data?.data));
    })
    .catch((error) => {
      toast.error(error?.response?.data?.message);
    });
};

export const getLatestTableId = (tableName, prefix) => async (dispatch) => {
  return await requestFromServer
    .getLastTableId(tableName, prefix)
    .then((response) => {
      console.log("table", response);
      return response?.data?.data;
      // dispatch(receiptSlice.MaxIdFetchForReceipt(response?.data?.data));
    })
    .catch((error) => {
      toast.error(error?.response?.data?.message);
    });
};

