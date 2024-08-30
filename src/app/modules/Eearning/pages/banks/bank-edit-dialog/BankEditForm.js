import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { Input, Select, TextArea } from "../../../../../../_metronic/_partials/controls";
import { useDispatch, useSelector } from "react-redux";
import { SearchSelect } from "../../../../../../_metronic/_helpers/SearchSelect";
import {
  fetchAllCity,
  fetchAllCountry,
  fetchAllFormsMenu,
  fetchAllActiveEmployees

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
   
      earningCode: Yup.string()
      .required("Required*"),
      earningName: Yup.string()
      .required("Required*"),
      linkedAttendance: Yup.string()
      .required("Required*"),
      isTaxable: Yup.string()
      .required("Required*"),
      mappedAllowance: Yup.string()
      .required("Required*"),
      account: Yup.string()
      .required("Required*"),
  },

);
export function BankEditForm({
  saveEarning,
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

  const dispatch = useDispatch();
  const [defCountry, setDefaultCountry] = useState({});
  const [defCity, setDefaultCity] = useState({});
  const [defDegreeTitle, setDefaultDegreeTitle] = useState({});
  const [defInstitution, setInstitution] = useState({});

  // Drop Downs Controls
  const [incidentDate, setIncidentDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [defStatus, setStatus] = useState(null);
  const [attachment, setPDFAttached] = useState('');
  const [file, setFile] = useState('');

  const [defEmployee = null, setEmployeeDefault] = useState(null);

  const [defActionBy = null, setActionByDefault] = useState(null);
  useEffect(() => {

    if (!user.Id) {
      setPDFAttached(user.attachment || '');
      dispatch(fetchAllActiveEmployees());

    }
  }, [dispatch]);

  //===== Date Of startDate
  useEffect(() => {

    if (user.date) {
      setIncidentDate(new Date(user.date));
    }
  }, [user.date]);

  //===== Date Of End Date
  useEffect(() => {

    if (user.endDate) {
      setEndDate(new Date(user.endDate));
    }
  }, [user.endDate]);

  //=========== END





  return (
    <>
      <Formik
        enableReinitialize={true}
        initialValues={user}
        validationSchema={formValidation}
        onSubmit={(values) => {
          console.log("values", values);
          enableLoading();
          saveEarning(values);
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
                  {/* <div className="from-group row">
                    {
                      <div className="col-12 col-md-4 mt-3">
                        <SearchSelect
                          name="employeeId"
                          label={<span> Employee<span style={{ color: 'red' }}>*</span></span>}
                          isDisabled={isUserForRead && true}
                          onBlur={() => {
                            // handleBlur({ target: { name: "countryId" } });
                          }}
                          onChange={(e) => {
                            setFieldValue("employeeId", e.value || null);
                            setEmployeeDefault(e);
                            dispatch(fetchAllActiveEmployees(e.value));
                          }}
                          value={(defEmployee || null)}
                          error={errors.employeeId}
                          touched={touched.employeeId}
                          options={dashboard.allEmployees}
                        />
                      </div>
                    }


                  </div> */}
                  <div className="from-group row">
                    {
                      <div className="col-12 col-md-4 mt-3">
                        <Field
                          name="earningCode"
                          component={Input}
                          placeholder="Enter Earning Code"
                          // value = {values.skill}
                          label={<span> Earning Code<span style={{ color: 'red' }}>*</span></span>}
                          autoComplete="off"
                        />
                      </div>

                    }
                    {
                      <div className="col-12 col-md-4 mt-3">
                        <Field
                          name="earningName"
                          component={Input}
                          placeholder="Ener Earning Name"
                          autoComplete="off"
                          label={<span> Earning Name<span style={{ color: 'red' }}>*</span></span>}
                        />
                      </div>
                    }

                  </div>
                  <div className="from-group row">
                    {

                      <div className="col-12 col-md-4 mt-3">
                        <Select
                          label={<span> Linked With Attendance<span style={{ color: 'red' }}>*</span></span>}
                          name="linkedAttendance"
                          value={values.linkedAttendance}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          style={{ display: "block" }}
                        >
                          <option value="-1" label="Select" />
                          <option value="true" label="Yes" />
                          <option value="false" label="No" />


                        </Select>
                        {errors.linkedAttendance && touched.linkedAttendance && (
                          <div className="invalid-text">{errors.linkedAttendance}</div>
                        )}
                      </div>

                    }
                    {

                      <div className="col-12 col-md-4 mt-3">
                        <Select
                          label={<span> Taxable<span style={{ color: 'red' }}>*</span></span>}
                          name="isTaxable"
                          value={values.isTaxable}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          style={{ display: "block" }}
                        >
                          <option value="-1" label="Select" />
                          <option value="true" label="Yes" />
                          <option value="false" label="No" />


                        </Select>
                        {errors.isTaxable && touched.isTaxable && (
                          <div className="invalid-text">{errors.isTaxable}</div>
                        )}
                      </div>

                    }
                  </div>

                  <div className="from-group row">
                    {
                      <div className="col-12 col-md-4 mt-3">
                        <Select
                          label={<span> Mapped Allowance<span style={{ color: 'red' }}>*</span></span>}
                          name="mappedAllowance"
                          value={values.mappedAllowance}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          style={{ display: "block" }}
                        >
                          <option value="-1" label="Select" />
                          <option value="Basic Salary" label="Basic Salary" />
                          <option value="Bonus" label="Bonus" />

                        </Select>
                        {errors.mappedAllowance && touched.mappedAllowance && (
                          <div className="invalid-text">{errors.mappedAllowance}</div>
                        )}
                      </div>

                    }
                    {
                      <div className="col-12 col-md-4 mt-3">
                        <Field
                          name="account"
                          component={Input}
                          placeholder="Ener Account"
                          autoComplete="off"
                          label={<span> Account<span style={{ color: 'red' }}>*</span></span>}
                        />
                      </div>
                    }
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
