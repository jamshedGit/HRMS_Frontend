
import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Input, Select, TextArea } from "../../../../../../_metronic/_partials/controls";
import { useDispatch, useSelector } from "react-redux";

import { SearchSelect } from "../../../../../../_metronic/_helpers/SearchSelect";
import {
  fetchAllCity,

  fetchAllSubCenter,
  getLatestBookingNo,
} from "../../../../../../_metronic/redux/dashboardActions";

import DatePicker from "react-datepicker";
import axios from "axios";
import { USERS_URL } from "../../../_redux/formCrud";
import { formatDates, formatDatesGlobal, getDateDiffInDays } from "../../../../../utils/common";
// Phone Number Regex
const phoneRegExp = /^((\+92)|(0092))-{0,1}\d{3}-{0,1}\d{7}$|^\d{11}$|^\d{4}-\d{7}$/;
// CNIC Regex
const cnicRegExp = /^[0-9]{5}-[0-9]{7}-[0-9]$/;
// Password Regex
const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
// Validation schema
const formValidation = Yup.object().shape(
  {
    startDate: Yup.date()
      .nullable()
      .required("Start date is required")
      .max(Yup.ref('endDate'), 'Start date cannot be later than end date'), // Use Yup.ref to reference endDate

    endDate: Yup.date()
      .nullable()
      .required("End date is required")
      .min(Yup.ref('startDate'), 'End date cannot be earlier than start date'), // Use Yup.ref to reference startDate
  },

);


