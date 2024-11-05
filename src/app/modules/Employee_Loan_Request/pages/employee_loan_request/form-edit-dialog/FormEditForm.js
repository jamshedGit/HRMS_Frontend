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
  formatDates,
  getDateDiffInDays,
  getFileName,
  getUploadUrl,
} from "../../../../../utils/common";
import {
  fetchAllFormsMenu,
  fetchAllPayrollMonthYearList,
} from "../../../../../../_metronic/redux/dashboardActions";

const ReimbursementSchema = Yup.object().shape({
  // reimbursement_typeId: Yup.number().required("Required"),
  // details: Yup.string().required("Required"),
  // date: Yup.date().required("Required"),
  // amount: Yup.number().required("Required"),
});

export function FormEditForm({
  saveForm,
  user,
  actionsLoading,
  onHide,
  isUserForRead,
  enableLoading,
  loading,
  setIds,
  isEdit,
  isFileReq,
  setIsFileReq,
}) {
  const dispatch = useDispatch();
  const { dashboard } = useSelector((state) => state);
  const inputFile = useRef(null);
  // const [isFileReq,setIsFileReq]=useState(false)
  // Fetch necessary data if not already present
  useEffect(() => {
    if (!user.Id) {
      dispatch(fetchAllFormsMenu(133, "allSubidiaryList")); // For All Subsidiaries
      dispatch(fetchAllFormsMenu(202, "allReimbursementTypeList"));
      dispatch(fetchAllPayrollMonthYearList("allPayrollMonthYearList"));
      dispatch(actions.getAllLoanType());
    }
    //allPayrolGroupList
  }, [dispatch, user.Id]);
  const [changeLoanType, setChangeLoanTpye] = useState();
  const [maxAmountLimit, setMaxAmountLimit] = useState();
  const [monthlyInstallment, setMonthlyInstallments] = useState();
  const [totalInstallments, setTotalInstallments] = useState();
  const [totalLoanAmount, setTotalLoanAmount] = useState();
  const { currentState, userAccess } = useSelector((state) => {
    return {
      currentState: state.employee_loan_request,
      userAccess: state?.auth?.userAccess["employee_loan_request"],
    };
  }, shallowEqual);

  const { loan_type } = currentState;
  console.log(
    "currentState?.loan_config_details_permission?.loanDetails?.details",
    currentState?.loan_config_details_permission
  );

  useEffect(() => {
    let loandetails = currentState?.loan_config_details_permission?.loanDetails?.details?.find(
      (item) => item.loan_typeId === changeLoanType
    );
    let employee = currentState?.loan_config_details_permission?.employee;
    let salary = currentState?.loan_config_details_permission?.salary;

    let salaryAmount =
      loandetails?.basis == 0
        ? salary?.gross * loandetails?.salary_count
        : salary?.basic * loandetails?.salary_count;

    setMaxAmountLimit(Math.min(loandetails?.max_loan_amount, salaryAmount));
  }, [changeLoanType]);

  useEffect(() => {
    if (totalLoanAmount && monthlyInstallment) {
      const calculatedMonths = Math.ceil(totalLoanAmount / monthlyInstallment);
      setTotalInstallments(calculatedMonths);
      // setFieldValue('total_installment', calculatedMonths);
    }
  }, [totalLoanAmount, monthlyInstallment]);

  const filteredOptions = loan_type?.filter((option) =>
    currentState?.loan_config_details_permission?.loanDetails?.details?.some(
      (item) => item.loan_typeId === option.value
    )
  );

  return (
    <Formik
      // key={user.Id || "new"}
      enableReinitialize={true}
      initialValues={user}
      validationSchema={ReimbursementSchema}
      onSubmit={(values, { resetForm }) => {
        enableLoading();
        //This clearForm function is created to clear form as well as clear any uploaded file as well.
        //resetForm function doesn't clear file properly so we use this function
        const clearForm = () => {
          resetForm();
          if (inputFile?.current) {
            inputFile.current.value = "";
          }
        };
        saveForm(values,totalInstallments,setTotalInstallments, clearForm);
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
              <fieldset disabled={isUserForRead}>
                <div className="form-group row">
                  <div className="col-12 col-md-12  p-0 m-0">
                    <div className="col-12 col-md-6 ">
                      <SearchSelect
                        name="loan_typeId"
                        label={
                          <span>
                            Loan Type
                            <span style={{ color: "red" }}>*</span>
                          </span>
                        }
                        isDisabled={isEdit}
                        onChange={(e) => {
                          setFieldValue("loan_typeId", e.value || null);
                          setChangeLoanTpye(e.value);
                          // const policy = currentState?.reimbursement_config_policies_permission?.policies?.find(
                          //   (item) => item.reimbursement_typeId == e.value
                          // );
                          // setIsFileReq(
                          //   policy?.attachment_required && !values.file
                          // );
                        }}
                        value={
                          loan_type?.find(
                            (option) => option.value === values.loan_typeId
                          ) || null
                        }
                        options={filteredOptions}
                        error={errors.loan_typeId}
                        touched={touched.loan_typeId}
                      />
                    </div>
                  </div>
                  <div className="col-12 col-md-6 mt-3">
                    <label>
                      Applied Date <span style={{ color: "red" }}>*</span>
                    </label>
                    <Field
                      name="applied_date"
                      component={DatePickerField}
                      dateFormat="dd/MM/yyyy"
                      placeholder="Select Date"
                      // label="Date"
                      type="date"
                    />
                  </div>

                  <div className="col-12 col-md-6 mt-3">
                    <label>
                      Installment Start Date{" "}
                      <span style={{ color: "red" }}>*</span>
                    </label>
                    <Field
                      name="installment_start_date"
                      component={DatePickerField}
                      dateFormat="dd/MM/yyyy"
                      placeholder="Select Date"
                      // label="Date"
                      type="date"
                    />
                  </div>

                  <div className="col-12 col-md-6 mt-3">
                    <Field
                      name="total_loan_amount"
                      component={Input}
                      placeholder="Enter total loan amount"
                      label={
                        <span>
                          Amount Limit: $
                          {/* {currentState?.loan_config_details_permission
                              ?.salary?.gross *
                              currentState?.loan_config_details_permission?.loanDetails?.details?.find(
                                (item) =>
                                  item.loan_typeId === values.loan_typeId
                              )?.salary_count || 0}{" "} */}
                          {maxAmountLimit}
                          <span style={{ color: "red" }}>*</span>
                        </span>
                      }
                      type="number"
                      onChange={(e) => {
                        const value = Number(e.target.value);

                        if (
                          maxAmountLimit !== undefined &&
                          value > maxAmountLimit
                        ) {
                          return; // Prevent setting value above max
                        }

                        setFieldValue("total_loan_amount", value);
                        setTotalLoanAmount(value)
                      }}
                    />
                  </div>

                  

                  <div className="col-12 col-md-6 mt-3">
                    <Field
                      name="monthly_installment"
                      component={Input}
                      placeholder="Enter monthly installment"
                      label={
                        <span>
                          Monthly Installment
                          <span style={{ color: "red" }}>*</span>
                        </span>
                      }
                      type="number"
                      onChange={(e) => {
                        const value = Number(e.target.value);

                        if (
                          maxAmountLimit !== undefined &&
                          value > maxAmountLimit
                        ) {
                          return; // Prevent setting value above max
                        }

                        setFieldValue("monthly_installment", value);
                        setMonthlyInstallments(value)

                      


                        
                      }}
                    />
                  </div>

                  <div className="col-12 col-md-6 mt-3">
                    <Field
                      name="total_installment"
                      component={Input}
                      placeholder="Total installments"
                      label={
                        <span>
                          Total installments
                          <span style={{ color: "red" }}>*</span>
                        </span>
                      }
                      type="number"
                      value={totalInstallments}

          

              
                      disabled={true}
                    />
                  </div>

                  <div className="col-12 col-md-6 mt-3">
                    <Field
                      name="reason"
                      component={TextArea}
                      placeholder="Enter eason"
                      label={
                        <span>
                          Reason <span style={{ color: "red" }}>*</span>
                        </span>
                      }
                      type="text"
                    />
                  </div>
                </div>
              </fieldset>
            </Form>
          </Modal.Body>

          <Modal.Footer>
            {/* Cancel / Ok Button */}
            {!isUserForRead ? (
              <button
                type="reset"
                onClick={() => {
                  setIds("");
                  setTotalInstallments("")
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
