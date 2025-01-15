import React, { useRef } from "react";
import { Accordion, Button, Card, Modal } from "react-bootstrap";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { VALIDATION_MESSAGES } from "../../../../../utils/constants";
import { KeyboardArrowDown } from "@material-ui/icons";
import * as actions from "../../../_redux/formActions";

//Validation for Form
const formValidation = Yup.object().shape({
  file: Yup.mixed().required(VALIDATION_MESSAGES.required)
});

export function LoanOpeningSection({ downloadExcel, dispatch }) {

  //This ref is to get reference of file field. It will be used to clear field when reseting form
  const inputFile = useRef(null);

  const onClick = (e) => {
    e.preventDefault();
    downloadExcel(document, 'loan_balance', 'Loan_Balance_Template')
  }

  return (
    <>
      <Formik
        enableReinitialize={true}
        initialValues={{ file: null }}
        validationSchema={formValidation}
        onSubmit={(values) => {
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
                    Data Upload - Loan Opening Balance
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

                        <div className="col-12 col-md-4 mt-3" style={{textAlign:"center", textDecoration: 'underline'}}>
                          <a><span onClick={onClick}>Download -  Loan Opening Balance Template</span></a>
                        </div>

                        <div className="col-12 col-md-4 mt-3">
                        </div>
                      </div>

                      {/* File Field Start */}
                      <hr />
                      <input
                        name="file"
                        type="file"
                        accept=".xlsx,.xls"
                        ref={inputFile}
                        onChange={(event) => {
                          // Update Formik's value
                          const file = event.currentTarget.files[0];
                          setFieldValue("file", file);
                        }}
                      />
                      <hr />
                      {/* File Field End */}

                      <button
                        type="submit"
                        disabled={false}
                        onClick={() => handleSubmit()}
                        className="btn btn-primary btn-elevate"
                      >
                        Save
                        {false && (
                          <span className="ml-3 mr-3 spinner spinner-white"></span>
                        )}
                      </button>

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
