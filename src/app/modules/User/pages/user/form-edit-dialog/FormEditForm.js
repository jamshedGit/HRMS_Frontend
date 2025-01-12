import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { DatePickerField, Input } from "../../../../../../_metronic/_partials/controls"; // Adjust import as needed
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { SearchSelect } from "../../../../../../_metronic/_helpers/SearchSelect";
import {
  fetchAllFormsMenu,
  fetchAllHumanResourceRole,
  fetchAllSubsidiaryData,
} from "../../../../../../_metronic/redux/dashboardActions";
import { VALIDATION_MESSAGES } from "../../../../../utils/constants";
import { getDateDiffInDays } from "../../../../../utils/common";

// percentage: Yup.string().required("Required*"),
const userEditSchema = Yup.object().shape({
  // from_amount: Yup.string().required("Required*"),

  subsidiaryId: Yup.number()
    .required(VALIDATION_MESSAGES.required),

  // to_amount: Yup.string().required("Required*"),

  employeeIdMapping: Yup.number()
    .nullable(),


  employeeName: Yup.string()
    .nullable()
    .required(VALIDATION_MESSAGES.required),

  deactiveflag: Yup.number()
    .nullable()
    .required(VALIDATION_MESSAGES.required),

  roleId: Yup.number()
    .nullable()
    .required(VALIDATION_MESSAGES.required),

  allowUserCreation: Yup.number()
    .nullable()
    .required(VALIDATION_MESSAGES.required),

  password: Yup.string()
    .nullable()
    .required(VALIDATION_MESSAGES.required),

  email: Yup.string()
    .nullable()
    .required(VALIDATION_MESSAGES.required),


  supervisedbyId: Yup.number()
    .nullable()
    .required(VALIDATION_MESSAGES.required),

});

