import React, { useEffect, useRef, useState } from "react";
import { Modal } from "react-bootstrap";
import { Formik, Form, Field, FieldArray } from "formik";
import * as Yup from "yup";
import { format } from "date-fns";
import {
  DatePickerField,
  Input,
  Select,
  TextArea,
} from "../../../../../../_metronic/_partials/controls";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/redux-Actions";
import { SearchSelect } from "../../../../../../_metronic/_helpers/SearchSelect";
import {
  amountLimit,
  formatDates,
  getDateDiffInDays,
  getFileName,
  getUploadUrl,
} from "../../../../../utils/common";
import {
  fetchAllFormsMenu,
  fetchAllPayrollMonthYearList,
} from "../../../../../../_metronic/redux/dashboardActions";
import { VALIDATION_MESSAGES } from "../../../../../utils/constants";



const ReimbursementSchema = Yup.object().shape({
  reimbursement_typeId: Yup.number().required(VALIDATION_MESSAGES.required),
  details: Yup.string().required(VALIDATION_MESSAGES.required),
  date: Yup.date().required(VALIDATION_MESSAGES.required),
  amount: Yup.number()
    .min(1, VALIDATION_MESSAGES.minOneValue)
    .required(VALIDATION_MESSAGES.required),

  // file: Yup.mixed()
  //   .required("Required")
  //   .test(
  //     "fileSize",
  //     "File is too large (max 5MB)",
  //     (value) => !value || (value && value.size <= 5 * 1024 * 1024) // 5 MB limit
  //   )
  //   .required("Required"),
  pay_in_payroll_forId: Yup.number().required(VALIDATION_MESSAGES.required),
});

export function IncidentInfoEditForm({
  saveForm,
  user,
  actionsLoading,
  onHide,
  isUserForRead,
  enableLoading,
  loading,
  setIds,
  isEdit,

}) {
  const dispatch = useDispatch();
  const { dashboard } = useSelector((state) => state);
  const inputFile = useRef(null);
  // const [isFileReq,setIsFileReq]=useState(false)
  // Fetch necessary data if not already present
  useEffect(() => {
    if (!user.Id) {
      dispatch(fetchAllFormsMenu(202, "allReimbursementTypeList"));
      dispatch(fetchAllPayrollMonthYearList("allPayrollMonthYearList"));
    }
    //allPayrolGroupList
  }, [dispatch, user.Id]);

  const { currentState, userAccess } = useSelector((state) => {
    return {
      currentState: state.employee_profile,
      userAccess: state?.auth?.userAccess["employee_profile"],
    };
  }, shallowEqual);



  return (
    <Formik
      // key={user.Id || "new"}
      enableReinitialize={true}
      initialValues={user}
      validationSchema={ReimbursementSchema}
      onSubmit={(values, { resetForm }) => {
        enableLoading();


        // const  finalAmountLimit = calculateRemainingAmount(
        //   values?.reimbursement_typeId,
        //   values?.pay_in_payroll_forId,
        //   currentState?.reimbursement_config_policies_permission?.policies
        // );
        const clearForm = () => {
          resetForm();
          if (inputFile?.current) {
            inputFile.current.value = "";
          }
        };
        saveForm(values, clearForm);
      }}
    >
      {({
        handleSubmit,
        errors,
        touched,
        values,
        setFieldValue,
        handleReset,
      }) => (
        <>
          <Modal.Body className="overlay overlay-block cursor-default">
            {actionsLoading && (
              <div className="overlay-layer bg-transparent">
                <div className="spinner spinner-lg spinner-success" />
              </div>
            )}
            <Form className="form form-label-right" onSubmit={handleSubmit}>
             

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
                        <tr className="bg-primary" style={{ color: "#fff" }}>
                          <th>Action</th>
                          <th>Incident</th>
                          <th>Action Taken</th>
                          <th>Basis</th>
                          <th>Salary Count</th>
                        </tr>
                      </thead>
                      <tbody>
                        {values?.details &&
                          values?.details.length > 0 &&
                          values?.details.map((detail, index) => (
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

                                  {/* {loan_type?.map((x) => {
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
                                  })} */}
                                </Field>
                                {errors?.details?.[index]?.loan_typeId &&
                                  touched?.details?.[index]?.loan_typeId && (
                                    <div className="text-danger">
                                      {errors?.details[index]?.loan_typeId}
                                    </div>
                                  )}
                              </td>

                              <td>
                                <Field
                                  name={`details[${index}]?.max_loan_amount`}
                                  type="number"
                                  className="form-control"
                                  disabled={isUserForRead}
                                  onInput={(e) => {
                                    e.target.value = amountLimit(e.target.value); // Limit to 3 digits
                                  }}
                                />
                                {errors?.details?.[index]?.max_loan_amount &&
                                  touched?.details?.[index]?.max_loan_amount && (
                                    <div className="text-danger">
                                      {errors?.details[index]?.max_loan_amount}
                                    </div>
                                  )}
                              </td>

                              <td>
                                <Field
                                  name={`details[${index}]?.basis`}
                                  as="select"
                                  className="form-control"
                                  disabled={isUserForRead}
                                >
                                  <option value="">Select</option>
                                  {/* {basisOptions?.map((option) => (
                                    <option
                                      key={option?.value}
                                      value={option?.value}
                                    >
                                      {option.label}
                                    </option>
                                  ))} */}
                                </Field>
                                {errors?.details?.[index]?.basis &&
                                  touched?.details?.[index]?.basis && (
                                    <div className="text-danger">
                                      {errors.details[index].basis}
                                    </div>
                                  )}
                              </td>

                              <td>
                                <Field
                                  name={`details[${index}]?.salary_count`}
                                  type="number"
                                  className="form-control"
                                  disabled={isUserForRead}
                                  onInput={(e) => {
                                    if (e.target.value.length > 2) {
                                      e.target.value = e.target.value.slice(0, 2); // Restrict to 2 digits
                                    }
                                  }}
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
                type="reset"
                onClick={() => {
                  setIds("");
                  handleReset();

                  if (inputFile?.current) {
                    inputFile.current.value = "";
                  }
                }}
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
                // onClick={() => handleSubmit()}
                onClick={() => {
                  handleSubmit();
                }}
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
