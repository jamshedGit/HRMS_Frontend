import * as requestFromServer from "./formCrud";
import { LeaveRegisterSlice, callTypes } from "./LeaveRegisterSlice";
const { actions } = LeaveRegisterSlice;

/**
 * 
 * Fetch All Registered Leaves Paginated from the server
 * 
 * @param {Object} queryparm 
 * @returns 
 */
export const fetchLeaveRegister = (queryparm) => async (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer.getAllLeaveRegisterSetup(queryparm)
    .then((response) => {
      dispatch(actions.LeaveRegisterFetched(response));
    })
    .catch((error) => {
      error.clientMessage = "Can't find Registered leaves";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};


/**
 * 
 * Fetch Pdf from server
 * 
 * @param {Object} filter 
 * @param {Document} document 
 * @param {Object} labels 
 * @returns 
 */
export const fetchPdfData = (filter, document, labels = {}) => async (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.pdf }));
  return requestFromServer.getAllLeaveRegisterForPdf({ ...filter, labels })
    .then((res) => {
      const pdfBlob = new Blob([res.data], { type: 'application/pdf' });
      const pdfUrl = URL.createObjectURL(pdfBlob);

      // Trigger file download
      const link = document.createElement('a');
      link.href = pdfUrl;
      link.setAttribute('download', 'leave_register.pdf');
      document.body.appendChild(link);
      link.click();
      dispatch(actions.pdfFetched({}));
      document.body.removeChild(link);
    })
    .catch((error) => {
      error.clientMessage = "Can't generate Pdf";
      dispatch(actions.catchError({ error, callType: callTypes.pdf }));
    });
};
