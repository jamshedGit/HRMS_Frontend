import React, { useState, useEffect } from "react";
import { Modal } from "react-bootstrap";
import { Formik, Form, Field } from "formik";
import { Box } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import ClearIcon from "@material-ui/icons/Clear";
import DatePicker from "react-datepicker";
import * as Yup from "yup";
import InputMask from "react-input-mask";
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
  fetchStandByVehicles,
  fetchAllPoliceStations,
} from "../../../_redux/info-personal/infoActions";
import { InfoImageSlider } from "../info-image-slider/InfoImageSlider";
const phoneRegExp = /^((\+92)|(0092))-{0,1}\d{3}-{0,1}\d{7}$|^\d{11}$|^\d{4}-\d{7}$/;
const nameRegExp = /r'^[a-zA-Z]+$'/;

// Validation schema
const formSchema = Yup.object().shape({
  //images: Yup.mixed(),

  countryId: Yup.number().required("Country is required"),
  cityId: Yup.number().required("City is required"),
  incidentTypeId: Yup.number().required("incident Type is required"),
  districtId: Yup.number().required("District is required"),
  areaId: Yup.number().required("Area is required"),
  bodyType: Yup.string(),
  vehicleType: Yup.string(),
  vehicleId: Yup.number(),
  vehicleRegNo: Yup.string(),
  patientName: Yup.string().matches(
    /^[a-zA-Z\s]+$/,
    "Only alphabetic characters are allowed"
  ),
  age: Yup.number()
    .positive("Number must be positive")
    .min(1, "Number must be greater then 0")
    .max(150, "Number must be less than or equal to 150")
    .required("Age is required"),
  gender: Yup.string(),
  callerCnic: Yup.string().matches(/^\d{5}-\d{7}-\d$/, "CNIC is not valid"),
  callerName: Yup.string().matches(
    /^[a-zA-Z\s]+$/,
    "Only alphabetic characters are allowed"
  ),
  callerPhNo: Yup.string().matches(
    /^\(\d{3}\)\s\d{3}-\d{4}$/,
    "Phone number is not valid"
  ),
  description: Yup.string(),
  images: Yup.array().of(Yup.string()),
  dateTime: Yup.date().required("Incident Date is required"),
  incidentAddress: Yup.string(),
  incidentlocationReachdateTime: Yup.date(),
  hospitalReachdateTime: Yup.date(),
  statusId: Yup.number().required("Status is required"),
  hospitalId: Yup.number(),
  policeStationId: Yup.number(),
});

const useStyles = makeStyles((theme) => {
  return {
    margin: {
      margin: theme.spacing(1),
      position: "absolute",
      backgroundColor: "#ffcccc",
      position: "absolute",
      right: "-17px",
      top: "-16px",
      width: "25px",
      height: "25px",
      minHeight: "auto",

      "&:hover": {
        backgroundColor: "#f35d5d",
      },
    },
    extendedIcon: {
      // marginRight: theme.spacing(1),
      // position: "absolute",
      color: "#fffff",
      fontSize: 15,
      // right: 0,
    },
  };
});

