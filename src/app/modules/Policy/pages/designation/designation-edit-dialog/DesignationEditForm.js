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
import { Radio } from "@material-ui/core";

// Phone Number Regex
const phoneRegExp = /^((\+92)|(0092))-{0,1}\d{3}-{0,1}\d{7}$|^\d{11}$|^\d{4}-\d{7}$/;
// CNIC Regex
const cnicRegExp = /^[0-9]{5}-[0-9]{7}-[0-9]$/;
// Password Regex
const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
// Validation schema
const ReligionEditSchema = Yup.object().shape(
  {
    designationName: Yup.string()
      .required("Required*"),
    designationCode: Yup.string()
      .required("Required*"),

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

  const { dashboard } = useSelector((state) => state);
  // Get User Details
  const { auth } = useSelector((state) => state);

  const initialValues = {

    subsdiaryId: '',
    currencyId: '',
    rdlEmpCode: '',
    retirementAgeMale: '50',
    retirementAgeFemale: '55',
    minimumAge: '18',
    maximumAge: '60',
    pictureSizeLimit: '10',
    //pictureFilesSupport: '.jpg,.png,.gif',
    documentSizeLimit: '100',
    documentFilesSupport: '.docx,.pdf,.xls,.txt',
    profileMandatory: '',
    isEmployeeCodeGenerationAuto: ''

  };

  return (
    <>
      <Formik
        enableReinitialize={true}
        initialValues={user}
        // validationSchema={ReligionEditSchema}
        onSubmit={(obj) => {
          // obj.retirementAgeMale = "50";
          // obj.retirementAgeFemale = "55";
          // obj.minimumAge = "18";
          // obj.maximumAge = "60";
          // obj.pictureSizeLimit = "10";
          // //obj.pictureFilesSupport = ".jpg,.png,.gif1";
          // obj.documentSizeLimit = "100";
          // obj.documentFilesSupport = ".docx,.pdf,.xls,.txt";
          // obj.isEmployeeCodeGenerationAuto = obj.isEmployeeCodeGenerationAuto; // Employee Code Generation
          // //  obj.empPictureIsMandatory = obj.empPictureIsMandatory
          // obj.probationPolicyInMonth = "6"
          // obj.contractualPolicyInMonth = "12";


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
                        <Select
                          label="Subsidiary"
                          name="subsdiaryId"
                          value={values.subsdiaryId}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          style={{ display: "block" }}
                        >
                          <option value="-1" label="Select Subsidiary" />
                          <option value="1" label="Pakistan" />
                          <option value="2" label="Dubai" />
                          <option value="3" label="Australia" />

                        </Select>
                        {errors.fuelType && touched.fuelType && (
                          <div className="invalid-text">{errors.subsdiaryId}</div>
                        )}
                      </div></>

                    }
                    {
                      <><div className="col-12 col-md-4 mt-3">
                        <Select
                          label="Currency"
                          name="currencyId"
                          value={values.currencyId}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          style={{ display: "block" }}
                        >
                          <option value="-1" label="Select Currency" />
                          <option value="1" label="PKR" />
                          <option value="2" label="AED" />
                          <option value="3" label="AUS" />

                        </Select>
                        {errors.fuelType && touched.fuelType && (
                          <div className="invalid-text">{errors.currencyId}</div>
                        )}
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
                          name="pictureSizeLimit"
                          component={Input}
                          placeholder="Picture size limit in MB"
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
                          placeholder="Enter File Extensions with comma seprated"
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
                          name="documentSizeLimit"
                          component={Input}
                          placeholder="Picture size limit in MB"
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
                          placeholder="Enter File Extensions"
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
                          name="probationPolicyInMonth"
                          component={Input}
                          placeholder="18"
                          label="Enter Probation in Months"
                        
                        // 
                        />
                      </div>
                    }

                    {
                      <div className="col-12 col-md-4 mt-3">
                        <Field
                          // 
                          name="contractualPolicyInMonth"
                          component={Input}
                          placeholder="Enter Contractual in Months"
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
