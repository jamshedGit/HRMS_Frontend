
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
import { amountLimit, amountLimitDynamic, formatDates, formatDatesGlobal, getDateDiffInDays } from "../../../../../utils/common";
import { addMonths, getMonth } from "date-fns";
// Phone Number Regex
const phoneRegExp = /^((\+92)|(0092))-{0,1}\d{3}-{0,1}\d{7}$|^\d{11}$|^\d{4}-\d{7}$/;
// CNIC Regex
const cnicRegExp = /^[0-9]{5}-[0-9]{7}-[0-9]$/;
// Password Regex
const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
// Validation schema
const formValidation = Yup.object().shape(
  {
    subsidiaryId: Yup.mixed()
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






  useEffect(() => {

    if (!user.Id) {
      dispatch(fetchAllSubsidiaryData("allSubsidiaryList"))
    }
  }, [dispatch]);








  const [flag, setFlag] = useState(false)
  const getActivePreviousPayrollMonth = async (subsidiaryId, setFieldValue) => {

    const response = await axios.post(`${USERS_URL}/payroll_month/get-payroll-month-previous-date`, { subsidiaryId: subsidiaryId });






    // const t = formatDates(get_startDate, 'MMyy')





  }




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

          enableLoading();

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
            {console.log("values111", values)}
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
                        // isDisabled={isEdit}
                        onChange={(e) => {
                          setFieldValue("month", e.value || null);

                        }}
                        value={
                          monthOptions?.find(
                            (option) => option.value === values.month
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
                  {/* <div className="from-group row">


   <div className="col-12 col-md-4 mt-3">

                      <span> Start Date<span style={{ color: 'red' }}>*</span></span>
                      <DatePicker
                        className="form-control"
                        placeholder="Enter Start Date"
                        selected={defstartDate}
                        onChange={(date) => {
                          setFieldValue("startDate", date);
                          setDefaultStartDate(date);

                                   // Add 365 days (considering leap years automatically)
                                   const endDate = new Date(date);
                                   endDate.setFullYear(endDate.getFullYear() + 1); // Add one year (365 or 366 days will be calculated automatically)
         
                                   // Set the calculated end date
                                   endDate.setDate(endDate.getDate() - 1);
                                   setFieldValue("endDate", endDate);
                                   setDefaultEndDate(endDate);
                        }}
                      
                        timeInputLabel="Time:"
                        dateFormat="dd/MM/yyyy"
                        showTimeInput
                        name="startDate"
                        disabled={isUserForRead}
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
                   




                  </div> */}

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
