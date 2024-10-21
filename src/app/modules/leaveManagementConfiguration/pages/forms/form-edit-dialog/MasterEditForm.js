import React from "react";
import { Modal } from "react-bootstrap";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { Checkbox, Select } from "../../../../../../_metronic/_partials/controls";
import CustomErrorLabel from "../../../../../utils/common-modules/CustomErrorLabel";
import { useSelector } from "react-redux";
import LeaveTypePolicyTable from "./LeaveTypePolicyTable";
import LeaveTypeSalaryDeductionTable from "./LeaveTypeSalaryDeductionTable";
import * as actions from "../../../_redux/formActions";
import { WEEK_DAYS } from "../../../../../utils/constants";

//Validations for Form
const formValidation = Yup.object().shape({
  subsidiaryId: Yup.number().required('Required'),
  gradeId: Yup.number().required('Required'),
  employeeTypeId: Yup.number().required('Required'),
  weekend: Yup.array().optional(),
  isSandwich: Yup.boolean().optional(),
  leavetypePolicies: Yup.array().of(
    Yup.object().shape({
      leaveType: Yup.number().required('Required'),
      gender: Yup.number().nullable(),
      minExp: Yup.number().min(0, 'Minimum experience should be 0 or more').required('Required'),
      maxAllowed: Yup.number().min(0, 'Max allowed should be 0 or more').required('Required'),
      attachmentRequired: Yup.boolean(),
      maritalStatus: Yup.number().nullable(),
    })
  ),
  leaveTypeSalaryDeductionPolicies: Yup.array().of(
    Yup.object().shape({
      leaveType: Yup.number().required('Required'),
      minLeave: Yup.number().min(0, 'Minimum experience should be 0 or more').required('Required'),
      maxLeave: Yup.number().min(0, 'Minimum experience should be 0 or more').required('Required'),
      deduction: Yup.number().min(0, 'Max allowed should be 0 or more').required('Required'),
      leaveStatus: Yup.number().nullable(),
    })
  )
});

