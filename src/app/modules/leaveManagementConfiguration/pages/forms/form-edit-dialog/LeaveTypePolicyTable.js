import { Field, FieldArray } from 'formik'
import React from 'react'
import { Checkbox, Input, Select } from '../../../../../../_metronic/_partials/controls'
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

function LeaveTypePolicyTable({ values, setFieldValue, dropdown, errors, touched }) {
  return (
    <>
      <h6>Leave Type Policies</h6>
      <FieldArray name="leavetypePolicies">
        {({ insert, remove, push }) => (
          <>
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
                    <td>
                      <button type="button" onClick={() => remove(index)}>
                        Delete
                      </button>
                    </td>
                    <td>
                      <Field
                        name={`leavetypePolicies[${index}].leaveType`}
                        component={Select}
                        // className={errors.subsidiaryId && !values.subsidiaryId ? 'form-control is-invalid' : 'form-control'}
                        onChange={(e) => {
                          setFieldValue(
                            `leavetypePolicies[${index}].leaveType`,
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
                      {errors.leavetypePolicies?.[index]?.leaveType &&
                        touched.leavetypePolicies?.[index]?.leaveType &&
                          <CustomErrorLabel touched={true} error={errors.leavetypePolicies?.[index]?.leaveType} />
                      }
                    </td>
                    <td>
                      <Field
                        name={`leavetypePolicies[${index}].gender`}
                        component={Select}
                        // className={errors.subsidiaryId && !values.subsidiaryId ? 'form-control is-invalid' : 'form-control'}
                        onChange={(e) => {
                          setFieldValue(
                            `leavetypePolicies[${index}].gender`,
                            e.target.value
                          )
                        }}
                        label={
                          <span>
                            {" "}
                            Gender<span style={{ color: "red" }}>*</span>
                          </span>
                        }
                        value={row.gender}
                        children={dropdown(genderOptions)}
                      />
                      {errors.leavetypePolicies?.[index]?.gender &&
                        touched.leavetypePolicies?.[index]?.gender &&
                          <CustomErrorLabel touched={true} error={errors.leavetypePolicies?.[index]?.gender} />
                      }
                    </td>
                    <td>
                      <Field
                        name={`leavetypePolicies[${index}].minExp`}
                        component={Input}
                        type="number"
                        // className={errors.subsidiaryId && !values.subsidiaryId ? 'form-control is-invalid' : 'form-control'}
                        onChange={(e) => {
                          setFieldValue(
                            `leavetypePolicies[${index}].minExp`,
                            e.target.value
                          )
                        }}
                        label={
                          <span>
                            {" "}
                            Min Exp<span style={{ color: "red" }}>*</span>
                          </span>
                        }
                        value={row.minExp}
                      />
                      {errors.leavetypePolicies?.[index]?.minExp &&
                        touched.leavetypePolicies?.[index]?.minExp &&
                          <CustomErrorLabel touched={true} error={errors.leavetypePolicies?.[index]?.minExp} />
                      }
                    </td>
                    <td>

                      <Field
                        name={`leavetypePolicies[${index}].maxAllowed`}
                        component={Input}
                        type="number"
                        // className={errors.subsidiaryId && !values.subsidiaryId ? 'form-control is-invalid' : 'form-control'}
                        onChange={(e) => {
                          setFieldValue(
                            `leavetypePolicies[${index}].maxAllowed`,
                            e.target.value
                          )
                        }}
                        label={
                          <span>
                            {" "}
                            Max Allowed<span style={{ color: "red" }}>*</span>
                          </span>
                        }
                        value={row.maxAllowed}
                      />
                      {errors.leavetypePolicies?.[index]?.maxAllowed &&
                        touched.leavetypePolicies?.[index]?.maxAllowed &&
                          <CustomErrorLabel touched={true} error={errors.leavetypePolicies?.[index]?.maxAllowed} />
                      }
                    </td>
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
                    <td>

                      <Field
                        name={`leavetypePolicies[${index}].maritalStatus`}
                        component={Select}
                        // className={errors.subsidiaryId && !values.subsidiaryId ? 'form-control is-invalid' : 'form-control'}
                        onChange={(e) => {
                          setFieldValue(
                            `leavetypePolicies[${index}].maritalStatus`,
                            e.target.value
                          )
                        }}
                        label={
                          <span>
                            {" "}
                            Marital Status<span style={{ color: "red" }}>*</span>
                          </span>
                        }
                        value={row.maritalStatus}
                        children={dropdown(maritalStatusOptions)}
                      />
                      {errors.leavetypePolicies?.[index]?.maritalStatus &&
                        touched.leavetypePolicies?.[index]?.maritalStatus &&
                          <CustomErrorLabel touched={true} error={errors.leavetypePolicies?.[index]?.maritalStatus} />
                      }
                    </td>
                    {

                    }
                  </tr>
                ))}
              </tbody>
            </table>
            <button
              type="button"
              onClick={() =>
                push({
                  leaveType: "",
                  gender: "",
                  minExp: "",
                  maxAllowed: "",
                  attachmentRequired: false,
                  maritalStatus: "",
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

export default LeaveTypePolicyTable