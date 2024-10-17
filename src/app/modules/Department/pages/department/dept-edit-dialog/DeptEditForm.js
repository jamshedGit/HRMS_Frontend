import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { Checkbox, Input, Select, TextArea } from "../../../../../../_metronic/_partials/controls";
import { useDispatch, useSelector } from "react-redux";
import { SearchSelect } from "../../../../../../_metronic/_helpers/SearchSelect";

import {
  fetchAllDept,

} from "../../../../../../_metronic/redux/dashboardActions";
import DeptManagement from "../..";
import CheckBox from "@material-ui/icons/CheckBox";


// Phone Number Regex
const phoneRegExp = /^((\+92)|(0092))-{0,1}\d{3}-{0,1}\d{7}$|^\d{11}$|^\d{4}-\d{7}$/;
// CNIC Regex
const cnicRegExp = /^[0-9]{5}-[0-9]{7}-[0-9]$/;
// Password Regex
const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
const userEditSchema_2 = Yup.object().shape(
  {
    // parentDept: Yup.string().required("Please select parent department"),
    deptCode: Yup.string().required("*Required"),
    deptName: Yup.string().required("*Required"),
    budgetStrength: Yup.string().required("*Required"),
    subsidiary: Yup.string().required("*Required"),
  }
);


export function DeptEditForm({
  saveDept,
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

  const { dashboard } = useSelector((state) => state);
  const [defCountry, setDefaultCountry] = useState({});
  const [defCity, setDefaultCity] = useState({});
  // Get User Details
  const { auth } = useSelector((state) => state);
  const [defBank, setDefaultBanks] = useState({});
  const [defDept = null, setDefaultDept] = useState(null);

  const [accOpeningDateSelected, setAccountOpeningDate] = useState(null);



  // Department DropDown Load when pageLoad
  useEffect(() => {
    if (!user.deptId) {
      dispatch(fetchAllDept(1));
    }
  }, [dispatch]);


  // This method is used for when edit record and get selected dept where id save in DB
  useEffect(() => {
    const deptId = defDept?.value ? defDept.value : user.parentDept;
    setDefaultDept(
      dashboard.allDept &&
      dashboard.allDept.filter((item) => {
        return item.value === deptId;
      })
    );
  }, [user?.deptId, dashboard.parentDept]);

  const onCheckboxChange = async (event) => {
    const target = event.currentTarget;
    const name = target.name;
    const id = target.id;
    const checked = target.checked;

    console.log("checked", checked, id, name, target)
    // console.log("Access Right", {
    //   roleId: name,
    //   resourceId: id,
    //   isAccess: checked,
    // })

    // openRoleAccessPage(row.id)
    // await dispatch(
    //   actions.updateAccessRightByRoleAndResourceId({
    //     roleId: name,
    //     resourceId: id,
    //     isAccess: checked,
    //   })
    // );

    // setIsChecked({
    //   ...isChecked,
    //   [id]: checked, // using "id" seems to not work here.
    // });
  };

  const initialValues = {
    deptName: '',
    deptCode: '',
    parentDept: '',
    chkParent: false, // Initialize checkbox value
    budgetStrength: '',
    subsidiary: '',
  };

  return (
    <>
      <Formik
        enableReinitialize={true}
        initialValues={user}
        validationSchema={userEditSchema_2}
        onSubmit={(values) => {
          console.log("values", values);
          
          enableLoading();
          saveDept(values);
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
                    <div className="col-12 col-md-4 mt-3">
                      <Field
                        name="deptName"
                        component={Input}
                        placeholder="Enter Department Name"
                        label={<span> Department<span style={{ color: 'red' }}>*</span></span>}
                      />
                    </div>
                    {
                      <div className="col-12 col-md-4 mt-3">
                        <Field
                          name="deptCode"
                          component={Input}
                          placeholder="Enter Department Code"
                          label={<span> Code<span style={{ color: 'red' }}>*</span></span>}
                        />
                      </div>
                    }
                    {
                      <div className="col-12 col-md-4 mt-3">
                        <SearchSelect
                          name="  "
                          label={<span> Parent Dept<span style={{ color: 'red' }}>*</span></span>}
                          isDisabled={isUserForRead && true}
                          onBlur={() => {
                            // handleBlur({ target: { name: "countryId" } });
                          }}
                          onChange={(e) => {
                            setFieldValue("parentDept", e.value || null);
                            setDefaultDept(e);
                          //  dispatch(fetchAllDept(e.value));
                          }}
                          value={(defDept || null)}
                          error={errors.parentDept}
                          touched={touched.parentDept}
                          options={dashboard.allDept}
                        />
                        {/* isParent &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 
                         <Field
                          type="checkbox"
                          id="chkParent"
                          name="chkParent"
                          className="form-check-input"
                          checked={values.chkParent}
                          defaultChecked = {false}
                          onChange={(e) => { setFieldValue('chkParent', e.target.checked)

                            if(e.target.checked)
                              {
                                console.log("t")
                              }

                           }}
                        /> */}
                        {/* <input
                          type="checkbox"
                          className="form-check-input"
                          id="chkParent"
                          name="chkParent"
                          label="isParent"
                        // defaultChecked={right.isAccess}
                         onChange={onCheckboxChange}
                        /> */}

                      </div>

                    }
                    {
                      <div className="col-12 col-md-4 mt-3">
                        <Field
                          name="budgetStrength"
                          component={Input}
                          placeholder="Enter budgetStrength"
                          label={<span> Bugdet Strength<span style={{ color: 'red' }}>*</span></span>}
                          
                        />
                      </div>
                    }
                  
                    {
                      <><div className="col-12 col-md-4 mt-3">
                        <Select
                         
                          name="subsidiary"
                          label={<span> Subsidiary<span style={{ color: 'red' }}>*</span></span>}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          style={{ display: "block" }}
                        >
                          <option value="-1" label="Select Subsidiary" />
                          <option value="1" label="Pakistan" />
                          <option value="2" label="Dubai" />
                          <option value="3" label="Australia" />

                        </Select>
                        {errors.subsidiary && touched.subsidiary && (
                          <div className="invalid-text">{errors.subsidiary}</div>
                        )}
                      </div></>

                    }

                    {/* {<div className="col-12 col-md-4 mt-3">
                      <SearchSelect
                        name="countryId"
                        label="Select Country*"
                        isDisabled={isUserForRead && true}
                        onBlur={() => {
                          // handleBlur({ target: { name: "countryId" } });
                        }}
                        onChange={(e) => {
                          setFieldValue("countryId", e.value);
                          setDefaultCountry(e);
                          dispatch(fetchAllCity(e.value));
                        }}
                        value={defCountry}
                        error={errors.countryId}
                        touched={touched.countryId}
                        options={dashboard.allCountry}
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
