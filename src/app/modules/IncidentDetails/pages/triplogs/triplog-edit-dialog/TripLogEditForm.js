import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import {
  Input,
  Select,
  DatePickerField,
  TextArea,
} from "../../../../../../_metronic/_partials/controls";
import MaskedInput from "react-text-mask";
import { SearchSelect } from "../../../../../../_metronic/_helpers/SearchSelect";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchAllCity,
  fetchAllCityCenters,
  fetchAllSubCenter,
} from "../../../../../../_metronic/redux/dashboardActions";
import { useNavigate } from "react-router-dom";

//Regex for Positive numbers

const PositiveRegex = /^[1-9]+[0-9]*$/;
// Validation schema
const triplogEditSchema = Yup.object().shape({
  // cityId: Yup.string(),
  destinationCenterId: Yup.string(),
  destinationSubCenterId: Yup.string(),
  finalReading: Yup.string().required("Final reading is required"),
  //logBookNo: Yup.string().required("Log Book No. is required"),
  logBookNo: Yup.string()
    .nullable()
    .matches(PositiveRegex, "Value should be number")
    .required("Log Book No. is required"),
  price: Yup.string()
    .nullable()
    .matches(PositiveRegex, "Value should be number")
    .required("Price is required"),
  status: Yup.string().required("Status is required"),
});

// function validateCenterId(value) {
//   let error
//   if (!value) {
//     error = "Required"
//   } else if (value === 0) {
//     error = "Invalid email address"
//   }
//   return error
// }

