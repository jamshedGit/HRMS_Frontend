import React from "react";
import { Modal } from "react-bootstrap";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { Input } from "../../../../../../_metronic/_partials/controls"; // Adjust import as needed
import { useDispatch, useSelector } from "react-redux";




const tax_slabEditSchema = Yup.object().shape(
  {
    from_amount: Yup.string()
      .required("Required*"),

      to_amount: Yup.string()
      .required("Required*"),

      percentage: Yup.string()
      .required("Required*"),

      fixed_amount: Yup.string()
      .required("Required*"),
   
  },
  
);

export function FormEditForm({
  saveSalarypolicy,
  user,
  actionsLoading,
  onHide,
  isUserForRead,
  enableLoading,
  loading,
}) {
  console.log("FormEditForm user", user);



  console.log("initialValues user.Type", user);

  return (
    <Formik
      enableReinitialize={true}
      // initialValues={{
      //   Id:user.Id || '',
      //   type: user.type ||  '',
      //   value:user.value || 0,
      //   multiplier: user.multiplier || 0,
      //   divisor: user.divisor || 0,
      // }}

      initialValues={user}
      validationSchema={tax_slabEditSchema}
      onSubmit={(values) => {
        console.log("values", values);
        enableLoading();
        saveSalarypolicy(values);
      }}
    >
      {({ handleSubmit, values, setFieldValue }) => (
        <>
          <Modal.Body className="overlay overlay-block cursor-default">
            {actionsLoading && (
              <div className="overlay-layer bg-transparent">
                <div className="spinner spinner-lg spinner-success" />
              </div>
            )}
            <Form className="form form-label-right">
              <fieldset disabled={isUserForRead}>
                <div className="form-group row">
            

                  <div className="col-12 col-md-4 mt-3">
                    <Field
                      name="from_amount"
                      component={Input}
                      placeholder="Enter From Amount"
                      label="From Amount"
                      type="number"
                    />
                  </div>

                  

                  <div className="col-12 col-md-4 mt-3">
                    <Field
                      name="to_amount"
                      component={Input}
                      placeholder="Enter To Amount"
                      label="To Amount"
                      type="number"
                    />
                  </div>

                

                  <div className="col-12 col-md-4 mt-3">
                    <Field
                      name="percentage"
                      component={Input}
                      placeholder="Enter Percentage"
                      label="Percentage"
                      type="number"
                    />
                  </div>
                  <div className="col-12 col-md-4 mt-3">
                    <Field
                      name="fixed_amount"
                      component={Input}
                      placeholder="Enter Fixed Amount"
                      label="Fixed Amount"
                      type="number"
                    />
                  </div>

                
                </div>
              </fieldset>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            {!isUserForRead ? (
              <button
                type="button"
                onClick={onHide}
                className="btn btn-light btn-elevate"
              >
                Cancel
              </button>
            ) : (
              <button
                type="button"
                onClick={onHide}
                className="btn btn-primary btn-elevate"
              >
                Ok
              </button>
            )}
         
              {/* <button
                type="submit"
                onClick={() => handleSubmit()}
                className="btn btn-primary btn-elevate"
              >
                Save
                {loading && (
                  <span className="ml-3 mr-3 spinner spinner-white"></span>
                )}
              </button> */}

{!isUserForRead && (
                <button
                  type="submit"
                  onClick={() => handleSubmit()}
                  className="btn btn-primary btn-elevate"
                >
                  Save
                  {loading && (
                    <span className="ml-3 mr-3 spinner spinner-white"></span>
                  )}
                </button>
              )}
         
          </Modal.Footer>
        </>
      )}
    </Formik>
  );
}
