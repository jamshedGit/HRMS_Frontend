import moment from "moment";
import { DateTimeFormats } from "./constants";

export const getDate = (
  date,
  format = DateTimeFormats.General,
  noDateFoundMessage = "-"
) => (date ? moment(date).format("lll") : noDateFoundMessage);

export const getTime = (
  date,
  format = DateTimeFormats.General,
  noDateFoundMessage = "-"
) => (date ? moment(date).format("LT") : noDateFoundMessage);

export const getCurrentTime = () => moment().format("LT");

/**
 * 
 * Get Class name according to value and error
 * 
 * @param {string|number} error 
 * @param {string|number} value 
 * @returns 
 */
export const getClassName = (error, value) => {
  if (error && !value ) {
    return 'form-control is-invalid';
  } else if (!error && value ) {
    return 'form-control is-valid';
  }
  return 'form-control';
}
