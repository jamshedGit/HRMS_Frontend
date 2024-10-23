import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { Formik, Form, Field } from "formik";
import { useDispatch } from "react-redux";
import * as Yup from "yup";
import {
  Input,
  Select,
  TextArea,
} from "../../../../../../_metronic/_partials/controls";
// import MaskedInput from "react-text-mask";
// import InputMask from "react-input-mask";
// import { TextField } from "@material-ui/core";
import * as actions from "../../../_redux/incidents/incidentActions";
const phoneRegExp = /^((\+92)|(0092))-{0,1}\d{3}-{0,1}\d{7}$|^\d{11}$|^\d{4}-\d{7}$/;
const cnicRegExp = /^[0-9]{5}-[0-9]{7}-[0-9]$/;

//Validation schema
const incidentEditSchema = Yup.object().shape({
  callerName: Yup.string().required("Caller name is required"),
  callerCNIC: Yup.string().matches(
    cnicRegExp,
    "CNIC should be like 35401-2432321-1"
  ),
  callerPhoneNo: Yup.string()
    .matches(phoneRegExp, "Number should be like 03049018107")
    .required("Phone No is required"),
  patientName: Yup.string(),
  patientCNIC: Yup.string().matches(
    cnicRegExp,
    "CNIC shold be like 35401-2432321-1"
  ),
  location: Yup.string().required("Locations is required"),
  area: Yup.string().required("Area ia required"),
  shortDescription: Yup.string(),
  incidentTypeId: Yup.string().required("Incident type is required"),
  incidentSeverityId: Yup.string().required("Severity is required"),
  centerId: Yup.string().required("Center is required"),
  vehicleId: Yup.string().required("Vehicle is required"),
});

function validateCenterId(value) {
  let error;
  if (!value) {
    error = "Required";
  } else if (value === 0) {
    error = "Invalid email address";
  }
  return error;
}

