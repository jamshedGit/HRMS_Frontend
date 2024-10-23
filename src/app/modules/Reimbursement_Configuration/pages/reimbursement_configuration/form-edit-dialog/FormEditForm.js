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

  // Fetch necessary data if not already present
  useEffect(() => {
    if (!user.Id) {
      dispatch(fetchAllFormsMenu(133, "allSubidiaryList")); // For All Subsidiaries
      dispatch(fetchAllFormsMenu(127, "allPayrolGroupList")); // For All Accounts
      dispatch(fetchAllFormsMenu(191, "allCycleTypeList")); 
    }
    //allPayrolGroupList
  }, [dispatch, user.Id]);



  const { currentState, userAccess } = useSelector((state) => {
    console.log("state for clear data ", state);
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
                          Payroll GroupId<span style={{ color: "red" }}>*</span>
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
{/*  */}
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
