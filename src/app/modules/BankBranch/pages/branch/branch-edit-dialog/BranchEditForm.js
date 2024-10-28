import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { Input, Select, TextArea } from "../../../../../../_metronic/_partials/controls";
import { useDispatch, useSelector } from "react-redux";
import { SearchSelect } from "../../../../../../_metronic/_helpers/SearchSelect";
import DatePicker from "react-datepicker";

import {
  fetchAllBanks,
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
const userEditSchema_2 = Yup.object().shape(
  {
    countryId: Yup.string().required("*Required"),
    cityId: Yup.string().required("*Required"),
    branchCode: Yup.string().required("*Required"),
    Name: Yup.string().required("*Required"),
    BankId: Yup.string().required("*Required"),
    email: Yup.string()
      .email("Invalid email"),
    phone: Yup
      .string()
      .matches(/^\d+$/, 'Only numeric characters are allowed')
      .min(11)
      .max(15)
      .required("*Required")
  }
);


export function BranchEditForm({
  saveBranch,
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

  const { dashboard } = useSelector((state) => state);
  const [defCountry, setDefaultCountry] = useState({});
  const [defCity, setDefaultCity] = useState({});
  // Get User Details
  const { auth } = useSelector((state) => state);
  const [defBank, setDefaultBanks] = useState({});
  const [accOpeningDateSelected, setAccountOpeningDate] = useState(null);

  useEffect(() => {
    if (!user.Id) {
      dispatch(fetchAllBanks(1));
    }
  }, [user.BankId, dispatch]);


  useEffect(() => {
    if (user.accOpeningDate) {
      setAccountOpeningDate(new Date(user.accOpeningDate));
    }
  }, [user.accOpeningDate]);

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
    const BankId = defBank?.value ? defBank.value : user.BankId;
    setDefaultBanks(
      dashboard.allBanks &&
      dashboard.allBanks.filter((item) => {
        return item.value === BankId;
      })
    );
  }, [user?.BankId, dashboard.allBanks]);

  useEffect(() => {
    setDefaultCity(
      dashboard.allCity.filter((item) => item.value === user.cityId)
    );
  }, [user.cityId, dashboard.allCity]);

  console.log("master", user);
  return (
    <>
      <Formik
        enableReinitialize={true}
        initialValues={user}
        validationSchema={userEditSchema_2}
        onSubmit={(values) => {
          console.log("values", values);
          enableLoading();
          saveBranch(values);
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
                    {<div className="col-12 col-md-4 mt-3">
                      <SearchSelect
                        name="BankId"
                        label={<span> Bank<span style={{ color: 'red' }}>*</span></span>}
                        isDisabled={isUserForRead && true}
                        onBlur={() => {
                          // handleBlur({ target: { name: "countryId" } });
                        }}
                        onChange={(e) => {
                          setFieldValue("BankId", e.value);
                          setDefaultBanks(e);
                          dispatch(fetchAllBanks(e.value));
                        }}
                        value={defBank}
                        error={errors.BankId}
                        touched={touched.BankId}
                        options={dashboard.allBanks}
                      />
                    </div>

                    }

                    <div className="col-12 col-md-4 mt-3">
                      <Field
                        name="branchCode"
                        component={Input}
                        placeholder="Enter Branch Code"
                        label={<span> Branch Code<span style={{ color: 'red' }}>*</span></span>}
                      />
                      {errors.branchCode && touched.branchCode}
                    </div>

                    <div className="col-12 col-md-4 mt-3">
                      <Field
                        name="Name"
                        component={Input}
                        placeholder="Enter Branch Name"
                        label={<span> Branch Name<span style={{ color: 'red' }}>*</span></span>}
                      />
                    </div>

                    {<div className="col-12 col-md-4 mt-3">
                      <SearchSelect
                        name="countryId"
                        label={<span> Country<span style={{ color: 'red' }}>*</span></span>}
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
                    </div>}


                    {<div className="col-12 col-md-4 mt-3">
                      <SearchSelect
                        name="cityId"
                        label={<span> City<span style={{ color: 'red' }}>*</span></span>}
                        isDisabled={isUserForRead && true}
                        onBlur={() => {
                          //   handleBlur({ target: { name: "cityId" } });
                        }}
                        onChange={(e) => {
                          setFieldValue("cityId", e.value);
                          setDefaultCity(e);
                      
                        }}
                        value={defCity}
                        error={errors.cityId}
                        touched={touched.cityId}
                        options={dashboard.allCity}
                      />
                    </div>}
                    {
                      <div className="col-12 col-md-4 mt-3">
                        <Field
                        pattern="\d*"
                        maxLength={15}
                          name="phone"
                          component={Input}
                          placeholder="Enter Phone No."
                          label="Phone"
                        />
                      </div>
                    }

                    {
                      <div className="col-12 col-md-4 mt-3">
                        <Field
                          name="email"
                          component={Input}
                          placeholder="Enter Email"
                          label="Email"
                        />
                      </div>
                    }
                    {
                      <div className="col-12 col-md-4 mt-3">
                        <Field
                          name="fax"
                          component={Input}
                          placeholder="Enter Fax No."
                          label="Fax"
                        />
                      </div>
                    }

                    {
                      <div className="col-12 col-md-4 mt-3">
                        <Field
                          name="contactPerson"
                          component={Input}
                          placeholder="Enter Contact Person"
                          label="Contact Person"
                        />
                      </div>
                    }
                    {
                      <div className="col-12 col-md-4 mt-3">
                        <Field
                          name="address"
                          component={TextArea}
                          placeholder="Enter Branch Address"
                          label="Address"
                        />
                      </div>
                    }
                    {<div className="col-12 col-md-4 mt-3">
                      <label>Account Opening Date</label>
                      <DatePicker
                        className="form-control"
                        placeholder="Enter Account Opening Date"
                        selected={accOpeningDateSelected}
                        onChange={(date) => {
                          setFieldValue("accOpeningDate", date);
                          setAccountOpeningDate(date);
                        }}
                        timeInputLabel="Time:"
                        dateFormat="dd/MM/yyyy"
                        showTimeInput
                        name="accOpeningDate"
                        disabled={isUserForRead}
                        autoComplete="off"
                      />
                    </div>}

                    {
                      <div className="col-12 col-md-4 mt-3">
                        <Field
                          name="accNoForSalary"
                          component={Input}
                          placeholder="Enter Account No For Salary"
                          label="Account No (Salary)"
                        />
                      </div>
                    }
                    {
                      <div className="col-12 col-md-4 mt-3">
                        <Field
                          name="accNoForPF"
                          component={Input}
                          placeholder="Enter Provident Fund"
                          label="Account No (Provident Fund)"
                        />
                      </div>
                    }
                    {
                      <div className="col-12 col-md-4 mt-3">
                        <Field
                          name="accNoForGrad"
                          component={Input}
                          placeholder="Enter Account No For Gratuity"
                          label="Account No (Gratuity)"
                        />
                      </div>
                    }

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
