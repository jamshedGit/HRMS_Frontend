import { toast } from "react-toastify";
import * as requestFromServer from "./formCrud";
import { PayrollRegisterSlice, callTypes } from "./PayrollRegisterSlice";
const { actions } = PayrollRegisterSlice;

/**
 * 
 * Fetch All Registered Payroll Paginated from the server
 * 
 * @param {Object} queryparm 
 * @returns 
 */
export const fetchPayrollRegister = (queryparm) => async (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer.getAllPayrollRegisterSetup(queryparm)
    .then((response) => {
      dispatch(actions.PayrollRegisterFetched(response));
    })
    .catch((error) => {
      error.clientMessage = "Can't find Registered Payroll";
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
  return requestFromServer.getAllPayrollRegisterForPdf({ ...filter, labels })
    .then((res) => {
      const pdfBlob = new Blob([res.data], { type: 'application/pdf' });
      const pdfUrl = URL.createObjectURL(pdfBlob);

      // Trigger file download
      const link = document.createElement('a');
      link.href = pdfUrl;
      link.setAttribute('download', 'payroll_register.pdf');
      document.body.appendChild(link);
      link.click();
      dispatch(actions.pdfFetched({}));
      document.body.removeChild(link);
    })
    .catch((error) => {
      error.clientMessage = "Can't generate PDF";
      dispatch(actions.catchError({ error, callType: callTypes.pdf }));
      toast.error(error?.response?.status == 400 ? 'Please select filter to generate PDF' : error.clientMessage, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    });
};
