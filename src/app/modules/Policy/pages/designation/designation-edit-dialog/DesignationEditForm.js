import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { Input, Select, TextArea } from "../../../../../../_metronic/_partials/controls";
import { useDispatch, useSelector } from "react-redux";
import { SearchSelect } from "../../../../../../_metronic/_helpers/SearchSelect";
import {
  fetchAllCity,

  fetchAllFormsMenu,

  fetchAllSubCenter,
  fetchAllSubsidiaryData,
  getLatestBookingNo,
} from "../../../../../../_metronic/redux/dashboardActions";
import { Radio } from "@material-ui/core";
import { amountLimit, amountLimitDynamic } from "../../../../../utils/common";

// Phone Number Regex
const phoneRegExp = /^((\+92)|(0092))-{0,1}\d{3}-{0,1}\d{7}$|^\d{11}$|^\d{4}-\d{7}$/;
// CNIC Regex
const cnicRegExp = /^[0-9]{5}-[0-9]{7}-[0-9]$/;
// Password Regex
const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
// Validation schema
const formValidationSchema = Yup.object().shape(
  {
    policyName: Yup.string()
      .matches(/^[A-Za-z]+$/, 'Only characters are allowed')
      .required("Required*"),
    subsdiaryId: Yup.string()
      .required("Required*"),
    currencyId: Yup.string()
      .required("Required*"),
      retirementAgeMale: Yup.string()
      .required("Required*"),

      retirementAgeFemale: Yup.string()
      .required("Required*"),

      minimumAge: Yup.string()
      .required("Required*"),

      maximumAge: Yup.string()
      .required("Required*"),

      pictureSizeLimit: Yup.string()
      .required("Required*"),


      pictureFilesSupport: Yup.string()
      .required("Required*"),
      
      documentSizeLimit: Yup.string()
      .required("Required*"),

      documentFilesSupport: Yup.string()
      .required("Required*"),

      

      
      contractualPolicyInMonth: Yup.number()
      .typeError('Please enter a valid number')  // Ensure it's a number
      .max(12, 'Value should not be greater than 12')  // Ensure the number is <= 12
      .required("Required*"),


      probationPolicyInMonth: Yup.number()
      .typeError('Please enter a valid number')  // Ensure it's a number
      .max(12, 'Value should not be greater than 12')  // Ensure the number is <= 12
      .required('Required*'),  // Field is required

      
      
  },

);
export function DesignationEditForm({
  saveEmpPolicy,
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

  const dispatch = useDispatch();
  const { dashboard } = useSelector((state) => state);
  // Get User Details
  const { auth } = useSelector((state) => state);

  const [defSubsidiary = null, setDefualtSubsidiaryList] = useState(null);
  const [defCurrencyCodeList = null, setDefualtCurrencyCodeList] = useState(null);

  useEffect(() => {

    if (!user.subsdiaryId) {

      dispatch(fetchAllSubsidiaryData("allSubsidiaryList"))
      dispatch(fetchAllFormsMenu(126, "allCurrencyCodeList"));
    }
  }, [dispatch]);

  useEffect(() => {
    const currencyId = defCurrencyCodeList?.value ? defCurrencyCodeList.value : user.currencyId;
    setDefualtCurrencyCodeList(
      dashboard.allCurrencyCodeList &&
      dashboard.allCurrencyCodeList.filter((item) => {
        return item.value === currencyId;
      })
    );
  },[user.subsdiaryId])

 
  return (
    <>
      <Formik
        enableReinitialize={true}
        initialValues={user}
        validationSchema={formValidationSchema}
        onSubmit={(obj) => {
          console.log("values employee policy obj", obj);
          enableLoading();
          saveEmpPolicy(obj);
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


                  <div className="form-group row">

                    {
                      <div className="col-12 col-md-4 mt-3">
                        <Field
                          name="policyName"
                          component={Input}
                          placeholder="Enter Policy Name"
                          label="Policy Name"
                          value={values.policyName}
                        />
                      </div>
                    }
                    {/* {
                      <div className="col-12 col-md-4 mt-3">
                        <Field
                          name="code"
                          component={Input}
                          placeholder="Enter Policy Code"
                          label="Code"
                          value={values.code}
                        />
                      </div>
                    } */}
                    <hr></hr>


                  </div>
                  <hr></hr>
                  <div className="from-group row">
                    {
                      <><div className="col-12 col-md-4 mt-3">
                        <SearchSelect
                          name="subsdiaryId"
                          label={<span> Subsidiary<span style={{ color: 'red' }}>*</span></span>}
                          isDisabled={isUserForRead && true}
                          onBlur={() => {
                            // handleBlur({ target: { name: "countryId" } });
                          }}
                          onChange={(e) => {
                            setFieldValue("subsdiaryId", e.value || null);
                            setDefualtSubsidiaryList(e);
                            //handlePaymenModeChanged(e)
                          }}

                          value={(defSubsidiary || null)}
                          error={errors.subsdiaryId}
                          touched={touched.subsdiaryId}
                          options={dashboard.allSubsidiaryList}
                        />


                      </div></>

                    }
                    {
                      <><div className="col-12 col-md-4 mt-3">
                        <SearchSelect
                        name="currencyId"
                        label={<span> Currency<span style={{ color: 'red' }}>*</span></span>}
                        isDisabled={isUserForRead && true}
                        onBlur={() => {
                          // handleBlur({ target: { name: "countryId" } });
                        }}
                        onChange={(e) => {
                          setFieldValue("currencyId", e.value || null);
                          setDefualtCurrencyCodeList(e);
                        
                        }}
                        value={(defCurrencyCodeList || null)}
                        error={errors.currencyId}
                        touched={touched.currencyId}
                        options={dashboard.allCurrencyCodeList}
                      />
                      </div></>

                    }
                    {
                      <>
                        <div className="col-12 col-md-4 mt-3">
                          <div id="my-radio-group"> Employee Code Generation</div>
                          <br></br>
                          <div role="group" aria-labelledby="gender-group">
                            <label>
                              <Field type="radio" checked={values.isEmployeeCodeGenerationAuto} name="isEmployeeCodeGenerationAuto" value="true" />
                              &nbsp;Auto
                            </label>
                            &nbsp; &nbsp;  <label>
                              <Field type="radio" checked={values.isEmployeeCodeGenerationAuto} name="isEmployeeCodeGenerationAuto" value="false" />
                              &nbsp;Manual
                            </label>
                          </div>
                        </div>
                      </>
                    }
                  </div>
                  <br></br>
                  <hr></hr>
                  <div><h6>Retirement Age</h6></div>
                  <div className="form-group row">
                    {
                      <div className="col-12 col-md-4 mt-3">
                        <Field
                          type="number"
                          onInput={(e) => {
                            e.target.value = amountLimitDynamic(e.target.value, 3); // Limit to 3 digits
                          }}
                          name="retirementAgeMale"
                          component={Input}
                          placeholder="Enter retirement age"
                          label="Retirement Age (Male)"
                        //value="50"
                        />
                      </div>
                    }
                    {
                      <div className="col-12 col-md-4 mt-3">
                        <Field
                          type="number"
                          onInput={(e) => {
                            e.target.value = amountLimitDynamic(e.target.value, 3); // Limit to 3 digits
                          }}
                          name="retirementAgeFemale"
                          component={Input}
                          placeholder="Enter Retirement Age (Female)"
                          label="Retirement Age (Female)"
                        //  value="55"
                        />
                      </div>
                    }
                    <hr></hr>


                  </div>
                  <hr></hr>
                  <div><h5>Employee Age</h5></div>
                  <div className="form-group row">

                    {
                      <div className="col-12 col-md-4 mt-3">
                        <Field
                          type="number"
                          onInput={(e) => {
                            e.target.value = amountLimitDynamic(e.target.value, 3); // Limit to 3 digits
                          }}
                          name="minimumAge"
                          component={Input}
                          placeholder="Enter minimum age"
                          label="Minimum Age"
                        //  value="18"
                        // 
                        />
                      </div>
                    }

                    {
                      <div className="col-12 col-md-4 mt-3">
                        <Field
                          type="number"
                          onInput={(e) => {
                            e.target.value = amountLimitDynamic(e.target.value, 3); // Limit to 3 digits
                          }}
                          name="maximumAge"
                          component={Input}
                          placeholder="60"
                          label="Enter maximum Age"
                        // value="60"
                        />
                      </div>
                    }
                  </div>

                  <hr></hr>
                  <div><h5>Profile Policy</h5></div>
                  <div className="form-group row">

                    {
                      <div className="col-12 col-md-4 mt-3">
                        <Field
                         type="number"
                         onInput={(e) => {
                           e.target.value = amountLimitDynamic(e.target.value,2); // Limit to 3 digits
                         }}
                          name="pictureSizeLimit"
                          component={Input}
                          placeholder="5MB"
                          label="Picture Size Limit (MB)"
                        // value="10"

                        />
                      </div>
                    }

                    {
                      <div className="col-12 col-md-4 mt-3">
                        <Field
                          name="pictureFilesSupport"
                          component={Input}
                          
                           placeholder=".jpg, .png"
                          label="File Support Extension"
                        // value=".jpg,.png,.gif"

                        />eg: .jpg,.png,.gif
                      </div>
                    }
                  </div>
                  <hr></hr>
                  <div><h5>Document Policy</h5></div>
                  <div className="form-group row">

                    {
                      <div className="col-12 col-md-4 mt-3">
                        <Field
                         type="number"
                         onInput={(e) => {
                           e.target.value = amountLimitDynamic(e.target.value,3); // Limit to 3 digits
                         }}
                          name="documentSizeLimit"
                          component={Input}
                          placeholder="5MB"
                          label="Document Size Limit (MB)"
                        //  value="100"
                        // 
                        />
                      </div>
                    }

                    {
                      <div className="col-12 col-md-4 mt-3">
                        <Field

                          name="documentFilesSupport"
                          component={Input}
                         
                          placeholder=".jpg, .png"
                          label="File Support Extension"
                        // value=".docx,.pdf,.xls,.txt"
                        />
                      </div>
                    }
                  </div>
                  <hr></hr>
                  <div><h5>Picture Policy</h5></div>
                  <div className="form-group row">

                    {
                      <>
                        <div className="col-12 col-md-4 mt-3">
                          {/* <div id="my-radio-group"> Employee Code Generation</div> */}
                          <br></br>
                          <div role="group" aria-labelledby="my-radio-group">
                            <label>
                              <Field type="radio" name="empPictureIsMandatory" value="true" />
                              &nbsp; Mandatory &nbsp;&nbsp;
                            </label>
                            <label>
                              &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp; <Field type="radio" name="empPictureIsMandatory" value="false" />
                              &nbsp; Optional
                            </label>
                            {/* <div>Picked: {values.picked}</div> */}
                          </div>
                        </div>
                      </>
                    }


                  </div>

                  <hr></hr>
                  <div><h5>Employee Status</h5></div>
                  <div className="form-group row">

                    {
                      <div className="col-12 col-md-4 mt-3">
                        <Field
                         type="number"
                         onInput={(e) => {
                           e.target.value = amountLimitDynamic(e.target.value,2); // Limit to 3 digits
                         }}
                          name="probationPolicyInMonth"
                          component={Input}
                          placeholder="12"
                          label="Enter Probation in Months"

                        // 
                        />
                      </div>
                    }

                    {
                      <div className="col-12 col-md-4 mt-3">
                        <Field
                          // 
                          type="number"
                          onInput={(e) => {
                            e.target.value = amountLimitDynamic(e.target.value,2); // Limit to 3 digits
                          }}
                          name="contractualPolicyInMonth"
                          component={Input}
                          
                         placeholder="12"
                          label="Enter Contractual in Months"

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
