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
  fetchAllActiveEmployees,
  getLatestTableId
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

    // deductionCode: Yup.string()
    //   .required("Required*"),
    deductionName: Yup.string()
      .required("Required*"),
    linkedAttendance: Yup.string()
      .required("Required*"),
    loan: Yup.string()
      .required("Required*"),
    mappedDeduction: Yup.string()
      .required("Required*"),
    account: Yup.string()
      .required("Required*"),
  },

);
export function BankEditForm({
  saveIncident,
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
  const [defEmployee = null, setEmployeeDefault] = useState(null);
  const [defDeductionCode = null, setDefDeductionCode] = useState('');
  const [isDisabled, setIsDisabled] = useState(false);
  const dispatch = useDispatch();


//   useEffect(() => {
   
//     const response = dispatch(getLatestTableId("t_employee_deduction", "ED-")) // For Getting Last ID For Code
//     console.log("dish",response[0].Id);
//     setDefDeductionCode(response[0].Id)
  
// }, [dispatch]);
  // EMployee Dropdown Binding
  useEffect(() => {
   
    const employeeId = defEmployee?.value ? defEmployee.value : user.employeeId;

    setEmployeeDefault(
      dashboard.allEmployees &&
      dashboard.allEmployees.filter((item) => {
        return item.value === employeeId;
      })
    );

  }, [user?.employeeId, dashboard.employeeId]);

  useEffect(() => {
    // Define an async function within useEffect
    const fetchData = async () => {
      try {
        console.log("User:", user);
        if (user.deductionCode === '') {
          const response = await dispatch(getLatestTableId("t_employee_deduction", "D-000"));
          
          // Assuming response[0].Id is the correct way to access the ID
          console.log("Response:", response[0]?.Id);
          setDefDeductionCode(response[0]?.Id);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData(); // Call the async function

  }, [dispatch, user.deductionCode]); 

  return (
    <>
      <Formik
        enableReinitialize={true}
        initialValues={user}
        validationSchema={formValidation}
        onSubmit={(values) => {
          console.log("values", values);
          values.deductionCode = defDeductionCode;
          enableLoading();
          saveIncident(values);
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
                    {
                      <div className="col-12 col-md-4 mt-3">
                        <Field
                          name="deductionCode"
                          component={Input}
                          
                          placeholder="Enter Deduction Code"
                          value = {defDeductionCode}
                          label={<span> Deduction Code<span style={{ color: 'red' }}>*</span></span>}
                          autoComplete="off"
                        />
                      </div>

                    }
                    {
                      <div className="col-12 col-md-4 mt-3">
                        <Field
                          name="deductionName"
                          component={Input}
                          placeholder="Enter Deduction Name"
                          autoComplete="off"
                          label={<span> Deduction Name<span style={{ color: 'red' }}>*</span></span>}
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
                          // onChange={handleLinkedAttendanceChange}
                          onChange={(e) => {
                            console.log("linked", e.target.value)
                            setFieldValue("linkedAttendance", e.target.value);
                            if (e.target.value === "true") {
                              setFieldValue("loan", false);
                            }

                          }}
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
                          label={<span> Loan<span style={{ color: 'red' }}>*</span></span>}
                          name="loan"
                          value={values.loan}
                          onChange={(e) => {

                            if (e.target.value === "true") {
                              setFieldValue("loan", true);
                              setFieldValue("linkedAttendance", false);
                            }
                            else
                              setFieldValue("loan", false);

                          }}
                          onBlur={handleBlur}
                          style={{ display: "block" }}
                        >
                          <option value="-1" label="Select" />
                          <option value="true" label="Yes" />
                          <option value="false" label="No" />


                        </Select>
                        {errors.loan && touched.loan && (
                          <div className="invalid-text">{errors.loan}</div>
                        )}
                      </div>

                    }
                  </div>

                  <div className="from-group row">
                    {

                      <div className="col-12 col-md-4 mt-3">
                        <Select
                          label={<span> Mapped Deduction<span style={{ color: 'red' }}>*</span></span>}
                          name="mappedDeduction"
                          value={values.mappedDeduction}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          style={{ display: "block" }}
                        >
                          <option value="-1" label="Select" />
                          <option value="Income Tax" label="Income Tax" />
                          <option value="Leaves" label="Leaves" />


                        </Select>
                        {errors.mappedDeduction && touched.mappedDeduction && (
                          <div className="invalid-text">{errors.mappedDeduction}</div>
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
