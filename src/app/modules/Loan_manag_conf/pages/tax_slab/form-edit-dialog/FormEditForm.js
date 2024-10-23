import React, { useEffect } from "react";
import { Modal } from "react-bootstrap";
import { Formik, Form, Field, FieldArray } from "formik";
import * as Yup from "yup";
import { Input } from "../../../../../../_metronic/_partials/controls"; // Adjust import as needed
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/redux-Actions";
import { SearchSelect } from "../../../../../../_metronic/_helpers/SearchSelect";
import {
  fetchAllFormsMenu,
  fetchAllHumanResourceRole,
} from "../../../../../../_metronic/redux/dashboardActions";

// Define the validation schema for the main form and the details
const loanManagementSchema = Yup.object().shape({
  subsidiaryId: Yup.number().required("Subsidiary is required"),
  accountId: Yup.number().required("Account is required"),
  human_resource_role: Yup.number().required("Human Resource Role is required"),
  emp_loan_account: Yup.number().required("Employee Loan Account is required"),
  installment_deduction_percentage: Yup.number()
  .min(0, "Must be at least 0") 
  .max(100, "Must be at most 100") 
    .required("Installment Deduction Percentage is required"),
  installment_deduction_basis_type: Yup.number().required(
    "Installment Deduction Basis Type is required"
  ),
  details: Yup.array().of(
    Yup.object().shape({
      loan_typeId: Yup.number().required(" Type is required"),
      max_loan_amount: Yup.number()
      .min(1, "Must be at least 1") 
      .required("Max  Amount is required"),
      basis: Yup.number().required("Basis is required"),
      salary_count: Yup.number()
      .min(1, "Must be at least 1")
      .required("Count is required"),
    })
  ),
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

  // Fetch necessary data if not already present
  useEffect(() => {
    if (!user.Id) {
      dispatch(fetchAllFormsMenu(133, "allSubidiaryList")); // For All Subsidiaries
      dispatch(fetchAllFormsMenu(45, "allAccountList")); // For All Accounts
      dispatch(fetchAllFormsMenu(181, "allLoanTypeList")); // For All Loan Types
      dispatch(fetchAllHumanResourceRole("allHumanResourceRoleList"));
    }
  }, [dispatch, user.Id]);

  // Define options for basis type
  const basisOptions = [
    { value: 0, label: "Gross" },
    { value: 1, label: "Basic" },
  ];

  const { currentState, userAccess } = useSelector((state) => {
    
    return {
      currentState: state.loan_management_configuration,
      userAccess: state?.auth?.userAccess["loan_management_configuration"],
    };
  }, shallowEqual);

  const { entities } = currentState;

  let existedId = 0;
  const check_Existed_Data = (subsidiaryId) => {
    entities.forEach((i) => {
      if (i.subsidiaryId == subsidiaryId) {
        existedId = i.Id;
    
        dispatch(actions.fetchSalarypolicy(existedId));
      } else {
        dispatch(actions.fetchSalarypolicy(0));
      }
    });
  };

  return (
    <Formik
      enableReinitialize={true}
      initialValues={user}
      validationSchema={loanManagementSchema}
      onSubmit={(values) => {
  
        // enableLoading();
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
            <Form className="form form-label-right" onSubmit={handleSubmit}>
              <fieldset disabled={isUserForRead}>
                <div className="form-group row">
                  {/* Subsidiary Field */}
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
                        check_Existed_Data(e.value);
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

                  {/* Account Field */}
                  <div className="col-12 col-md-6 mt-3">
                    <SearchSelect
                      name="accountId"
                      label={
                        <span>
                          Account<span style={{ color: "red" }}>*</span>
                        </span>
                      }
                      isDisabled={isUserForRead}
                      onChange={(e) => {
                        setFieldValue("accountId", e.value || null);
                      }}
                      value={
                        dashboard.allAccountList.find(
                          (option) => option.value === values.accountId
                        ) || null
                      }
                      // options={dashboard.allAccountList}
                      options={dashboard.allAccountList.map((option) => ({
                        label: `${option.mergeLabel}`, // Adding the value to the label
                        value: option.value,
                      }))}
                      error={errors.accountId}
                      touched={touched.accountId}
                    />
                  </div>

                  {/* Human Resource Role Field */}
                  <div className="col-12 col-md-6 mt-3">
                    <SearchSelect
                      name="human_resource_role"
                      label={
                        <span>
                          Human Resource Role
                          <span style={{ color: "red" }}>*</span>
                        </span>
                      }
                      isDisabled={isUserForRead}
                      onChange={(e) => {
                        setFieldValue("human_resource_role", e.value || null);
                      }}
                      value={
                        dashboard.allHumanResourceRoleList.find(
                          (option) =>
                            option.value === values.human_resource_role
                        ) || null
                      }
                      options={dashboard.allHumanResourceRoleList}
                      error={errors.human_resource_role}
                      touched={touched.human_resource_role}
                    />
                  </div>

                  {/* Employee Loan Account Field */}
                  <div className="col-12 col-md-6 mt-3">
                    {/* <Field
                      name="emp_loan_account"
                      component={Input}
                      placeholder="Enter employee loan account"
                      label="Employee Loan Account"
                      type="number"
                      disabled={isUserForRead}
                    /> */}

                    <SearchSelect
                      name="emp_loan_account"
                      label={
                        <span>
                          Employee Loan Account
                          <span style={{ color: "red" }}>*</span>
                        </span>
                      }
                      isDisabled={isUserForRead}
                      onChange={(e) => {
                        setFieldValue("emp_loan_account", e.value || null);
                      }}
                      value={
                        dashboard.allAccountList.find(
                          (option) => option.value === values.emp_loan_account
                        ) || null
                      }
                      // options={dashboard.allAccountList}
                      options={dashboard.allAccountList.map((option) => ({
                        label: `${option.mergeLabel}`, // Adding the value to the label
                        value: option.value,
                      }))}
                      error={errors.accountId}
                      touched={touched.accountId}
                    />
                  </div>

                  {/* Installment Deduction Percentage Field */}
                  <div className="col-12 col-md-6 mt-3">
              
                    <Field
                      name="installment_deduction_percentage"
                      component={Input}
                      placeholder="Enter installment deduction percentage"
                      label="Installment Deduction (%)"
                      type="number"
                      disabled={isUserForRead}
                    />
                    {/* {errors.installment_deduction_percentage && touched.installment_deduction_percentage && (
                      <div className="text-danger">{errors.installment_deduction_percentage}</div>
                    )} */}
                  </div>

                  {/* Installment Deduction Basis Type Field */}
                  <div className="col-12 col-md-6 mt-3">
                    <label htmlFor="installment_deduction_basis_type">
                      Installment Deduction Basis Type
                    </label>
                    {/* <Field
                      name="installment_deduction_basis_type"
                      as="select"
                      label="Installment Deduction Basis Type"
                      className="form-control"
                      disabled={isUserForRead}
                      onChange={(e) => {
                        const value = parseInt(e.target.value, 10);
                        setFieldValue(
                          "installment_deduction_basis_type",
                          value
                        );
                      }}
                    >
                      <option value="">Select Deduction Basis Type</option>
                      {basisOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </Field> */}
                    <Field
                      name="installment_deduction_basis_type"
                      as="select"
                      className="form-control"
                      disabled={isUserForRead}
                      onChange={(e) => {
                        setFieldValue(
                          "installment_deduction_basis_type",
                          e.target.value
                        ); // Use the raw value
                      }}
                    >
                      <option value="">Select Deduction Basis Type</option>
                      {basisOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </Field>

                    {errors.installment_deduction_basis_type &&
                      touched.installment_deduction_basis_type && (
                        <div className="text-danger">
                          {errors.installment_deduction_basis_type}
                        </div>
                      )}
                  </div>
                </div>
              </fieldset>

              <FieldArray name="details">
                {({ push, remove }) => (
                  <div
                    style={{
                      backgroundColor: "rgb(235 243 255)",
                      padding: "20px",
                      borderRadius: "5px",
                      border: "2px solid #adceff",
                      marginTop: "20px",
                    }}
                  >
                    <h6>Details</h6>
                    <table className="table table-head-custom table-vertical-center overflow-hidden table-hover">
                      <thead>
                        <tr
                          style={{ backgroundColor: "#4d5f7a", color: "#fff" }}
                        >
                          <th>Action</th>
                          <th>Loan Type</th>
                          <th>Max Loan Amount</th>
                          <th>Basis</th>
                          <th>Salary Count</th>
                        </tr>
                      </thead>
                      <tbody>
                        {values.details &&
                          values.details.length > 0 &&
                          values.details.map((detail, index) => (
                            <tr key={index}>
                              <td>
                                {!isUserForRead && (
                                  <button
                                    type="button"
                                    onClick={() => remove(index)}
                                    className="btn btn-danger btn-sm"
                                  >
                                    Delete
                                  </button>
                                )}
                              </td>

                              <td>
                                <Field
                                  name={`details[${index}].loan_typeId`}
                                  as="select"
                                  className="form-control"
                                  disabled={isUserForRead}
                                >
                                  {/* <option value="">Select Loan Type</option> */}
                                  {/* {dashboard.allLoanTypeList?.map(
                                    (loanType) => (
                                      <option
                                        key={loanType.value}
                                        value={loanType.value}
                                      >
                                        {loanType.label}
                                      </option>
                                    )
                                  )} */}

                                  {dashboard.allLoanTypeList?.map((x) => {
                                    return (
                                      <option
                                        disabled={
                                          values.details.find(
                                            (el) => el.loan_typeId == x.value
                                          )
                                            ? true
                                            : false
                                        }
                                        value={x.value}
                                      >
                                        {" "}
                                        {x.label}{" "}
                                      </option>
                                    );
                                  })}
                                </Field>
                                {errors.details?.[index]?.loan_typeId &&
                                  touched.details?.[index]?.loan_typeId && (
                                    <div className="text-danger">
                                      {errors.details[index].loan_typeId}
                                    </div>
                                  )}
                              </td>

                              <td>
                                <Field
                                  name={`details[${index}].max_loan_amount`}
                                  type="number"
                                  className="form-control"
                                  disabled={isUserForRead}
                                />
                                {errors.details?.[index]?.max_loan_amount &&
                                  touched.details?.[index]?.max_loan_amount && (
                                    <div className="text-danger">
                                      {errors.details[index].max_loan_amount}
                                    </div>
                                  )}
                              </td>

                              <td>
                                <Field
                                  name={`details[${index}].basis`}
                                  as="select"
                                  className="form-control"
                                  disabled={isUserForRead}
                                >
                                  <option value="">Select Basis</option>
                                  {basisOptions.map((option) => (
                                    <option
                                      key={option.value}
                                      value={option.value}
                                    >
                                      {option.label}
                                    </option>
                                  ))}
                                </Field>
                                {errors.details?.[index]?.basis &&
                                  touched.details?.[index]?.basis && (
                                    <div className="text-danger">
                                      {errors.details[index].basis}
                                    </div>
                                  )}
                              </td>

                              <td>
                                <Field
                                  name={`details[${index}].salary_count`}
                                  type="number"
                                  className="form-control"
                                  disabled={isUserForRead}
                                />
                                {errors.details?.[index]?.salary_count &&
                                  touched.details?.[index]?.salary_count && (
                                    <div className="text-danger">
                                      {errors.details[index].salary_count}
                                    </div>
                                  )}
                              </td>
                            </tr>
                          ))}
                      </tbody>
                    </table>

                    {!isUserForRead && (
                      <button
                        type="button"
                        onClick={() =>
                          push({
                            loan_typeId: "",
                            max_loan_amount: "",
                            basis: "",
                            salary_count: "",
                          })
                        }
                        className="btn btn-primary btn-sm"
                      >
                        + Add Detail
                      </button>
                    )}
                  </div>
                )}
              </FieldArray>
            </Form>
          </Modal.Body>

          <Modal.Footer>
            {/* Cancel / Ok Button */}
            {!isUserForRead ? (
              <button
                type="button"
                onClick={onHide}
                // onClick={() => clear_Existed_Data()}

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

            {/* Save Button */}
            {!isUserForRead && (
              <button
                type="submit"
                onClick={() => handleSubmit()}
                className="btn btn-primary btn-elevate"
                disabled={loading}
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
