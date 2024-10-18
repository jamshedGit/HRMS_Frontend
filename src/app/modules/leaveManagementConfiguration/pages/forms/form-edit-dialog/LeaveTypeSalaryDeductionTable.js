import { Field, FieldArray } from 'formik'
import React from 'react'
import { Input, Select } from '../../../../../../_metronic/_partials/controls'
import CustomErrorLabel from '../../../../../utils/common-modules/CustomErrorLabel';

// Dropdown options
const leaveTypeOptions = [
  { value: 35, label: 'Sick Leave' },
  { value: 37, label: 'Annual Leave' },
  // Add other leave types here
];

const genderOptions = [
  { value: 191, label: 'Male' },
  { value: 192, label: 'Female' },
  // Add other genders here
];

const maritalStatusOptions = [
  { value: 189, label: 'Single' },
  { value: 190, label: 'Married' },
  // Add other marital statuses here
];

function LeaveTypeSalaryDeductionTable({ values, setFieldValue, dropdown, errors, touched }) {
  return (
    <>
      <h6>Leave Type Salary Deduction Policies</h6>
      <FieldArray name="leaveTypeSalaryDeductionPolicies">
        {({ insert, remove, push }) => (
          <>
            <table className="table table-hover">
              <thead>
                <tr style={{ backgroundColor: "#4d5f7a", color: "#fff" }}>
                  <td></td>
                  <td>Leave Type</td>
                  <td>Min Leave</td>
                  <td>Max Leave</td>
                  <td>Deduction %</td>
                  <td>Leave Status</td>
                </tr>
              </thead>
              <tbody>
                {values.leaveTypeSalaryDeductionPolicies.map((row, index) => (
                  <tr key={index}>
                    <td>
                      <button type="button" onClick={() => remove(index)}>
                        Delete
                      </button>
                    </td>
                    <td>
                      <Field
                        name={`leaveTypeSalaryDeductionPolicies[${index}].leaveType`}
                        component={Select}
                        // className={errors.subsidiaryId && !values.subsidiaryId ? 'form-control is-invalid' : 'form-control'}
                        onChange={(e) => {
                          setFieldValue(
                            `leaveTypeSalaryDeductionPolicies[${index}].leaveType`,
                            e.target.value
                          )
                        }}
                        label={
                          <span>
                            {" "}
                            leave Type<span style={{ color: "red" }}>*</span>
                          </span>
                        }
                        value={row.subsidiaryId}
                        children={dropdown(leaveTypeOptions)}
                      />
                      {errors.leaveTypeSalaryDeductionPolicies?.[index]?.leaveType &&
                        touched.leaveTypeSalaryDeductionPolicies?.[index]?.leaveType &&
                          <CustomErrorLabel touched={true} error={errors.leaveTypeSalaryDeductionPolicies?.[index]?.leaveType} />
                      }
                    </td>
                    <td>
                      <Field
                        name={`leaveTypeSalaryDeductionPolicies[${index}].minLeave`}
                        component={Input}
                        type="number"
                        // className={errors.subsidiaryId && !values.subsidiaryId ? 'form-control is-invalid' : 'form-control'}
                        onChange={(e) => {
                          setFieldValue(
                            `leaveTypeSalaryDeductionPolicies[${index}].minLeave`,
                            e.target.value
                          )
                        }}
                        label={
                          <span>
                            {" "}
                            Min Exp<span style={{ color: "red" }}>*</span>
                          </span>
                        }
                        value={row.minLeave}
                      />
                      {errors.leaveTypeSalaryDeductionPolicies?.[index]?.minLeave &&
                        touched.leaveTypeSalaryDeductionPolicies?.[index]?.minLeave &&
                          <CustomErrorLabel touched={true} error={errors.leaveTypeSalaryDeductionPolicies?.[index]?.minLeave} />
                      }
                    </td>
                    <td>

                      <Field
                        name={`leaveTypeSalaryDeductionPolicies[${index}].maxLeave`}
                        component={Input}
                        type="number"
                        // className={errors.subsidiaryId && !values.subsidiaryId ? 'form-control is-invalid' : 'form-control'}
                        onChange={(e) => {
                          setFieldValue(
                            `leaveTypeSalaryDeductionPolicies[${index}].maxLeave`,
                            e.target.value
                          )
                        }}
                        label={
                          <span>
                            {" "}
                            Max Allowed<span style={{ color: "red" }}>*</span>
                          </span>
                        }
                        value={row.maxLeave}
                      />
                      {errors.leaveTypeSalaryDeductionPolicies?.[index]?.maxLeave &&
                        touched.leaveTypeSalaryDeductionPolicies?.[index]?.maxLeave &&
                          <CustomErrorLabel touched={true} error={errors.leaveTypeSalaryDeductionPolicies?.[index]?.maxLeave} />
                      }
                    </td>
                    <td>
                    <Field
                        name={`leaveTypeSalaryDeductionPolicies[${index}].deduction`}
                        component={Input}
                        type="number"
                        // className={errors.subsidiaryId && !values.subsidiaryId ? 'form-control is-invalid' : 'form-control'}
                        onChange={(e) => {
                          setFieldValue(
                            `leaveTypeSalaryDeductionPolicies[${index}].deduction`,
                            e.target.value
                          )
                        }}
                        label={
                          <span>
                            {" "}
                            Max Allowed<span style={{ color: "red" }}>*</span>
                          </span>
                        }
                        value={row.deduction}
                      />
                      {errors.leaveTypeSalaryDeductionPolicies?.[index]?.deduction &&
                        touched.leaveTypeSalaryDeductionPolicies?.[index]?.deduction &&
                          <CustomErrorLabel touched={true} error={errors.leaveTypeSalaryDeductionPolicies?.[index]?.deduction} />
                      }
                    </td>
                    <td>

                      <Field
                        name={`leaveTypeSalaryDeductionPolicies[${index}].leaveStatus`}
                        component={Select}
                        // className={errors.subsidiaryId && !values.subsidiaryId ? 'form-control is-invalid' : 'form-control'}
                        onChange={(e) => {
                          setFieldValue(
                            `leaveTypeSalaryDeductionPolicies[${index}].leaveStatus`,
                            e.target.value
                          )
                        }}
                        label={
                          <span>
                            {" "}
                            Marital Status<span style={{ color: "red" }}>*</span>
                          </span>
                        }
                        value={row.leaveStatus}
                        children={dropdown(maritalStatusOptions)}
                      />
                      {errors.leaveTypeSalaryDeductionPolicies?.[index]?.leaveStatus &&
                        touched.leaveTypeSalaryDeductionPolicies?.[index]?.leaveStatus &&
                          <CustomErrorLabel touched={true} error={errors.leaveTypeSalaryDeductionPolicies?.[index]?.leaveStatus} />
                      }
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <button
              type="button"
              onClick={() =>
                push({
                  leaveType: "",
                  minLeave: "",
                  maxLeave: "",
                  deduction: "",
                  leaveStatus: "",
                })
              }
            >
              + Add Row
            </button>
          </>
        )}
      </FieldArray></>
  )
}

export default LeaveTypeSalaryDeductionTable