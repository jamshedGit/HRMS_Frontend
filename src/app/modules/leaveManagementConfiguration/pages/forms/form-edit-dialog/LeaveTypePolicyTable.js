import { Field, FieldArray } from 'formik'
import React from 'react'
import { Checkbox, Input, Select } from '../../../../../../_metronic/_partials/controls'
import CustomErrorLabel from '../../../../../utils/common-modules/CustomErrorLabel';

function LeaveTypePolicyTable({ values, setFieldValue, createDropdown, errors, touched, dropdownData, handleDelete }) {
  return (
    <>
      <h6>Leave Type Policies</h6>
      <FieldArray name="leavetypePolicies">
        {({ insert, remove, push }) => (
          <>
            {/* Table Starts */}
            <table className="table table-hover">
              <thead>
                <tr style={{ backgroundColor: "#4d5f7a", color: "#fff" }}>
                  <td></td>
                  <td>Leave Type</td>
                  <td>Gender</td>
                  <td>Min Experience</td>
                  <td>Max Allowed</td>
                  <td>Attachment Required</td>
                  <td>Marital Status</td>
                </tr>
              </thead>
              <tbody>
                {values.leavetypePolicies.map((row, index) => (
                  <tr key={index}>
                    {/* Row Starts */}

                    {/* Delete Button Starts */}
                    <td>
                      <button type="button" onClick={() => {
                        handleDelete('LeaveTypePolicyTable', values?.leavetypePolicies?.[index]?.Id, remove, index)
                      }}>
                        Delete
                      </button>
                    </td>
                    {/* Delete Button Ends */}

                    {/* Leave Type Field Starts */}
                    <td>
                      <Field
                        name={`leavetypePolicies[${index}].leaveType`}
                        component={Select}
                        className={errors.leavetypePolicies?.[index]?.leaveType && !row.leaveType ? 'form-control is-invalid' : 'form-control'}
                        onChange={(e) => {
                          const value = e.target.value == '--Select--' ? null : Number(e.target.value)
                          setFieldValue(
                            `leavetypePolicies[${index}].leaveType`,
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
                        children={createDropdown(dropdownData.allLeaveTypes || [], values?.leavetypePolicies)}
                      />
                      {errors.leavetypePolicies?.[index]?.leaveType &&
                        touched.leavetypePolicies?.[index]?.leaveType &&
                        <CustomErrorLabel touched={true} error={errors.leavetypePolicies?.[index]?.leaveType} />
                      }
                    </td>
                    {/* Leave Type Field Ends */}

                    {/* Gender Field Starts */}
                    <td>
                      <Field
                        name={`leavetypePolicies[${index}].gender`}
                        component={Select}
                        className={errors.leavetypePolicies?.[index]?.gender && !row.gender ? 'form-control is-invalid' : 'form-control'}
                        onChange={(e) => {
                          const value = e.target.value == 'All' ? null : Number(e.target.value)
                          setFieldValue(
                            `leavetypePolicies[${index}].gender`,
                            value
                          )
                        }}
                        // label={
                        //   <span>
                        //     {" "}
                        //     Gender<span style={{ color: "red" }}>*</span>
                        //   </span>
                        // }
                        value={row.gender}
                        children={createDropdown(dropdownData.allGenderList || [])}
                      />
                      {errors.leavetypePolicies?.[index]?.gender &&
                        touched.leavetypePolicies?.[index]?.gender &&
                        <CustomErrorLabel touched={true} error={errors.leavetypePolicies?.[index]?.gender} />
                      }
                    </td>
                    {/* Gender Field Ends */}

                    {/* Min Experience Field Starts */}
                    <td>
                      <Field
                        name={`leavetypePolicies[${index}].minExp`}
                        component={Input}
                        type="number"
                        min="0"
                        className={errors.leavetypePolicies?.[index]?.minExp && !row.minExp ? 'form-control is-invalid' : 'form-control'}
                        onChange={(e) => {
                          setFieldValue(
                            `leavetypePolicies[${index}].minExp`,
                            e.target.value
                          )
                        }}
                        // label={
                        //   <span>
                        //     {" "}
                        //     Min Exp<span style={{ color: "red" }}>*</span>
                        //   </span>
                        // }
                        value={row.minExp}
                      />
                      {errors.leavetypePolicies?.[index]?.minExp &&
                        touched.leavetypePolicies?.[index]?.minExp &&
                        <CustomErrorLabel touched={true} error={errors.leavetypePolicies?.[index]?.minExp} />
                      }
                    </td>
                    {/* Min Experience Field Ends */}

                    {/* Max Allowed Field Starts */}
                    <td>
                      <Field
                        name={`leavetypePolicies[${index}].maxAllowed`}
                        component={Input}
                        type="number"
                        min="0"
                        className={errors.leavetypePolicies?.[index]?.maxAllowed && !row.maxAllowed ? 'form-control is-invalid' : 'form-control'}
                        onChange={(e) => {
                          setFieldValue(
                            `leavetypePolicies[${index}].maxAllowed`,
                            e.target.value
                          )
                        }}
                        // label={
                        //   <span>
                        //     {" "}
                        //     Max Allowed<span style={{ color: "red" }}>*</span>
                        //   </span>
                        // }
                        value={row.maxAllowed}
                      />
                      {errors.leavetypePolicies?.[index]?.maxAllowed &&
                        touched.leavetypePolicies?.[index]?.maxAllowed &&
                        <CustomErrorLabel touched={true} error={errors.leavetypePolicies?.[index]?.maxAllowed} />
                      }
                    </td>
                    {/* Max Allowed Field Ends */}

                    {/* Attachement Required Field Starts */}
                    <td>
                      <Field
                        name={`leavetypePolicies[${index}].attachmentRequired`}
                        component={Checkbox}
                        onChange={(e) => {
                          setFieldValue(
                            `leavetypePolicies[${index}].attachmentRequired`,
                            e.target.checked
                          )
                        }}
                        isSelected={row.attachmentRequired}
                      />
                      {errors.leavetypePolicies?.[index]?.attachmentRequired &&
                        touched.leavetypePolicies?.[index]?.attachmentRequired &&
                        <CustomErrorLabel touched={true} error={errors.leavetypePolicies?.[index]?.attachmentRequired} />
                      }
                    </td>
                    {/* Attachement Required Field End */}

                    {/* Marital Status Field Starts */}
                    <td>
                      <Field
                        name={`leavetypePolicies[${index}].maritalStatus`}
                        component={Select}
                        className={errors.leavetypePolicies?.[index]?.maritalStatus && !row.maritalStatus ? 'form-control is-invalid' : 'form-control'}
                        onChange={(e) => {
                          const value = e.target.value == 'All' ? null : Number(e.target.value)
                          setFieldValue(
                            `leavetypePolicies[${index}].maritalStatus`,
                            value
                          )
                        }}
                        // label={
                        //   <span>
                        //     {" "}
                        //     Marital Status<span style={{ color: "red" }}>*</span>
                        //   </span>
                        // }
                        value={row.maritalStatus}
                        children={createDropdown(dropdownData.allMaritalStatus || [])}
                      />
                      {errors.leavetypePolicies?.[index]?.maritalStatus &&
                        touched.leavetypePolicies?.[index]?.maritalStatus &&
                        <CustomErrorLabel touched={true} error={errors.leavetypePolicies?.[index]?.maritalStatus} />
                      }
                    </td>
                    {/* Marital Status Field Ends */}
                  
                    {/* Row Starts */}
                  </tr>
                ))}
              </tbody>
            </table>
             {/* Table Ends */}

            {/* Add button Field Starts */}
            <button
              type="button"
              onClick={() =>
                push({
                  leaveType: "",
                  gender: null,
                  minExp: "",
                  maxAllowed: "",
                  attachmentRequired: false,
                  maritalStatus: null,
                })
              }
            >
              + Add Row
            </button>
            {/* Add button Field Ends */}
          </>
        )}
      </FieldArray></>
  )
}

export default LeaveTypePolicyTable