export function InfoEditForm({ saveInfo, initialInfo, onHide, isUserForRead }) {
  const classes = useStyles();
  const dispatch = useDispatch();

  const dashboard = useSelector((state) => state.dashboard);
  const personalInfo = useSelector((state) => state.personalInformation);
  const user = useSelector((state) => state.users);

  const [show, setShow] = useState(false);
  const [createDate, setCreateTime] = useState(null);
  const [incidentReachedTime, setIncidentReachedTime] = useState(null);
  const [hospitalReachedTime, setHospitalReachedTime] = useState(null);
  const [loading, setLoading] = useState(false);
  const [country, setCountry] = useState([]);
  const [city, setCity] = useState([]);
  const [district, setDistrict] = useState([]);
  const [area, setArea] = useState([]);
  const [incidentType, setIncidentType] = useState([]);
  const [bodyType, setBodyType] = useState([]);
  const [vehicleType, setVehicleType] = useState([]);
  const [hospital, sethospital] = useState([]);
  const [policeStation, setPoliceStation] = useState([]);
  const [gender, setGender] = useState([]);
  const [status, setStatus] = useState([]);
  const [vehicleId, setVehicleId] = useState([]);
  const [showEdhivehicle, setShowEdhiVehicel] = useState(false);
  const [showPrivatevehicle, setPrivateEdhiVehicel] = useState(false);
  // const [oldImages, setoldImages] = useState([]);
  const [seletedImages, setSelectedImages] = useState([]);
  const [oldImages, setoldImages] = useState([]);

  useEffect(() => {
    //console.log("Use Effect called ib images");
    if (initialInfo.ibFormImages) {
      setSelectedImages(initialInfo.ibFormImages);
    }
  }, [initialInfo.ibFormImages]);

  const thumbsContainer = {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 16,
  };

  const thumb = {
    display: "inline-flex",
    borderRadius: 2,
    border: "1px solid #eaeaea",
    marginBottom: 8,
    marginRight: 8,
    width: 100,
    height: 100,
    padding: 4,
    boxSizing: "border-box",
    position: "relative",
  };

  const thumbInner = {
    display: "flex",
    minWidth: 0,
    overflow: "hidden",
    cursor: "pointer",
  };

  const img = {
    display: "block",
    width: "auto",
    height: "100%",
  };

  const removeImage = (index, id) => {
    console.log("index", index);
    console.log("id", id);
    const updatedImages = [...seletedImages];
    updatedImages.splice(index, 1);
    setSelectedImages(updatedImages);
    setoldImages((preIds) => [...preIds, id]);
  };

  const thumbs =
    seletedImages &&
    seletedImages.map((file, index) => {
      return (
        <>
          <Box component="span" m={1} key={index}>
            <div style={thumb}>
              <div style={thumbInner}>
                <img src={file.url} style={img} onClick={() => setShow(true)} />

                {!isUserForRead && (
                  <Fab
                    size="small"
                    color="secondary"
                    aria-label="add"
                    className={classes.margin}
                  >
                    <ClearIcon
                      className={classes.extendedIcon}
                      onClick={() => removeImage(index, file.id)}
                    />
                  </Fab>
                )}
              </div>
            </div>
          </Box>
        </>
      );
    });

  const genderList = [
    {
      value: 1,
      label: "Male",
    },
    {
      value: 2,
      label: "Female",
    },
    {
      value: 3,
      label: "Other",
    },
  ];
  const vehicleTypeoptions = [
    {
      value: 1,
      label: "Edhi Vehicle",
    },
    {
      value: 2,
      label: "Private",
    },
  ];

  const allTypes = [
    {
      value: 1,
      label: "Dead",
    },
    {
      value: 2,
      label: "Injured",
    },
  ];

  useEffect(() => {
    if (initialInfo.countryId) {
      initialInfo.countryId && dispatch(fetchAllCity(initialInfo.countryId));
    }
  }, [initialInfo.countryId]);

  useEffect(() => {
    if (initialInfo.districtId) {
      dispatch(fetchAllSubCenter(initialInfo.districtId));
    }
  }, [initialInfo]);

  useEffect(() => {
    if (initialInfo.cityId) {
      dispatch(fetchAllCityCenters(initialInfo.cityId));
      dispatch(fetchAllHospitals({ cityId: initialInfo.cityId }));
      dispatch(fetchAllPoliceStations({ cityId: initialInfo.cityId }));
    }
  }, [initialInfo.cityId]);

  useEffect(() => {
    if (initialInfo.countryId) {
      var seletecCOuntry =
        dashboard.allCountry &&
        dashboard.allCountry.find(
          (item) => item.value == initialInfo.countryId
        );
      setCountry(seletecCOuntry);
    }
  }, [initialInfo.countryId]);

  useEffect(() => {
    if (initialInfo.cityId) {
      var selectedCity =
        dashboard.allCity &&
        dashboard.allCity.find((item) => item.value == initialInfo.cityId);
      setCity(selectedCity);
    }
  }, [initialInfo.cityId, dashboard.allCity]);

  useEffect(() => {
    setDistrict(
      dashboard.cityCenters.find((item) => item.value == initialInfo.districtId)
    );
  }, [initialInfo.districtId, dashboard.cityCenters]);

  useEffect(() => {
    setArea(
      dashboard.allSubCenter.find((item) => item.value == initialInfo.areaId)
    );
  }, [initialInfo.areaId, dashboard.allSubCenter]);

  useEffect(() => {
    setIncidentType(
      dashboard.incidentTypes.find(
        (item) => item.value === initialInfo.incidentTypeId
      )
    );
  }, [dashboard.incidentTypes, initialInfo.incidentTypeId]);

  useEffect(() => {
    setBodyType(allTypes.find((item) => item.label == initialInfo.bodyType));
  }, [initialInfo.bodyType]);

  useEffect(() => {
    setVehicleType(
      vehicleTypeoptions.find((item) => item.label == initialInfo.vehicleType)
    );
  }, [initialInfo.vehicleType]);

  useEffect(() => {
    if (initialInfo.vehicleRegNo) {
      setPrivateEdhiVehicel(true);
    }
  }, [initialInfo.vehicleRegNo]);

  useEffect(() => {
    if (initialInfo.gender) {
      setGender(genderList.find((item) => item.label == initialInfo.gender));
    }
  }, [initialInfo.gender]);

  useEffect(() => {
    if (initialInfo.statusId && user.userStatusTypes) {
      setStatus(
        user?.userStatusTypes?.find(
          (item) => item.value === initialInfo.statusId
        )
      );
    }
  }, [initialInfo.statusId, user.userStatusTypes]);

  useEffect(() => {
    if (initialInfo.dateTime) {
      const parsedDate = new Date(initialInfo.dateTime);
      setCreateTime(parsedDate);
    }
    if (initialInfo.incidentlocationReachdateTime) {
      const parsedDate = new Date(initialInfo.incidentlocationReachdateTime);
      setIncidentReachedTime(parsedDate);
    }
    if (initialInfo.hospitalReachdateTime) {
      const parsedDate = new Date(initialInfo.hospitalReachdateTime);
      setHospitalReachedTime(parsedDate);
    }
  }, [initialInfo]);

  useEffect(() => {
    if (initialInfo.vehicleId) {
      dispatch(
        fetchStandByVehicles({
          centerId: initialInfo.districtId,
          subCenterId: initialInfo.areaId,
          available: true,
          inProgress: true,
        })
      );
    }
  }, [initialInfo.vehicleId]);

  useEffect(() => {
    if (initialInfo.vehicleId) {
      setVehicleId(
        personalInfo.allVehicles.find(
          (item) => item.value == initialInfo.vehicleId
        )
      );
      setShowEdhiVehicel(true);
    }
  }, [initialInfo.vehicleId, personalInfo.allVehicles]);

  useEffect(() => {
    sethospital(
      personalInfo.hospitalList.find(
        (item) => item.value == initialInfo.hospitalId
      )
    );
  }, [initialInfo.hospitalId, personalInfo.hospitalList]);

  useEffect(() => {
    setPoliceStation(
      personalInfo.policestationList.find(
        (item) => item.value == initialInfo.policeStationId
      )
    );
  }, [initialInfo.policeStationId, personalInfo.policestationList]);

  const enableLoading = () => {
    setLoading(true);
  };

  return (
    <>
      <Formik
        enableReinitialize={true}
        initialValues={initialInfo}
        validationSchema={formSchema}
        onSubmit={(values) => {
          enableLoading();
          const mergedValue = { ...values, oldImages };
          saveInfo(mergedValue);
        }}
      >
        {({
          handleSubmit,
          setFieldValue,
          errors,
          touched,
          values,
          handleChange,
          handleBlur,
        }) => (
          <>
            <Modal.Body className="overlay overlay-block cursor-default">
              <InfoImageSlider
                images={seletedImages}
                show={show}
                setShow={setShow}
              />
              <Form className="form form-label-right">
                <fieldset disabled={isUserForRead}>
                  <div className="form-group row">
                    <div className="col-12 col-md-6 col-lg-3 mb-5">
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
                    <div className="col-12 col-md-6 col-lg-3 mb-5">
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
                    <div className="col-12 col-md-6 col-lg-3 mb-5">
                      <SearchSelect
                        name="districtId"
                        label="District*"
                        isDisabled={isUserForRead ? true : false}
                        onChange={(e) => {
                          dispatch(fetchAllSubCenter(e.value));
                          setFieldValue("districtId", e.value);
                          setDistrict(e);
                          setArea([]);
                        }}
                        value={district}
                        error={errors.districtId}
                        touched={touched.districtId}
                        options={dashboard.cityCenters}
                      />
                    </div>
                    <div className="col-12 col-md-6 col-lg-3 mb-5">
                      <SearchSelect
                        name="areaId"
                        label="Area*"
                        isDisabled={isUserForRead ? true : false}
                        onChange={(e) => {
                          setFieldValue("areaId", e.value);
                          setArea(e);
                          if (district.value) {
                            dispatch(
                              fetchStandByVehicles({
                                centerId: district.value,
                                subCenterId: e.value,
                                available: true,
                                inProgress: true,
                              })
                            );
                          }
                        }}
                        value={area}
                        error={errors.areaId}
                        touched={touched.areaId}
                        options={dashboard.allSubCenter}
                      />
                    </div>
                    <div className="col-12 col-md-6 col-lg-3 mb-5">
                      <SearchSelect
                        name="incidentTypeId"
                        label="Incident Type*"
                        isDisabled={isUserForRead ? true : false}
                        onChange={(e) => {
                          setFieldValue("incidentTypeId", e.value);
                          setIncidentType(e);
                        }}
                        value={incidentType}
                        error={errors.incidentTypeId}
                        touched={touched.incidentTypeId}
                        options={dashboard.incidentTypes}
                      />
                    </div>
                    <div className="col-12 col-md-6 col-lg-3 mb-5">
                      <SearchSelect
                        name="bodyType"
                        label="Body Type"
                        isDisabled={isUserForRead ? true : false}
                        onChange={(e) => {
                          setFieldValue("bodyType", e.label);
                          setBodyType(e);
                        }}
                        value={bodyType}
                        error={errors.bodyType}
                        touched={touched.bodyType}
                        options={allTypes}
                      />
                    </div>
                    <div className="col-12 col-md-6 col-lg-3 mb-5">
                      <SearchSelect
                        name="vehicleType"
                        label="Vehicle Type"
                        isDisabled={isUserForRead ? true : false}
                        onChange={(e) => {
                          setFieldValue("vehicleType", e.label);
                          setVehicleType(e);
                          if (e.value === 1) {
                            var filterObj = {};
                            if (city) {
                              filterObj.cityId = city.value;
                            }
                            if (district) {
                              filterObj.centerId = district.value;
                            }
                            if (area) {
                              filterObj.subCenterId = area.value;
                            }
                            dispatch(fetchDashboardVehicles(filterObj));
                            setShowEdhiVehicel(true);
                            setPrivateEdhiVehicel(false);
                          } else if (e.value === 2) {
                            setPrivateEdhiVehicel(true);
                            setShowEdhiVehicel(false);
                            setVehicleId([]);
                          }
                        }}
                        value={vehicleType || ""}
                        error={errors.vehicleType}
                        touched={touched.vehicleType}
                        options={vehicleTypeoptions}
                      />
                    </div>
                    {showEdhivehicle && (
                      <div className="col-12 col-md-6 col-lg-3 mb-5">
                        <SearchSelect
                          name="VehcileId"
                          label="Select Vehicle"
                          isDisabled={isUserForRead ? true : false}
                          onChange={(e) => {
                            setFieldValue("VehcileId", e.value);
                            setVehicleId(e);
                          }}
                          value={vehicleId}
                          error={errors.VehcileId}
                          touched={touched.VehcileId}
                          options={personalInfo.allVehicles}
                        />
                      </div>
                    )}
                    {showPrivatevehicle && (
                      <div className="col-12 col-md-6 col-lg-3 mb-5">
                        <Field
                          name="vehicleRegNo"
                          component={Input}
                          placeholder=""
                          label="Enter Vehicle Reg No"
                        />
                      </div>
                    )}
                    <div className="col-12 col-md-6 col-lg-3 mb-5">
                      <SearchSelect
                        name="hospitalId"
                        label="Hospital"
                        isDisabled={isUserForRead ? true : false}
                        onChange={(e) => {
                          setFieldValue("hospitalId", e.value);
                          sethospital(e);
                        }}
                        value={hospital}
                        error={errors.hospitalId}
                        touched={touched.hospitalId}
                        options={personalInfo.hospitalList}
                      />
                    </div>
                    <div className="col-12 col-md-6 col-lg-3 mb-5">
                      <SearchSelect
                        name="policeStationId"
                        label="Police Station"
                        isDisabled={isUserForRead ? true : false}
                        onChange={(e) => {
                          setFieldValue("policeStationId", e.value);
                          setPoliceStation(e);
                        }}
                        value={policeStation}
                        error={errors.policeStationId}
                        touched={touched.policeStationId}
                        options={personalInfo.policestationList}
                      />
                    </div>
                    <div className="col-12 col-md-6 col-lg-3 mb-5">
                      <Field
                        name="patientName"
                        component={Input}
                        label="Patient Name"
                      />
                    </div>
                    <div className="col-12 col-md-6 col-lg-3 mb-5">
                      <Field
                        name="age"
                        component={Input}
                        type="Number"
                        label="Age*"
                      />
                    </div>
                    <div className="col-12 col-md-6 col-lg-3 mb-5">
                      <SearchSelect
                        name="gender"
                        label="Gender"
                        isDisabled={isUserForRead ? true : false}
                        onChange={(e) => {
                          setFieldValue("gender", e.label);
                          setGender(e);
                        }}
                        value={gender}
                        error={errors.gender}
                        touched={touched.gender}
                        options={genderList}
                      />
                    </div>
                    <div className="col-12 col-md-6 col-lg-3 mb-5">
                      <SearchSelect
                        name="statusId"
                        label="Status*"
                        onChange={(e) => {
                          setFieldValue("statusId", e.value);
                          setStatus(e);
                        }}
                        isDisabled={isUserForRead}
                        value={status}
                        error={errors.statusId}
                        touched={touched.statusId}
                        options={user.userStatusTypes}
                      />
                    </div>
                    <div className="col-12 col-md-6 col-lg-3 mb-5">
                      <Field
                        name="callerName"
                        component={Input}
                        placeholder=""
                        label="Caller Name"
                      />
                    </div>
                    <div className="col-12 col-md-6 col-lg-3 mb-5">
                      <label>Caller Phone</label>
                      <InputMask
                        className="form-control"
                        mask="(999) 999-9999"
                        name="callerPhNo"
                        value={values.callerPhNo}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      {errors.callerPhNo && touched.callerPhNo ? (
                        <div className="form-feedBack">{errors.callerPhNo}</div>
                      ) : null}
                    </div>
                    <div className="col-12 col-md-6 col-lg-3 mb-5">
                      <label>Caller CNIC</label>
                      <InputMask
                        className="form-control"
                        mask="99999-9999999-9"
                        name="callerCnic"
                        value={values.callerCnic}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      {errors.callerCnic && touched.callerCnic ? (
                        <div className="form-feedBack">{errors.callerCnic}</div>
                      ) : null}
                      {/* <Field
                        name="callerCnic"
                        component={Input}
                        placeholder=""
                        label="Caller CNIC"
                      /> */}
                    </div>
                    <div className="col-12 col-md-6 col-lg-3 mb-5">
                      <label>Incident Date*</label>
                      <DatePicker
                        className="form-control"
                        selected={createDate}
                        onChange={(date) => {
                          // console.log("On change getting date Value", date);
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
                    <div className="col-12 col-md-6 col-lg-3 mb-5">
                      <label>Incident Reached Time</label>
                      <DatePicker
                        className="form-control"
                        selected={incidentReachedTime}
                        onChange={(date) => {
                          setFieldValue("incidentlocationReachdateTime", date);
                          setIncidentReachedTime(date);
                        }}
                        timeInputLabel="Time:"
                        dateFormat="MM/dd/yyyy h:mm aa"
                        showTimeInput
                        name="incidentlocationReachdateTime"
                        disabled={isUserForRead}
                      />
                    </div>
                    <div className="col-12 col-md-6 col-lg-3 mb-5">
                      <label>Hospital Reached Time</label>
                      <DatePicker
                        className="form-control"
                        selected={hospitalReachedTime}
                        onChange={(date) => {
                          setFieldValue("hospitalReachdateTime", date);
                          setHospitalReachedTime(date);
                        }}
                        timeInputLabel="Time:"
                        dateFormat="MM/dd/yyyy h:mm aa"
                        showTimeInput
                        name="hospitalReachdateTime"
                        disabled={isUserForRead}
                      />
                    </div>
                    <div className="col-12 mb-5">
                      <Field
                        name="description"
                        component={TextArea}
                        placeholder=""
                        label="Description"
                      />
                    </div>
                    <div className="col-12 mb-5">
                      <Field
                        name="incidentAddress"
                        component={TextArea}
                        placeholder=""
                        label="Incident Address"
                      />
                    </div>
                    {initialInfo.ibFormImages && (
                      <div className="col-12">
                        <aside style={thumbsContainer}>{thumbs}</aside>
                      </div>
                    )}

                    {!isUserForRead && (
                      <div className="col-12">
                        <ImageDropZone
                          name="images"
                          setFieldValue={setFieldValue}
                          disabled={isUserForRead}
                        />
                      </div>
                    )}
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
