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
  fetchAllReimbursementConfigList,
} from "../../../../../../_metronic/redux/dashboardActions";

// Define the validation schema for the main form and the policies
// const ReimbursementSchema = Yup.object().shape({
//   subsidiaryId: Yup.number().required("Subsidiary is required"),
//   payroll_groupId: Yup.number().required("Payroll group is required"),
//   cycle_typeId: Yup.number().required("Cycle type required"),

//   policies: Yup.array().of(
//     Yup.object().shape({
//       reimbursement_typeId: Yup.number().required(
//         "Reimbursement type required"
//       ),
//       max_amount: Yup.number()
//         .min(1, "Must be at least 1")
//         .required("Max  amount is required"),
//       attachment_required: Yup.string().required("Required"),
//       grades: Yup.string().required("Required"),
//     })
//   ),

//   accounts: Yup.array().of(
//     Yup.object().shape({
//       reimbursement_typeId: Yup.number().required("required"),
//       expense_accountId: Yup.number().required("Expense account is required"),
//       bank_accountId: Yup.number().required("bank account required"),
//     })
//   ),
// });

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
      dispatch(fetchAllFormsMenu(202, "allReimbursementTypeList"));
        //  dispatch(fetchAllReimbursementConfigList("allReimbursementConfigList"))
    }
    //allPayrolGroupList
  }, [dispatch, user.Id]);

  const { currentState, userAccess } = useSelector((state) => {
    return {
      currentState: state.reimbursement_claim,
      userAccess: state?.auth?.userAccess["reimbursement_claim"],
    };
  }, shallowEqual);

  const { entities } = currentState;

  let existedId = 0;
const check=(()=>{
console.log("hit")
})

  return (
    <Formik
      enableReinitialize={true}
      initialValues={user}
      // validationSchema={ReimbursementSchema}
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
                      isDisabled={isUserForRead}
                      onChange={(e) => {
                        setFieldValue("reimbursement_typeId", e.value || null);
                        // check_Existed_Data(e.value);
                      }}
                      value={
                        dashboard.allReimbursementTypeList.find(
                          (option) => option.value === values.reimbursement_typeId
                        ) || null
                      }
                      options={dashboard.allReimbursementTypeList}
                      error={errors.reimbursement_typeId}
                      touched={touched.reimbursement_typeId}
                    />
                  </div>

      
                  <div className="col-12 col-md-6 mt-3">
                    <Field
                      name="date"
                      component={Input}
                      placeholder="Select Date"
                      label="Date"
                      type="date"
                    />
                  </div>

             
                  <div className="col-12 col-md-6 mt-3">
                  <Field
                      name="details"
                      component={Input}
                      placeholder="Enter Details"
                      label="Details"
                      type="text"
                    />
                  </div>




                  <div className="col-12 col-md-6 mt-3">
                  <Field
                      name="amount"
                      component={Input}
                      placeholder="Enter Details"
                      label="Amount"
                      type="number"
                    />
                  </div>

                  {/* <div className="col-12 col-md-6 mt-3">
                    <SearchSelect
                      name="reimbursement_configurationId"
                      label={
                        <span>
                          Reimbursement Configuration
                          <span style={{ color: "red" }}>*</span>
                        </span>
                      }
                      isDisabled={isUserForRead}
                      onChange={(e) => {
                        setFieldValue("reimbursement_configurationId", e.value || null);
                        // check_Existed_Data(e.value);
                      }}
                      value={
                        dashboard.allReimbursementConfigList.find(
                          (option) => option.value === values.reimbursement_configurationId
                        ) || null
                      }
                      options={dashboard.allReimbursementConfigList}
                      error={errors.reimbursement_configurationId}
                      touched={touched.reimbursement_configurationId}
                    />
                  </div> */}
                </div>
              </fieldset>
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
