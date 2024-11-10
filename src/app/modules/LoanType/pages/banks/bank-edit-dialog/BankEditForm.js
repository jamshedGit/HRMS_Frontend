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
import { amountLimit } from "../../../../../utils/common";

// Phone Number Regex
const phoneRegExp = /^((\+92)|(0092))-{0,1}\d{3}-{0,1}\d{7}$|^\d{11}$|^\d{4}-\d{7}$/;
// CNIC Regex
const cnicRegExp = /^[0-9]{5}-[0-9]{7}-[0-9]$/;
// Password Regex
const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
// Validation schema
const formValidation = Yup.object().shape(
  {

    code: Yup.string()
      .required("Required*"),
    name: Yup.string()
      .required("Required*")
      .matches(/^[A-Za-z\s]+$/, 'Name must only contain letters.'),
      
    linkedAttendance: Yup.string()
      .required("Required*"),
    // loan: Yup.string()
    //   .required("Required*"),
    mapped: Yup.string()
      .required("Required*"),
    account: Yup.string()
    .matches(/^\d+(\.\d+)?$/, 'Must be a valid number (digits with optional decimal)')
      .required("Required*")
  },

);
export function BankEditForm({
  saveLoanType,
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

  useEffect(() => {

    const employeeId = defEmployee?.value ? defEmployee.value : user.employeeId;

    setEmployeeDefault(
      dashboard.allEmployees &&
      dashboard.allEmployees.filter((item) => {
        return item.value === employeeId;
      })
    );

  }, [user?.employeeId, dashboard.employeeId]);

 

  return (
    <>
      <Formik
        enableReinitialize={true}
        initialValues={{...user,code:user.code || defDeductionCode}}
        validationSchema={formValidation}
        onSubmit={(values) => {
          console.log("values", values);
           
          enableLoading();
          saveLoanType(values);
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
                          name="code"
                          component={Input}
                          maxLength={6}
                          placeholder="Enter Deduction Code"
                         
                          label={<span> Code<span style={{ color: 'red' }}>*</span></span>}
                          autoComplete="off"
                        />
                      </div>

                    }
                    {
                      <div className="col-12 col-md-4 mt-3">
                        <Field
                          name="name"
                          maxLength={30}
                          component={Input}
                          placeholder="Enter Deduction Name"
                          autoComplete="off"
                          label={<span> Name<span style={{ color: 'red' }}>*</span></span>}
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
                            // if (e.target.value === "true") {
                            //   setFieldValue("loan", false);
                            // }

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

                    <div className="col-12 col-md-4 mt-3">
                      <Select
                        label={<span> Mapped<span style={{ color: 'red' }}>*</span></span>}
                        name="mapped"
                        value={values.mapped}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        style={{ display: "block" }}
                      >
                        <option value="-1" label="Select" />
                        <option value="Income Tax" label="Income Tax" />
                        <option value="Leaves" label="Leaves" />


                      </Select>
                      {errors.mapped && touched.mapped && (
                        <div className="invalid-text">{errors.mapped}</div>
                      )}
                    </div>

                    {/* {

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

                    } */}
                  </div>

                  <div className="from-group row">
                    {



                    }
                    {
                      <div className="col-12 col-md-4 mt-3">
                        <Field
                          name="account"
                          onInput={(e) => {
                            e.target.value = amountLimit(e.target.value); // Limit to 3 digits
                          }}
                          maxLength={15}
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
