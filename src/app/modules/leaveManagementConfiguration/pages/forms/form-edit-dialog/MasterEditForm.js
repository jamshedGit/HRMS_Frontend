import React from "react";
import { Modal } from "react-bootstrap";
import { Formik, Form, Field, FieldArray } from "formik";
import * as Yup from "yup";
import { Checkbox, Input, Select } from "../../../../../../_metronic/_partials/controls";
import CustomErrorLabel from "../../../../../utils/common-modules/CustomErrorLabel";
import { useSelector } from "react-redux";
import LeaveTypePolicyTable from "./LeaveTypePolicyTable";
import LeaveTypeSalaryDeductionTable from "./LeaveTypeSalaryDeductionTable";

//Validation for Form
// const formValidation = Yup.object().shape({
//   subsidiaryId: Yup.number().required('Please Select a Subsidiary'),
//   gradeId: Yup.number().required('Please Select a Grade'),
//   employeeTypeId: Yup.number().required('Please Select a Employee Type'),
//   weekend: Yup.string().optional(),
//   isSandwich: Yup.boolean().optional()
// });

const formValidation = Yup.object().shape({
  subsidiaryId: Yup.number().required('Please Select a Subsidiary'),
  gradeId: Yup.number().required('Please Select a Grade'),
  employeeTypeId: Yup.number().required('Please Select a Employee Type'),
  weekend: Yup.string().optional(),
  isSandwich: Yup.boolean().optional(),
  leavetypePolicies: Yup.array().of(
    Yup.object().shape({
      leaveType: Yup.number().required('Required'),
      gender: Yup.number().required('Required'),
      minExp: Yup.number().min(0, 'Minimum experience should be 0 or more').required('Required'),
      maxAllowed: Yup.number().min(0, 'Max allowed should be 0 or more').required('Required'),
      attachmentRequired: Yup.boolean(),
      maritalStatus: Yup.number().required('Required'),
    })
  ),
  leaveTypeSalaryDeductionPolicies: Yup.array().of(
    Yup.object().shape({
      leaveType: Yup.number().required('Required'),
      minLeave: Yup.number().min(0, 'Minimum experience should be 0 or more').required('Required'),
      maxLeave: Yup.number().min(0, 'Minimum experience should be 0 or more').required('Required'),
      deduction: Yup.number().min(0, 'Max allowed should be 0 or more').required('Required'),
      leaveStatus: Yup.number().required('Required'),
    })
  )
});



