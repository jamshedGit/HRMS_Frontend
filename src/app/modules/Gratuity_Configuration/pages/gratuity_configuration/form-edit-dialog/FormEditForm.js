import React, { useEffect } from "react";
import { Modal } from "react-bootstrap";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { Input } from "../../../../../../_metronic/_partials/controls"; // Adjust import as needed
import { useDispatch, useSelector } from "react-redux";
import { SearchSelect } from "../../../../../../_metronic/_helpers/SearchSelect";
import {
  fetchAllFormsMenu,
  fetchAllHumanResourceRole,
} from "../../../../../../_metronic/redux/dashboardActions";

// percentage: Yup.string().required("Required*"),
const gratuity_configurationEditSchema = Yup.object().shape({
  // from_amount: Yup.string().required("Required*"),

  subsidiaryId: Yup.number()
    .required("Required*"),

  // to_amount: Yup.string().required("Required*"),

  contract_typeId: Yup.number()
    .required("Required*"),

    basis_of_gratuityId: Yup.number()
    .required("Required*"),

  // fixed_amount: Yup.string().required("Required*"),

  num_of_days: Yup.number()
    .min(1, "Must be at least 1")
    .max(100, "Must be at most 100")
    .required("Required*"),


    gratuity_fraction: Yup.number()
    .required("Required*"),

    min_year: Yup.number()
    .min(0, "Must be at least 0")
    .required("Required*"),

    max_year: Yup.number()
    .min(1, "Must be at least 0")
    .required("Required*"),
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
      dispatch(fetchAllFormsMenu(133, "allSubidiaryList")); // For All Subsidiaries
      dispatch(fetchAllFormsMenu(184, "allContractTypeList")); 

    }
  }, [dispatch, user.Id]);

  const basisOptions = [
    { value: 0, label: "Gross" },
    { value: 1, label: "Basic" },
  ];


  
  const gratuityFractionOptions = [
    { value: 0, label: "1/3" },
    { value: 1, label: "2/3" },
    { value: 2, label: "3/3" },
  ];


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
      validationSchema={gratuity_configurationEditSchema}
      onSubmit={(values) => {
  
        enableLoading();
        saveForm(values);
      }}
    >
      {({ handleSubmit, errors, touched, values, setFieldValue }) => (
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
                        dashboard.allSubidiaryList.find(
                          (option) => option.value === values.subsidiaryId
                        ) || null
                      }
                      options={dashboard.allSubidiaryList}
                      // options={dashboard.allSubidiaryList.map(option => ({
                      //   label: `${option.label} (${option.value})`, // Adding the value to the label
                      //   value: option.value,
                      // }))}
                      error={errors.subsidiaryId}
                      touched={touched.subsidiaryId}
                    />
                  </div>

                  <div className="col-12 col-md-6 mt-3">
                    <SearchSelect
                      name="contract_typeId"
                      label={
                        <span>
                          Contract Type<span style={{ color: "red" }}>*</span>
                        </span>
                      }
                      isDisabled={isUserForRead}
                      onChange={(e) => {
                        setFieldValue("contract_typeId", e.value || null);
                      }}
                      value={
                        dashboard.allContractTypeList.find(
                          (option) => option.value === values.contract_typeId
                        ) || null
                      }
                      options={dashboard.allContractTypeList}
                      error={errors.contract_typeId}
                      touched={touched.contract_typeId}
                    />
                  </div>

                  <div className="col-12 col-md-6 mt-3">
                  <label htmlFor="basis_of_gratuityId">
                  Basis of Gratuity
                    </label>
                    <Field
                      name="basis_of_gratuityId"
                      as="select"
                      className="form-control"
                      disabled={isUserForRead}
                      onChange={(e) => {
                        setFieldValue("basis_of_gratuityId", e.target.value); // Use the raw value
                      }}
                    >
                      <option value="">Select Deduction Basis Type</option>
                      {basisOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </Field>
                  </div>
                  <div className="col-12 col-md-6 mt-3">
                    <Field
                      name="num_of_days"
                      component={Input}
                      placeholder="Enter Number of Days"
                      label="Number of Days"
                      type="number"
                      min={0}
                    />
                  </div>


                  <div className="col-12 col-md-6 mt-3">
                    <Field
                      name="min_year"
                      component={Input}
                      placeholder="Enter Minimum Year"
                      label="Minimum Year"
                      type="number"
                      min={0}
                    />
                  </div>

                  <div className="col-12 col-md-6 mt-3">
                    <Field
                      name="max_year"
                      component={Input}
                      placeholder="Enter Maximum Year"
                      label="Maximum Year"
                      type="number"
                      min={0}
                    />
                  </div>

                  <div className="col-12 col-md-6 mt-3">
                  <label htmlFor="basis_of_gratuityId">
                  Gratuity Fraction
                    </label>
                    <Field
                      name="gratuity_fraction"
                      as="select"
                      className="form-control"
                      disabled={isUserForRead}
                      onChange={(e) => {
                        setFieldValue("gratuity_fraction", e.target.value); // Use the raw value
                      }}
                    >
                      <option value="">Select Gratuity Fraction</option>
                      {gratuityFractionOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </Field>
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

            {/* <button
                type="submit"
                onClick={() => handleSubmit()}
                className="btn btn-primary btn-elevate"
              >
                Save
                {loading && (
                  <span className="ml-3 mr-3 spinner spinner-white"></span>
                )}
              </button> */}

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
