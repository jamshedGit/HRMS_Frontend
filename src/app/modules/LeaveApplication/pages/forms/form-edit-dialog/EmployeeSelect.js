import React from "react";
import { Modal } from "react-bootstrap";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { Input } from "../../../../../../_metronic/_partials/controls";

//Validation for Form
const formValidation = Yup.object().shape({

});

export function EmployeeSelect({
  actionsLoading,
}) {

  const dropdown = (data) => {
    return [{ value: "", label: "--Select Type--" }, ...data].map((el) => {
      return (<>
        <option value={el.value}>{el.label}</option>
      </>)
    })
  }

  return (
    <>
      <Formik
        enableReinitialize={true}
        initialValues={{}}
        validationSchema={formValidation}
      >
        {({
          errors,
          values,
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
                <fieldset>
                  <div className="from-group row">

                    <div className="col-12 col-md-4 mt-3">
                      <Field
                        name="employeeId"
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

                  </div>
                </fieldset>
              </Form>
            </Modal.Body>
          </>
        )}
      </Formik>
    </>
  );
}
