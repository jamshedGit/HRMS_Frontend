
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
  fetchAllSubsidiaryData,
  getLatestBookingNo,
} from "../../../../../../_metronic/redux/dashboardActions";

import DatePicker from "react-datepicker";
import axios from "axios";
import { USERS_URL } from "../../../_redux/formCrud";
import { getDateDiffInDays } from "../../../../../utils/common";;
// Validation schema
const formValidation = Yup.object().shape(
  {
    subsidiaryId: Yup.mixed()
      .nullable().
      required("Required*"),

      month: Yup.number()
      .nullable().
      required("Required*"),

      month_days: Yup.number()
      .nullable().
      required("Required*"),

      year: Yup.number()
      .nullable().
      required("Required*"),

      shortFormat: Yup.number()
      .nullable().
      required("Required*"),

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

  const dispatch = useDispatch();
  const { dashboard } = useSelector((state) => state);

  // Get User Details
  const { auth } = useSelector((state) => state);
  const [defstartDate, setDefaultStartDate] = useState(null);
  const [defendDate, setDefaultEndDate] = useState(null);
  const [responseData, setResponseData] = useState(null);
  const [flag, setFlag] = useState(false)
  useEffect(() => {

    if (!user.Id) {
      dispatch(fetchAllSubsidiaryData("allSubsidiaryList"))
    }
  }, [dispatch]);



  const getActivePreviousPayrollMonth = async (subsidiaryId, setFieldValue) => {
    try {
      const response = await axios.post(`${USERS_URL}/payroll_month/get-payroll-month-previous-date`, { subsidiaryId: subsidiaryId });

      if (response?.data?.data) {
        setResponseData(response?.data?.data)
        setFlag(true)

        const month = response?.data?.data?.month && response?.data?.data?.month === 12 ? 1 : response?.data?.data?.month + 1;
        const year = response?.data?.data?.year  && response?.data?.data?.month === 12 ? response?.data?.data?.year +1 : response?.data?.data?.year;

        setFieldValue(
          "month",month
          
        );
        setFieldValue(
          "year",year
          
        );
        
        // const formattedMonth = month && month < 10 ? `0${month}` : `${month}`;
        // const formattedYear = year && year.toString().slice(-2); // Extract last 2 digits of the year

        // const shortFormat = `${formattedMonth}${formattedYear}`;
        setShortDormat(month,year,setFieldValue)


        // setFieldValue("shortFormat", shortformat);
        console.log("nextStartDate")

        const nextStartDate = new Date(response?.data?.data?.endDate);
   
       let date=new Date(nextStartDate.setDate(nextStartDate.getDate() + 1))
        // setDefaultStartDate(date);
        setFieldValue("startDate",date)
        setEndDate(date,setFieldValue)
     
      }
    } catch (error) {
      setFlag(false)
     
      setFieldValue("month", "-1")
      setFieldValue("year", "")
      setFieldValue("shortFormat", "")
      setFieldValue("startDate","")
      setFieldValue("endDate","")
      setFieldValue("month_days","")
    }

  }

const setEndDate =(date,setFieldValue)=>{
  setDefaultStartDate(date);

  const endDate = new Date(date);
  endDate.setMonth(endDate.getMonth() + 1); // Add one year (365 or 366 days will be calculated automatically)

  endDate.setDate(endDate.getDate() - 1);
  setFieldValue("endDate", endDate);
  setDefaultEndDate(endDate);
 
  setFieldValue("month_days", getDateDiffInDays(date,endDate));

}

const setShortDormat=(month,year,setFieldValue)=>{
  const formattedMonth = month && month < 10 ? `0${month}` : `${month}`;
  const formattedYear = year && year.toString().slice(-2); // Extract last 2 digits of the year

  const shortFormat = `${formattedMonth}${formattedYear}`;


  setFieldValue("shortFormat", shortFormat);
}

  // useEffect(() => {
  //   if (user.Id) {
  //     setDefaultStartDate(new Date(user.startDate));  // Convert startDate from string to Date
  //     setDefaultEndDate(new Date(user.endDate));      // Convert endDate from string to Date
  //   }
  // }, [user]);

  const monthOptions = [
    { value: "-1", label: "Select..." },
    { value: "1", label: "Jan" },
    { value: "2", label: "Feb" },
    { value: "3", label: "Mar" },
    { value: "4", label: "Apr" },
    { value: "5", label: "May" },
    { value: "6", label: "Jun" },
    { value: "7", label: "Jul" },
    { value: "8", label: "Aug" },
    { value: "9", label: "Sept" },
    { value: "10", label: "Oct" },
    { value: "11", label: "Nov" },
    { value: "12", label: "Dec" },
  ];

  return (
    <>
      <Formik
        enableReinitialize={true}
        initialValues={user}

        validationSchema={formValidation}
        onSubmit={(values) => {
          console.log('values in onSubmit:', values);
          // enableLoading();
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


                      <SearchSelect
                        name="subsidiaryId"
                        label={
                          <span>
                            Subsidiary<span style={{ color: "red" }}>*</span>
                          </span>
                        }
                        isDisabled={isUserForRead}
                        onChange={(e) => {
                          setFieldValue("subsidiaryId", e.value || null);
                          getActivePreviousPayrollMonth(e.value, setFieldValue);


                        }}
                        value={
                          dashboard?.allSubsidiaryList?.find(
                            (option) => option?.value === values.subsidiaryId
                          ) || null
                        }
                        options={dashboard?.allSubsidiaryList}
                        error={errors.subsidiaryId}
                        touched={touched.subsidiaryId}
                      />
                    </div>

                  </div>


                  <div className="from-group row">

                    <div className="col-12 col-md-4 mt-3">
                      <SearchSelect
                        name="month"
                        label={
                          <span>
                            Select Month
                            <span style={{ color: "red" }}>*</span>
                          </span>
                        }

                        isDisabled={isUserForRead || flag}
                        onChange={(e) => {
                          setFieldValue("month", e.value || null);

                        }}
                        value={
                          monthOptions?.find(
                            (option) => option.value == values.month
                          ) || null
                        }
                        options={monthOptions}
                        error={errors.month}
                        touched={touched.month}
                      />
                    </div>

                  </div>
                  <div className="from-group row">




                    <div className="col-12 col-md-4 mt-3">
                      <label>
                        Year{" "}
                        <span style={{ color: "red" }}>*</span>
                      </label>
                      <Field
                        name="year"
                        component={Input}
                        placeholder="Enter year"
                        disabled={isUserForRead || flag}
                        type="number"
                        min="1000"  // Minimum 4-digit year (e.g., 1000)
                        max="9999"  // Maximum 4-digit year (e.g., 9999)
                        maxLength="4"  // Limit to 4 digits
                        onInput={(e) => e.target.value = e.target.value.slice(0, 4)} // Ensure user can't type more than 4 digits



                      />
                    </div>

                  </div>
                  <div className="from-group row">
                    <div className="col-12 col-md-4 mt-3">


                      <Field
                        name="shortFormat"
                        disabled={flag}
                        component={Input}
                        onChange={(e) => {

                          setFieldValue("shortFormat", e.target.value); // Update the form field value
                        }}
                        placeholder="Enter Short Format 0125"
                        label="Short Format"

                        min="1000"  // Minimum 4-digit year (e.g., 1000)
                        max="9999"  // Maximum 4-digit year (e.g., 9999)
                        maxLength="4"  // Limit to 4 digits
                        onInput={(e) => e.target.value = e.target.value.slice(0, 4)}
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
                        onChange={(date) => {
                          setFieldValue("startDate", date);
                          setEndDate(date,setFieldValue)
                          // setDefaultStartDate(date);

                          // // Add 365 days (considering leap years automatically)
                          // const endDate = new Date(date);
                          // endDate.setMonth(endDate.getMonth() + 1); // Add one year (365 or 366 days will be calculated automatically)

                          // // Set the calculated end date
                          // endDate.setDate(endDate.getDate() - 1);
                          // setFieldValue("endDate", endDate);
                          // setDefaultEndDate(endDate);
                          // // setDefaultDays()
                          // // console.log("month_days111", defDays)
                          // setFieldValue("month_days", getDateDiffInDays(values.startDate, values.endDate));
                          // console.log("month_days111", values.startDate, defendDate)
                        }}

                        timeInputLabel="Time:"
                        dateFormat="dd/MM/yyyy"
                        showTimeInput
                        name="startDate"
                        disabled={isUserForRead || flag}
                        autoComplete="off"
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
                        }}


                        timeInputLabel="Time:"
                        dateFormat="dd/MM/yyyy"
                        showTimeInput
                        name="endDate"
                        disabled={true}
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
                        disabled={true}
                        component={Input}
                        placeholder="Enter Days"
                        label="Days"
                        autoComplete="off"


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
