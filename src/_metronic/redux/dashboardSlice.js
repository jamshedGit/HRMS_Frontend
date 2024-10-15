import { createSlice } from "@reduxjs/toolkit";

const initialDashboardState = {
  listLoading: false,
  allCenters: [],
  allSubCenter: [],
  allCountry: [],
  allEmployees: [],
  allSalaryReviewDateByEmpIdForDDL: [],
  allEmployeesSalaryDDL: [],
  allEarningDeductionList: [],
  allSubidiaryList: [],
  allAccountList: [],
  allHumanResourceRoleList:[],
  allBankBranch: [],
  allCity: [],
  allBanks:[],
  allDesignations:[],
  allCompanyBanks:[],
  allEarnings:[],
  allCompanyList:[],
  allNationalities:[],
  allDeductions:[],
  allDept:[],
  allChildMenus:[],
  allDegreeTitle: [],
  allTeamsChildMenus:[],
  allParentMenus:[],
  cityCenters: [],
  allVehicles: [],
  standBy: [],
  onDuty: [],
  offDuty: [],
  lastTrips: [],
  alarmTime: [],
  allCompensationBenefitsList:[],
  allLoan_typeList:[]
};

export const callTypes = {
  list: "list",
  action: "action",
};

export const dashboardSlice = createSlice({
  name: "dashboard",
  initialState: initialDashboardState,
  reducers: {
    AllCentersFetch: (state, action) => {
      state.allCenters = action.payload;
    },
    AllSubCenterFetch: (state, action) => {
      state.allSubCenter = action.payload;
    },
    AllCountryFetch: (state, action) => {
      state.allCountry = action.payload;
    },
    AllCityFetch: (state, action) => {
      state.allCity = action.payload;
    },
    AllBanksFetch: (state, action) => {
      state.allBanks = action.payload;
    },
    AllDesignationsFetch: (state, action) => {
      state.allDesignations = action.payload;
    },
    AllBankBranchFetch: (state, action) => {
      state.allBankBranch = action.payload;
    },
    AllSubsidiaryFetch: (state, action) => {
      state.allSubidiaryList = action.payload;
    },
    AllActiveNationalityFetch: (state, action) => {
      state.allNationalities = action.payload;
    },
    AllCompanyBanksFetch: (state, action) => {
      state.allCompanyBanks = action.payload;
    },
    AllEarningHeadsFetch: (state, action) => {
      state.allEarnings = action.payload;
    },

    AllDeductionHeadsFetch: (state, action) => {
      state.allDeductions = action.payload;
    },
    AllCompensationBenefitsListFetch: (state, action) => {
      state.allCompensationBenefitsList = action.payload;
    },
    AllDeptFetch: (state, action) => {
      state.allDept = action.payload;
    },

    AllActiveEmployeeFetch: (state, action) => {
      state.allEmployees = action.payload;
    },

    AllEmpSalaryReviewDate: (state, action) => {
      state.allSalaryReviewDateByEmpIdForDDL = action.payload;
    },

    AllActiveEmployeeSalaryDDL: (state, action) => {
      state.allEmployeesSalaryDDL = action.payload;
    },


    AllEarningDeductionListFetch: (state, action) => {
      state.allEarningDeductionList = action.payload;
    },
    
    AllChildMenusFetch: (state, action) => {
      state[action.payload.key] = action.payload.entities;
    },

    AllChildMenusForTeams: (state, action) => {
      state.allTeamsChildMenus = action.payload;
    },
     
    AllParentMenusFetch: (state, action) => {
      state.allParentMenus = action .payload;
    },
    

    AllCentersByCityIdFetch: (state, action) => {
      state.cityCenters = action.payload;
    },
    AllVehiclesByCenterAndSubCenterId: (state, action) => {
      state.allVehicles = action.payload;
    },
    dashboardVehicles: (state, action) => {
      state.standBy = action.payload.standBy;
      state.onDuty = action.payload.onDuty;
      state.offDuty = action.payload.offDuty;
    },
    lastTripsVehicles: (state, action) => {
      // console.log("Payload", action.payload);
      state.lastTrips = action.payload;
    },
    setData: (state, action) => {
      state.data = action.payload;
    },
    updateData: (state, action) => {
      state.lastTrips = state.lastTrips.map((entity) => {
        console.log("entity", entity);
        if (entity.id === action.payload.id) {
          return action.payload;
        }

        return entity;
      });
    },
    AlaramTime: (state, action) => {
      state.alarmTime = action.payload;
    },
    AllAccountListFetch: (state, action) => {
      state.allAccountList = action.payload;
    },

    AllHumanResourceRoleListFetch: (state, action) => {
      state.allHumanResourceRoleList = action.payload;
    },
    // AllLoan_typeListListFetch: (state, action) => {
    //   state.allLoan_typeList = action.payload;
    // },




  },
});
