import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { Formik, Form, Field } from "formik";
import { Box } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import ClearIcon from "@material-ui/icons/Clear";
import DatePicker from "react-datepicker";
import * as Yup from "yup";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  Input,
  TextArea,
} from "../../../../../../_metronic/_partials/controls";
import { SearchSelect } from "../../../../../../_metronic/_helpers/SearchSelect";
import { ImageDropZone } from "../../../../../../_metronic/_helpers/ImageDropZone";
import {
  fetchAllCity,
  fetchAllCityCenters,
  fetchAllSubCenter,
  fetchDashboardVehicles,
} from "../../../../Dashboard/_redux/dashboardActions";
import {
  fetchAllHospitals,
  fetchAllPoliceStations,
} from "../../../_redux/mortuary/reduxActions";

const phoneRegExp = /^((\+92)|(0092))-{0,1}\d{3}-{0,1}\d{7}$|^\d{11}$|^\d{4}-\d{7}$/;
// Validation schema
const formSchema = Yup.object().shape({
  SN: Yup.number(),
  countryId: Yup.number().required("Country is required"),
  cityId: Yup.number().required("City is required"),
  statusId: Yup.number().required("status is required"),
  dateTime: Yup.date().required("incident date is required"),
  dateTimeofDeath: Yup.date().required("Death date is required"),
  fullNameOfTheDeceased: Yup.string()
    .required("Name of deceased required")
    .nullable(),
  fatherNameOfTheDeceased: Yup.string().required(
    "Father Name of deceased is required"
  ),
  gender: Yup.string(),
  nativePlace: Yup.string(),
  religion: Yup.string(),
  cast: Yup.string(),
  surname: Yup.string(),
  age: Yup.number()
    .positive("Number must be positive")
    .min(1, "Number must be greater then 0")
    .max(150, "Number must be less than or equal to 150")
    .required("Age is required"),
  placeOfDeath: Yup.string(),
  causeOfDeath: Yup.string(),
  reporterCnic: Yup.string(),
  reporterName: Yup.string(),
  reporterPhNo: Yup.string(),
  description: Yup.string(),
});

const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1),
    position: "absolute",
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
    position: "absolute",
    color: "red",
    fontSize: 22,
    right: 0,
  },
}));

