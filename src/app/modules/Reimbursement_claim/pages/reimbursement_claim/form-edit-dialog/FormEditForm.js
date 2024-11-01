import React, { useEffect, useRef } from "react";
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
  // amount: Yup.number() .required("Required"),
  
  // file: Yup.mixed()
  //   .required("Required")
  //   .test(
  //     "fileSize",
  //     "File is too large (max 5MB)",
  //     (value) => !value || (value && value.size <= 5 * 1024 * 1024) // 5 MB limit
  //   )
  //   .required("Required"),
  pay_in_payroll_forId: Yup.number().required("Required"),
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
}) {
  const dispatch = useDispatch();
  const { dashboard } = useSelector((state) => state);
  const inputFile = useRef(null);

  // Fetch necessary data if not already present
  useEffect(() => {
    if (!user.Id) {
      dispatch(fetchAllFormsMenu(133, "allSubidiaryList")); // For All Subsidiaries
      dispatch(fetchAllFormsMenu(202, "allReimbursementTypeList"));
      dispatch(fetchAllPayrollMonthYearList("allPayrollMonthYearList"));
    }
    //allPayrolGroupList
  }, [dispatch, user.Id]);

  const { currentState, userAccess } = useSelector((state) => {
    return {
      currentState: state.reimbursement_claim,
      userAccess: state?.auth?.userAccess["reimbursement_claim"],
    };
  }, shallowEqual);
  console.log(
    "state data ",
    currentState?.reimbursement_config_policies_permission?.policies
  );

  const filteredOptions = dashboard.allReimbursementTypeList.filter((option) =>
    currentState?.reimbursement_config_policies_permission?.policies?.some(
      (item) => item.reimbursement_typeId === option.value
    )
  );

  console.log("filteredOptions", filteredOptions);
  // const handleChangeReimbursement=()=>{
  //   filteredOptions
  // }

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
        saveForm(values, clearForm);
      }}

      // onSubmit={(values) => {
      //   enableLoading();
      //   saveForm(values);
      // }}
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
                  <div className="col-12 col-md-6 mt-3">
                    <SearchSelect
                      name="reimbursement_typeId"
                      label={
                        <span>
                          Reimbursement Type
                          <span style={{ color: "red" }}>*</span>
                        </span>
                      }
                      // isDisabled={isUserForRead}
                      disabled={isEdit} // value={
                      onChange={(e) => {
                        setFieldValue("reimbursement_typeId", e.value || null);
                        // check_Existed_Data(e.value);
                      }}
                      value={
                        dashboard.allReimbursementTypeList.find(
                          (option) =>
                            option.value === values.reimbursement_typeId
                        ) || null
                      }
                      options={filteredOptions}
                      error={errors.reimbursement_typeId}
                      touched={touched.reimbursement_typeId}
                    />
                  </div>

                  <div className="col-12 col-md-6 mt-3">
                    <Field
                      name="date"
                      component={DatePickerField}
                      dateFormat="dd/MM/yyyy"
                      placeholder="Select Date"
                      label="Date"
                      type="date"
                    />
                  </div>

                  {/* <div className="col-12 col-md-6 mt-3">
                    <Field
                      name="amount"
                      component={Input}
                      // placeholder={currentState?.reimbursement_config_policies_permission?.policies?.some(item => item.reimbursement_typeId === values.reimbursement_typeId)}
                     
                      placeholder={
                        "Enter Amount" // Use max_amount or default placeholder
                      }
                     
                      label={`Amount Limit : ${currentState?.reimbursement_config_policies_permission?.policies?.find(
                        (item) => item.reimbursement_typeId === values.reimbursement_typeId
                      )?.max_amount}`}






                      type="number"
                    />
                  </div> */}

                  <div className="col-12 col-md-6 mt-3">
                    <Field
                      name="amount"
                      component={Input}
                      placeholder="Enter Amount"
                      label={`Amount Limit: ${
                        currentState?.reimbursement_config_policies_permission?.policies?.find(
                          (item) =>
                            item.reimbursement_typeId ===
                            values.reimbursement_typeId
                        )?.max_amount
                      }`}
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
                    <SearchSelect
                      name="pay_in_payroll_forId"
                      label={
                        <span>
                          Pay In Payroll For
                          <span style={{ color: "red" }}>*</span>
                        </span>
                      }
                      onChange={(e) => {
                        setFieldValue("pay_in_payroll_forId", e.value || null);
                      }}
                      value={
                        dashboard?.allPayrollMonthYearList.find(
                          (option) =>
                            option.value === values.pay_in_payroll_forId
                        ) || null
                      }
                      //   options={dashboard.allPayrollMonthYearList.map(option => ({
                      //     value: option.Id,
                      //     label: option.month
                      // }))}
                      options={dashboard.allPayrollMonthYearList}
                      error={errors.pay_in_payroll_forId}
                      touched={touched.pay_in_payroll_forId}
                    />
                  </div>

                  <div className="col-12 col-md-6 mt-3">
                    <Field
                      name="details"
                      component={TextArea}
                      placeholder="Enter Details"
                      label="Details"
                      type="text"
                    />
                  </div>

                  {/* <div className="col-12 col-md-6 mt-3">
                    <SearchSelect
                      name="pay_slip_refId"
                      label={
                        <span>
                          Pay Slip REFID <span style={{ color: "red" }}>*</span>
                        </span>
                      }
                      disabled={isEdit}
                      // onChange={(e) =>
                      //   setFieldValue("pay_slip_refId", e.value || null)
                      // } // This won't be called since it's disabled
                      // value={
                      //   dashboard.allPaySlipList.find(
                      //     (option) => option.value === values.pay_slip_refId
                      //   ) || null
                      // }
                      // options={dashboard.allPaySlipList}
                      // error={errors.pay_slip_refId}
                      // touched={touched.pay_slip_refId}
                    />
                  </div> */}

<div className="col-12 col-md-12 mt-3">
  <label style={{ "margin-right": "0.5rem" }}>
    Attachment:
  </label>
  {currentState?.reimbursement_config_policies_permission?.policies?.find(
    (item) => item.reimbursement_typeId === values.reimbursement_typeId
  )?.attachment_required && (
    <input
      name="file"
      type="file"
      accept=".jpeg,.jpg,.png,.pdf,.doc,.docx"
      ref={inputFile}
      onChange={(event) => {
        const file = event.currentTarget.files[0];
        setFieldValue("file", file);
      }}
    />
  )}
</div>


                  {/* <div className="col-12 col-md-12 mt-3">
                    <label style={{ "margin-right": "0.5rem" }}>
                      {" "}
                      Attachment:{" "}
                    </label>
                    <input
                      name="file"
                      type="file"
                      accept=".jpeg,.jpg,.png,.pdf,.doc,.docx"
                      ref={inputFile}
                      onChange={(event) => {
                        // Update Formik's value
                        const file = event.currentTarget.files[0];
                        setFieldValue("file", file);
                      }}
                    />
            

                    <div>
                      <br />
                      {user.file && (
                        <>
                          <label>
                            <strong>Existing File:</strong>
                          </label>
                          {
                            <a href={getUploadUrl(user.file)} target="_blank">
                              <span>{getFileName(user.file)}</span>
                            </a>
                          }
                        </>
                      )}
                    </div>
                  </div> */}
                </div>
              </fieldset>
            </Form>
          </Modal.Body>

          <Modal.Footer>
            {/* Cancel / Ok Button */}
            {!isUserForRead ? (
              <button
                type="reset"
                // onClick={onHide}
                // onClick={() => clear_Existed_Data()}

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
