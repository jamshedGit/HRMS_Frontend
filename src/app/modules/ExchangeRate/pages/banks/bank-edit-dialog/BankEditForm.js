import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { Input, Select, TextArea } from "../../../../../../_metronic/_partials/controls";
import { useDispatch, useSelector } from "react-redux";
import { SearchSelect } from "../../../../../../_metronic/_helpers/SearchSelect";
import {
  fetchAllCity,
  fetchAllCountry,
  fetchAllFormsMenu,
  fetchAllActiveEmployees,
  fetchAllEarningDeductionList

} from "../../../../../../_metronic/redux/dashboardActions";
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css';


// Phone Number Regex
const phoneRegExp = /^((\+92)|(0092))-{0,1}\d{3}-{0,1}\d{7}$|^\d{11}$|^\d{4}-\d{7}$/;
// CNIC Regex
const cnicRegExp = /^[0-9]{5}-[0-9]{7}-[0-9]$/;
// Password Regex
const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
// Validation schema
const formValidation = Yup.object().shape(
  {

    subsidiaryId: Yup.string()
      .required("Required*"),
    base_currency_id: Yup.string()
      .required("Required*"),
    currency_to_convert_id: Yup.string()
      .required("Required*"),
    exchange_rate: Yup.string()
      .required("Required*"),
    effective_date: Yup.date()
      .required('Date is required')
      .min(new Date(), 'Date cannot be in the past')
  },

);
export function BankEditForm({
  saveIncident,
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
  const { dashboard } = useSelector((state) => state);

  const dispatch = useDispatch();
  const [defEffectiveDate, setEffectiveDate] = useState(null);

  const [defCurrecnyChildMenus = null, setDefaultCurrencyChildMenus] = useState(null);
  const [defCurrecnyToConvertChildMenus = null, setDefaultCurrencyToConvertChildMenus] = useState(null);

  useEffect(() => {
    if (!user.Id) {
      dispatch(fetchAllFormsMenu(126, "allCurrencyCodeList")); // For All currecy Codes
    }
  }, [dispatch]);


  useEffect(() => {
    const base_currency_id = defCurrecnyChildMenus?.value ? defCurrecnyChildMenus.value : user.base_currency_id;
    setDefaultCurrencyChildMenus(
      dashboard.allCurrencyCodeList &&
      dashboard.allCurrencyCodeList.filter((item) => {
        return item.value === base_currency_id;
      })
    );

  }, [user?.base_currency_id, dashboard.base_currency_id]);

  useEffect(() => {
    const currency_to_convert_id = defCurrecnyToConvertChildMenus?.value ? defCurrecnyToConvertChildMenus.value : user.currency_to_convert_id;
    setDefaultCurrencyToConvertChildMenus(
      dashboard.allCurrencyCodeList &&
      dashboard.allCurrencyCodeList.filter((item) => {
        return item.value === currency_to_convert_id;
      })
    );

  }, [user?.currency_to_convert_id, dashboard.currency_to_convert_id]);




  //===== Date Of End Date
  useEffect(() => {

    if (user.effective_date) {
      setEffectiveDate(new Date(user.effective_date));
    }
  }, [user.effective_date]);

  //=========== END
  console.log("dashboar111", dashboard, user)
  return (
    <>
      <Formik
        enableReinitialize={true}
        initialValues={user}
        validationSchema={formValidation}
        onSubmit={(values) => {
          console.log("values", values);
          enableLoading();
          saveIncident(values);
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
                    {
                      <><div className="col-12 col-md-4 mt-3">
                        <Select

                          label={<span> Subsidiary<span style={{ color: 'red' }}>*</span></span>}
                          name="subsidiaryId"
                          value={values.subsidiaryId}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          style={{ display: "block" }}
                        >
                          <option value="-1" label="Select Subsidiary" />
                          <option value="134" label="Pakistan" />
                          <option value="135" label="Dubai" />
                          <option value="136" label="Australia" />

                        </Select>
                        {errors.subsidiaryId && touched.subsidiaryId && (
                          <div className="invalid-text">{errors.subsidiaryId}</div>
                        )}
                      </div></>

                    }

                  </div>
                  <div className="from-group row">
                    <div className="col-12 col-md-4 mt-3">
                      <SearchSelect
                        name="base_currency_id"
                        label={<span> Base Currency<span style={{ color: 'red' }}>*</span></span>}
                        isDisabled={isUserForRead && true}
                        onBlur={() => {
                          // handleBlur({ target: { name: "countryId" } });
                        }}
                        onChange={(e) => {
                          setFieldValue("base_currency_id", e.value || null);
                          setDefaultCurrencyChildMenus(e);
                          // dispatch(fetchAllFormsMenu(e.value));
                        }}
                        value={(defCurrecnyChildMenus || null)}
                        error={errors.base_currency_id}
                        touched={touched.base_currency_id}
                        options={dashboard.allCurrencyCodeList}
                      />
                    </div>

                  </div>

                  <div className="from-group row">
                    <div className="col-12 col-md-4 mt-3">
                      <SearchSelect
                        name="currency_to_convert_id"
                        label={<span> Currency To Convert<span style={{ color: 'red' }}>*</span></span>}
                        isDisabled={isUserForRead && true}
                        onBlur={() => {
                          // handleBlur({ target: { name: "countryId" } });
                        }}
                        onChange={(e) => {
                          setFieldValue("currency_to_convert_id", e.value || null);
                          setDefaultCurrencyToConvertChildMenus(e);
                          // dispatch(fetchAllFormsMenu(e.value));
                        }}
                        value={(defCurrecnyToConvertChildMenus || null)}
                        error={errors.currency_to_convert_id}
                        touched={touched.currency_to_convert_id}
                        options={dashboard.allCurrencyCodeList}
                      />
                    </div>

                  </div>
                  <div className="from-group row">
                    {
                      <div className="col-12 col-md-4 mt-3">
                        <Field
                          name="exchange_rate"
                          component={Input}
                          placeholder="Enter Exchange Rate"
                          label={<span> Exchange Rate<span style={{ color: 'red' }}>*</span></span>}
                          autoComplete="off"
                        />
                      </div>
                    }
                  </div>
                  <div className="from-group row">
                    {
                      <div className="col-12 col-md-4 mt-3">
                        {<span> Effective Date<span style={{ color: 'red' }}>*</span></span>}
                        <DatePicker
                          className="form-control"
                          placeholder="Enter Effective Date"
                          selected={defEffectiveDate}
                          onChange={(date) => {
                            setFieldValue("effective_date", date);
                            setEffectiveDate(date);
                          }}
                          timeInputLabel="Time:"
                          dateFormat="dd/MM/yyyy"
                          showTimeInput
                          name="effective_date"
                          autoComplete="off"
                          disabled={isUserForRead}
                          error={errors.effective_date}
                          touched={touched.effective_date}

                        // value = {values.dateOfJoining}
                        />
                       
                      </div>
                    }


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
