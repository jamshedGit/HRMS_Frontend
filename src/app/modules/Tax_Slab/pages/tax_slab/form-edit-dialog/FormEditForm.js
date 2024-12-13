import React, { useEffect } from "react";
import { Modal } from "react-bootstrap";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { Input } from "../../../../../../_metronic/_partials/controls"; // Adjust import as needed
import { useDispatch, useSelector } from "react-redux";
import { amountLimit, formatNumberWithCommas } from "../../../../../utils/common"
import { VALIDATION_MESSAGES } from "../../../../../utils/constants";
import { fetchAllSubsidiaryData } from "../../../../../../_metronic/redux/dashboardActions";
import { SearchSelect } from "../../../../../../_metronic/_helpers/SearchSelect";
import * as actions from "../../../_redux/redux-Actions";
// percentage: Yup.string().required("Required*"),
const tax_slabEditSchema = Yup.object().shape({
  // from_amount: Yup.string().required("Required*"),

  from_amount: Yup.number()
    .min(0, VALIDATION_MESSAGES.minZeroValue)
    .required(VALIDATION_MESSAGES.required),

  // to_amount: Yup.string().required("Required*"),

  to_amount: Yup.number()
    .min(0, VALIDATION_MESSAGES.minZeroValue)
    .required(VALIDATION_MESSAGES.required),

  // percentage: Yup.number() 
  //   .min(0,VALIDATION_MESSAGES.minZeroValue) 
  //   .max(100,VALIDATION_MESSAGES.maxHundredValue) 

  //   .required(VALIDATION_MESSAGES.required),

  percentage: Yup.number().min(0, VALIDATION_MESSAGES.minZeroValue).max(100, VALIDATION_MESSAGES.maxHundredValue).test(
    'max-decimals',
    VALIDATION_MESSAGES.minZeroValue,
    (value) => /^\d{1,4}(\.\d{1,2})?$/.test(value?.toString())
  ).required(VALIDATION_MESSAGES.required),

  // fixed_amount: Yup.string().required("Required*"),

  fixed_amount: Yup.number()
    .min(0, VALIDATION_MESSAGES.minZeroValue)
    .required(VALIDATION_MESSAGES.required),
});


