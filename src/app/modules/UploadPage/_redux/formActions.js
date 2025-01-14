import * as requestFromServer from "./formCrud";
import { UploadDataSlice, callTypes } from "./UploadPageSlice";
import { toast } from "react-toastify";
import { SERVER_MESSAGES } from "../../../utils/constants";
import { downloadTemplateExcel } from "../../../../_metronic/redux/dashboardActions";
const { actions } = UploadDataSlice;


/**
 * 
 * Fetch All Registered Payroll Paginated from the server
 * 
 * @param {Object} queryparm 
 * @returns 
 */
export const downloadTemplate = (document, type, fileName) => async (dispatch) => {
  dispatch(downloadTemplateExcel(document, type, fileName)).then((res)=> {
  })
};