export function TripLogEditForm({
  updateTripLog,
  driverTrip,
  onHide,
  loading,
  setSelectCity,
  setSelectCenter,
  setSelectsubCenter,
  seletCity,
  seletCenter,
  seletSubcenter,
}) {
  const TripStatus = [
    {
      label: "Open",
    },
    {
      label: "InProgress",
    },
    {
      label: "Close",
    },
  ];

  const dispatch = useDispatch();
  const { dashboard, auth } = useSelector((state) => state);
  const { user } = auth;
  //console.log("driverTrip", driverTrip);

  const {
    sourceCenterId,
    sourceSubCenterId,
    finalReading,
    logBookNo,
    price,
    status,
    driver,
    vehicle,
    initialReading,
    sourcecenter,
    createdAt,
  } = driverTrip;

  const iniValue = {
    driverName: driver.firstName,
    vehicleRegNo: vehicle.regNo,
    initialReading: initialReading,
    destinationSubCenterId: "",
    finalReading: "",
    logBookNo: "",
    price: "",
    status: "",
  };

  const val = 0;
  const checkinitialReading = initialReading > 0;
  const intReading = `${checkinitialReading ? `initialReading` : `val`}`;

  // useEffect(() => {
  //   dispatch(fetchAllCity(user.countryId));
  // }, [driverTrip]);

  useEffect(() => {
    dispatch(fetchAllCityCenters(sourcecenter.city.id));
  }, [user, driverTrip]);

  useEffect(() => {
    dispatch(fetchAllSubCenter(driverTrip.sourceCenterId));
  }, [user, driverTrip]);

  useEffect(() => {
    setSelectCity(
      dashboard.allCity &&
        dashboard.allCity.find((item) => item.value === sourcecenter.city.id)
    );
  }, [dashboard.allCity]);

  useEffect(() => {
    setSelectCenter(
      dashboard.cityCenters &&
        dashboard.cityCenters.find((item) => item.value === sourceCenterId)
    );
  }, [dashboard.cityCenters]);

  useEffect(() => {
    setSelectsubCenter(
      dashboard.allSubCenter &&
        dashboard.allSubCenter.find((item) => item.value === sourceSubCenterId)
    );
  }, [dashboard.allSubCenter]);

  return (
    <>
      <Formik
        enableReinitialize={true}
        initialValues={iniValue}
        validationSchema={triplogEditSchema}
        onSubmit={(values) => {
          //const { destinationSubCenterId } = values;
          // const submissionValues = {
          //   destinationSubCenterId: seletSubcenter.value,
          //   ...values,
          // };
          // console.log("value", values);
          // console.log("seletSubcenter", seletSubcenter);
          //console.log("submissionValues", submissionValues);
          updateTripLog(values);
        }}
      >
        {({ handleSubmit, setFieldValue, handleBlur, errors, touched }) => (
          <>
            <Modal.Body className="overlay overlay-block cursor-default">
              <Form className="from form-label-right">
                <fieldset>
                  <div className="form-group row">
                    <div className="col-lg-4">
                      <Field
                        name="driverName"
                        component={Input}
                        label="Driver Name"
                        disabled
                      />
                    </div>
                    <div className="col-lg-4">
                      <Field
                        name="vehicleRegNo"
                        component={Input}
                        label="Registration Number"
                        disabled
                      />
                    </div>
                    <div className="col-lg-4">
                      <Field
                        name={intReading}
                        component={Input}
                        label="Initial Reading"
                        disabled
                      />
                    </div>
                  </div>
                  <div className="form-group row">
                    <div className="col-12 col-md-4">
                      <SearchSelect
                        name="cityId"
                        options={dashboard.allCity}
                        label="Select City*"
                        onBlur={() => {
                          handleBlur({ target: { name: "cityId" } });
                        }}
                        onChange={(e) => {
                          dispatch(fetchAllCityCenters(e.value));
                          setSelectCity(e);
                        }}
                        value={seletCity}
                        // error={errors.cityId}
                        //touched={touched.cityId}
                      />
                    </div>
                    <div className="col-12 col-md-4">
                      <SearchSelect
                        name="destinationCenterId"
                        options={dashboard.cityCenters}
                        label="Select Circle*"
                        onBlur={() => {
                          handleBlur({
                            target: { name: "destinationCenterId" },
                          });
                        }}
                        onChange={(e) => {
                          //setFieldValue("destinationCenterId", e.value);
                          dispatch(fetchAllSubCenter(e.value));
                          setSelectCenter(e);
                        }}
                        value={seletCenter}
                        // error={errors.destinationCenterId}
                        //touched={touched.destinationCenterId}
                      />
                    </div>
                    <div className="col-12 col-md-4">
                      <SearchSelect
                        name="destinationSubCenterId"
                        options={dashboard.allSubCenter}
                        label="Select Center*"
                        onBlur={() => {
                          handleBlur({
                            target: { name: "destinationSubCenterId" },
                          });
                        }}
                        onChange={(e) => {
                          setFieldValue("destinationSubCenterId", e.value);
                          // dispatch(fetchAllSubCenter(e.value));
                          setSelectsubCenter(e);
                        }}
                        value={seletSubcenter}
                        // error={errors.destinationSubCenterId}
                        // touched={touched.destinationSubCenterId}
                      />
                    </div>
                  </div>

                  <div className="form-group row">
                    <div className="col-lg-4">
                      <Field
                        name="finalReading"
                        component={Input}
                        label="Final Reading*"
                      />
                    </div>
                    <div className="col-lg-4">
                      <Field
                        name="logBookNo"
                        component={Input}
                        label="Log Book No*"
                      />
                    </div>
                    <div className="col-lg-4">
                      <Field name="price" component={Input} label="Price*" />
                    </div>
                  </div>
                  <div className="form-group row">
                    <div className="col-lg-4">
                      {/* <Select
                        label="Status"
                        name="status"
                        value={values.status}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        style={{ display: "block" }}
                      >
                        <option value="" label="Select Type" />
                        {TripStatus &&
                          TripStatus.map((response) => {
                            return (
                              <option
                                key={response.value}
                                value={response.value}
                                label={response.label}
                              />
                            );
                          })}
                      </Select>
                      {errors.status && touched.status && (
                        <div className="invalid-text">{errors.status}</div>
                      )} */}

                      <Select name="status" label="Status">
                        {TripStatus.map((response) => {
                          return (
                            <option key={response.label} value={response.label}>
                              {response.label}
                            </option>
                          );
                        })}
                      </Select>
                    </div>
                    {/* <div className="col-lg-4">
                      <Select
                        name="incidentSeverityId"
                        label="Incident Severity"
                      >
                        {incidentSeverity ? (
                          incidentSeverity.map((response) => {
                            return (
                              <option
                                key={response.value}
                                value={response.value}
                              >
                                {response.label}
                              </option>
                            )
                          })
                        ) : (
                          <></>
                        )}
                      </Select>
                    </div> */}
                  </div>
                </fieldset>
              </Form>
            </Modal.Body>
            <Modal.Footer>
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
            </Modal.Footer>
          </>
        )}
      </Formik>
    </>
  );
}
