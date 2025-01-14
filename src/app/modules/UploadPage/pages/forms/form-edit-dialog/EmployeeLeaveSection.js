import React, { useRef } from "react";
import { Accordion, Button, Card, Modal } from "react-bootstrap";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { Input } from "../../../../../../_metronic/_partials/controls";
import { VALIDATION_MESSAGES } from "../../../../../utils/constants";
import { KeyboardArrowDown } from "@material-ui/icons";
import * as actions from "../../../_redux/formActions";

//Validation for Form
const formValidation = Yup.object().shape({
  allocatedCount: Yup.number().min(1, VALIDATION_MESSAGES.minOneValue).required(VALIDATION_MESSAGES.required),
});

export function EmployeeLeaveSection({ downloadExcel }) {

  //This ref is to get reference of file field. It will be used to clear field when reseting form
  const inputFile = useRef(null);

  const onClick = (e) => {
    e.preventDefault();
    downloadExcel(document, 'employee_leave', 'Employee_Leave_Template')
  }

  return (
    <>
      <Formik
        enableReinitialize={true}
        initialValues={{}}
        validationSchema={formValidation}
        onSubmit={(values) => {
          const formData = new FormData()
          formData.append('file', values.file)
          dispatch(actions.saveLeaveData(formData))
        }}
      >
        {({
          handleSubmit,
          errors,
          values,
          handleBlur,
          handleChange,
          setFieldValue,
        }) => (
          <Accordion defaultActiveKey="">
            <Card>
              <Card.Header>
                <div className='accordion-header-btn'>
                  <Accordion.Toggle as={Button} eventKey="0">
                    Data Upload - Employee Leave Balance
                    <KeyboardArrowDown />
                  </Accordion.Toggle>
                </div>
              </Card.Header>
              <Accordion.Collapse eventKey="0">
                <Card.Body>


                  {/* Form Start */}
                  <Form className="form form-label-right">
                    <fieldset>


                      <div className="from-group row">
                        <div className="col-12 col-md-4 mt-3">
                        </div>

                        <div className="col-12 col-md-4 mt-3">
                          <a><span onClick={onClick}>Download - Employee Leave Balance Template</span></a>
                        </div>

                        <div className="col-12 col-md-4 mt-3">
                        </div>
                      </div>

                      {/* File Field Start */}
                      <hr />
                      <input
                        name="file"
                        type="file"
                        accept=".jpeg,.jpg,.png,.pdf,.doc,.docx"
                        ref={inputFile}
                        onChange={(event) => {
                          // Update Formik's value
                          const file = event.currentTarget.files[0];
                          setFieldValue("file", file);
                        }}
                      />
                      <hr />
                      {/* File Field End */}

                    </fieldset>
                  </Form>
                  {/* Form End */}
                </Card.Body>
              </Accordion.Collapse>
            </Card>
          </Accordion>
        )}
      </Formik>
    </>
  );
}
