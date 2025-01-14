import * as requestFromServer from "./formCrud";
import { UploadDataSlice, callTypes } from "./UploadPageSlice";
import { toast } from "react-toastify";
import { SERVER_MESSAGES } from "../../../utils/constants";
import { downloadTemplateExcel } from "../../../../_metronic/redux/dashboardActions";
const { actions } = UploadDataSlice;


/**
 * 
 * Download Excel Template from server by type
 * 
 * @param {Object} queryparm 
 * @returns 
 */
export const downloadTemplate = (document, type, fileName) => async (dispatch) => {
  dispatch(downloadTemplateExcel(document, type, fileName)).then((res) => {
  })
};


/**
 * 
 * Save Leave Data
 * 
 * @param {Object} queryparm 
 * @returns 
 */
export const saveLeaveData = (formData) => async (dispatch) => {
  return requestFromServer.saveLeaveData(formData)
    .then((response) => {
      dispatch(actions.RoundingPolicyFetched(response));
    })
    .catch((error) => {
      error.clientMessage = "Can't find receipts";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};