import React, { useState, useEffect } from "react";
import { Modal } from "react-bootstrap";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { useParams } from "react-router-dom";
import { Input } from "../../../../../../_metronic/_partials/controls";
import { useSelector, useDispatch } from "react-redux";
import { CentersVehiclesTable } from "../centers-vehicles-table/CentersVehiclesTable";
import { SearchAbleSelect } from "./SearchAbleSelect";
import { CityDropdown } from "./CityDropdown";
//import { fetchAllCity } from "../../../_redux/centers/centersActions";
import { fetchAllCity } from "../../../../../../_metronic/redux/dashboardActions";

import { SearchSelect } from "../../../../../../_metronic/_helpers/SearchSelect";

const phoneRegExp = /^((\+92)|(0092))-{0,1}\d{3}-{0,1}\d{7}$|^\d{11}$|^\d{4}-\d{7}$/;
// Validation schema
const userEditSchema = Yup.object().shape({
  countryId: Yup.string().required("Country is required"),
  cityId: Yup.string().required("City is required"),
  name: Yup.string()
    .min(3, "Minimum 3 letters")
    .max(50, "Maximum 50 letters")
    .required("Center Name is required"),
  phoneNo: Yup.string()
    .matches(phoneRegExp, "Invalid format it should be 03049018107")
    .required("Phone No is required"),
  // location: Yup.string().required("Location is Required"),
  // longitude: Yup.string().required("Lognitude is required"),
  // latitude: Yup.string().required("Latitude is required"),
});

export function CenterEditForm({
  saveCenter,
  center,
  actionsLoading,
  onHide,
  roles,
  centers,
  isUserForRead,
  vehiclesForCenter,
  totalCount,
}) {
  const [loading, setLoading] = useState(false);
  const [seletCountry, setSeletCountry] = useState([]);
  const [selectCity, setSelectCity] = useState([]);

  // console.log("seletCountry", seletCountry);
  // console.log("selectCity", selectCity);

  const dispatch = useDispatch();

  const { allCountry, allCity } = useSelector((state) => state.dashboard);

  useEffect(() => {
    center.countryId && dispatch(fetchAllCity(center.countryId));
  }, [center]);

  useEffect(() => {
    setSeletCountry(
      allCountry && allCountry.find((item) => item.value === center.countryId)
    );
  }, [center.countryId, allCountry]);

  useEffect(() => {
    setSelectCity(
      allCity && allCity.filter((item) => item.value === center.cityId)
    );
  }, [center.cityId, allCity]);

  const enableLoading = () => {
    setLoading(true);
  };

  //console.log("center value", center);

  return (
    <>
      <Formik
        enableReinitialize={true}
        initialValues={center}
        validationSchema={userEditSchema}
        onSubmit={(values) => {
          enableLoading();
          saveCenter(values);
        }}
      >
        {({
          handleSubmit,
          setFieldValue,
          handleBlur,
          errors,
          touched,
          values,
        }) => (
          <>
            <Modal.Body className="overlay overlay-block cursor-default">
              <Form className="form form-label-right">
                <fieldset disabled={isUserForRead}>
                  <div className="form-group row">
                    <div className="col-12 col-md-6 mb-5">
                      <SearchSelect
                        name="countryId"
                        label="Country*"
                        isDisabled={isUserForRead ? true : false}
                        // onBlur={() => {
                        //   handleBlur({ target: { name: "countryId" } });
                        // }}
                        onChange={(e) => {
                          setFieldValue("countryId", e.value);
                          setFieldValue("cityId", "");
                          dispatch(fetchAllCity(e.value));
                          setSeletCountry(e);
                        }}
                        value={seletCountry}
                        error={errors.countryId}
                        touched={touched.countryId}
                        options={allCountry}
                      />
                      {/* <SearchAbleSelect
                        name="countryId"
                        label="Country*"
                        isDisabled={isUserForRead ? true : false}
                        onBlur={() => {
                          handleBlur({ target: { name: "countryId" } });
                        }}
                        onChange={(option) => {
                          renderCities(option);
                          setFieldValue("countryId", option.value || null);
                        }}
                        value={center.countryId}
                        error={errors.countryId}
                        touched={touched.countryId}
                        options={countryDropdown}
                      /> */}
                    </div>

                    <div className="col-12 col-md-6 mb-5">
                      <SearchSelect
                        name="cityId"
                        label="City*"
                        isDisabled={isUserForRead ? true : false}
                        onBlur={handleBlur}
                        // onBlur={() => {
                        //   handleBlur({ target: { name: "cityId" } });
                        // }}
                        //options={dashboard.allCity}
                        onChange={(e) => {
                          setFieldValue("cityId", e.value);
                          setSelectCity(e);
                        }}
                        value={selectCity}
                        error={errors.cityId}
                        touched={touched.cityId}
                        options={allCity}
                      />
                    </div>
                    {/* <CityDropdown
                      name="cityId"
                      label="City*"
                      isDisabled={isUserForRead ? true : false}
                      onBlur={() => {
                        handleBlur({ target: { name: "cityId" } });
                      }}
                      onChange={(option) =>
                        setFieldValue("cityId", option.value || null)
                      }
                      value={center.cityId}
                      error={errors.cityId}
                      touched={touched.cityId}
                      options={citiesDropdown}
                    /> */}

                    <div className="col-12 col-md-6 mb-5">
                      <Field
                        name="name"
                        component={Input}
                        placeholder="Center Name"
                        label="Center Name*"
                      />
                    </div>
                    <div className="col-12 col-md-6 mb-5">
                      <Field
                        name="phoneNo"
                        component={Input}
                        placeholder=""
                        label="Phone No*"
                      />
                    </div>
                    {/* <div className="col-12 col-md-4 mb-5">
                      <Field
                        name="location"
                        component={Input}
                        placeholder="Location"
                        label="Location*"
                      />
                    </div>
                    <div className="col-12 col-md-4 mb-5">
                      <Field
                        type="number"
                        name="latitude"
                        component={Input}
                        placeholder="33.948615"
                        label="Latitude*"
                      />
                    </div>
                    <div className="col-12 col-md-4 mb-5">
                      <Field
                        type="number"
                        name="longitude"
                        component={Input}
                        placeholder="-118.401382"
                        label="Longitude*"
                      />
                    </div>
                    <div className="col-12 col-md-4 mb-5">
                      <Field
                        type="number"
                        name="longitude"
                        component={Input}
                        placeholder="-118.401382"
                        label="Longitude*"
                      />
                    </div> */}
                  </div>
                </fieldset>
                {isUserForRead ? (
                  <>
                    <CentersVehiclesTable
                      vehiclesForCenter={vehiclesForCenter}
                      totalCount={totalCount}
                    />
                  </>
                ) : (
                  <></>
                )}
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
