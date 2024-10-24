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

// Define the validation schema for the main form and the policies
const loanManagementSchema = Yup.object().shape({
  subsidiaryId: Yup.number().required("Subsidiary is required"),
  payroll_groupId: Yup.number().required("Account is required"),
  cycle_typeId: Yup.number().required("Human Resource Role is required"),
  cycle_typeId: Yup.number().required(
    "Installment Deduction Basis Type is required"
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
  const options = ["Option 1", "Option 2", "Option 3", "Option 4"];
  const basisOptions = [
    { value: 0, label: "Yes" },
    { value: 1, label: "No" },
  ];

  // Fetch necessary data if not already present
  useEffect(() => {
    if (!user.Id) {
      dispatch(fetchAllFormsMenu(133, "allSubidiaryList")); // For All Subsidiaries
      dispatch(fetchAllFormsMenu(127, "allPayrolGroupList")); // For All Accounts
      dispatch(fetchAllFormsMenu(191, "allCycleTypeList"));
      dispatch(fetchAllFormsMenu(194, "allReimbursementTypeList"));
      dispatch(fetchAllFormsMenu(143, "allEmployeeGradeList"));

      // reimbursement_typeId
    }
    //allPayrolGroupList
  }, [dispatch, user.Id]);
  console.log("dashboard.allEmployeeGradeList", dashboard.allEmployeeGradeList);
  const { currentState, userAccess } = useSelector((state) => {
    console.log("state for clear data", state);
    return {
      currentState: state.reimbursement_configuration,
      userAccess: state?.auth?.userAccess["reimbursement_configuration"],
    };
  }, shallowEqual);

  const { entities } = currentState;

  let existedId = 0;
  const check_Existed_Data = (subsidiaryId) => {
    entities.forEach((i) => {
      if (i.subsidiaryId == subsidiaryId) {
        existedId = i.Id;
        console.log("update api hit");
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
        console.log("Form Values: updated", values);
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
                      error={errors.subsidiaryId}
                      touched={touched.subsidiaryId}
                    />
                  </div>

                  {/* Account Field */}
                  <div className="col-12 col-md-6 mt-3">
                    <SearchSelect
                      name="payroll_groupId"
                      label={
                        <span>
                          Payroll Group<span style={{ color: "red" }}>*</span>
                        </span>
                      }
                      isDisabled={isUserForRead}
                      onChange={(e) => {
                        setFieldValue("payroll_groupId", e.value || null);
                      }}
                      value={
                        dashboard.allPayrolGroupList.find(
                          (option) => option.value === values.payroll_groupId
                        ) || null
                      }
                      // options={dashboard.allAccountList}
                      options={dashboard.allPayrolGroupList.map((option) => ({
                        label: `${option.mergeLabel}`, // Adding the value to the label
                        value: option.value,
                      }))}
                      error={errors.payroll_groupId}
                      touched={touched.payroll_groupId}
                    />
                  </div>

                  {/* Employee Loan Account Field */}
                  <div className="col-12 col-md-6 mt-3">
                    <SearchSelect
                      name="cycle_typeId"
                      label={
                        <span>
                          Cycle Type
                          <span style={{ color: "red" }}>*</span>
                        </span>
                      }
                      isDisabled={isUserForRead}
                      onChange={(e) => {
                        setFieldValue("cycle_typeId", e.value || null);
                      }}
                      value={
                        dashboard.allCycleTypeList.find(
                          (option) => option.value === values.cycle_typeId
                        ) || null
                      }
                      // options={dashboard.allAccountList}
                      options={dashboard.allCycleTypeList.map((option) => ({
                        label: `${option.mergeLabel}`, // Adding the value to the label
                        value: option.value,
                      }))}
                      error={errors.cycle_typeId}
                      touched={touched.cycle_typeId}
                    />
                  </div>
                </div>
              </fieldset>

              <FieldArray name="policies">
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
                    <h6>Reimbursement Policies</h6>
                    <table className="table table-head-custom table-vertical-center overflow-hidden table-hover">
                      <thead>
                        <tr
                          style={{ backgroundColor: "#4d5f7a", color: "#fff" }}
                        >
                          <th>Action</th>
                          <th>Reimbursement Type</th>
                          <th>Max Amount Allowed</th>
                          <th>Attachment Required</th>
                          <th>Salary Grade</th>
                        </tr>
                      </thead>
                      <tbody>
                        {values.policies &&
                          values.policies.length > 0 &&
                          values.policies.map((detail, index) => (
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
                                  name={`detail[${index}].reimbursement_typeId`}
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

                                  {dashboard.allReimbursementTypeList?.map(
                                    (x) => {
                                      return (
                                        <option
                                          disabled={
                                            values.policies.find(
                                              (el) =>
                                                el.reimbursement_typeId ==
                                                x.value
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
                                    }
                                  )}
                                </Field>
                                {errors.policies?.[index]
                                  ?.reimbursement_typeId &&
                                  touched.policies?.[index]
                                    ?.reimbursement_typeId && (
                                    <div className="text-danger">
                                      {
                                        errors.policies[index]
                                          .reimbursement_typeId
                                      }
                                    </div>
                                  )}
                              </td>

                              <td>
                                <Field
                                  name={`policies[${index}].max_loan_amount`}
                                  type="number"
                                  className="form-control"
                                  disabled={isUserForRead}
                                />
                                {errors.policies?.[index]?.max_amount &&
                                  touched.policies?.[index]?.max_amount && (
                                    <div className="text-danger">
                                      {errors.policies[index].max_amount}
                                    </div>
                                  )}
                              </td>

                              {/* <td>
                                <Field
                                  name={`policies[${index}].attachment_required`}
                                  type="number"
                                  className="form-control"
                                  disabled={isUserForRead}
                                />
                                {errors.policies?.[index]
                                  ?.attachment_required &&
                                  touched.policies?.[index]
                                    ?.attachment_required && (
                                    <div className="text-danger">
                                      {
                                        errors.policies[index]
                                          .attachment_required
                                      }
                                    </div>
                                  )}
                              </td> */}

                              <td>
                                <div className="">
                                  <Field
                                    name="attachment_required"
                                    as="select"
                                    className="form-control"
                                    disabled={isUserForRead}
                                    onChange={(e) => {
                                      setFieldValue(
                                        "attachment_required",
                                        e.target.value
                                      ); // Use the raw value
                                    }}
                                  >
                                    <option value="">Select</option>
                                    {basisOptions.map((option) => (
                                      <option
                                        key={option.value}
                                        value={option.value}
                                      >
                                        {option.label}
                                      </option>
                                    ))}
                                  </Field>

                                  {errors.attachment_required &&
                                    touched.attachment_required && (
                                      <div className="text-danger">
                                        {errors.attachment_required}
                                      </div>
                                    )}
                                </div>
                              </td>

                              {/* <td
                                className="bg-white"
                                style={{
                                  backgroundColor: "#ffffff",
                                  padding: "10px",
                                }}
                              >
                                <div
                                  style={{
                                    maxHeight: "200px", 
                                    overflowY: "auto", 
                                    overflowX: "hidden", 
                                  }}
                                  className="bg-white m-2"
                                >
                                  {dashboard.allEmployeeGradeList.map(
                                    (option, i) => (
                                      <div key={i} className="bg-white p-2">
                                      
                                          <input 
                                            type="checkbox"
                                         
                                            className="form-check-input"
                                          />
                                          {option.label}
                                        
                                      </div>
                                    )
                                  )}
                                </div>
                              </td> */}

<td
  className="bg-white"
  style={{
    backgroundColor: "#ffffff",
    padding: "10px",
  }}
>
  <div
    style={{
      maxHeight: "200px", // Set maxHeight for scrolling
      overflowY: "auto", // Enable vertical scrolling
      overflowX: "hidden", // Hide horizontal scrolling
    }}
    className="bg-white m-2"
  >
    {dashboard.allEmployeeGradeList.map((option, i) => (
      <div key={i} className="bg-white p-2" style={{ display: "flex", alignItems: "center" }}>
        <input className="mr-2"
          type="checkbox"
      
        />
        <label className="form-check-label ms-2">
          {option.label}
        </label>
      </div>
    ))}
  </div>
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
                            reimbursement_typeId: "",
                            max_amount: "",
                            attachment_required: "",
                            grades: "",
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
