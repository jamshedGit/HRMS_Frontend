import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { Input, Select, TextArea } from "../../../../../../_metronic/_partials/controls";
import { useDispatch, useSelector } from "react-redux";
import { SearchSelect } from "../../../../../../_metronic/_helpers/SearchSelect";
import {
  fetchAllCity,
  fetchAllCityCenters,
  fetchAllSubCenter,
  getLatestBookingNo,
} from "../../../../../../_metronic/redux/dashboardActions";
import DatePicker from "react-datepicker";
// Phone Number Regex
const phoneRegExp = /^((\+92)|(0092))-{0,1}\d{3}-{0,1}\d{7}$|^\d{11}$|^\d{4}-\d{7}$/;
// CNIC Regex
const cnicRegExp = /^[0-9]{5}-[0-9]{7}-[0-9]$/;
// Password Regex
const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
// Validation schema
const formValidation = Yup.object().shape(
  {
    startDate: Yup.string()
      .required("Required*"),
      endDate: Yup.string()
      .required("Required*"),

   
  },
  
);
export function MasterEditForm({
  SaveTaxSetup,
  user,
  actionsLoading,
  onHide,
  roles,
  centers,
  userStatusTypes,
  isUserForRead,
  values,
  enableLoading,
  loading,
}) {
  
  const { dashboard } = useSelector((state) => state);
  // Get User Details
  const { auth } = useSelector((state) => state);
  const [defstartDate, setDefaultStartDate] = useState(null);
  const [defendDate, setDefaultEndDate] = useState(null);
  //===== Date Of Joining
  useEffect(() => {
    if (user.startDate) {
      setDefaultStartDate(new Date(user.startDate));
    }
  }, [user.startDate]);

  useEffect(() => {
    if (user.endDate) {
      setDefaultEndDate(new Date(user.endDate));
    }
  }, [user.endDate]);

  return (
    <>
      <Formik
        enableReinitialize={true}
        initialValues={user}
         validationSchema={formValidation}
        onSubmit={(values) => {
          console.log("values", values);
          enableLoading();
          SaveTaxSetup(values);
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

                       <span> Start Date<span style={{ color: 'red' }}>*</span></span>
                        <DatePicker
                          className="form-control"
                          placeholder="Enter Start Date"
                          selected={defstartDate}
                          onChange={(date) => {
                            setFieldValue("startDate", date);
                            setDefaultStartDate(date);
                          }}
                          timeInputLabel="Time:"
                          dateFormat="dd/MM/yyyy"
                          showTimeInput
                          name="startDate"
                          disabled={isUserForRead}
                            autoComplete="off"
                        // value = {values.dateOfJoining}
                        />
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
                          disabled={isUserForRead}
                          autoComplete="off"
                        // value = {values.dateOfJoining}
                        />
                      </div>
                    </div>
                   
                   
                  
                  <div className="form-group row"></div>
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