export function FormEditForm({
  saveForm,
  user,
  actionsLoading,
  onHide,
  isUserForRead,
  enableLoading,
  loading,
}) {

  const dispatch = useDispatch();
  const { dashboard } = useSelector((state) => state);

  useEffect(() => {
    if (!user.Id) {
      dispatch(fetchAllSubsidiaryData("allSubsidiaryList"))
      dispatch(actions.fetchgetAllTaxYearSetup());

    }
  }, [dispatch, user.Id]);


    const { currentState, userAccess } = useSelector(
      (state) => { return {
        
        currentState: state.tax_slab,
        userAccess: state?.auth?.userAccess["tax_slab"],
      }},
   
    );
  
    
    const { taxYearSetup,  } = currentState;
console.log("fetchgetAllTaxYearSetup111",taxYearSetup)

  return (
    <Formik
      enableReinitialize={true}
      // initialValues={{
      //   Id:user.Id || '',
      //   type: user.type ||  '',
      //   value:user.value || 0,
      //   multiplier: user.multiplier || 0,
      //   divisor: user.divisor || 0,
      // }}

      initialValues={user}
      validationSchema={tax_slabEditSchema}
      onSubmit={(values) => {

        enableLoading();
        saveForm(values,taxYearSetup);
      }}
    >
      {({ handleSubmit,errors,touched, values, setFieldValue }) => (
        <>
          <Modal.Body className="overlay overlay-block cursor-default">
            {actionsLoading && (
              <div className="overlay-layer bg-transparent">
                <div className="spinner spinner-lg spinner-success" />
              </div>
            )}
            <Form className="form form-label-right">
              <fieldset disabled={isUserForRead}>
                <div className="form-group row">

                  <div className="col-12 col-md-6 mt-3">
                    <SearchSelect
                      name="subsidiaryId"
                      label={
                        <span>
                          Subsidiary<span style={{ color: "red" }}>*</span>
                        </span>
                      }
                      isDisabled={isUserForRead}
                      onChange={(e) => {
                        setFieldValue("subsidiaryId", e.value || null);
                    
                      }}
                      value={
                        dashboard?.allSubsidiaryList?.find(
                          (option) => option?.value === values?.subsidiaryId
                        ) || null
                      }
                      options={dashboard?.allSubsidiaryList}
                      // options={dashboard.allAccountList.map((option) => ({
                      //   label: `${option.mergeLabel}`, // Adding the value to the label
                      //   value: option.value,
                      // }))}


                      error={errors.subsidiaryId}
                      touched={touched.subsidiaryId}
                    />
                  </div>

                  {/* <div className="col-12 col-md-6 mt-3">
                    <SearchSelect
                      name="taxSetupId"
                      label={
                        <span>
                          Tax Year Setup<span style={{ color: "red" }}>*</span>
                        </span>
                      }
                      isDisabled={isUserForRead}
                      onChange={(e) => {
                        setFieldValue("taxSetupId", e.value || null);
                    
                      }}
                      value={
                        taxYearSetup?.find(
                          (option) => option?.subsidiaryId === values?.subsidiaryId
                        ) || null
                      }
                      options={taxYearSetup}
                      // options={dashboard.allAccountList.map((option) => ({
                      //   label: `${option.mergeLabel}`, // Adding the value to the label
                      //   value: option.value,
                      // }))}


                      error={errors.taxSetupId}
                      touched={touched.taxSetupId}
                    />
                  </div> */}


                  <div className="col-12 col-md-4 mt-3">
                    <label>
                      From Amount{" "}
                      <span style={{ color: "red" }}>*</span>
                    </label>
                    <Field
                      name="from_amount"
                      component={Input}
                      placeholder="Enter From Amount"
                      // label="From Amount"
                      type="number"
                      // min={0}
                      onInput={(e) => {
                        e.target.value = amountLimit(e.target.value); // Limit to 3 digits
                      }}
                    />
                  </div>

                  <div className="col-12 col-md-4 mt-3">
                    <label>
                      To Amount{" "}
                      <span style={{ color: "red" }}>*</span>
                    </label>
                    <Field
                      name="to_amount"
                      component={Input}
                      placeholder="Enter To Amount"
                      // label="To Amount"
                      type="number"
                      min={0}
                      onInput={(e) => {
                        e.target.value = amountLimit(e.target.value); // Limit to 3 digits
                      }}
                    />
                  </div>

                  <div className="col-12 col-md-4 mt-3">
                    <label>
                      Percentage{" "}
                      <span style={{ color: "red" }}>*</span>
                    </label>
                    <Field
                      name="percentage"
                      component={Input}
                      placeholder="Enter Percentage"
                      // label="Percentage"
                      type="number"


                      onChange={(e) => {
                        if (Number(e.target.value) <= 100) {
                          // e.target.value = e.target.value.slice(0,5);
                          if (/^\d{0,3}(\.\d{1,2})?$/.test(e.target.value?.toString())) {
                            setFieldValue("percentage", e.target.value)

                          }
                        }
                      }}

                    // onInput={(e) => {
                    //   const inputValue = e.target.value;

                    //   // Allow the decimal point and check the format
                    //   const regex = /^(?:100(?:\.0(?:0)?)?|\d{1,2}(?:\.\d{1,2})?)$/;

                    //   // If the input matches the regex, accept it
                    //   if (regex.test(inputValue)) {
                    //     e.target.value = inputValue;
                    //   } else {
                    //     // If it doesn't match, find the last valid input
                    //     const lastValidMatch = inputValue.match(/^(?:100(?:\.0(?:0)?)?|\d{1,2}(?:\.\d{1,2})?)$/);
                    //     e.target.value = lastValidMatch ? lastValidMatch[0] : '';
                    //   }
                    // }}





                    />
                  </div>
                  <div className="col-12 col-md-4 mt-3">
                    <label>
                      Fixed Amount{" "}
                      <span style={{ color: "red" }}>*</span>
                    </label>
                    <Field
                      name="fixed_amount"
                      component={Input}
                      placeholder="Enter Fixed Amount"
                      // label="Fixed Amount"
                      type="number"
                      min={0}
                      onInput={(e) => {
                        e.target.value = amountLimit(e.target.value); // Limit to 3 digits
                      }}
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
  );
}