export function CoffinEditForm({
  saveCenter,
  initialValue,
  onHide,
  isUserForRead,
}) {
  const dashboard = useSelector((state) => state.dashboard);
  const user = useSelector((state) => state.users);

  const [createDate, setCreateTime] = useState(null);
  const [deathTime, setDateTimeOfDeath] = useState(null);
  const [loading, setLoading] = useState(false);
  const [country, setCountry] = useState([]);
  const [city, setCity] = useState([]);
  const [gender, setGender] = useState([]);
  const [religion, setReligion] = useState([]);
  const [status, setStatus] = useState([]);

  const religionList = [
    {
      value: "Islam",
      label: "Islam",
    },
    {
      value: "Christianity",
      label: "Christianity",
    },
    {
      value: "Hinduism",
      label: "Hinduism",
    },
    {
      value: "Sikhism",
      label: "Sikhism",
    },
    {
      value: "Other",
      label: "Other",
    },
  ];

  const genderList = [
    {
      value: "male",
      label: "Male",
    },
    {
      value: "female",
      label: "Female",
    },
    {
      value: "other",
      label: "Other",
    },
  ];
  const dispatch = useDispatch();

  useEffect(() => {
    initialValue.countryId && dispatch(fetchAllCity(initialValue.countryId));
  }, [initialValue, initialValue.countryId]);

  useEffect(() => {
    if (initialValue.districtId) {
      dispatch(fetchAllSubCenter(initialValue.districtId));
    }
  }, [initialValue]);

  useEffect(() => {
    if (initialValue.cityId) {
      dispatch(fetchAllHospitals({ cityId: initialValue.cityId }));
    }
  }, [initialValue.cityId]);

  useEffect(() => {
    if (initialValue.countryId) {
      var seletecCOuntry =
        dashboard.allCountry &&
        dashboard.allCountry.find(
          (item) => item.value == initialValue.countryId
        );
      setCountry(seletecCOuntry);
    }
  }, [initialValue.countryId]);

  useEffect(() => {
    if (initialValue.cityId) {
      var selectedCity =
        dashboard.allCity &&
        dashboard.allCity.find((item) => item.value == initialValue.cityId);
      setCity(selectedCity);
    }
  }, [initialValue.cityId, dashboard.allCity]);

  useEffect(() => {
    if (initialValue.statusId) {
      setStatus(
        user.userStatusTypes.find(
          (item) => item.value === initialValue.statusId
        )
      );
    }
  }, [initialValue.statusId, user.userStatusTypes]);

  useEffect(() => {
    if (initialValue.dateTime) {
      setCreateTime(new Date(initialValue.dateTime));
    }
  }, [initialValue.dateTime]);

  useEffect(() => {
    if (initialValue.dateTimeofDeath) {
      setDateTimeOfDeath(new Date(initialValue.dateTimeofDeath));
    }
  }, [initialValue.dateTimeofDeath]);

  useEffect(() => {
    if (initialValue.religion) {
      setReligion(
        religionList.find((item) => item.value === initialValue.religion)
      );
    }
  }, [initialValue.religion]);

  console.log("initialValue", initialValue);

  const enableLoading = () => {
    setLoading(true);
  };

  const disabledloading = () => {
    setLoading(false);
  };

  return (
    <>
      <Formik
        enableReinitialize={true}
        initialValues={initialValue}
        validationSchema={formSchema}
        onSubmit={(values) => {
          enableLoading();
          saveCenter(values, disabledloading);
        }}
      >
        {({
          handleSubmit,
          setFieldValue,
          handleBlur,
          errors,
          touched,
          field,
        }) => (
          <>
            <Modal.Body className="overlay overlay-block cursor-default">
              <Form className="form form-label-right">
                <fieldset disabled={isUserForRead}>
                  <div className="form-group row">
                    <div className="col-12 col-md-3 mb-5">
                      <Field
                        name="SN"
                        component={Input}
                        type="Number"
                        label="Serial Number"
                      />
                    </div>
                    <div className="col-12 col-md-3 mb-5">
                      <SearchSelect
                        name="countryId"
                        label="Country*"
                        isDisabled={isUserForRead ? true : false}
                        onChange={(e) => {
                          dispatch(fetchAllCity(e.value));
                          setFieldValue("countryId", e.value);
                          setCountry(e);
                        }}
                        value={country}
                        error={errors.countryId}
                        touched={touched.countryId}
                        options={dashboard.allCountry}
                      />
                    </div>
                    <div className="col-12 col-md-3 mb-5">
                      <SearchSelect
                        name="cityId"
                        label="City*"
                        isDisabled={isUserForRead ? true : false}
                        onChange={(e) => {
                          dispatch(fetchAllCityCenters(e.value));
                          dispatch(fetchAllHospitals({ cityId: e.value }));
                          dispatch(fetchAllPoliceStations({ cityId: e.value }));
                          setFieldValue("cityId", e.value);
                          setCity(e);
                        }}
                        value={city}
                        error={errors.cityId}
                        touched={touched.cityId}
                        options={dashboard.allCity}
                      />
                    </div>
                    <div className="col-12 col-md-3 mb-5">
                      <label>Incident Date*</label>
                      <DatePicker
                        className="form-control"
                        selected={createDate}
                        onChange={(date) => {
                          setFieldValue("dateTime", date);
                          setCreateTime(date);
                        }}
                        disabled={isUserForRead}
                        timeInputLabel="Time:"
                        dateFormat="MM/dd/yyyy h:mm aa"
                        showTimeInput
                        name="dateTime"
                      />
                      {errors.dateTime && touched.dateTime ? (
                        <div className="form-feedBack">{errors.dateTime}</div>
                      ) : null}
                    </div>
                    <div className="col-12 col-md-3 mb-5">
                      <Field
                        name="fullNameOfTheDeceased"
                        component={Input}
                        placeholder=""
                        label="Deceased Name*"
                      />
                    </div>
                    <div className="col-12 col-md-3 mb-5">
                      <Field
                        name="fatherNameOfTheDeceased"
                        component={Input}
                        placeholder=""
                        label="Father Name*"
                      />
                    </div>
                    <div className="col-12 col-md-3 mb-5">
                      <Field
                        name="surname"
                        component={Input}
                        placeholder=""
                        label="Surname"
                      />
                    </div>
                    <div className="col-12 col-md-3 mb-5">
                      <Field
                        name="cast"
                        component={Input}
                        placeholder=""
                        label="Cast"
                      />
                    </div>
                    <div className="col-12 col-md-3 mb-5">
                      <SearchSelect
                        name="religion"
                        label="Religion"
                        isDisabled={isUserForRead ? true : false}
                        onChange={(e) => {
                          setFieldValue("religion", e.value);
                          setReligion(e);
                        }}
                        value={religion}
                        error={errors.religion}
                        touched={touched.religion}
                        options={religionList}
                      />
                    </div>
                    <div className="col-12 col-md-3 mb-5">
                      <Field
                        name="nativePlace"
                        component={Input}
                        placeholder=""
                        label="Native Place"
                      />
                    </div>
                    <div className="col-12 col-md-3 mb-5">
                      <Field
                        name="age"
                        component={Input}
                        placeholder=""
                        type="Number"
                        label="Age*"
                      />
                    </div>
                    <div className="col-12 col-md-3 mb-5">
                      <SearchSelect
                        name="gender"
                        label="Gender"
                        isDisabled={isUserForRead ? true : false}
                        onChange={(e) => {
                          setFieldValue("gender", e.value);
                          setGender(e);
                        }}
                        value={gender}
                        error={errors.gender}
                        touched={touched.gender}
                        options={genderList}
                      />
                    </div>
                    <div className="col-12 col-md-3 mb-5">
                      <SearchSelect
                        name="statusId"
                        label="Status*"
                        isDisabled={isUserForRead ? true : false}
                        onChange={(e) => {
                          setFieldValue("statusId", e.value);
                          setStatus(e);
                        }}
                        value={status}
                        error={errors.statusId}
                        touched={touched.statusId}
                        options={user.userStatusTypes}
                      />
                    </div>
                    <div className="col-12 col-md-3 mb-5">
                      <label>Time of Death*</label>
                      <DatePicker
                        className="form-control"
                        name="dateTimeofDeath"
                        onChange={(date) => {
                          setFieldValue("dateTimeofDeath", date);
                          setDateTimeOfDeath(date);
                        }}
                        timeInputLabel="Time:"
                        dateFormat="MM/dd/yyyy h:mm aa"
                        showTimeInput
                        selected={deathTime}
                        disabled={isUserForRead}
                      />
                      {errors.dateTimeofDeath && touched.dateTimeofDeath ? (
                        <div className="form-feedBack">
                          {errors.dateTimeofDeath}
                        </div>
                      ) : null}
                    </div>
                    <div className="col-12 col-md-3 mb-5">
                      <Field
                        name="causeOfDeath"
                        component={Input}
                        placeholder=""
                        label="Cause Of Death"
                      />
                    </div>
                    <div className="col-12 col-md-3 mb-5">
                      <Field
                        name="placeOfDeath"
                        component={Input}
                        label="Place of Death"
                      />
                    </div>
                    <div className="col-12 col-md-3 mb-5">
                      <Field
                        name="reporterName"
                        component={Input}
                        placeholder=""
                        label="Reporter Name"
                      />
                    </div>
                    <div className="col-12 col-md-3 mb-5">
                      <Field
                        name="reporterPhNo"
                        component={Input}
                        placeholder=""
                        label="Reporter Phone"
                      />
                    </div>
                    <div className="col-12 col-md-3 mb-5">
                      <Field
                        name="reporterCnic"
                        component={Input}
                        placeholder=""
                        label="Reporter CNIC"
                      />
                    </div>
                    <div className="col-12  mb-5">
                      <Field
                        name="description"
                        component={TextArea}
                        placeholder=""
                        label="Description"
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
