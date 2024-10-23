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

//export const getDate = (data) => {};
