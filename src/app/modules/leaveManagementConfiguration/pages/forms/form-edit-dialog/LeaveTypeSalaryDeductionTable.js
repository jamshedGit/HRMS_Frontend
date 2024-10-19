import { Field, FieldArray } from 'formik'
import React from 'react'
import { Input, Select } from '../../../../../../_metronic/_partials/controls'
import CustomErrorLabel from '../../../../../utils/common-modules/CustomErrorLabel';

function LeaveTypeSalaryDeductionTable({ values, setFieldValue, createDropdown, errors, touched, dropdownData, handleDelete }) {
  return (
    <>
      <h6>Leave Type Salary Deduction Policies</h6>
      <FieldArray name="leaveTypeSalaryDeductionPolicies">
        {({ insert, remove, push }) => (
          <>
            {/* Table Starts */}
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
                    {/* Row Starts */}

                    {/* Delete Button Starts */}
                    <td>
                      <button type="button" onClick={() => {
                        handleDelete('LeaveTypeSalaryDeductionTable', values?.leaveTypeSalaryDeductionPolicies?.[index]?.Id, remove, index)
                      }}>
                        Delete
                      </button>
                    </td>
                    {/* Delete Button Ends */}

                    {/* Leave Type Field Starts */}
                    <td>
                      <Field
                        name={`leaveTypeSalaryDeductionPolicies[${index}].leaveType`}
                        component={Select}
                        className={errors.leaveTypeSalaryDeductionPolicies?.[index]?.leaveType && !row.leaveType ? 'form-control is-invalid' : 'form-control'}
                        onChange={(e) => {
                          const value = e.target.value == '--Select--' ? null : e.target.value
                          setFieldValue(
                            `leaveTypeSalaryDeductionPolicies[${index}].leaveType`,
                            value
                          )
                        }}
                        // label={
                        //   <span>
                        //     {" "}
                        //     leave Type<span style={{ color: "red" }}>*</span>
                        //   </span>
                        // }
                        value={row.leaveType}
                        children={createDropdown(dropdownData.allLeaveTypes || [], values?.leaveTypeSalaryDeductionPolicies)}
                      />
                      {errors.leaveTypeSalaryDeductionPolicies?.[index]?.leaveType &&
                        touched.leaveTypeSalaryDeductionPolicies?.[index]?.leaveType &&
                        <CustomErrorLabel touched={true} error={errors.leaveTypeSalaryDeductionPolicies?.[index]?.leaveType} />
                      }
                    </td>
                    {/* Leave Type Field Ends */}

                    {/* Min Leave Field Starts */}
                    <td>
                      <Field
                        name={`leaveTypeSalaryDeductionPolicies[${index}].minLeave`}
                        component={Input}
                        type="number"
                        className={errors.leaveTypeSalaryDeductionPolicies?.[index]?.minLeave && !row.minLeave ? 'form-control is-invalid' : 'form-control'}
                        onChange={(e) => {
                          setFieldValue(
                            `leaveTypeSalaryDeductionPolicies[${index}].minLeave`,
                            e.target.value
                          )
                        }}
                        // label={
                        //   <span>
                        //     {" "}
                        //     Min Leave<span style={{ color: "red" }}>*</span>
                        //   </span>
                        // }
                        value={row.minLeave}
                      />
                      {errors.leaveTypeSalaryDeductionPolicies?.[index]?.minLeave &&
                        touched.leaveTypeSalaryDeductionPolicies?.[index]?.minLeave &&
                        <CustomErrorLabel touched={true} error={errors.leaveTypeSalaryDeductionPolicies?.[index]?.minLeave} />
                      }
                    </td>
                    {/* Min Leave Field Ends */}

                    {/* Max Leave Field Starts */}
                    <td>
                      <Field
                        name={`leaveTypeSalaryDeductionPolicies[${index}].maxLeave`}
                        component={Input}
                        type="number"
                        className={errors.leaveTypeSalaryDeductionPolicies?.[index]?.maxLeave && !row.maxLeave ? 'form-control is-invalid' : 'form-control'}
                        onChange={(e) => {
                          setFieldValue(
                            `leaveTypeSalaryDeductionPolicies[${index}].maxLeave`,
                            e.target.value
                          )
                        }}
                        // label={
                        //   <span>
                        //     {" "}
                        //     Max Leave<span style={{ color: "red" }}>*</span>
                        //   </span>
                        // }
                        value={row.maxLeave}
                      />
                      {errors.leaveTypeSalaryDeductionPolicies?.[index]?.maxLeave &&
                        touched.leaveTypeSalaryDeductionPolicies?.[index]?.maxLeave &&
                        <CustomErrorLabel touched={true} error={errors.leaveTypeSalaryDeductionPolicies?.[index]?.maxLeave} />
                      }
                    </td>
                    {/* Max Leave Field Ends */}

                    {/* Deduction Field Starts */}
                    <td>
                      <Field
                        name={`leaveTypeSalaryDeductionPolicies[${index}].deduction`}
                        component={Input}
                        type="number"
                        className={errors.leaveTypeSalaryDeductionPolicies?.[index]?.deduction && !row.deduction ? 'form-control is-invalid' : 'form-control'}
                        onChange={(e) => {
                          setFieldValue(
                            `leaveTypeSalaryDeductionPolicies[${index}].deduction`,
                            e.target.value
                          )
                        }}
                        // label={
                        //   <span>
                        //     {" "}
                        //     Deduction<span style={{ color: "red" }}>*</span>
                        //   </span>
                        // }
                        value={row.deduction}
                      />
                      {errors.leaveTypeSalaryDeductionPolicies?.[index]?.deduction &&
                        touched.leaveTypeSalaryDeductionPolicies?.[index]?.deduction &&
                        <CustomErrorLabel touched={true} error={errors.leaveTypeSalaryDeductionPolicies?.[index]?.deduction} />
                      }
                    </td>
                    {/* Deduction Field Ends */}

                    {/* Leave status Field Starts */}
                    <td>
                      <Field
                        name={`leaveTypeSalaryDeductionPolicies[${index}].leaveStatus`}
                        component={Select}
                        className={errors.leaveTypeSalaryDeductionPolicies?.[index]?.leaveStatus && !row.leaveStatus ? 'form-control is-invalid' : 'form-control'}
                        onChange={(e) => {
                          const value = e.target.value == 'All' ? null : e.target.value
                          setFieldValue(
                            `leaveTypeSalaryDeductionPolicies[${index}].leaveStatus`,
                            value
                          )
                        }}
                        // label={
                        //   <span>
                        //     {" "}
                        //     Leave Status<span style={{ color: "red" }}>*</span>
                        //   </span>
                        // }
                        value={row.leaveStatus}
                        children={createDropdown(dropdownData.allLeaveStatus || [])}
                      />
                      {errors.leaveTypeSalaryDeductionPolicies?.[index]?.leaveStatus &&
                        touched.leaveTypeSalaryDeductionPolicies?.[index]?.leaveStatus &&
                        <CustomErrorLabel touched={true} error={errors.leaveTypeSalaryDeductionPolicies?.[index]?.leaveStatus} />
                      }
                    </td>
                    {/* Leave status Field Ends */}

                    {/* Row Ends */}
                  </tr>
                ))}
              </tbody>
            </table>
            {/* Table Ends */}

            {/* Add Button Field Starts */}
            <button
              type="button"
              onClick={() =>
                push({
                  leaveType: "",
                  minLeave: "",
                  maxLeave: "",
                  deduction: "",
                  leaveStatus: null,
                })
              }
            >
              + Add Row
            </button>
            {/* Add Button Field Ends */}
          </>
        )}
      </FieldArray></>
  )
}

export default LeaveTypeSalaryDeductionTable