export function MasterEditForm({
  SavePayrollMonthSetup,
  user,
  actionsLoading,
  onHide,
  isUserForRead,
  enableLoading,
  loading,
}) {

  const { dashboard } = useSelector((state) => state);
  // Get User Details
  const { auth } = useSelector((state) => state);
  const [defShortFormat, setDefaulShortFormat] = useState(null);
  const getCurrentMonth = () => {
    const now = new Date();
    const currentMonth = now.getMonth(); // Zero-based index (0 = January)
    return currentMonth + 1; // Convert to 1-based (1 = January)
  };

  console.log("months", getCurrentMonth())

  const getEndOfMonth = () => {
    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth() + 1, 0); // Last day of the current month
  };

  const getStartOfMonth = () => {
    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth(), 1); // Last day of the current month
  };

  const getDaysInCurrentMonth = () => {
    const now = new Date();
    const nextMonth = new Date(now.getFullYear(), now.getMonth() + 1, 1);
    const lastDayOfCurrentMonth = new Date(nextMonth - 1);
    return lastDayOfCurrentMonth.getDate(); // Get the day of the month
  };

  const addOneMonth = (currentDate) => {
    const newDate = new Date(currentDate);
    newDate.setMonth(newDate.getMonth() + 1);
    return newDate;
  };


  const addDays = (currentDate, days) => {
    const newDate = new Date(currentDate);
    newDate.setDate(newDate.getDate() + days);
    return newDate;
  };

  const getActivePreviousPayrollMonth = async () => {
console.log("in func")
    const response = await axios.post(`${USERS_URL}/payroll_month/get-payroll-month-previous-date`);
    if (response.data.data.length) {

      const get_startDate = addOneMonth(response?.data?.data[0]?.startDate)

      const setDaysInDate = addDays(addOneMonth(response?.data?.data[0]?.startDate), getDaysInCurrentMonth());

      setDefaultStartDate(get_startDate)

      setDefaultEndDate(setDaysInDate);
      setDefaultYear(setDaysInDate.getFullYear());

      const pmonth_db = response?.data?.data[0]?.month || 0;

      if (pmonth_db == 12) {
        setDefaulMonth(1)

        const defaultStartDate = "01" + "" + setDaysInDate.getFullYear().toString().substring(2, 4)
        setDefaulShortFormat(defaultStartDate)
      }
      else {
       
        if (pmonth_db <= 9)

          setDefaulShortFormat((pmonth_db + 1) + "" + setDaysInDate.getFullYear().toString().substring(2, 4))
        else
          setDefaulShortFormat((pmonth_db + 1) + "" + setDaysInDate.getFullYear().toString().substring(2, 4))

        setDefaulMonth((response?.data?.data[0]?.month) + 1)
      }
    }
    else {
      console.log("test::",defYear)
      setDefaulShortFormat("0" + getCurrentMonth() + "" + defYear.toString().substring(2, 4))
    }
  }
  const [defstartDate, setDefaultStartDate] = useState(getStartOfMonth());
  const [defendDate, setDefaultEndDate] = useState(getEndOfMonth());

  const currentYear = new Date().getFullYear();
  const [defYear, setDefaultYear] = useState(currentYear);
  const [defDays, setDefaultDays] = useState(getDaysInCurrentMonth());
  const [defMonth, setDefaulMonth] = useState(getCurrentMonth());
  const shortFormatGlobal = defYear.toString().substring(2, 4);

  const getDaysInMonth = async (month, year) => {
    return await new Date(year, month, 0).getDate();
  };

  const handleMonthChange = async (month) => {

    const year = shortFormatGlobal || new Date().getFullYear().toString().substring(2, 4); // Use the provided year or the current year
    const daysInMonth = await getDaysInMonth(month - 1, year);
    console.log("daysInMonth", daysInMonth)

  };





  useEffect(() => {

    getActivePreviousPayrollMonth();
  }, []);

  useEffect(() => {

    setDefaultDays(getDateDiffInDays(defstartDate, defendDate))

  }, [defstartDate, defendDate]);

  useEffect(() => {
    if (user.startDate) {

      setDefaultStartDate(new Date(user.startDate));
    }
  }, [user.startDate]);


  useEffect(() => {
    if (user.shortFormat) {
      setDefaulShortFormat(user.shortFormat);
    }
  }, [user.shortFormat]);


  useEffect(() => {
    if (user.month) {
      setDefaulMonth(user.month);
    }
  }, [user.month]);

  useEffect(() => {
    if (user.endDate) {
      setDefaultEndDate(new Date(user.endDate));
    }
  }, [user.endDate]);

  useEffect(() => {
    if (user.year) {
      setDefaultYear(defYear);
    }
  }, [user.year]);
 
  return (
    <>
      <Formik
        enableReinitialize={true}
        initialValues={{ Id: user.Id, shortFormat: defShortFormat, month: defMonth, month_days: defDays, year: defYear, startDate: defstartDate, endDate: defendDate }}

        validationSchema={formValidation}
        onSubmit={(values) => {
          console.log("values", values);
          enableLoading();
          SavePayrollMonthSetup(values);
        }}
      >
        {({
          handleSubmit,
          errors,
          touched,
          values,
          handleBlur,
          handleChange,
          setFieldValue,
          formik,
        }) => (
          <>
            <Modal.Body className="overlay overlay-block cursor-default">
              {actionsLoading && (
                <div className="overlay-layer bg-transparent">
                  <div className="spinner spinner-lg spinner-success" />
                </div>
              )}
              <Form className="form form-label-right">
                <fieldset disabled={isUserForRead}>
                  <div className="from-group row">
                    <div className="col-12 col-md-4 mt-3">
                    <span> Month<span style={{ color: 'red' }}>*</span></span>
                      <select className="form-control" name="month" value={defMonth}
                        onChange={(e) => {
                          console.log("bell", e.target.value)
                          setFieldValue("month", e.target.value);
                          setDefaulMonth(e.target.value);
                          
                          setDefaulShortFormat(e.target.value > 9 ? e.target.value + "" + shortFormatGlobal : +"0" + e.target.value + "" + shortFormatGlobal)
                          handleMonthChange(e.target.value);

                        }}>
                        <option value="-1" label="Select..." />
                        <option value="1" label="Jan" />
                        <option value="2" label="Feb" />
                        <option value="3" label="Mar" />
                        <option value="4" label="Apr" />
                        <option value="5" label="May" />
                        <option value="6" label="Jun" />
                        <option value="7" label="Jul" />
                        <option value="8" label="Aug" />
                        <option value="9" label="Sept" />
                        <option value="10" label="Oct" />
                        <option value="11" label="Nov" />
                        <option value="12" label="Dec" />
                      </select>
                      {/* <Select
                        label={<span> Month<span style={{ color: 'red' }}>*</span></span>}
                        name="month"
                        // value={defMonth || null}
                        
                        onChange={(e) => {
                          setFieldValue("month", e.value || null);
                          setDefaulMonth(e);
                          handleChanged(e,setFieldValue)
                        }}
                        onBlur={handleBlur}
                        style={{ display: "block" }}
                        autoComplete="off"
                      >
                        
                      </Select> */}
                    </div>
                  </div>
                  <div className="from-group row">
                    <div className="col-12 col-md-4 mt-3">
                      <Field
                        name="year"
                        component={Input}
                        onChange={handleChange}
                        placeholder="Enter Year"
                        label="Year"
                        value={defYear}
                        autoComplete="off"
                      />
                    </div>
                  </div>
                  <div className="from-group row">
                    <div className="col-12 col-md-4 mt-3">
                      <Field
                        name="shortFormat"
                        component={Input}
                        onChange={handleChange}
                        placeholder="Enter Short Format"
                        label="Short Format"
                        value={defShortFormat}
                        autoComplete="off"
                      />
                    </div>
                  </div>
                  <div className="from-group row">
                    <div className="col-12 col-md-4 mt-3">
                      <span> Start Date<span style={{ color: 'red' }}>*</span></span>
                      <DatePicker
                        className="form-control"
                        placeholder="Enter Start Date"
                        selected={defstartDate}

                        onChange={(e) => {
                          setFieldValue("startDate", e);
                          setDefaultStartDate(e);
                        }}
                        timeInputLabel="Time:"
                        dateFormat="dd/MM/yyyy"
                        showTimeInput
                        name="startDate"
                        disabled={isUserForRead}
                        autoComplete="off"
                      // value = {values.dateOfJoining}
                      />
                      <ErrorMessage className="form-feedBack" name="startDate" component="div" />
                    </div>

                    <div className="col-12 col-md-4 mt-3">
                      <span> End Date<span style={{ color: 'red' }}>*</span></span>
                      <DatePicker
                        className="form-control"
                        placeholder="Enter End Date"
                        selected={defendDate}
                        onChange={(date) => {
                          setFieldValue("endDate", date);
                          setDefaultEndDate(date);
                          //  console.log("my end date", date)
                          //  setFieldValue("startDate", defstartDate);
                          // setDefaultStartDate(defstartDate);
                          // daysDiff()
                        }}

                        timeInputLabel="Time:"
                        dateFormat="dd/MM/yyyy"
                        showTimeInput
                        name="endDate"
                        disabled={isUserForRead}
                        autoComplete="off"

                      // value = {values.dateOfJoining}
                      />
                      <ErrorMessage className="form-feedBack" name="endDate" component="div" />
                    </div>
                  </div>

                  <div className="from-group row">
                    <div className="col-12 col-md-4 mt-3">
                      <Field
                        name="month_days"
                        component={Input}
                        placeholder="Enter Days"
                        label="Days"
                        autoComplete="off"
                        value={defDays || 0}
                      />
                    </div>
                  </div>


                </fieldset>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              {!isUserForRead ? (
                <button
                  type="button"
                  onClick={onHide}
                  className="btn btn-light btn-elevate"
                >
                  Cancel
                </button>
              ) : (
                <button
                  type="button"
                  onClick={onHide}
                  className="btn btn-primary btn-elevate"
                >
                  Ok
                </button>
              )}

              <> </>
              {!isUserForRead && (
                <button
                  type="submit"
                  onClick={() => handleSubmit()}
                  className="btn btn-primary btn-elevate"
                >
                  Save
                  {loading && (
                    <span className="ml-3 mr-3 spinner spinner-white"></span>
                  )}
                </button>
              )}
            </Modal.Footer>
          </>
        )}
      </Formik>
    </>
  );
}
