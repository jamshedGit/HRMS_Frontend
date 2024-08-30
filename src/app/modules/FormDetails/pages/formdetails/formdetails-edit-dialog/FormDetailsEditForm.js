import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { Input, Select, TextArea } from "../../../../../../_metronic/_partials/controls";
import { useDispatch, useSelector } from "react-redux";
import { SearchSelect } from "../../../../../../_metronic/_helpers/SearchSelect";
import {
  fetchAllCity,
  fetchAllCityCenters,
  fetchAllSubCenter,
  getLatestBookingNo,
  fetchAllFormsMenu
} from "../../../../../../_metronic/redux/dashboardActions";


// Phone Number Regex
const phoneRegExp = /^((\+92)|(0092))-{0,1}\d{3}-{0,1}\d{7}$|^\d{11}$|^\d{4}-\d{7}$/;
// CNIC Regex
const cnicRegExp = /^[0-9]{5}-[0-9]{7}-[0-9]$/;
// Password Regex
const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
// Validation schema
const FormEditSchema = Yup.object().shape(
  {
    formName: Yup.string()
      .required("Required*"),
    // formCode: Yup.string()
    //   .required("Required*"),

  },

);
export function FormEditForm({
  saveReligion,
  user,
  actionsLoading,
  onHide,
  roles,
  centers,
  userStatusTypes,
  isUserForRead,
  values,
  enableLoading,
  loading,
}) {



  const dispatch = useDispatch();
  const { dashboard } = useSelector((state) => {
    
    return state
  });
  // Get User Details
  const { auth, formDetails } = useSelector((state) => state);
  const [defFormMenu = null, setDefaultParentFormMenu] = useState(null);

  const [ddlParentForm, setddlParentForm] = useState(null)

  useEffect(() => {
   
    if (!user.parentFormID) {
      dispatch(fetchAllFormsMenu(1));
    }
  }, [dispatch]);

  useEffect(() => {
   
    if (formDetails.currentId) {

      setddlParentForm(
        dashboard.allParentMenus &&
        dashboard.allParentMenus.filter((item) => {

          return item.value === formDetails.currentId;
        })
      );

    }

  }, [dashboard.allParentMenus]

  )

  // This method is used for when edit record and get selected dept where id save in DB
  // useEffect(() => {
  //   const parentFormID = defFormMenu?.value ? defFormMenu.value : user.parentFormID;

  //   setDefaultParentFormMenu(
  //     dashboard.allDept &&
  //     dashboard.allDept.filter((item) => {

  //       return item.value === parentFormID;
  //     })
  //   );
  // }, [user?.parentFormID, dashboard.parentFormID]);


  console.log("defFormMenu", defFormMenu)

  return (
    <>
      <Formik
        enableReinitialize={true}
        initialValues={user}
        validationSchema={FormEditSchema}
        onSubmit={(values) => {
          //  console.log("values", values);
          enableLoading();
          values.formCode = 'NA ';
          saveReligion(values);
        }}
      >
        {({
          handleSubmit,
          errors,
          touched,
          values,
          handleBlur,
          handleChange,
          setFieldValue,
          formik,
        }) => (
          <>
            <Modal.Body className="overlay overlay-block cursor-default">
              {actionsLoading && (
                <div className="overlay-layer bg-transparent">
                  <div className="spinner spinner-lg spinner-success" />
                </div>
              )}
              <Form className="form form-label-right">
                <fieldset disabled={isUserForRead}>
                  <div className="from-group row">
                    {/* {
                      <div className="col-12 col-md-4 mt-3">
                        <SearchSelect
                          name="parentFormID"
                          label="Select Parent Form*"
                          onHide="true"
                          // isDisabled={isUserForRead && true}
                          // isDisabled={true}
                          onBlur={() => {
                            // handleBlur({ target: { name: "countryId" } });
                          }}
                          onChange={(e) => {
                            setFieldValue("parentFormID", e.value || null);
                            setDefaultParentFormMenu(e);
                            dispatch(fetchAllFormsMenu(e.value));
                          }}
                          value={(ddlParentForm || defFormMenu || null)}
                          error={errors.Id}
                          touched={touched.Id}
                          options={dashboard.allParentMenus}
                        />

                      </div>

                    } */}
                    {<div className="col-12 col-md-4 mt-3">
                      <Field
                        name="formName"
                        component={Input}
                        placeholder="Enter Form Name"
                        label="Form Name"

                      />
                    </div>}
                    {/* {<div className="col-12 col-md-4 mt-3">
                      <Field
                        name="formCode"
                        component={Input}
                        placeholder="Enter Form Code"
                        label="Form Code"

                      />
                    </div>} */}
                  </div>
                  <div className="form-group row"></div>
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

              <> </>
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
    </>
  );
}
