import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { Input, Select, TextArea } from "../../../../../../_metronic/_partials/controls";
import { useDispatch, useSelector } from "react-redux";
import { SearchSelect } from "../../../../../../_metronic/_helpers/SearchSelect";
import {
  fetchAllCity,

  fetchAllSubCenter,
  getLatestBookingNo,
} from "../../../../../../_metronic/redux/dashboardActions";

// Phone Number Regex
const phoneRegExp = /^((\+92)|(0092))-{0,1}\d{3}-{0,1}\d{7}$|^\d{11}$|^\d{4}-\d{7}$/;
// CNIC Regex
const cnicRegExp = /^[0-9]{5}-[0-9]{7}-[0-9]$/;
// Password Regex
const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
// Validation schema
const bankEditSchema = Yup.object().shape(
  {
    Name: Yup.string()
      .required("Required*"),
   
  },
  
);
export function BankEditForm({
  saveBank,
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
  

  return (
    <>
      <Formik
        enableReinitialize={true}
        initialValues={user}
         validationSchema={bankEditSchema}
        onSubmit={(values) => {
          console.log("bank values", values);
          enableLoading();
          saveBank(values);
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
                      <Field
                        name="Name"
                        component={Input}
                        placeholder="Bank Name"
                        label={<span> Bank<span style={{ color: 'red' }}>*</span></span>}
                        
                      />
                    </div>
                   
                    {/* <div className="col-12 col-md-4 mt-3">
                      <SearchSelect
                        name="countryId"
                        label="Select Country*"
                        isDisabled={isUserForRead && true}
                        onBlur={() => {
                         // handleBlur({ target: { name: "countryId" } });
                        }}
                        onChange={(e) => {
                          setFieldValue("countryId", e.value);
                          setDefaultCountry(e);
                          dispatch(fetchAllCity(e.value));
                        }}
                        value={defCountry}
                        error={errors.countryId}
                        touched={touched.countryId}
                        options={dashboard.allCountry}
                      />
                    </div>  */}
                    {/* <div className="col-12 col-md-4 mt-3">
                      <SearchSelect
                        name="cityId"
                        label="Select City*"
                        isDisabled={isUserForRead && true}
                        onBlur={() => {
                          //   handleBlur({ target: { name: "cityId" } });
                        }}
                        onChange={(e) => {
                          setFieldValue("cityId", e.value);
                          setDefaultCity(e);
                          dispatch(fetchAllCityCenters(e.value));
                        }}
                        value={defCity}
                        error={errors.cityId}
                        touched={touched.cityId}
                        options={dashboard.allCity}
                      />
                    </div> */}

                    {/* <div className="col-12 col-md-4 mt-3">
                      <SearchSelect
                        name="cityId"
                        label="City*"
                        isDisabled={isUserForRead ? true : false}
                       // onBlur={handleBlur}
                        onBlur={() => {
                          handleBlur({ target: { name: "cityId" } });
                        }}
                        //options={dashboard.allCity}
                        onChange={(e) => {
                          setFieldValue("cityId", e.value);
                          setSelectCity(e);
                        }}
                        value={selectCity}
                        error={errors.cityId}
                        touched={touched.cityId}
                        options={dashboard.allCity}
                      />
                    </div> */}
                    {/* <div className="col-12 col-md-4 mt-3">
                      <SearchSelect
                        name="centerId"
                        label="Select Circle*"
                        isDisabled={isUserForRead && true}
                        onBlur={() => {
                          handleBlur({ target: { name: "centerId" } });
                        }}
                        onChange={(e) => {
                          setFieldValue("centerId", e.value);
                          setDefaultCenter(e);
                          dispatch(fetchAllSubCenter(e.value));
                        }}
                        value={defCenter}
                        // error={user.centerId}
                        // touched={touched.centerId}
                        options={dashboard.cityCenters}
                      />
                    </div> */}
                    {/* <div className="col-12 col-md-4 mt-3">
                      <SearchSelect
                        name="subCenterId"
                        label="Center*"
                        isDisabled={isUserForRead && true}
                        onBlur={() => {
                          handleBlur({ target: { name: "subCenterId" } });
                        }}
                        onChange={(e) => {
                          setFieldValue("subCenterId", e.value);
                          setDefaultSubCenter(e);

                        }}
                        value={defSubcenter}
                        error={errors.subCenterId}
                        touched={touched.subCenterId}
                        options={dashboard.allSubCenter}
                      />
                    </div> */}
                    {/* <div className="col-12 col-md-4 mt-3">
                      <Field
                        name="description"
                        component={TextArea}
                        placeholder="Description"
                        label="Description"
                      />
                    </div> */}
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
