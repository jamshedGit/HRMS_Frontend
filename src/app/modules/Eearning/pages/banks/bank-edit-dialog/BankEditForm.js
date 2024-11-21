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
  getLatestTableId,
  fetchAllSubsidiaryData

} from "../../../../../../_metronic/redux/dashboardActions";
import DatePicker from "react-datepicker";
import { VALIDATION_MESSAGES } from "../../../../../utils/constants";

// Phone Number Regex
const phoneRegExp = /^((\+92)|(0092))-{0,1}\d{3}-{0,1}\d{7}$|^\d{11}$|^\d{4}-\d{7}$/;
// CNIC Regex
const cnicRegExp = /^[0-9]{5}-[0-9]{7}-[0-9]$/;
// Password Regex
const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
// Validation schema

const formValidation = Yup.object().shape(
  {
    subsidiaryId: Yup.string()
      .nullable()
      .required(VALIDATION_MESSAGES.required),
    // earningCode: Yup.string()
    //   .nullable()
    //   .required(VALIDATION_MESSAGES.required),
    earningName: Yup.string()
      .matches(/^[A-Za-z\s]+$/, 'Name must only contain letters.')
      .required(VALIDATION_MESSAGES.required),
    linkedAttendance: Yup.string()
      .required(VALIDATION_MESSAGES.required),
    isTaxable: Yup.string()
      .required(VALIDATION_MESSAGES.required),
    mappedAllowance: Yup.string()
      .required(VALIDATION_MESSAGES.required),
    account: Yup.string()
      .matches(/^\d+$/, "Must contain only digits")
      .required(VALIDATION_MESSAGES.required),


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

  const [defEarningCode = null, setDefaultEarningCode] = useState(null);
  const [defSubsidiary = null, setDefualtSubsidiaryList] = useState(null);

  useEffect(() => {

    if (!user.Id) {
      dispatch(fetchAllFormsMenu(45, "allAccountList")); // For All Grade Codes
    }
  }, [dispatch]);


  useEffect(() => {

    if (!user.Id) {
      dispatch(fetchAllFormsMenu(45, "allAccountList")); // For All Grade Codes
      dispatch(fetchAllSubsidiaryData("allSubsidiaryList"))
    }
  }, [dispatch]);


  useEffect(() => {

    const subsidiaryId = defSubsidiary?.value ? defSubsidiary.value : user.subsidiaryId;

    setDefualtSubsidiaryList(
      dashboard.allSubsidiaryList &&
      dashboard.allSubsidiaryList.filter((item) => {
        return item.value === subsidiaryId;
      })
    );

  }, [user?.subsidiaryId, dashboard.subsidiaryId]);



  const fetchData = async (subsidiaryId, setValue) => {
    console.log("jj::", subsidiaryId)
    if (subsidiaryId) {
      dispatch(getLatestTableId("t_employee_earning", "Id", " subsidiaryId = " + subsidiaryId, setValue));
    }
  };

  return (
    <>
      <Formik
        enableReinitialize={true}
        initialValues={user}
        validationSchema={formValidation}
        onSubmit={(values) => {
          console.log("values", values);
          enableLoading();

          saveEarning({ ...values, earningCode: defEarningCode ? defEarningCode : values.earningCode });
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
                        label={<span> Subsidiary<span style={{ color: 'red' }}>*</span></span>}
                        isDisabled={isUserForRead && true}
                        onBlur={() => {
                          // handleBlur({ target: { name: "countryId" } });
                        }}
                        onChange={(e) => {
                          setFieldValue("subsidiaryId", e.value || null);
                          setDefualtSubsidiaryList(e);
                          fetchData(e.value, setDefaultEarningCode)
                          //handlePaymenModeChanged(e)
                        }}

                        value={(defSubsidiary || null)}
                        error={errors.subsidiaryId}
                        touched={touched.subsidiaryId}
                        options={dashboard.allSubsidiaryList}
                      />
                    </div>
                  </div>
                  <div className="from-group row">
                    {
                      <div className="col-12 col-md-4 mt-3">
                        <Field
                          name="earningCode"
                          component={Input}
                          maxLength={6}
                          onChange={(e) => {
                            setFieldValue("earningCode", e.target.value || null);
                            setDefaultEarningCode(e);

                          }}
                          disabled
                          placeholder="Enter Earning Code"
                          value={defEarningCode || values.earningCode}
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
                          maxLength={30}
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

                        <SearchSelect
                          name="account"
                          label={
                            <span>
                              Account<span style={{ color: "red" }}>*</span>
                            </span>
                          }
                          isDisabled={isUserForRead}
                          onChange={(e) => {
                            setFieldValue("account", e.value || null);
                          }}
                          value={
                            dashboard.allAccountList.find(
                              (option) => option.value == values.account
                            ) || null
                          }
                          // options={dashboard.allAccountList}
                          options={dashboard.allAccountList.map((option) => ({
                            label: `${option.mergeLabel}`, // Adding the value to the label
                            value: option.value,
                          }))}

                          error={errors.account}
                          touched={touched.account}
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