export function MasterEditForm({
  dropdownData = [],
  submitForm,
  user,
  actionsLoading,
  onHide,
  isUserForRead,
  enableLoading,
  loading,
}) {

  const {
    allEmployeeGradeList,
    allEmpTypeChildMenus,
    allSubidiaryList
  } = useSelector((state) => state.dashboard);

  const dropdown = (data) => {
    return (data || []).map((el) => {
      return (<>
        <option value={el.value}>{el.label}</option>
      </>)
    })
  }

  return (
    <>
      <Formik
        enableReinitialize={true}
        initialValues={{
          ...user, leavetypePolicies: [
            {
              "Id": 2,
              "leaveType": 35,
              "gender": 191,
              "minExp": 2,
              "maxAllowed": 3,
              "attachmentRequired": true,
              "maritalStatus": 189
            },
            {
              "Id": 6,
              "leaveType": 37,
              "gender": 191,
              "minExp": 4,
              "maxAllowed": 5,
              "attachmentRequired": true,
              "maritalStatus": 189
            }
          ],
          leaveTypeSalaryDeductionPolicies: []
        }}
        validationSchema={formValidation}
        onSubmit={(values) => {
          console.log('::::values::', values);
          enableLoading();

          // submitForm(values)
        }}
      >
        {({
          handleSubmit,
          errors,
          values,
          formik,
          touched,
          handleBlur,
          handleChange,
          setFieldValue,
        }) => (
          <>
            <Modal.Body className="overlay overlay-block cursor-default">
              {actionsLoading && (
                <div className="overlay-layer bg-transparent">
                  <div className="spinner spinner-lg spinner-success" />
                </div>
              )}
              <Form className="form form-label-right">
                <fieldset disabled={isUserForRead}>
                  <div className="from-group row">

                    <div className="col-12 col-md-4 mt-3">
                      <Field
                        name="subsidiaryId"
                        component={Select}
                        className={errors.subsidiaryId && !values.subsidiaryId ? 'form-control is-invalid' : 'form-control'}
                        placeholder=""
                        onBlur={handleBlur}
                        onChange={(e) => {
                          setFieldValue('subsidiaryId', e.target.value)
                        }}
                        label={
                          <span>
                            {" "}
                            Subsidiary<span style={{ color: "red" }}>*</span>
                          </span>
                        }
                        value={values.subsidiaryId}
                        autoComplete="off"
                        children={dropdown(allSubidiaryList)}
                      />
                      {
                        errors.subsidiaryId && !values.subsidiaryId && <CustomErrorLabel touched={true} error={errors.subsidiaryId} />
                      }
                    </div>

                    <div className="col-12 col-md-4 mt-3">
                      <Field
                        name="gradeId"
                        component={Select}
                        className={errors.gradeId && !values.gradeId ? 'form-control is-invalid' : 'form-control'}
                        placeholder=""
                        onBlur={handleBlur}
                        onChange={(e) => {
                          setFieldValue('gradeId', e.target.value)
                        }}
                        label={
                          <span>
                            {" "}
                            Grade<span style={{ color: "red" }}>*</span>
                          </span>
                        }
                        value={values.gradeId}
                        autoComplete="off"
                        children={dropdown(allEmployeeGradeList)}
                      />
                      {
                        errors.gradeId && !values.gradeId && <CustomErrorLabel touched={true} error={errors.gradeId} />
                      }
                    </div>

                    <div className="col-12 col-md-4 mt-3">
                      <Field
                        name="employeeTypeId"
                        component={Select}
                        className={errors.employeeTypeId && !values.employeeTypeId ? 'form-control is-invalid' : 'form-control'}
                        placeholder=""
                        onBlur={handleBlur}
                        onChange={(e) => {
                          setFieldValue('employeeTypeId', e.target.value)
                        }}
                        label={<span>{" "}Employee Type<span style={{ color: "red" }}>*</span></span>}
                        value={values.employeeTypeId}
                        autoComplete="off"
                        children={dropdown(allEmpTypeChildMenus)}
                      />
                      {
                        errors.employeeTypeId && !values.employeeTypeId && <CustomErrorLabel touched={true} error={errors.employeeTypeId} />
                      }
                    </div>

                    <div className="col-12 col-md-4 mt-3">
                      <Field
                        name="weekend"
                        component={Select}
                        className={errors.weekend && !values.weekend ? 'form-control is-invalid' : 'form-control'}
                        placeholder=""
                        multiple={true}
                        onBlur={handleBlur}
                        onChange={(e) => {
                          const data = Array.from(e.target.selectedOptions, option => option.value)
                          setFieldValue('weekend', data)
                        }}
                        label={
                          <span>
                            {" "}
                            Weekends<span style={{ color: "red" }}>*</span>
                          </span>
                        }
                        value={values.weekend}
                        autoComplete="off"
                        children={dropdown([{ label: "Monday", value: 1 }, { label: "Tuesday", value: 2 }, { label: "Wednesday", value: 3 }, { label: "Thursday", value: 4 }, { label: "Friday", value: 5 }, { label: "Saturday", value: 6 }, { label: "Sunday", value: 7 }])}
                      />
                    </div>


                    <div className="col-12 col-md-4 mt-3">
                      <Field
                        name="isSandwich"
                        component={Checkbox}
                        onBlur={handleBlur}
                        onChange={(e) => {
                          setFieldValue('isSandwich', e.target.checked)
                        }}
                        children={'Sandwich'}
                        isSelected={values.isSandwich}
                      />
                    </div>
                  </div>
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
                      dropdown={dropdown}
                      errors={errors}
                      touched={touched}
                    />
                  </div>

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
                      dropdown={dropdown}
                      errors={errors}
                      touched={touched}
                    />
                  </div>
                </fieldset>
              </Form>
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
