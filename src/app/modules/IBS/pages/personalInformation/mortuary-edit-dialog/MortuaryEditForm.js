import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { Formik, Form, Field } from "formik";
import { Box } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
// import Fab from "@material-ui/core/Fab";
// import AddIcon from "@material-ui/icons/Add";
import InputMask from "react-input-mask";
import ClearIcon from "@material-ui/icons/Clear";
import DatePicker from "react-datepicker";
import * as Yup from "yup";
// import { useParams } from "react-router-dom";
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
} from "../../../../Dashboard/_redux/dashboardActions";
import {
  fetchAllHospitals,
  fetchAllPoliceStations,
} from "../../../_redux/mortuary/reduxActions";

//const phoneRegExp = /^((\+92)|(0092))-{0,1}\d{3}-{0,1}\d{7}$|^\d{11}$|^\d{4}-\d{7}$/;
// Validation schema
const userEditSchema = Yup.object().shape({
  Images: Yup.string(),
  SN: Yup.string(),
  countryId: Yup.string().required("Country is required"),
  cityId: Yup.string().required("City is required"),
  hospitalId: Yup.string().nullable(),
  statusId: Yup.number().required("Status is required"),
  dateTime: Yup.date().required("Incident Date is required"),
  fullNameOfTheDeceased: Yup.string(),
  fatherNameOfTheDeceased: Yup.string()
    .nullable()
    .required("Father name is required"),
  age: Yup.number()
    .positive("Number must be positive")
    .min(1, "Number must be greater then 0")
    .max(150, "Number must be less than or equal to 150"),
  Address: Yup.string().nullable(),
  callerCnic: Yup.string().nullable(),
  callerName: Yup.string().nullable(),
  callerPhNo: Yup.string().nullable(),
  description: Yup.string().nullable(),
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

export function MortuaryEditForm({
  saveCenter,
  initialValue,
  onHide,
  isUserForRead,
  isForEdit,
}) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const dashboard = useSelector((state) => state.dashboard);
  const mortuaryState = useSelector((state) => state.mortuary);
  const user = useSelector((state) => state.users);

  const [createDate, setCreateTime] = useState();
  const [mortuaryReachedTime, setMortuaryReachedTime] = useState();
  const [dischargedTime, setDischargedTime] = useState();
  const [loading, setLoading] = useState(false);
  const [country, setCountry] = useState();
  const [city, setCity] = useState([]);
  const [hospital, sethospital] = useState([]);
  const [status, setStatus] = useState([]);
  const [seletedImages, setSelectedImages] = useState([]);
  const [oldImages, setoldImages] = useState([]);

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
  };

  const thumbInner = {
    display: "flex",
    minWidth: 0,
    overflow: "hidden",
    position: "relative",
  };

  const img = {
    display: "block",
    width: "auto",
    height: "100%",
  };

  const removeImage = (index, id) => {
    const updatedImages = [...seletedImages];
    updatedImages.splice(index, 1);
    setSelectedImages(updatedImages);
    setoldImages((preIds) => [...preIds, id]);
  };

  useEffect(() => {
    if (initialValue.mortuaryFormImages) {
      setSelectedImages(initialValue.mortuaryFormImages);
    }
  }, [initialValue, initialValue.mortuaryFormImages]);

  useEffect(() => {
    initialValue.countryId && dispatch(fetchAllCity(initialValue.countryId));
  }, [initialValue]);

  useEffect(() => {
    if (initialValue.districtId) {
      dispatch(fetchAllSubCenter(initialValue.districtId));
    }
  }, [initialValue]);

  useEffect(() => {
    if (initialValue.cityId) {
      dispatch(fetchAllCityCenters(initialValue.cityId));
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
        user.userStatusTypes &&
          user.userStatusTypes.find(
            (item) => item.value === initialValue.statusId
          )
      );
    }
  }, [initialValue.statusId]);

  useEffect(() => {
    sethospital(
      mortuaryState.hospitalList.find(
        (item) => item.value == initialValue.hospitalId
      )
    );
  }, [initialValue.hospitalId, mortuaryState.hospitalList]);

  useEffect(() => {
    if (initialValue.dateTime) {
      setCreateTime(new Date(initialValue.dateTime));
    }
  }, [initialValue.dateTime]);

  useEffect(() => {
    if (initialValue.mortuaryReachdateTime) {
      setMortuaryReachedTime(new Date(initialValue.mortuaryReachdateTime));
    }
  }, [initialValue.mortuaryReachdateTime]);

  useEffect(() => {
    if (initialValue.dischargeFromMortuaryDateTime) {
      setDischargedTime(new Date(initialValue.dischargeFromMortuaryDateTime));
    }
  }, [initialValue.dischargeFromMortuaryDateTime]);

  const thumbs =
    seletedImages &&
    seletedImages.map((file, index) => {
      return (
        <>
          <Box component="span" m={1} key={file.name}>
            <div style={thumb} key={file.name}>
              <div style={thumbInner}>
                <img src={file.url} style={img} />
                {/* <Fab
          size="small"
          color="secondary"
          aria-label="add"
          className={classes.margin}
        > */}
                {!isUserForRead && (
                  <ClearIcon
                    className={classes.extendedIcon}
                    onClick={() => removeImage(index, file.id)}
                  />
                )}

                {/* </Fab> */}
              </div>
            </div>
          </Box>
        </>
      );
    });

  //console.log("seletedImages", seletedImages);
  const enableLoading = () => {
    setLoading(true);
  };

  console.log("initialValue", initialValue);

  return (
    <>
      <Formik
        enableReinitialize={true}
        initialValues={initialValue}
        // validationSchema={userEditSchema}
        onSubmit={(values) => {
          enableLoading();
          const mergedValue = { ...values, oldImages };
          saveCenter(mergedValue);
        }}
      >
        {({ handleSubmit, setFieldValue, errors, touched, values }) => {
          return (
            <>
              <Modal.Body className="overlay overlay-block cursor-default">
                <Form className="form form-label-right">
                  <fieldset disabled={isUserForRead}>
                    <div className="form-group row">
                      <div className="col-12 col-md-6 col-lg-3 mb-5">
                        <Field
                          name="SN"
                          component={Input}
                          label="Serial Number"
                        />
                      </div>
                      <div className="col-12 col-md-6 col-lg-3 mb-5">
                        <SearchSelect
                          name="countryId"
                          label="Country*"
                          isDisabled={values.countryId == "" ? false : true}
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
                          isDisabled={values.cityId == "" ? false : true}
                          onChange={(e) => {
                            dispatch(fetchAllCityCenters(e.value));
                            dispatch(fetchAllHospitals({ cityId: e.value }));
                            dispatch(
                              fetchAllPoliceStations({ cityId: e.value })
                            );
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
                          name="hospitalId"
                          label="Hospital"
                          isDisabled={values.hospitalId == "" ? false : true}
                          onChange={(e) => {
                            setFieldValue("hospitalId", e.value);
                            sethospital(e);
                          }}
                          value={hospital}
                          error={errors.hospitalId}
                          touched={touched.hospitalId}
                          options={mortuaryState.hospitalList}
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
                          value={status}
                          error={errors.statusId}
                          touched={touched.statusId}
                          options={user.userStatusTypes}
                        />
                      </div>
                      <div className="col-12 col-md-6 col-lg-3 mb-5">
                        <label>Incident Date*</label>
                        <DatePicker
                          className="form-control"
                          selected={createDate}
                          onChange={(date) => {
                            setFieldValue("dateTime", date);
                            setCreateTime(date);
                          }}
                          disabled={values.dateTime == "" ? false : true}
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
                        <label>Mortuary Reached Time</label>
                        <DatePicker
                          className="form-control"
                          selected={mortuaryReachedTime}
                          onChange={(date) => {
                            setFieldValue("mortuaryReachdateTime", date);
                            setMortuaryReachedTime(date);
                          }}
                          timeInputLabel="Time:"
                          dateFormat="MM/dd/yyyy h:mm aa"
                          showTimeInput
                          name="mortuaryReachdateTime"
                        />
                      </div>
                      <div className="col-12 col-md-6 col-lg-3 mb-5">
                        <label>Discharge mortuary Time</label>
                        <DatePicker
                          className="form-control"
                          selected={dischargedTime}
                          onChange={(date) => {
                            setFieldValue(
                              "dischargeFromMortuaryDateTime",
                              date
                            );
                            setDischargedTime(date);
                          }}
                          disabled={isUserForRead}
                          timeInputLabel="Time:"
                          dateFormat="MM/dd/yyyy h:mm aa"
                          showTimeInput
                          name="dischargeFromMortuaryDateTime"
                        />
                      </div>
                      <div className="col-12 col-md-6 col-lg-3 mb-5">
                        <Field
                          name="fullNameOfTheDeceased"
                          component={Input}
                          placeholder=""
                          label="Deceased Name"
                          disabled={initialValue.fullNameOfTheDeceased !== ""}
                        />
                      </div>
                      <div className="col-12 col-md-6 col-lg-3 mb-5">
                        <Field
                          name="fatherNameOfTheDeceased"
                          component={Input}
                          placeholder=""
                          label="Father Name*"
                          disabled={initialValue.fatherNameOfTheDeceased !== ""}
                        />
                      </div>
                      <div className="col-12 col-md-6 col-lg-3 mb-5">
                        <Field
                          name="age"
                          component={Input}
                          type="Number"
                          label="Age*"
                          disabled={values.age == "" ? false : true}
                        />
                      </div>
                      <div className="col-12 col-md-6 col-lg-3 mb-5">
                        <Field
                          name="Address"
                          component={Input}
                          placeholder=""
                          label="Address"
                        />
                      </div>
                      <div className="col-12 col-md-6 col-lg-3 mb-5">
                        <Field
                          name="callerName"
                          component={Input}
                          placeholder=""
                          label="Caller Name"
                          disabled={values.callerName == "" ? false : true}
                        />
                      </div>
                      <div className="col-12 col-md-6 col-lg-3 mb-5">
                        <Field
                          name="callerPhNo"
                          component={Input}
                          placeholder=""
                          label="Caller Phone"
                          disabled={values.callerPhNo == "" ? false : true}
                        />
                      </div>
                      <div className="col-12 col-md-6 col-lg-3 mb-5">
                        <Field
                          name="callerCnic"
                          component={Input}
                          placeholder=""
                          label="Caller CNIC"
                          disabled={values.callerCnic == "" ? false : true}
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

                      {initialValue?.mortuaryFormImages && (
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
                <button
                  type="button"
                  onClick={onHide}
                  className="btn btn-light btn-elevate"
                >
                  Cancel
                </button>
                <> </>
                {isForEdit ? (
                  <>
                    <button
                      type="submit"
                      onClick={() => handleSubmit()}
                      className="btn btn-primary btn-elevate"
                    >
                      Update
                      {loading && (
                        <span className="ml-3 mr-3 spinner spinner-white"></span>
                      )}
                    </button>
                  </>
                ) : (
                  <>
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
                  </>
                )}
              </Modal.Footer>
            </>
          );
        }}
      </Formik>
    </>
  );
}
