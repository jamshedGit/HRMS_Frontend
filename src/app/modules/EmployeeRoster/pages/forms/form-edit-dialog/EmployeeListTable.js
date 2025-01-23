import { Field, FieldArray } from 'formik'
import React, { useMemo } from 'react'
import CustomErrorLabel from '../../../../../utils/common-modules/CustomErrorLabel';
import { SearchSelect } from '../../../../../../_metronic/_helpers/SearchSelect';

function EmployeeListTable({ values, setFieldValue, errors, touched, dropdownData, handleDelete, isEdit }) {

  //Set All Employees List in Map so we can get data faster in the field
  const allEmployees = useMemo(() => {
    return new Map(dropdownData.allEmployees?.map(item => [item.value, item]));
  }, [dropdownData.allEmployees]);

  return (
    <>
      <h6>Employee List</h6>
      <FieldArray name="list">
        {({ insert, remove, push }) => (
          <>
            {/* Table Starts */}
            <table className="table table-hover">
              <thead>
                <tr style={{ backgroundColor: "#4d5f7a", color: "#fff" }}>
                  <td>Action</td>
                  <td>Employee</td>
                </tr>
              </thead>
              <tbody>
                {values.list.map((row, index) => (
                  <tr key={index}>
                    {/* Row Starts */}

                    {/* Delete Button Starts */}
                    <td>
                      <button disabled={isEdit} className="btn btn-danger btn-elevate" type="button" onClick={() => {
                        remove(index)
                      }}>
                        Delete
                      </button>
                    </td>
                    {/* Delete Button Ends */}

                    {/* Employee Field Starts */}
                    <td>
                      <Field
                        name={`list[${index}].employeeId`}
                        component={SearchSelect}
                        className={errors.list?.[index]?.employeeId && touched.list?.[index]?.employeeId ? 'form-control is-invalid' : 'form-control'}
                        onChange={(e) => {
                          const value = e.label == '--Select--' ? '' : Number(e.value)
                          setFieldValue(
                            `list[${index}].employeeId`,
                            value
                          )
                        }}
                        error={errors.list?.[index]?.employeeId}
                        touched={touched.list?.[index]?.employeeId}
                        isDisabled={isEdit}
                        value={allEmployees?.get(row?.employeeId || '') || ''}
                        options={dropdownData.allEmployees || []}
                      />
                      {/* {errors.list?.[index]?.employeeId &&
                        touched.list?.[index]?.employeeId &&
                        <CustomErrorLabel touched={true} error={errors.list?.[index]?.employeeId} />
                      } */}
                    </td>
                    {/* Employee Field Ends */}

                    {/* Row Starts */}
                  </tr>
                ))}
              </tbody>
            </table>
            {/* Table Ends */}

            {/* Add button Field Starts */}
            {!isEdit && <button
              type="button"
              className="btn btn-primary btn-elevate"
              onClick={() =>
                push({
                  employeeId: "",
                })
              }
            >
              + Add Row
            </button>}
            {/* Add button Field Ends */}
          </>
        )}
      </FieldArray></>
  )
}

export default EmployeeListTable