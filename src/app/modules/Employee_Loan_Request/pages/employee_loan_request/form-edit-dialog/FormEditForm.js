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
  reimbursement_typeId: Yup.number().required("Required"),
  details: Yup.string().required("Required"),
  date: Yup.date().required("Required"),
  amount: Yup.number().required("Required"),
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

  const { currentState, userAccess } = useSelector((state) => {
    return {
      currentState: state.employee_loan_request,
      userAccess: state?.auth?.userAccess["employee_loan_request"],
    };
  }, shallowEqual);



  const { loan_type } = currentState;
console.log("loan_type",loan_type)
  // const filteredOptions = loan_type?.filter((option) =>
  //   currentState?.reimbursement_config_policies_permission?.policies?.some(
  //     (item) => item.reimbursement_typeId === option.value
  //   )
  // );

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
        saveForm(values, isFileReq, clearForm);
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

                        // const policy = currentState?.reimbursement_config_policies_permission?.policies?.find(
                        //   (item) => item.reimbursement_typeId == e.value
                        // );
                        // setIsFileReq(
                        //   policy?.attachment_required && !values.file
                        // );
                      }}
                      value={
                        loan_type?.find(
                          (option) =>
                            option.value === values.loan_typeId
                        ) || null
                      }
                      options={loan_type}
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
                    Installment Start Date <span style={{ color: "red" }}>*</span>
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
                      placeholder="Enter monthly installment"
                      label={
                        <span>
                          Total Loan Amount: $
                          {currentState?.reimbursement_config_policies_permission?.policies?.find(
                            (item) =>
                              item.reimbursement_typeId ===
                              values.reimbursement_typeId
                          )?.max_amount || 0}{" "}
                          <span style={{ color: "red" }}>*</span>
                        </span>
                      }
                      type="number"
                      onChange={(e) => {
                        const maxAmount = currentState?.reimbursement_config_policies_permission?.policies?.find(
                          (item) =>
                            item.reimbursement_typeId ===
                            values.reimbursement_typeId
                        )?.max_amount;

                        const value = Number(e.target.value);

                        if (maxAmount !== undefined && value > maxAmount) {
                          return; // Prevent setting value above max
                        }

                        setFieldValue("amount", value);
                      }}
                    />
                  </div>


                  <div className="col-12 col-md-6 mt-3">
                    <Field
                      name="total_installment"
                      component={Input}
                      placeholder="Enter total installment"
                      label={
                        <span>
                          Total Installment Limit: $
                          {currentState?.reimbursement_config_policies_permission?.policies?.find(
                            (item) =>
                              item.reimbursement_typeId ===
                              values.reimbursement_typeId
                          )?.max_amount || 0}{" "}
                          <span style={{ color: "red" }}>*</span>
                        </span>
                      }
                      type="number"
                      onChange={(e) => {
                        const maxAmount = currentState?.reimbursement_config_policies_permission?.policies?.find(
                          (item) =>
                            item.reimbursement_typeId ===
                            values.reimbursement_typeId
                        )?.max_amount;

                        const value = Number(e.target.value);

                        if (maxAmount !== undefined && value > maxAmount) {
                          return; // Prevent setting value above max
                        }

                        setFieldValue("amount", value);
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
                          Monthly Installment Limit: $
                          {currentState?.reimbursement_config_policies_permission?.policies?.find(
                            (item) =>
                              item.reimbursement_typeId ===
                              values.reimbursement_typeId
                          )?.max_amount || 0}{" "}
                          <span style={{ color: "red" }}>*</span>
                        </span>
                      }
                      type="number"
                      onChange={(e) => {
                        const maxAmount = currentState?.reimbursement_config_policies_permission?.policies?.find(
                          (item) =>
                            item.reimbursement_typeId ===
                            values.reimbursement_typeId
                        )?.max_amount;

                        const value = Number(e.target.value);

                        if (maxAmount !== undefined && value > maxAmount) {
                          return; // Prevent setting value above max
                        }

                        setFieldValue("amount", value);
                      }}
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
