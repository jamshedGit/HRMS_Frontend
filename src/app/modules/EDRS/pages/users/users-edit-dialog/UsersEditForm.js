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

// Phone Number Regex
const phoneRegExp = /^((\+92)|(0092))-{0,1}\d{3}-{0,1}\d{7}$|^\d{11}$|^\d{4}-\d{7}$/;
// CNIC Regex
const cnicRegExp = /^[0-9]{5}-[0-9]{7}-[0-9]$/;
// Password Regex
const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
// Validation schema
const receiptEditSchema = Yup.object().shape(
  {

    cityId: Yup.string().required("Please select City"),
    centerId: Yup.string().required("Please select center"),
    //.required("Please select center"),
    subCenterId: Yup.string().required("Please select subCenter"),
    donorName: Yup.string()
      .required("Donor name is required"),
    receiptNo: Yup.string()
      .required("Receipt No is required"),
    bookNo: Yup.string()
      .required("Book No is required"),
    // bankName: Yup.string()
    //   .required("Bank Name is required"),
    // chequeNo: Yup.string()
    //   .required("ChequeNo is required"),
    amount: Yup.string().matches(/^\d*[1-9]\d*$/, "amount should be number").required("Please enter amount"),
    phoneno: Yup.string().matches(phoneRegExp, "Number should be like 03049018107").required("Contact No is required"),
    type: Yup.string().required("Please select Donation Type"),
    // roleId: Yup.mixed()
    //   .nullable(false)
    //   .required("Please select role"),
    // password: Yup.string()
    // .matches(
    //   passwordRegex,
    //   "Minimum eight characters, at least one letter and one number"
    // )
    //   .required("password is required"),
    // password: Yup.string().when("password", {
    //   is: (exist) => !!exist, //if(exist)
    //   then: Yup.string(),
    //   otherwise: Yup.string()
    //     .required(
    //       "Minimum eight characters, at least one letter and one number"
    //     )
    //     .matches(
    //       passwordRegex,
    //       "Minimum eight characters, at least one letter and one number"
    //     ),
    // }),
  },
  [["password", "password"]]
);
export function UserEditForm({
  saveUser,
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
  const dispatch = useDispatch();

  const { allCountry, allCity } = useSelector((state) => state.dashboard);
  // const [loading, setLoading] = useState(false);
  const [defCountry, setDefaultCountry] = useState({});
  const [defCity, setDefaultCity] = useState({});
  const [defCenter, setDefaultCenter] = useState({});
  const [defSubcenter, setDefaultSubCenter] = useState({});
  const [defStatus, setDefaultStatus] = useState();
  const [selectCity, setSelectCity] = useState([]);
  const { dashboard } = useSelector((state) => state);
  // Get User Details
  const { auth } = useSelector((state) => state);

  useEffect(() => {
    if (!user.countryId) {

      dispatch(fetchAllCity(1));
    }
  }, [user.countryId, dispatch]);

  useEffect(() => {
    if (user.cityId) {

      console.log(user);
      dispatch(fetchAllCityCenters(user.cityId));
    }
  }, [user.cityId, dispatch]);

  useEffect(() => {
    if (user.centerId) {
      dispatch(fetchAllSubCenter(user.centerId));
    }
  }, [user.centerId, dispatch]);

  useEffect(() => {
    const countryId = defCountry?.value ? defCountry.value : user.countryId;
    setDefaultCountry(
      dashboard.allCountry &&
      dashboard.allCountry.filter((item) => {
        return item.value === countryId;
      })
    );
  }, [user?.countryId, dashboard.allCountry]);

  useEffect(() => {
    setDefaultCity(
      dashboard.allCity.filter((item) => item.value === user.cityId)
    );
  }, [user.cityId, dashboard.allCity]);

  useEffect(() => {
    setDefaultCenter(
      dashboard.cityCenters &&
      dashboard.cityCenters.filter((item) => item.value === user.centerId)
    );
  }, [user.centerId, dashboard.cityCenters]);

  useEffect(() => {
    setDefaultSubCenter(
      dashboard.allSubCenter &&
      dashboard.allSubCenter.filter((item) => item.value === user.subCenterId)
    );
  }, [user.subCenterId, dashboard.allSubCenter]);

  useEffect(() => {
    setDefaultStatus(
      userStatusTypes &&
      userStatusTypes.find((item) => item.label === user.status.trim())
    );
  }, [user]);

  return (
    <>
      <Formik
        enableReinitialize={true}
        initialValues={user}
        validationSchema={receiptEditSchema}
        onSubmit={(values) => {
          enableLoading();
          saveUser(values);
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
                        name="donorName"
                        component={Input}
                        placeholder="Donor Name"
                        label="Donor Name*"
                      //value="esfsdf"
                      />
                    </div>
                   
                    <div className="col-12 col-md-4 mt-3">
                      <Field
                        name="bookNo"
                        component={Input}
                        placeholder="Book No"
                        label="Book No*"
                        onBlur={async (e) => {
                         // alert(e.target.value)
                         let getVal = e.target.value + "-" + await dispatch(getLatestBookingNo(e.target.value));
                         setFieldValue("receiptNo",getVal);
                        
                        
                        }}
                      />
                    </div>
                    <div className="col-12 col-md-4 mt-3">
                      <Field
                        name="receiptNo"
                        component={Input}
                        placeholder="Receipt No"
                        label="Receipt No*"
                        disabled
                      />
                    </div>
                    <div className="col-12 col-md-4 mt-3">
                      <Field
                        name="bankName"
                        component={Input}
                        placeholder="Bank Name"
                        label="Bank Name"
                      />
                    </div>
                    <div className="col-12 col-md-4 mt-3">
                      <Field
                        name="phoneno"
                        component={Input}
                        placeholder="Contact No"
                        label="Contact No*"
                      />
                    </div>
                    <div className="col-12 col-md-4 mt-3">
                      <Field
                        name="chequeNo"
                        component={Input}
                        placeholder="Cheque No"
                        label="Cheque No"
                      />
                    </div>
                    <div className="col-12 col-md-4 mt-3">
                      <Field
                        name="amount"
                        component={Input}
                        placeholder="Donation Amount"
                        label="Donation Amount*"
                      />
                    </div>
                    <div className="col-12 col-md-4 mt-3">
                      <Select
                        label="Donation Type"
                        name="type"
                        value={values.type}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        style={{ display: "block" }}
                      >
                        <option value="" label="Select Type" />
                        <option value="Saqda" label="Saqda" />
                        <option value="Zakat" label="Zakat" />
                        <option value="Donation" label="Donation" />
                        <option value="Aqeeqah" label="Aqeeqah" />
                        <option value="Meal Donation" label="Meal Donation" />
                        <option value="Ambulance" label="Ambulance" />
                        <option value="Other" label="Other" />
                      </Select>
                      {errors.fuelType && touched.fuelType && (
                        <div className="invalid-text">{errors.fuelType}</div>
                      )}
                    </div>
                    <div className="col-12 col-md-4 mt-3">
                      <Field
                        name="clerkName"
                        component={Input}
                        placeholder="Clerk Name"
                        label="Clerk Name"
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
                    <div className="col-12 col-md-4 mt-3">
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
                    </div>

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
                    <div className="col-12 col-md-4 mt-3">
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
                    </div>
                    <div className="col-12 col-md-4 mt-3">
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
                    </div>
                    <div className="col-12 col-md-4 mt-3">
                      <Field
                        name="description"
                        component={TextArea}
                        placeholder="Description"
                        label="Description"
                      />
                    </div>
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