export function FormEditForm({
  saveForm,
  user,
  actionsLoading,
  onHide,
  isUserForRead,
  enableLoading,
  loading,
}) {
  const dispatch = useDispatch();
  const { dashboard } = useSelector((state) => state);

  useEffect(() => {
    if (!user.Id) {

      dispatch(fetchAllSubsidiaryData("allSubsidiaryList"));



    }
  }, [dispatch, user.Id]);


  const { currentState, userAccess } = useSelector((state) => {
    return {
      currentState: state.UserModule,
      userAccess: state?.auth?.userAccess["user"],

    };
  }, shallowEqual);

  const { userForEdit, roles } = currentState;



  const basisOptions = [

    { value: false, label: "No" },
    { value: true, label: "Yes" },
  ];

  const activeOptions = [

    { value: false, label: "Inactive" },
    { value: true, label: "Active" },
  ];
  return (
    <Formik
      enableReinitialize={true}

      initialValues={user}
      validationSchema={userEditSchema}
      onSubmit={(values) => {
        console.log("saving")
        enableLoading();
        saveForm(values);
      }}
    >
      {({ handleSubmit, errors, touched, values, setFieldValue, handleChange }) => (
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

                  <div className="col-12 col-md-4 mt-3">
                    Subsidiary <span style={{ color: "red" }}>*</span>
                    <div style={{ backgroundColor: "#ffffff", height: "170px", padding: "10px", overflow: "scroll" }}>

                      <div className="multi-select">
                        <div className="dropdown-label"></div>
                        <div className="dropdown-options" style={{ fontSize: "12px", fontWeight: "bold", padding: "5px" }}>
                          {dashboard?.allSubsidiaryList?.map((option) => (
                            <div key={option.value} className="dropdown-option">
                              <input style={{ width: "25px" }}
                                name="subsidiaryId"
                                type="checkbox"
                                value={option.value}
                                checked={Boolean(values?.subsidiaryId?.includes(option?.value?.toString()))}
                                onChange={handleChange}
                              />
                              {option.label}
                            </div>
                          ))}
                          {errors.subsidiaryId && touched.subsidiaryId && (
                            <div className="invalid-text">{errors.subsidiaryId}</div>
                          )}

                        </div>
                      </div>
                    </div>
                  </div>

                </div>

                <div className="form-group row">

                  <div className="col-12 col-md-6 mt-3">
                    <label>
                      Email <span style={{ color: "red" }}>*</span>
                    </label>
                    <Field
                      name="email"
                      component={Input}
                      placeholder="example@gmail.com"

                      autoComplete="off"
                      maxLength="30"

                    />
                  </div>



                 
                    <div className="col-12 col-md-6 mt-3">
                      <SearchSelect
                        name="roleId"
                        label={
                          <span>
                            Role<span style={{ color: "red" }}>*</span>
                          </span>
                        }

                        onChange={(e) => {
                          setFieldValue("roleId", e.value || null);
                        }}
                        value={
                          roles?.find(
                            (option) => option.value === values.roleId
                          ) || null
                        }

                        options={roles}

                        error={errors.roleId}
                        touched={touched.roleId}
                      />
                    </div>
                 

                




                </div>

                <div className="form-group row">
                  <div className="col-12 col-md-6 mt-3">
                    <SearchSelect
                      name="supervisedbyId"
                      label={
                        <span>
                          Supervise By<span style={{ color: "red" }}>*</span>
                        </span>
                      }

                      onChange={(e) => {
                        setFieldValue("supervisedbyId", e.value || null);
                      }}
                      value={
                        roles?.find(
                          (option) => option.value === values.supervisedbyId
                        ) || null
                      }

                      options={roles}

                      error={errors.supervisedbyId}
                      touched={touched.supervisedbyId}
                    />
                  </div>
                  <div className="col-12 col-md-6 mt-3">
                    <label>
                      Allow User Creation <span style={{ color: "red" }}>*</span>
                    </label>
                    <Field
                      name="allowUserCreation"
                      as="select"
                      className="form-control"
                      disabled={isUserForRead}
                      value={values.allowUserCreation}
                    >
                      <option value="">Select</option>
                      {basisOptions.map((option) => (
                        <option
                          key={option.value}
                          value={option.value}
                        >
                          {option.label}
                        </option>
                      ))}
                    </Field>
                    {errors.allowUserCreation &&
                      touched.allowUserCreation && (
                        <div className="text-danger">
                          {errors.allowUserCreation}
                        </div>
                      )}


                  </div>

                </div>

                <div className="form-group row">
                  <div className="col-12 col-md-6 mt-3">
                    <SearchSelect
                      name="employeeIdMapping"
                      label={
                        <span>
                          Employee Mapping
                        </span>
                      }
                      isDisabled={isUserForRead}
                      onChange={(e) => {
                        setFieldValue("employeeIdMapping", e.value || null);

                      }}
                      value={
                        dashboard?.allSubsidiaryList?.find(
                          (option) => option?.value === values?.employeeIdMapping
                        ) || null
                      }
                      options={dashboard?.allSubsidiaryList}



                      error={errors.employeeIdMapping}
                      touched={touched.employeeIdMapping}
                    />
                  </div>



                  <div className="col-12 col-md-6 mt-3">
                    <label>
                      <span>
                        Employee Name <span style={{ color: "red" }}>*</span>
                      </span>
                    </label>
                    <Field
                      name="employeeName"
                      component={Input}
                      placeholder="Enter employee name"

                      type="text"

                    />
                  </div>
                </div>


            
                

                  <div className="form-group row">

                  <div className="col-12 col-md-6 mt-3">
                    <label>
                      User Status <span style={{ color: "red" }}>*</span>
                    </label>
                    <Field
                      name="deactiveflag"
                      as="select"
                      className="form-control"
                      disabled={isUserForRead}
                    >
                      <option value="">Select</option>
                      {activeOptions.map((option) => (
                        <option
                          key={option.value}
                          value={option.value}
                        >
                          {option.label}
                        </option>
                      ))}
                    </Field>
                    {errors.deactiveflag &&
                      touched.deactiveflag && (
                        <div className="text-danger">
                          {errors.deactiveflag}
                        </div>
                      )}


                  </div>

                    <div className="col-12 col-md-6 mt-3">
                      <label>
                        Password <span style={{ color: "red" }}>*</span>
                      </label>
                      <Field
                        name="password"
                        component={Input} // Custom component

                        placeholder="Enter password"
                        type="text"

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

            {/* <button
                type="submit"
                onClick={() => handleSubmit()}
                className="btn btn-primary btn-elevate"
              >
                Save
                {loading && (
                  <span className="ml-3 mr-3 spinner spinner-white"></span>
                )}
              </button> */}

            {!isUserForRead && (
              <button
                type="submit"
                onClick={() => {
                  console.log("save")
                  handleSubmit()
                }}
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
  );
}