export function IncidentEditForm({
  saveIncident,
  incident,
  actionsLoading,
  onHide,
  IncidentType,
  incidentSeverityOption,
  vehicleByCenterId,
  vehiclesForDropdown,
  centers,
  isUserForRead,
  setCenter,
  loading,
}) {
  const logTitle = " IncidentEditForm() ";
  const dispatch = useDispatch();
  const [incidentSeverityState, setIncidentSeverityState] = useState();
  const getCenterId = (id) => {
    const queryParams = {
      // filter: {
      //   searchQuery: "",
      // },
      // sortOrder: "name",
      // pageSize: 10,
      // pageNumber: 1,
      centerId: id,
      available: true,
      inProgress: false,
    };

    dispatch(actions.fetchVehicleById({ ...queryParams }));
  };
  const getVehicleIdsForDropdown = (id) => {
    const queryParams = {
      centerId: id,
      available: true,
      inProgress: false,
    };

    dispatch(actions.fetchVehicleByDropdown({ ...queryParams }));
  };

  const queryParamsOnLoad = {
    // filter: {
    //   searchQuery: "",
    // },
    available: true,
    inProgress: false,
    // sortOrder: "name",
    // pageSize: 10,
    // pageNumber: 1,
    centerId: incident?.centerId,
  };
  console.log("incident", incident);

  useEffect(() => {
    // dispatch(actions.fetchVehicleById({ ...queryParamsOnLoad }));
    console.log(queryParamsOnLoad);
    dispatch(actions.fetchVehicleByDropdown({ ...queryParamsOnLoad }));
  }, [incident?.centerId]);
  // This code os
  const NewIncidentForEdit = {
    ...incident,
    vehicleId: incident?.vehicleId,
    centerId: incident?.centerId,
  };
  // console.log("NewIncidentForEdit", NewIncidentForEdit);
  // console.log("NewIncidentForEdit", NewIncidentForEdit);
  // console.log("incidentSeverityOption", incidentSeverityOption);
  const selectedVehicle = incident.vehicleId;

  // console.log("selectedVehicle", selectedVehicle);
  // console.log("vehicleByCenterId", vehicleByCenterId);
  // setCenter(incident.centerId)
  // console.log("NewIncidentForEdit", NewIncidentForEdit)
  // console.log("vehicleByCenterId", vehicleByCenterId)
  // const {centerId, incident,vehicleId} = incident

  return (
    <>
      <Formik
        enableReinitialize={true}
        initialValues={NewIncidentForEdit}
        validationSchema={incidentEditSchema}
        onSubmit={(values) => {
          saveIncident(values);
        }}
      >
        {({
          errors,
          values,
          handleBlur,
          touched,
          isValidating,
          handleSubmit,
          handleChange,
        }) => {
          // const selectedVehicleList =
          //   values?.centerId == values?.centerId &&
          //   values?.vehicleId?.length > 0
          //     ? values?.vehicleId
          //     : [];
          // const selectedVehicleIds = selectedVehicleList.map(
          //   (vehicleObj) => vehicleObj.id
          // );

          // const remainingVehiclesList =
          //   vehicleByCenterId && vehicleByCenterId.length
          //     ? vehicleByCenterId?.map((vehicleObj) => {
          //         if (!selectedVehicleIds.includes(vehicleObj.id)) {
          //           return vehicleObj;
          //         }
          //       })
          //     : [];
          // const vehiclesFinalList = [
          //   ...selectedVehicleList,
          //   ...remainingVehiclesList,
          // ];
          // console.log(logTitle + "selectedVehicleList", selectedVehicleList);
          // console.log(logTitle + "selectedVehicleIds", selectedVehicleIds);

          // console.log(
          //   logTitle + "remainingVehiclesList",
          //   remainingVehiclesList
          // );
          // console.log(logTitle + "vehiclesFinalList", vehiclesFinalList);
          return (
            <>
              {/* {console.log("values", values)} */}
              <Modal.Body className="overlay overlay-block cursor-default">
                <Form className="form form-label-right">
                  <fieldset disabled={isUserForRead}>
                    <div className="form-group row">
                      <div className="col-lg-4">
                        <Field
                          name="callerName"
                          component={Input}
                          label="Caller Name*"
                        />
                      </div>
                      <div className="col-lg-4">
                        <Field
                          name="callerCNIC"
                          component={Input}
                          label="Caller CNIC"
                        />
                      </div>
                      <div className="col-lg-4">
                        <Field
                          name="callerPhoneNo"
                          component={Input}
                          label="Caller Phone No*"
                        />
                      </div>
                    </div>
                    <div className="form-group row">
                      <div className="col-lg-4">
                        <Field
                          name="patientName"
                          component={Input}
                          label="Patient Name"
                        />
                      </div>
                      <div className="col-lg-4">
                        <Field
                          name="patientCNIC"
                          component={Input}
                          label="Patient CNIC"
                        />
                      </div>
                      <div className="col-lg-4">
                        <Field
                          name="location"
                          component={Input}
                          label="Location*"
                        />
                      </div>
                    </div>
                    <div className="form-group row">
                      <div className="col-lg-4">
                        <Field name="area" component={Input} label="Area*" />
                      </div>
                      <div className="col-lg-4">
                        <Select
                          label="Incident Type*"
                          name="incidentTypeId"
                          defaultValue={values?.incidentTypeId}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          style={{ display: "block" }}
                        >
                          <option value="0" label="Select Type" />
                          {IncidentType &&
                            IncidentType.map((response) => {
                              return (
                                <option
                                  key={response.value}
                                  value={response.value}
                                  label={response.label}
                                />
                              );
                            })}
                        </Select>
                        {errors.incidentTypeId && touched.incidentTypeId && (
                          <div className="invalid-text">
                            {errors.incidentTypeId}
                          </div>
                        )}

                        {/* <Select name="incidentTypeId" label="Incident Type" children={IncidentType}>
                        <option disabled>Please Select</option>
                        {IncidentType ? (
                          IncidentType.map((response) => {
                            return (
                              <option
                                key={response.value}
                                value={response.value}
                              >
                                {response.label}
                              </option>
                            );
                          })
                        ) : (
                          <></>
                        )}
                      </Select> */}
                      </div>
                      <div className="col-lg-4">
                        <Select
                          label="Incident Severity*"
                          name="incidentSeverityId"
                          defaultValue={values?.incidentSeverityId}
                          onChange={(e) => {
                            handleChange(e);
                          }}
                          onBlur={handleBlur}
                          style={{ display: "block" }}
                        >
                          <option value="0" label="Select Type" />
                          {incidentSeverityOption &&
                            incidentSeverityOption.map((response) => {
                              return (
                                <option
                                  key={response.value}
                                  value={response.value}
                                  label={response.label}
                                />
                              );
                            })}
                        </Select>
                        {errors.incidentSeverityId &&
                          touched.incidentSeverityId && (
                            <div className="invalid-text">
                              {errors.incidentSeverityId}
                            </div>
                          )}

                        {/* <Select
                        name="incidentSeverityId"
                        label="Incident Severity"
                      >
                        <option value="1" disabled>
                          Please Select
                        </option>
                        {incidentSeverity ? (
                          incidentSeverity.map((response) => {
                            return (
                              <option
                                key={response.value}
                                value={response.value}
                              >
                                {response.label}
                              </option>
                            );
                          })
                        ) : (
                          <></>
                        )}
                      </Select> */}
                      </div>
                    </div>
                    <div className="form-group row">
                      <div className="col-lg-12">
                        <Field
                          name="shortDescription"
                          component={TextArea}
                          label="Short Description"
                        />
                      </div>
                    </div>
                    <div className="form-group row">
                      <div className="col-lg-12">
                        <Select
                          label="Center*"
                          name="centerId"
                          defaultValue={values?.centerId}
                          onChange={(e) => {
                            setCenter(e.currentTarget.value);
                            handleChange(e);
                            getVehicleIdsForDropdown(e.currentTarget.value);
                          }}
                          onBlur={handleBlur}
                          style={{ display: "block" }}
                        >
                          <option value="0" label="Nearest Center" />
                          {centers &&
                            centers.map((response) => {
                              return (
                                <option
                                  key={response.value}
                                  value={response.value}
                                  label={response.label}
                                />
                              );
                            })}
                        </Select>
                        {errors.centerId && touched.centerId && (
                          <div className="invalid-text">{errors.centerId}</div>
                        )}

                        {/* <Select
                        name="centerId"
                        label="Center"
                        onChange={(e) => {
                          setCenter(e.currentTarget.value);
                          handleChange(e);
                          getCenterId(e.currentTarget.value);
                        }}
                      >
                        <option disabled>Select Nearest Center</option>
                        {centers ? (
                          centers.map((response) => {
                            return (
                              <option
                                key={response.value}
                                value={response.value}
                              >
                                {response.label}
                              </option>
                            );
                          })
                        ) : (
                          <></>
                        )}
                      </Select> */}
                      </div>
                    </div>
                    {NewIncidentForEdit?.vehicleId && (
                      <>
                        <div className="form-group row">
                          <div className="col-lg-12">
                            <small>Already selected vehicle</small>
                            <ul>
                              {NewIncidentForEdit.vehicleId.map((item) => {
                                return <li>{item.regNo}</li>;
                              })}
                            </ul>
                          </div>
                        </div>
                      </>
                    )}
                    {vehiclesForDropdown && (
                      <>
                        <div className="form-group row">
                          <div className="col-lg-12">
                            <Select
                              name="vehicleId"
                              label="vehicle*"
                              multiple
                              value={values?.vehicleId?.value}
                            >
                              {vehiclesForDropdown.length > 0 ? (
                                <>
                                  {console.log(vehiclesForDropdown)}
                                  {vehiclesForDropdown.map((response) => {
                                    return (
                                      <option
                                        key={response.value}
                                        value={response.value}
                                        label={response.label}
                                      />
                                    );
                                  })}
                                </>
                              ) : (
                                <>
                                  <option label="Vehicle Not Found"></option>
                                </>
                              )}

                              {/* {vehiclesFinalList.length > 0 ? (
                                vehiclesFinalList.map((response) => {
                                  if (response) {
                                    return (
                                      <option
                                        key={response.id}
                                        value={response.id}
                                        label={response.regNo}
                                        selected={
                                          response.name ? undefined : true
                                        }
                                      />
                                    );
                                  }
                                })
                              ) : (
                                <>
                                  {vehicleByCenterId.map((response) => {
                                    return (
                                      <option
                                        key={response.id}
                                        value={response.id}
                                        label={response.regNo}
                                      />
                                    );
                                  })}
                                </>
                              )} */}
                            </Select>
                          </div>
                        </div>
                      </>
                    )}

                    {/* <div className="form-group row">
                    <div className="col-lg-12">
                      <Select
                        name="vehicleId"
                        label="vehicle"
                        multiple
                        value={values?.vehicleId?.id}
                      >
                        {isUserForRead ? (
                          selectedVehicle ? (
                            selectedVehicle.map((res) => {
                              return (
                                <option key={res.id} value={res.id}>
                                  {res.regNo}
                                </option>
                              );
                            })
                          ) : (
                            <></>
                          )
                        ) : vehicleByCenterId?.length > 0 ? (
                          vehicleByCenterId.map((res) => {
                            return (
                              <option key={res.id} value={res.id}>
                                {res.regNo}
                              </option>
                            );
                          })
                        ) : (
                          <>
                            <option>Not Found</option>
                          </>
                        )}
                      </Select>
                    </div>
                  </div> */}
                  </fieldset>
                </Form>
              </Modal.Body>
              <Modal.Footer>
                {/* <button
                type="submit"
                onClick={() => handleSubmit()}
                className="btn btn-primary btn-elevate"
              >
                Save
              </button> */}
                {!isUserForRead ? (
                  <>
                    <button
                      type="button"
                      onClick={() => handleSubmit()}
                      className="btn btn-primary btn-elevate"
                    >
                      Save
                      {loading && (
                        <span className="ml-3 mr-3 spinner spinner-white"></span>
                      )}
                    </button>
                    <button
                      type="button"
                      onClick={onHide}
                      className="btn btn-light btn-elevate"
                    >
                      Cancel
                    </button>
                  </>
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
                {/* {!isUserForRead && (
                <button
                  type="submit"
                  onClick={() => handleSubmit()}
                  className="btn btn-primary btn-elevate"
                >
                  Save
                </button>
              )} */}
              </Modal.Footer>
            </>
          );
        }}
      </Formik>
    </>
  );
}
