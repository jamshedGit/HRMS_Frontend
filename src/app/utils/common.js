import moment from "moment";
import { DateTimeFormats } from "./constants";
const { differenceInDays, format } = require('date-fns');

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
  if (error && !value) {
    return 'form-control is-invalid';
  } else if (!error && value) {
    return 'form-control is-valid';
  }
  return 'form-control';
}


/**
 * 
 * Get Diff in days between two provided dates
 * 
 * @param {Date|String} startDate 
 * @param {Date|String} endDate 
 * @returns 
 */
export const getDateDiffInDays = (startDate, endDate) => {
  if (startDate && endDate) {
    return differenceInDays(new Date(endDate), new Date(startDate)) + 1;
  }
  return 0;
}

export const getFileName = (fileName) => {
  if (fileName) {
    if (fileName.includes('---')) {
      return fileName.split('---')[1]?.split('-')?.join(' ')
    }
    else {
      return fileName.split('-')?.join(' ')
    }
  }
  return ''
}

/**
 * 
 * function to return formatted date
 * 
 * @param {Date|String} date 
 * @param {String} dateFormat 
 * @returns 
 */
export const formatDates = (date, dateFormat = null) => {
  return format(new Date(date), dateFormat || 'MM/dd/yyyy')
}