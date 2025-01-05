
import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { DatePickerField, Input } from "../../../../../../_metronic/_partials/controls"; // Adjust import as needed
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { SearchSelect } from "../../../../../../_metronic/_helpers/SearchSelect";
import {
  fetchAllFormsMenu,
  fetchAllHumanResourceRole,
  fetchAllPayrollMonthYearList,
  fetchAllSubsidiaryData,
} from "../../../../../../_metronic/redux/dashboardActions";
import { VALIDATION_MESSAGES } from "../../../../../utils/constants";
import { getDateDiffInDays } from "../../../../../utils/common";
import * as actions from "../../../_redux/redux-Actions";
import { checkPayroll_EmployeesByIds, fetchPayrollProcess } from "../../../_redux/redux-Actions";
import { payroll_processSlice, callTypes } from "../../../_redux/redux-Slice";
// const { actions } = payroll_processSlice;
// percentage: Yup.string().required("Required*"),
const payroll_processEditSchema = Yup.object().shape({
  // from_amount: Yup.string().required("Required*"),

  subsidiaryId: Yup.number()
    .required(VALIDATION_MESSAGES.required),

  // to_amount: Yup.string().required("Required*"),

  payroll_groupId: Yup.string()
    .required(VALIDATION_MESSAGES.required),

  payroll_monthId: Yup.string()
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
  setIds, formUIProps
}) {
  const dispatch = useDispatch();
  const { dashboard } = useSelector((state) => state);
  const [isAfterResult, setIsAfterResult] = useState(false)
  useEffect(() => {
    if (!user.Id) {
      // dispatch(fetchAllFormsMenu(133, "allSubidiaryList")); // For All Subsidiaries
      dispatch(fetchAllSubsidiaryData("allSubsidiaryList"));
      dispatch(fetchAllFormsMenu(127, "allPayrolGroupList"));
      // const key = "allPayrollMonthYearList";  // The key parameter
      // dispatch(fetchAllPayrollMonthYearList("allPayrollMonthYearList"));
      //  dispatch(fetchAllPayrollMonthYearList(employeeId, key));


    }
  }, [dispatch, user.Id]);


  const { currentState, userAccess } = useSelector((state) => {
    return {
      currentState: state.payroll_process,
      userAccess: state?.auth?.userAccess["payroll_process"],
    };
  }, shallowEqual);

  const { userForEdit, checkPayroll_EmployeesExist } = currentState;


  const payrollGroupDetails = async (subsidiaryId, payroll_groupId,payroll_monthId) => {
    if (subsidiaryId && payroll_groupId && payroll_monthId) {
      // Dispatch action to fetch payroll group details
      let body = {
        subsidiaryId,
        payroll_groupId,payroll_monthId
      };
      await dispatch(actions.fetchPayrollGroupDetails(body));
    }
  };


  useEffect(() => {
    if (currentState?.payroll_group_details) {

    }
  }, [currentState?.payroll_group_details]);

  const getPayroll = (subsidiaryId) => {
    const key = "allPayrollMonthYearList";  // The key parameter

    dispatch(fetchAllPayrollMonthYearList({ subsidiaryId: subsidiaryId, employeeId: null }, key));

  }

  const checkPayroll_Employees = async (setFieldValue, subsidiaryId, payroll_groupId, payroll_monthId, revert = false) => {


    if (subsidiaryId && payroll_groupId && payroll_monthId) {
      let data = {
        SubsidiaryId: subsidiaryId, PayrollGroupId: payroll_groupId, MonthId: payroll_monthId, revert
      }

      await dispatch(checkPayroll_EmployeesByIds({ data }));
      if (revert) {
        await dispatch(fetchPayrollProcess(formUIProps));

      }


      // setIds("");

    }

  }



  return (
    <Formik
      enableReinitialize={true}

      initialValues={user}
      validationSchema={payroll_processEditSchema}
      onSubmit={(values, { resetForm }) => {

        enableLoading();
        const clearForm = () => {
          resetForm();
        };
        saveForm(values, clearForm);
      }}
    >
      {({ handleSubmit, errors, touched, values, handleReset, setFieldValue }) => (
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
                  <div className="col-12 col-md-12  p-0 m-0">
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
                          payrollGroupDetails(e.value, values.payroll_groupId,values.payroll_monthId)
                          getPayroll(e.value)
                          checkPayroll_Employees(setFieldValue, e.value, values.payroll_groupId, values.payroll_monthId)
                          setIsAfterResult(false)
                        }}
                        value={
                          dashboard?.allSubsidiaryList?.find(
                            (option) => option.value === values.subsidiaryId
                          ) || null
                        }

                        options={dashboard?.allSubsidiaryList}
                        // options={dashboard.allSubidiaryList.map(option => ({
                        //   label: `${option.label} (${option.value})`, // Adding the value to the label
                        //   value: option.value,
                        // }))}
                        error={errors.subsidiaryId}
                        touched={touched.subsidiaryId}
                      />
                    </div>
                  </div>


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
                        payrollGroupDetails(values.subsidiaryId, e.value,values.payroll_monthId)
                        checkPayroll_Employees(setFieldValue, values.subsidiaryId, e.value, values.payroll_monthId)
                        setIsAfterResult(false)
                      }}
                      value={
                        dashboard?.allPayrolGroupList?.find(
                          (option) => option.value === values.payroll_groupId
                        ) || null
                      }

                      options={dashboard?.allPayrolGroupList}
                      // options={dashboard.allSubidiaryList.map(option => ({
                      //   label: `${option.label} (${option.value})`, // Adding the value to the label
                      //   value: option.value,
                      // }))}
                      error={errors.payroll_groupId}
                      touched={touched.payroll_groupId}
                    />
                  </div>
                  

                  <div className="col-12 col-md-6 mt-3">
                    <SearchSelect
                      name="payroll_monthId"
                      label={
                        <span>
                          Payroll Month<span style={{ color: "red" }}>*</span>
                        </span>
                      }

                      isDisabled={isUserForRead}
                      onChange={(e) => {
                        setFieldValue("payroll_monthId", e.value || null);
                        payrollGroupDetails(values.subsidiaryId,values.payroll_groupId, e.value)
                        checkPayroll_Employees(setFieldValue, values.subsidiaryId, values.payroll_groupId, e.value)
                        setIsAfterResult(false)
                      }}
                      value={
                        dashboard?.allPayrollMonthYearList?.find(
                          (option) => option.value === values.payroll_monthId
                        ) || null
                      }

                      // options={dashboard?.allPayrollMonthYearList}
                      options={
                        dashboard?.allPayrollMonthYearList.filter(
                          (option) => option.isActive
                        ) || []
                      }
                      // options={dashboard.allSubidiaryList.map(option => ({
                      //   label: `${option.label} (${option.value})`, // Adding the value to the label
                      //   value: option.value,
                      // }))}
                      error={errors.payroll_monthId}
                      touched={touched.payroll_monthId}
                    />
                  </div>

                  <div className='accordion-header-btn w-100  d-flex justify-content-left bg-primary m-4'>
                      <h6 className="text-white p-5">Before Process - Result</h6>
                    </div>
                  <div className="col-12 col-md-6 mt-3">
                    <label>
                      Total Employee: 
                    <span style={{ fontWeight: 'bold' }}> {currentState?.payroll_group_details?.total_employees || 0}</span> 
                    </label>

                  </div>

                  <div className="col-12 col-md-6 mt-3">

                    <label>
                Salary setup not created: <span style={{ fontWeight: 'bold' }}> {currentState?.payroll_group_details?.slary_setup_not_created || 0}</span> 
                    </label>

                  </div>

                  <div className="col-12 col-md-6 mt-3">
                    <label>
                      Loan to be processed: <span style={{ fontWeight: 'bold' }}>{currentState?.payroll_group_details?.loan_to_be_processed || 0}</span> 
                    </label>

                  </div>


                  <div className="col-12 col-md-6 mt-3">
                    <label>
                      Total Employee (Finalized): <span style={{ fontWeight: 'bold' }}>{0}</span>
                    </label>

                  </div>








                </div>


                {/* <hr /> */}

                {isAfterResult ?
                  <>
                    <div className='accordion-header-btn w-100  d-flex justify-content-left  bg-primary'>
                      <h6 className="text-white p-5">After Process - Result</h6>
                    </div>
                    <div className="form-group row">
                 

                      <div className="col-12 col-md-6 mt-3">
                        <label>
                          Tax calculated: <span style={{ fontWeight: 'bold' }}>{0}</span> 
                        </label>

                      </div>

                      <div className="col-12 col-md-6 mt-3">
                        <label>
                          Tax not calculated: <span style={{ fontWeight: 'bold' }}>{0}</span>
                        </label>

                      </div>


                      <div className="col-12 col-md-6 mt-3">
                        <label>
                          Employee with zero salary: <span style={{ fontWeight: 'bold' }}>{0}</span>
                        </label>

                      </div>
                      <div className="col-12 col-md-6 mt-3">
                        <label>
                          Employee with negative salary: <span style={{ fontWeight: 'bold' }}>{0}</span> 
                        </label>

                      </div>
                      <div className="col-12 col-md-6 mt-3">
                        <label>
                          Loan processed:<span style={{ fontWeight: 'bold' }}>{0}</span> 
                        </label>

                      </div>

                    </div>

                  </>
                  : null


                }

              </fieldset>
            </Form>
          </Modal.Body>


          <Modal.Footer>
            {/* Cancel / Ok Button */}
            {/* checkPayroll_EmployeesExist */}

            {checkPayroll_EmployeesExist && (
              <button

                onClick={() => {
                  checkPayroll_Employees(setFieldValue, values.subsidiaryId, values.payroll_groupId, values.payroll_monthId, true);
                  setIds("");
                  handleReset();
                  dispatch(actions.clearReduxData())
                }}
                className="btn btn-red"
                disabled={loading}
              >
                Revert
                {loading && (
                  <span className="ml-3 mr-3 spinner spinner-white"></span>
                )}
              </button>
            )}

            {!isUserForRead ? (
              <button
                type="reset"
                onClick={() => {
                  setIds("");
                  handleReset();
                  dispatch(actions.clearReduxData())


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
                onClick={() => {
                  handleSubmit();
                  dispatch(actions.clearReduxData())
                  setIsAfterResult(true)
                }}
                className="btn btn-primary btn-elevate"
                disabled={loading}
              >
                Execute
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
