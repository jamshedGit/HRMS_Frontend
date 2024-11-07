import React from "react";
import { Modal } from "react-bootstrap";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { Select } from "../../../../../../_metronic/_partials/controls";
import { useSelector, shallowEqual } from "react-redux"
import CustomDropdown from "../../../../../utils/common-modules/CustomDropdown";
import CustomErrorLabel from "../../../../../utils/common-modules/CustomErrorLabel";
import { VALIDATION_MESSAGES } from "../../../../../utils/constants";

export function EmployeeSelect({
  actionsLoading,
  setemployeeId,
  setId
}) {

  //Get all Employee list from dashboard global state
  const { allEmployees } = useSelector(
    (state) => ({
      allEmployees: state.dashboard.allEmployees
    }),
    shallowEqual
  )
  return (
    <>
      {/* Formik Starts */}
      <Formik
        enableReinitialize={true}
        initialValues={{}}
      >
        {({
          errors,
          values,
          handleBlur,
          setFieldValue,
        }) => (
          <>

            {actionsLoading && (
              <div className="overlay-layer bg-transparent">
                <div className="spinner spinner-lg spinner-success" />
              </div>
            )}
            {/* Form Starts */}
            <Form className="form form-label-right">
              <fieldset>
                <div className="from-group row">

                  {/* Employee Id Dropdown Starts */}
                  <div className="col-12 col-md-4 mt-3">
                    <Field
                      name="employeeId"
                      component={Select}
                      className={!values.employeeId ? 'form-control is-invalid' : 'form-control'}
                      placeholder=""
                      onBlur={handleBlur}
                      onChange={(e) => {
                        const value = e.target.value == '--Select--' ? '' : Number(e.target.value)
                        setFieldValue('employeeId', value)
                        setemployeeId(value) //Set Employee Id in context for server
                        setId(''); //Clear Edit values on Employee Change
                      }}
                      label={
                        <span>
                          {" "}
                          Employee<span style={{ color: "red" }}>*</span>
                        </span>
                      }
                      value={values.employeeId}
                      autoComplete="off"
                      children={CustomDropdown({ data: allEmployees, firstElement: { label: '--Select--', value: '' } })}
                    />
                    {
                      !values.employeeId && <CustomErrorLabel touched={true} error={VALIDATION_MESSAGES.required} />
                    }
                  </div>
                  {/* Employee Id Dropdown Ends */}
                  
                </div>
              </fieldset>
            </Form>
            {/* Form Ends */}
          </>
        )}
      </Formik>
      {/* Formik Ends */}
    </>
  );
}
