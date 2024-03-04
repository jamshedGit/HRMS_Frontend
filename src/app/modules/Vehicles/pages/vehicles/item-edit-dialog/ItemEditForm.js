import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import { useSelector, useDispatch } from "react-redux";
import { Formik, Form, Field } from "formik";
import { Modal } from "react-bootstrap";
import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
import { Input, Select } from "../../../../../../_metronic/_partials/controls";
import { fetchDrivers } from "../../../_redux/vehiclesActions";
import { SearchSelect } from "../../../../../../_metronic/_helpers/SearchSelect";
import { fetchAllSubCenter } from "../../../../../../_metronic/redux/dashboardActions";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "center",
    marginTop: "3rem",
    marginBottom: "3rem",
  },
}));

export function ItemEditForm({
  saveItem,
  item,
  centerName,
  actionsLoading,
  onHide,
  itemForRead,
  category,
}) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [Loading, setLoading] = useState(false);
  const [cetnerId, setCenterId] = useState(0);
  const [driverId, setDriverId] = useState(item.driverId);
  const oldDriverId = item.driverId;

  const [defCenter, setDefaultCenter] = useState([]);
  const [defSubcenter, setDefaultSubCenter] = useState([]);
  const [defDriver, setDefaultDriver] = useState([]);

  console.log("defSubcenter", defSubcenter);
  //console.log("item", item);
  // useEffect(() => {
  //   dispatch(fetchDrivers(cetnerId));
  // }, [cetnerId]);

  // useEffect(() => {
  //   dispatch(fetchDrivers(item.centerId));
  // }, [item.centerId]);

  const onChangeSelectedOption = (e) => {
    dispatch(fetchAllSubCenter(e.value));
    setCenterId(e.value);
    // selectedVal({ selectedVal: e.value });
    //this.setState({ selectedVal: e.value });
  };
  const onChangeSubcenterdOption = (e) => {
    //setCenterId(e.value);
    // console.log("E value", e);
    // //dispatch(fetchAllSubCenter())
  };

  const enableLoading = () => {
    setLoading(true);
  };

  const disableLoading = () => {
    setLoading(false);
  };

  const drivers = useSelector((state) => state?.vehicles?.drivers);
  const { dashboard } = useSelector((state) => state);

  //console.log("dashboard", dashboard);
  useEffect(
    (e) => {
      item.tempCenterId && dispatch(fetchAllSubCenter(item.tempCenterId));
    },
    [item]
  );

  useEffect(
    (e) => {
      item.tempCenterId && dispatch(fetchDrivers(item.tempSubCenterId));
    },
    [item]
  );

  useEffect(() => {
    const getDefaultValue = dashboard?.allCenters.filter(
      (e) => e.value == item.tempCenterId
    );
    setDefaultCenter(getDefaultValue);
  }, [dashboard?.allCenters]);

  useEffect(() => {
    const getDefaultValue = dashboard?.allSubCenter.filter((e) => {
      //console.log("e", e);
      return e.value == item.tempSubCenterId;
    });
    // console.log("getDefaultValue", getDefaultValue);
    setDefaultSubCenter(getDefaultValue);
  }, [dashboard?.allSubCenter]);

  useEffect(() => {
    // const getDefaultValueForDriver = drivers?.filter(
    //   (e) => e.value == item.driverId
    // );

    const selectedDriver = {
      label: item.driver?.firstName,
      value: item.driverId,
    };
    setDefaultDriver(selectedDriver);
  }, [item?.centerId, dashboard?.allCenters]);

  return (
    <>
      {actionsLoading && (
        <div className={classes.root}>
          <CircularProgress />
        </div>
      )}

      <Formik
        enableReinitialize={true}
        initialValues={item}
        validationSchema={itemEditSchema}
        onSubmit={(values) => {
          enableLoading();
          //console.log("values", values);
          saveItem(values)
            .then(() => disableLoading())
            .catch((error) => alert("something went wrong"));
          //disableLoading();
        }}
      >
        {({
          handleSubmit,
          touched,
          errors,
          handleChange,
          handleBlur,
          values,
          setFieldValue,
        }) => (
          <>
            <Modal.Body className="overlay overlay-block cursor-default">
              {actionsLoading && (
                <div className="overlay-layer bg-transparent">
                  <div className="spinner spinner-lg spinner-success" />
                </div>
              )}
              <Form className="form form-label-right">
                <fieldset disabled={itemForRead}>
                  <div className="form-group row">
                    {/* <div className="col-lg-6">
                      <Select name="centerId" label="Center">
                        {centers.map((item) => {
                          return (
                            <option key={item.value} value={item.value}>
                              {item.label}
                            </option>
                          )
                        })}
                      </Select>
                    </div> */}
                    {/* <div className="col-lg-6">
                      <Select name="roleId" label="Role">
                        {roles.map((item) => {
                          return (
                            <option key={item.value} value={item.value}>
                              {item.label}
                            </option>
                          )
                        })}
                      </Select>
                    </div> */}
                  </div>
                  <div className="form-group row">
                    <div className="col-12 col-md-4">
                      <SearchSelect
                        name="centerId"
                        isDisabled={itemForRead && true}
                        label="Main Center*"
                        onBlur={() => {
                          handleBlur({ target: { name: "centerId" } });
                        }}
                        onChange={(e) => {
                          setFieldValue("centerId", e.value || null);
                          setDefaultCenter(e);
                          setDefaultSubCenter([]);
                          setDefaultDriver([]);
                          dispatch(fetchAllSubCenter(e.value));
                          dispatch(fetchDrivers(0));
                        }}
                        value={defCenter && defCenter[0]}
                        error={errors.centerId}
                        touched={touched.centerId}
                        options={dashboard.allCenters}
                      />
                    </div>
                    <div className="col-12 col-md-4">
                      <SearchSelect
                        name="subCenterId"
                        label="Sub-Center*"
                        isDisabled={itemForRead && true}
                        onBlur={() => {
                          handleBlur({ target: { name: "subCenterId" } });
                        }}
                        onChange={(e) => {
                          setFieldValue("subCenterId", e.value || null);
                          setDefaultSubCenter(e);
                          setDefaultDriver([]);
                          dispatch(fetchDrivers(e.value));
                        }}
                        value={defSubcenter}
                        error={errors.subCenterId}
                        touched={touched.subCenterId}
                        options={dashboard.allSubCenter}
                      />
                    </div>
                    <div className="col-12 col-md-4">
                      <SearchSelect
                        name="driverId"
                        label="Driver"
                        isDisabled={itemForRead && true}
                        onBlur={() => {
                          handleBlur({ target: { name: "driverId" } });
                        }}
                        onChange={(e) => {
                          setFieldValue("driverId", e.value || null);
                          setDefaultDriver(e);
                        }}
                        value={defDriver}
                        error={errors.driverId}
                        touched={touched.driverId}
                        // options={drivers}
                        options={drivers}
                      />
                    </div>
                  </div>
                  <div className="form-group row">
                    <div className="col-lg-4">
                      <Field
                        type="text"
                        name="name"
                        component={Input}
                        placeholder=""
                        label="Vehicle Name"
                        customFeedbackLabel="hello"
                      />
                    </div>
                    <div className="col-lg-4">
                      <Field
                        name="regNo"
                        component={Input}
                        placeholder=""
                        label="Registration No*"
                      />
                    </div>
                    <div className="col-lg-4">
                      <Field
                        name="engineCapacity"
                        component={Input}
                        placeholder=""
                        label="Engine Capacity"
                      />
                    </div>
                  </div>
                  <div className="form-group row">
                    <div className="col-lg-4">
                      <Field
                        name="registerCity"
                        component={Input}
                        placeholder=""
                        label="Register City"
                      />
                    </div>
                    <div className="col-lg-4">
                      <Field
                        name="chasis"
                        component={Input}
                        placeholder=""
                        label="Chasis"
                      />
                    </div>
                    <div className="col-lg-4">
                      <Field
                        name="milleage"
                        component={Input}
                        placeholder=""
                        label="Milleage*"
                      />
                    </div>
                  </div>
                  <div className="form-group row">
                    <div className="col-lg-4">
                      <Field
                        name="year"
                        component={Input}
                        placeholder=""
                        label="Year*"
                      />
                    </div>
                    <div className="col-lg-4">
                      <Field
                        name="make"
                        component={Input}
                        placeholder=""
                        label="Make"
                      />
                    </div>
                    <div className="col-lg-4">
                      <Field
                        name="model"
                        component={Input}
                        placeholder=""
                        label="Model"
                      />
                    </div>
                  </div>
                  <div className="form-group row">
                    <div className="col-lg-4">
                      <Field
                        name="color"
                        component={Input}
                        placeholder=""
                        label="Color"
                      />
                    </div>
                    <div className="col-lg-4">
                      <Field
                        name="engineNo"
                        component={Input}
                        placeholder=""
                        label="Engine No."
                      />
                    </div>
                    <div className="col-lg-4">
                      <Select
                        label="Fuel Type"
                        name="fuelType"
                        value={values.fuelType}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        style={{ display: "block" }}
                      >
                        <option value="" label="Select Type" />
                        <option value="Pertol" label="Petrol" />
                        <option value="Gas" label="Gas" />
                      </Select>
                      {errors.fuelType && touched.fuelType && (
                        <div className="invalid-text">{errors.fuelType}</div>
                      )}
                    </div>
                  </div>
                  <div className="form-group row">
                    <div className="col-lg-4">
                      <Select
                        label="Status*"
                        name="status"
                        value={values.status}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        style={{ display: "block" }}
                      >
                        <option value="" label="Select Type" />
                        <option value="Available" label="Available" />
                        <option value="offDuty" label="offDuty" />
                      </Select>
                      {errors.status && touched.status && (
                        <div className="invalid-text">{errors.status}</div>
                      )}
                    </div>
                    <div className="col-lg-4">
                      <Select
                        label="Transmission"
                        name="transmission"
                        value={values.transmission}
                      >
                        <option value="" label="Select Type" />
                        <option value="auto" label="Auto" />
                        <option value="manual" label="Manual" />
                      </Select>
                      {errors.transmission && touched.transmission && (
                        <div className="invalid-text">
                          {errors.transmission}
                        </div>
                      )}
                    </div>
                    <div className="col-lg-4">
                      <Select
                        label="Vehicle Category*"
                        name="vehicleCategoryId"
                        value={values.vehicleCategoryId}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        style={{ display: "block" }}
                      >
                        <option value="" label="Select Type" />
                        {category &&
                          category.map((response) => {
                            return (
                              <option
                                key={response.value}
                                value={response.value}
                                label={response.label}
                              />
                            );
                          })}
                      </Select>
                      {errors.vehicleCategoryId &&
                        touched.vehicleCategoryId && (
                          <div className="invalid-text">
                            {errors.vehicleCategoryId}
                          </div>
                        )}
                      {/* <Select name="vehicleCategoryId" label="Vehicle Category">
                        {category &&
                          category.map((response) => {
                            return (
                              <option
                                key={response.value}
                                value={response.value}
                              >
                                {response.label}
                              </option>
                            );
                          })}
                      </Select> */}
                    </div>
                  </div>
                  {/* [{item?.driver && (
                    <>
                      <div className="form-group row mt-5">
                        <div className="col-lg-12">
                          <small>Assigned driver</small>
                          <ul>
                            <li>{item?.driver.firstName}</li>
                          </ul>
                        </div>
                      </div>
                    </>
                  )}] */}
                  <div className="from-group row">
                    <div className="col-lg-4">
                      {/* <Select
                        label="Center*"
                        name="centerId"
                        value={values.centerId}
                        onChange={(e) => {
                          handleChange(e);
                          setCenterId(e.target.value);
                        }}
                        onBlur={handleBlur}
                        style={{ display: "block" }}
                      >
                        <option value="" label="Select Type" />
                        {centerName &&
                          centerName.map((response) => {
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
                      )} */}
                      {/* <Select name="centerId" label="Center">
                        {centerName &&
                          centerName.map((response) => {
                            return (
                              <option
                                key={response.value}
                                value={response.value}
                              >
                                {response.label}
                              </option>
                            );
                          })}
                      </Select> */}
                    </div>
                    {/* <div className="col-lg-4">
                      <Select
                        label="Driver*"
                        name="driverId"
                        onChange={(e) => {
                          handleChange(e);
                          setDriverId(e.target.value);
                          console.log("Set driver id", driverId);
                        }}
                        value={values.driverId}
                        onBlur={handleBlur}
                        style={{ display: "block" }}
                      >
                        <option value="" label="Select Type" />
                        {drivers &&
                          drivers.map((response) => {
                            return (
                              <option
                                key={response.value}
                                value={response.value}
                                label={response.label}
                              />
                            );
                          })}
                      </Select>
                      {errors.driverId && touched.driverId && (
                        <div className="invalid-text">{errors.driverId}</div>
                      )}
                      <Field
                        type="text"
                        name="oldDriverId"
                        component={Input}
                        style={{ display: "none" }}
                      />
                    </div> */}
                  </div>
                </fieldset>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              {!itemForRead ? (
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
              {!itemForRead && (
                <button
                  type="submit"
                  onClick={() => handleSubmit()}
                  className="btn btn-primary btn-elevate"
                >
                  Save
                  {Loading && (
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

// Validation schema
const itemEditSchema = Yup.object().shape({
  centerId: Yup.string().required("Center is required"),
  subCenterId: Yup.string().required("Subcenter is required"),
  driverId: Yup.number().nullable(),
  name: Yup.string()
    .min(3, "Minimum 3 symbols")
    .max(50, "Maximum 50 symbols")
    .nullable(),
  //.required("Name is required"),
  regNo: Yup.string()
    .min(3, "Minimum 3 symbols")
    .max(50, "Maximum 50 symbols")
    .required("Registration No is required"),
  engineCapacity: Yup.string().nullable(),
  registerCity: Yup.string().nullable(),
  chasis: Yup.string().nullable(),
  milleage: Yup.string()
    .nullable()
    .required("Milleage is required"),
  year: Yup.string()
    .matches(/^\d*[1-9]\d*$/, "Year should be number")
    .required("Year is required."),
  make: Yup.string().nullable(),
  model: Yup.string().nullable(),
  color: Yup.string().nullable(),
  fuelType: Yup.string().nullable(),
  status: Yup.string().required("Status is required"),
  transmission: Yup.string().nullable(),
  oldDriverId: Yup.string().nullable(),
  vehicleCategoryId: Yup.string().required("Vehicle category is required"),
  engineNo: Yup.string().nullable(),
});
