import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { Input } from "../../../../../../_metronic/_partials/controls"; // Adjust import as needed
import { useDispatch, useSelector } from "react-redux";
import { SearchSelect } from "../../../../../../_metronic/_helpers/SearchSelect";
import {
  fetchAllFormsMenu,
  fetchAllHumanResourceRole,
} from "../../../../../../_metronic/redux/dashboardActions";
import { fetchAllAccountMenu } from "../../../../../../_metronic/redux/dashboardActions";

// percentage: Yup.string().required("Required*"),
const tax_slabEditSchema = Yup.object().shape({
  // from_amount: Yup.string().required("Required*"),

  from_amount: Yup.number()
    .min(0, "Must be at least 0")
    .required("Required*"),

  // to_amount: Yup.string().required("Required*"),

  to_amount: Yup.number()
    .min(0, "Must be at least 0")
    .required("Required*"),

  percentage: Yup.number()
    .min(0, "Must be at least 0")
    .max(100, "Must be at most 100")
    .required("Required*"),

  // fixed_amount: Yup.string().required("Required*"),

  fixed_amount: Yup.number()
    .min(0, "Must be at least 0")
    .required("Required*"),
});

export function FormEditForm({
  saveForm,
  user,
  actionsLoading,
  onHide,
  isUserForRead,
  enableLoading,
  loading,
}) {
  console.log("FormEditForm user", user);

  const dispatch = useDispatch();
  const { dashboard } = useSelector((state) => state);
  console.log("initialValues user.Type", user);
  const [defSubsidiary = null, setDefualtSubsidiaryList] = useState(null);
  const [defAccount = null, setDefualtAccountList] = useState(null);
  const [defHumanResourceRole = null, setHumanResourceRoleList] = useState(
    null
  );

  useEffect(() => {
    if (!user.Id) {
      dispatch(fetchAllFormsMenu(133, "allSubidiaryList")); // For All Subsisidaries
      dispatch(fetchAllFormsMenu(45, "allAccountList")); // For All Subsisidaries
      dispatch(fetchAllHumanResourceRole("allHumanResourceRoleList"));
      console.log("allHumanResourceRoleList admin", defHumanResourceRole);
    }
  }, [dispatch]);

  const options=[
    { value: "Gross", label: "Gross" },
    { value: "NET", label: "NET" },
  ]

  const Dropdown = ({ field, form, options, label, onChange }) => (
    <div className="form-group">
      <label>{label}</label>
      <select {...field} className="form-control" onChange={onChange}>
        <option value="">{user?.type || "Select Type"}</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {form.touched[field.name] && form.errors[field.name] && (
        <div className="text-danger">{form.errors[field.name]}</div>
      )}
    </div>
  );
  console.log("allHumanResourceRoleList admin",user);
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
      // validationSchema={tax_slabEditSchema}
      onSubmit={(values) => {
        console.log("values ", values);
        enableLoading();
        saveForm(values);
      }}
    >
      {({
        handleSubmit,
        errors,
        touched,

        values,
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
              <fieldset disabled={isUserForRead}>
                <div className="form-group row">
                  <div className="col-12 col-md-6 mt-9">
                 
                    {/* <div className="col-12 col-md-4 mt-9"> */}
                    <SearchSelect
                      name="subsidiaryId"
                      label={
                        <span>
                          {" "}
                          Subsidiary<span style={{ color: "red" }}>*</span>
                        </span>
                      }
                      isDisabled={isUserForRead && true}
                      onBlur={() => {
                        // handleBlur({ target: { name: "countryId" } });
                      }}
                      onChange={(e) => {
                        setFieldValue("subsidiaryId", e.value || null);
                        setDefualtSubsidiaryList(e);
                        //handlePaymenModeChanged(e)
                      }}
                      value={defSubsidiary || null}
                      error={errors.subsidiaryId}
                      touched={touched.subsidiaryId}
                      options={dashboard.allSubidiaryList}
                    />

                    {/* </div> */}
                  </div>

                  <div className="col-12 col-md-6 mt-9">
                    {/* <Field
                      name="account"
                      component={Input}
                      placeholder="Enter account"
                      label="Account"
                      type="number"
                
                    /> */}

                    <SearchSelect
                      name="accountId"
                      label={
                        <span>
                          {" "}
                          Account<span style={{ color: "red" }}>*</span>
                        </span>
                      }
                      isDisabled={isUserForRead && true}
                      onBlur={() => {
                        // handleBlur({ target: { name: "countryId" } });
                      }}
                      onChange={(e) => {
                        setFieldValue("accountId", e.value || null);
                        setDefualtAccountList(e);
                        //handlePaymenModeChanged(e)
                      }}
                      value={defAccount || null}
                      error={errors.accountId}
                      touched={touched.accountId}
                      options={dashboard.allAccountList}
                    />
                  </div>

                  <div className="col-12 col-md-6 mt-9">
                   

                    <SearchSelect
                      name="human_resource_role"
                      label={
                        <span>
                          {" "}
                          Human Resource Role
                          <span style={{ color: "red" }}>*</span>
                        </span>
                      }
                      isDisabled={isUserForRead && true}
                      onBlur={() => {
                        // handleBlur({ target: { name: "countryId" } });
                      }}
                      onChange={(e) => {
                        setFieldValue("human_resource_role", e.value || null);
                        setHumanResourceRoleList(e);
                        //handlePaymenModeChanged(e)
                      }}
                      value={defHumanResourceRole || null}
                      error={errors.human_resource_role}
                      touched={touched.human_resource_role}
                      options={dashboard.allHumanResourceRoleList}
                    />
                  </div>
                  <div className="col-12 col-md-6 mt-9">
                    <Field
                      name="emp_loan_account"
                      component={Input}
                      placeholder="Enter employee loan account"
                      label="Employee Loan Account"
                      type="number"
                    />
                  </div>

                  <div className="col-12 col-md-6 mt-9">
                    <Field
                      name="installment_deduction_percentage"
                      component={Input}
                      placeholder="Enter installment deduction percentage"
                      label="Installment Deduction (%)"
                      type="number"
                    />
                  </div>

                  <div className="col-12 col-md-6 mt-9">
                   

{/* <SearchSelect
  name="installment_deduction_bases"
  label={
    <span>
      Installment Deduction Basis
      <span style={{ color: "red" }}>*</span>
    </span>
  }
  // isDisabled={isUserForRead}
  onChange={(e) => {
    setFieldValue("installment_deduction_bases",  e.target.value);
  }}
  value={values.installment_deduction_bases}
  options={[
    { value: "Gross", label: "Gross" },
    { value: "NET", label: "NET" },
  ]}
/> */}

<Field
                      name="Name"
                      component={Dropdown}
                      options={options}
                      label="Deduction Basis Type"
                      onChange={(e) => {
                        setFieldValue("installment_deduction_bases_type", e.target.value);
                        // Clear fields based on selection
                      
                      
                        
                      }}
                    />


                  </div>

                  {/* <div className="col-12 col-md-6 mt-9">
                    <Field
                      name="loan_type"
                      component={Input}
                      placeholder="Enter loan_type"
                      label="Loan Type"
                      type="number"
                    />
                  </div>

                  <div className="col-12 col-md-6 mt-9">
                    <Field
                      name="max_loan_amount"
                      component={Input}
                      placeholder="Enter max loan amount"
                      label="Max Loan Amount"
                      type="number"
                    />
                  </div>

                  <div className="col-12 col-md-6 mt-9">
                    <Field
                      name="salary_count"
                      component={Input}
                      placeholder="Enter salary count"
                      label="Salary Count"
                      type="number"
                    />
                  </div> */}
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