export function MasterEditForm({
  initUser,
  isEdit,
  submitForm,
  user,
  actionsLoading,
  onHide,
  isUserForRead,
  enableLoading,
  loading,
  dispatch
}) {

  //Get Dropdown Data from State
  const {
    allEmployeeGradeList,
    allEmpTypeChildMenus,
    allSubidiaryList,
    allGenderList,
    allLeaveStatus,
    allMaritalStatus,
    allLeaveTypes
  } = useSelector((state) => state.dashboard);

  //Create Dropdown HTML from data for Select Components.
  //when leaveTypeData is provided it will check one of leave type is already selected then it will not allow it to be selected again.
  const createDropdown = (data, leaveTypData = null) => {
    return (data || []).map((el) => {
      const disabled = leaveTypData && leaveTypData.find(sel => sel.leaveType == el.value) ? true : false
      return (<>
        <option disabled={disabled} value={el.value}>{el.label}</option>
      </>)
    })
  }

  //Function to fetch Data from server when all dropdown values are present or updated.
  //If there is no old data for selected dropdown values then form will clear for user to enter new data
  const getOldData = (values) => {
    if (values.subsidiaryId && values.gradeId && values.employeeTypeId) {
      dispatch(actions.fetchEditRecord(values, { ...initUser, ...values }));
    }
  }

  //Function to Delete table row data from server.
  const deleteTableRow = (key, id, remove, index) => {
    switch (key) {
      case 'LeaveTypePolicyTable':
        dispatch(actions.deleteLeaveTypePolicyRecord(id, remove, index));
        break;
      case 'LeaveTypeSalaryDeductionTable':
        dispatch(actions.deleteLeaveTypeDeductionPolicyRecord(id, remove, index));
        break;
      default:

    }
  }
  return (
    <>
      <Formik
        enableReinitialize={true}
        initialValues={user}
        validationSchema={formValidation}
        onSubmit={(values) => {
          enableLoading();
          submitForm(values)
        }}
      >
        {({
          handleSubmit,
          errors,
          values,
          touched,
          handleBlur,
          setFieldValue,
        }) => (
          <>
          {
            console.log(':::errors:::::',{errors, touched})
          }
            <Modal.Body className="overlay overlay-block cursor-default">
              {actionsLoading && (
                <div className="overlay-layer bg-transparent">
                  <div className="spinner spinner-lg spinner-success" />
                </div>
              )}

              {/* Form Starts */}
              <Form className="form form-label-right">
                <fieldset disabled={isUserForRead}>
                  <div className="from-group row">

                    {/* Subsidiary Field Start */}
                    <div className="col-12 col-md-4 mt-3">
                      <Field
                        name="subsidiaryId"
                        component={Select}
                        disabled={isEdit}
                        className={errors.subsidiaryId && touched.subsidiaryId ? 'form-control is-invalid' : 'form-control'}
                        placeholder=""
                        onBlur={handleBlur}
                        onChange={(e) => {
                          const value = e.target.value == '--Select--' ? null : e.target.value
                          setFieldValue('subsidiaryId', value)
                          const filter = { subsidiaryId: value, gradeId: values.gradeId, employeeTypeId: values.employeeTypeId }
                          getOldData(filter)
                        }}
                        label={
                          <span>
                            {" "}
                            Subsidiary<span style={{ color: "red" }}>*</span>
                          </span>
                        }
                        value={values.subsidiaryId}
                        autoComplete="off"
                        children={createDropdown(allSubidiaryList)}
                      />
                      {
                        errors.subsidiaryId && touched.subsidiaryId && <CustomErrorLabel touched={true} error={errors.subsidiaryId} />
                      }
                    </div>
                    {/* Subsidiary Field End */}

                    {/* Grade Field Start */}
                    <div className="col-12 col-md-4 mt-3">
                      <Field
                        name="gradeId"
                        component={Select}
                        disabled={isEdit}
                        className={errors.gradeId && touched.gradeId ? 'form-control is-invalid' : 'form-control'}
                        placeholder=""
                        onBlur={handleBlur}
                        onChange={(e) => {
                          const value = e.target.value == '--Select--' ? null : e.target.value
                          setFieldValue('gradeId', value)
                          const filter = { subsidiaryId: values.subsidiaryId, gradeId: value, employeeTypeId: values.employeeTypeId }
                          getOldData(filter)
                        }}
                        label={
                          <span>
                            {" "}
                            Grade<span style={{ color: "red" }}>*</span>
                          </span>
                        }
                        value={values.gradeId}
                        autoComplete="off"
                        children={createDropdown(allEmployeeGradeList)}
                      />
                      {
                        errors.gradeId && touched.gradeId && <CustomErrorLabel touched={true} error={errors.gradeId} />
                      }
                    </div>
                    {/* Grade Field End */}

                    {/* Employee Type Field Start */}
                    <div className="col-12 col-md-4 mt-3">
                      <Field
                        name="employeeTypeId"
                        component={Select}
                        disabled={isEdit}
                        className={errors.employeeTypeId && touched.employeeTypeId ? 'form-control is-invalid' : 'form-control'}
                        placeholder=""
                        onBlur={handleBlur}
                        onChange={(e) => {
                          const value = e.target.value == '--Select--' ? null : e.target.value
                          setFieldValue('employeeTypeId', value)
                          const filter = { subsidiaryId: values.subsidiaryId, gradeId: values.gradeId, employeeTypeId: value }
                          getOldData(filter)
                        }}
                        label={<span>{" "}Employee Type<span style={{ color: "red" }}>*</span></span>}
                        value={values.employeeTypeId}
                        autoComplete="off"
                        children={createDropdown(allEmpTypeChildMenus)}
                      />
                      {
                        errors.employeeTypeId && touched.employeeTypeId && <CustomErrorLabel touched={true} error={errors.employeeTypeId} />
                      }
                    </div>
                    {/* Employee Type Field End */}

                    {/* Weekends Field Start */}
                    <div className="col-12 col-md-4 mt-3">
                      <Field
                        name="weekend"
                        component={Select}
                        className={errors.weekend && touched.weekend ? 'form-control is-invalid' : 'form-control'}
                        placeholder=""
                        multiple={true}
                        onBlur={handleBlur}
                        onChange={(e) => {
                          const data = Array.from(e.target.selectedOptions, option => option.value)
                          setFieldValue('weekend', data.map((el) => Number(el)))
                        }}
                        label={
                          <span>
                            {" "}
                            Weekends<span style={{ color: "red" }}>*</span>
                          </span>
                        }
                        value={values.weekend}
                        autoComplete="off"
                        children={createDropdown(WEEK_DAYS)}
                      />
                    </div>
                    {/* Weekends Field End */}

                    {/* Sandwich Field Start */}
                    <div className="col-12 col-md-4 mt-3">
                      <span>
                        <Field
                          name="isSandwich"
                          component={Checkbox}
                          onBlur={handleBlur}
                          onChange={(e) => {
                            setFieldValue('isSandwich', e.target.checked)
                          }}
                          isSelected={values.isSandwich}
                        />
                        <label>
                          Sandwich
                        </label>
                      </span>
                    </div>
                    {/* Sandwich Field End */}

                  </div>


                  <br />
                  <br />

                  {/* Leave Type Policy Table Start */}
                  <div
                    style={{
                      backgroundColor: "rgb(235 243 255)",
                      padding: "20px",
                      borderRadius: "5px",
                      border: "2px solid #adceff",
                    }}
                  >
                    <LeaveTypePolicyTable
                      values={values}
                      setFieldValue={setFieldValue}
                      createDropdown={createDropdown}
                      errors={errors}
                      touched={touched}
                      dropdownData={{
                        allGenderList,
                        allMaritalStatus,
                        allLeaveTypes
                      }}
                      handleDelete={deleteTableRow}
                    />
                  </div>
                  {/* Leave Type Policy Table End */}


                  <br />
                  <br />

                  {/* Leave Type Deduction Table Start */}
                  <div
                    style={{
                      backgroundColor: "rgb(235 243 255)",
                      padding: "20px",
                      borderRadius: "5px",
                      border: "2px solid #adceff",
                    }}
                  >
                    <LeaveTypeSalaryDeductionTable
                      values={values}
                      setFieldValue={setFieldValue}
                      createDropdown={createDropdown}
                      errors={errors}
                      touched={touched}
                      dropdownData={{
                        allLeaveStatus,
                        allLeaveTypes
                      }}
                      handleDelete={deleteTableRow}
                    />
                  </div>
                  {/* Leave Type Deduction Table End */}

                </fieldset>
              </Form>
              {/* Form End */}

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

              <> </>
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
    </>
  );
}
