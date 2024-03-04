import React, {useState} from "react"
import { Input } from "../../../../../../_metronic/_partials/controls"
import { Formik, Form, Field } from "formik"
import * as Yup from "yup"
import { Modal } from "react-bootstrap"
//Validation schema
const RoleEditSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, "Minimum 3 symbols")
    .max(50, "Maximum 50 symbols")
    .required("Role name is required"),
})
export function RoleEditForm({ onHide, saveRole, role, actionsLoading, loading }) {
 

  return (
    <>
      <Formik
      enableReinitialize={true}
        initialValues={role}
        validationSchema={RoleEditSchema}
        onSubmit={(values) => {
         
          saveRole(values)
        }}
      >
        {({ handleSubmit }) => (
          <>
            <Modal.Body className="overlay overlay-block cursor-default">
             
              <Form className="form form-label-right">
                <div className="form-group row">
                  <div className="col-12 mx-auto">
                    <Field
                      name="name"
                      component={Input}
                      placeholder="Role Name"
                      label="Role Name*"
                    />
                  </div>
                </div>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <button
                type="button"
                onClick={onHide}
                className="btn btn-light btn-elevate"
              >
                Cancel
              </button>
              <> </>
              <button
                type="submit"
                onClick={() => handleSubmit()}
                className="btn btn-primary btn-elevate"
              >
                Save
                {loading && <span className="ml-3 mr-3 spinner spinner-white"></span>}
              </button>
            </Modal.Footer>
          </>
        )}
      </Formik>
    </>
  )
}
