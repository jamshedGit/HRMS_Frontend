import { all } from "redux-saga/effects";
import { combineReducers } from "redux";

import * as auth from "../app/modules/Auth/_redux/authRedux";
import { customersSlice } from "../app/modules/ECommerce/_redux/customers/customersSlice";
import { productsSlice } from "../app/modules/ECommerce/_redux/products/productsSlice";
import { remarksSlice } from "../app/modules/ECommerce/_redux/remarks/remarksSlice";
import { usersSlice } from "../app/modules/UserMangement/_redux/usersSlice";
import { specificationsSlice } from "../app/modules/ECommerce/_redux/specifications/specificationsSlice";
import { rolesSlice } from "../app/modules/Settings/_redux/roles/rolesSlice";
import { centersSlice } from "../app/modules/Centers/_redux/centers/centersSlice";
import { subCentersSlice } from "../app/modules/Centers/_redux/subcenters/subCentersSlice";
import { vehiclesSlice } from "../app/modules/Vehicles/_redux/vehiclesSlice";
import { incidentSlice } from "../app/modules/IncidentDetails/_redux/incidents/incidentSlice";
import { TriplogSlice } from "../app/modules/IncidentDetails/_redux/triplogs/triplogSlice";
import { dashboardSlice } from "../app/modules/Dashboard/_redux/dashboardSlice";
import { infoSlice } from "../app/modules/IBS/_redux/info-personal/infoSlice";
import { mortuarySlice } from "../app/modules/IBS/_redux/mortuary/reduxSlice";
import { coffinSlice } from "../app/modules/IBS/_redux/coffin/reduxSlice";
import { receiptSlice } from "../app/modules/EDRS/_redux/receiptSlice"
export const rootReducer = combineReducers({
  auth: auth.reducer,
  dashboard: dashboardSlice.reducer,
  customers: customersSlice.reducer,
  products: productsSlice.reducer,
  remarks: remarksSlice.reducer,
  specifications: specificationsSlice.reducer,
  users: usersSlice.reducer,
  roles: rolesSlice.reducer,
  centers: centersSlice.reducer,
  subCenters: subCentersSlice.reducer,
  vehicles: vehiclesSlice.reducer,
  incidentDetails: incidentSlice.reducer,
  triplogs: TriplogSlice.reducer,
  personalInformation: infoSlice.reducer,
  mortuary: mortuarySlice.reducer,
  coffin: coffinSlice.reducer,
  receipt: receiptSlice.reducer
});

export function* rootSaga() {
  yield all([auth.saga()]);
}
