// import React, { useEffect, useState } from "react";
// import { Modal } from "react-bootstrap";
// import { Formik, Form, Field } from "formik";
// import * as Yup from "yup";
// import { Input } from "../../../../../../_metronic/_partials/controls"; // Adjust import as needed
// import { useDispatch, useSelector } from "react-redux";
// import { SearchSelect } from "../../../../../../_metronic/_helpers/SearchSelect";
// import {
//   fetchAllFormsMenu,
//   fetchAllHumanResourceRole,
// } from "../../../../../../_metronic/redux/dashboardActions";
// import { fetchAllAccountMenu } from "../../../../../../_metronic/redux/dashboardActions";

// // percentage: Yup.string().required("Required*"),
// const tax_slabEditSchema = Yup.object().shape({
//   // from_amount: Yup.string().required("Required*"),

//   from_amount: Yup.number()
//     .min(0, "Must be at least 0")
//     .required("Required*"),

//   // to_amount: Yup.string().required("Required*"),

//   to_amount: Yup.number()
//     .min(0, "Must be at least 0")
//     .required("Required*"),

//   percentage: Yup.number()
//     .min(0, "Must be at least 0")
//     .max(100, "Must be at most 100")
//     .required("Required*"),

//   // fixed_amount: Yup.string().required("Required*"),

//   fixed_amount: Yup.number()
//     .min(0, "Must be at least 0")
//     .required("Required*"),
// });

// export function FormEditForm({
//   saveForm,
//   user,
//   actionsLoading,
//   onHide,
//   isUserForRead,
//   enableLoading,
//   loading,
// }) {
//   console.log("FormEditForm user", user);

//   const dispatch = useDispatch();
//   const { dashboard } = useSelector((state) => state);
//   console.log("initialValues user.Type", user);
//   const [defSubsidiary = null, setDefualtSubsidiaryList] = useState(null);
//   const [defAccount = null, setDefualtAccountList] = useState(null);
//   const [defHumanResourceRole = null, setHumanResourceRoleList] = useState(
//     null
//   );
//   const [defMapLoanManagConfDetailList = null, setDefaultMapLoanManagConfDetailList] = useState([]);





//   useEffect(() => {
//     if (!user.Id) {
//       dispatch(fetchAllFormsMenu(133, "allSubidiaryList")); // For All Subsisidaries
//       dispatch(fetchAllFormsMenu(45, "allAccountList")); // For All Subsisidaries
//       dispatch(fetchAllHumanResourceRole("allHumanResourceRoleList"));
//       dispatch(fetchAllFormsMenu(179, "allLoan_typeList")); // For All Subsisidaries
    
//       console.log("allHumanResourceRoleList admin", defHumanResourceRole);
//     }
//   }, [dispatch]);

//   const options=[
//     { value: "Gross", label: "Gross" },
//     { value: "NET", label: "NET" },
//   ]

//   const Dropdown = ({ field, form, options, label, onChange }) => (
//     <div className="form-group">
//       <label>{label}</label>
//       <select {...field} className="form-control" onChange={onChange}>
//         <option value="">{user?.type || "Select Type"}</option>
//         {options.map((option) => (
//           <option key={option.value} value={option.value}>
//             {option.label}
//           </option>
//         ))}
//       </select>
//       {form.touched[field.name] && form.errors[field.name] && (
//         <div className="text-danger">{form.errors[field.name]}</div>
//       )}
//     </div>
//   );


//   const addRow = (element) => {
//     console.log("click", element.target.id)
//     if (element.target.id == "Other") {
//       setDefaultMapLoanManagConfDetailList([...defMapLoanManagConfDetailList, { transactionType: "Earning", isPartOfGrossSalary: 0 }])
//     }
//     else {
//       setDefaultMapLoanManagConfDetailList([...defMapLoanManagConfDetailList, { transactionType: element.target.id, isPartOfGrossSalary: 1 }])
//     }

//   }



//   const handleFieldChanged = (el) => {
//     const index = el.target.id.split('-')[1]
//     const key = el.target.id.split('-')[0]
//     setDefaultMapLoanManagConfDetailList([...defMapLoanManagConfDetailList.map((val, ind) => {

//       if (ind == index) {
//         if (!(key == "factorValue" && Number(el.target.value) > 100)) {
//           val[key] = key == 'basis' ? (el.target.value) : Number(el.target.value)
//         }
//       }

//       return val
//     })])

//   }


//   const deleteRow = (element) => {

//     const data = defMapLoanManagConfDetailList;
//     data.splice(element.target.id, 1);

//     setDefaultMapLoanManagConfDetailList([...data])
//   }

//   console.log("allHumanResourceRoleList admin",user);
//   return (
//     <Formik
//       enableReinitialize={true}
//       // initialValues={{
//       //   Id:user.Id || '',
//       //   type: user.type ||  '',
//       //   value:user.value || 0,
//       //   multiplier: user.multiplier || 0,
//       //   divisor: user.divisor || 0,
//       // }}

//       initialValues={user}
//       // validationSchema={tax_slabEditSchema}
//       onSubmit={(values) => {
//         console.log("values ", values);
//         enableLoading();
//         saveForm(values);
//       }}
//     >
//       {({
//         handleSubmit,
//         errors,
//         touched,

//         values,
//         setFieldValue,
//       }) => (
//         <>
//           <Modal.Body className="overlay overlay-block cursor-default">
//             {actionsLoading && (
//               <div className="overlay-layer bg-transparent">
//                 <div className="spinner spinner-lg spinner-success" />
//               </div>
//             )}
//             <>
//             <Form className="form form-label-right">
//               <fieldset disabled={isUserForRead}>
//                 <div className="form-group row">
//                   <div className="col-12 col-md-6 mt-9">
                 
//                     {/* <div className="col-12 col-md-4 mt-9"> */}
//                     <SearchSelect
//                       name="subsidiaryId"
//                       label={
//                         <span>
//                           {" "}
//                           Subsidiary<span style={{ color: "red" }}>*</span>
//                         </span>
//                       }
//                       isDisabled={isUserForRead && true}
//                       onBlur={() => {
//                         // handleBlur({ target: { name: "countryId" } });
//                       }}
//                       onChange={(e) => {
//                         setFieldValue("subsidiaryId", e.value || null);
//                         setDefualtSubsidiaryList(e);
//                         //handlePaymenModeChanged(e)
//                       }}
//                       value={defSubsidiary || null}
//                       error={errors.subsidiaryId}
//                       touched={touched.subsidiaryId}
//                       options={dashboard.allSubidiaryList}
//                     />

//                     {/* </div> */}
//                   </div>

//                   <div className="col-12 col-md-6 mt-9">
//                     {/* <Field
//                       name="account"
//                       component={Input}
//                       placeholder="Enter account"
//                       label="Account"
//                       type="number"
                
//                     /> */}

//                     <SearchSelect
//                       name="accountId"
//                       label={
//                         <span>
//                           {" "}
//                           Account<span style={{ color: "red" }}>*</span>
//                         </span>
//                       }
//                       isDisabled={isUserForRead && true}
//                       onBlur={() => {
//                         // handleBlur({ target: { name: "countryId" } });
//                       }}
//                       onChange={(e) => {
//                         setFieldValue("accountId", e.value || null);
//                         setDefualtAccountList(e);
//                         //handlePaymenModeChanged(e)
//                       }}
//                       value={defAccount || null}
//                       error={errors.accountId}
//                       touched={touched.accountId}
//                       options={dashboard.allAccountList}
//                     />
//                   </div>

//                   <div className="col-12 col-md-6 mt-9">
                   

//                     <SearchSelect
//                       name="human_resource_role"
//                       label={
//                         <span>
//                           {" "}
//                           Human Resource Role
//                           <span style={{ color: "red" }}>*</span>
//                         </span>
//                       }
//                       isDisabled={isUserForRead && true}
//                       onBlur={() => {
//                         // handleBlur({ target: { name: "countryId" } });
//                       }}
//                       onChange={(e) => {
//                         setFieldValue("human_resource_role", e.value || null);
//                         setHumanResourceRoleList(e);
//                         //handlePaymenModeChanged(e)
//                       }}
//                       value={defHumanResourceRole || null}
//                       error={errors.human_resource_role}
//                       touched={touched.human_resource_role}
//                       options={dashboard.allHumanResourceRoleList}
//                     />
//                   </div>
//                   <div className="col-12 col-md-6 mt-9">
//                     <Field
//                       name="emp_loan_account"
//                       component={Input}
//                       placeholder="Enter employee loan account"
//                       label="Employee Loan Account"
//                       type="number"
//                     />
//                   </div>

//                   <div className="col-12 col-md-6 mt-9">
//                     <Field
//                       name="installment_deduction_percentage"
//                       component={Input}
//                       placeholder="Enter installment deduction percentage"
//                       label="Installment Deduction (%)"
//                       type="number"
//                     />
//                   </div>

//                   <div className="col-12 col-md-6 mt-9">
                   

// {/* <SearchSelect
//   name="installment_deduction_bases"
//   label={
//     <span>
//       Installment Deduction Basis
//       <span style={{ color: "red" }}>*</span>
//     </span>
//   }
//   // isDisabled={isUserForRead}
//   onChange={(e) => {
//     setFieldValue("installment_deduction_bases",  e.target.value);
//   }}
//   value={values.installment_deduction_bases}
//   options={[
//     { value: "Gross", label: "Gross" },
//     { value: "NET", label: "NET" },
//   ]}
// /> */}

// <Field
//                       name="Name"
//                       component={Dropdown}
//                       options={options}
//                       label="Deduction Basis Type"
//                       onChange={(e) => {
//                         setFieldValue("installment_deduction_basis_type", e.target.value);
//                         // Clear fields based on selection
                      
                      
                        
//                       }}
//                     />


//                   </div>

//                   {/* <div className="col-12 col-md-6 mt-9">
//                     <Field
//                       name="loan_type"
//                       component={Input}
//                       placeholder="Enter loan_type"
//                       label="Loan Type"
//                       type="number"
//                     />
//                   </div>

//                   <div className="col-12 col-md-6 mt-9">
//                     <Field
//                       name="max_loan_amount"
//                       component={Input}
//                       placeholder="Enter max loan amount"
//                       label="Max Loan Amount"
//                       type="number"
//                     />
//                   </div>

//                   <div className="col-12 col-md-6 mt-9">
//                     <Field
//                       name="salary_count"
//                       component={Input}
//                       placeholder="Enter salary count"
//                       label="Salary Count"
//                       type="number"
//                     />
//                   </div> */}
//                 </div>
//               </fieldset>
//             </Form>



//             <div style={{ backgroundColor: "rgb(235 243 255)", padding: "20px", borderRadius: "5px", border: '2px solid #adceff' }}>
//                     <h6>Details </h6>
//                     {/* {<a onClick={ModalUIProps.newButtonEarningTran} href='javascript:void(0)'>+ Add New </a>} */}
//                     <table id='testtable' class="table table table-head-custom table-vertical-center overflow-hidden table-hover">
//                       <tr style={{ backgroundColor: '#4d5f7a', color: '#fff' }}>
//                         {/* <td>Employee</td> */}
//                         <td>Action</td>
//                         <td>Loan Type</td>
//                         <td>Max Loan Amount</td>
//                         <td>Basis</td>
//                         <td>Salary Count</td>
//                       </tr>
//                       {defMapLoanManagConfDetailList?.map((obj, rightindex) => (
                       
//                         <><tr>
//                           <td id={rightindex} onClick={deleteRow}> Delete</td>
//                           <td>
//                             <select onChange={handleFieldChanged} id={'earning_deduction_id-' + rightindex} value={obj.earning_deduction_id}>
//                               <option value="-1"> --Select--</option>
//                               {
//                                 dashboard.allLoan_typeList?.map((x) => {
//                                   return <option disabled={defMapLoanManagConfDetailList.find(el => el.earning_deduction_id == x.value) ? true : false} value={x.value}> {x.label} </option>
//                                 })}
//                             </select>


                  
//                           </td>
                       
//                           {/* <td>{obj.transactionType}</td> */}
//                           <td>
//                             <input disabled={obj.basis == 'Fixed Amount'} style={{ width: "100px" }} type="number" onChange={handleFieldChanged}
//                               value={obj.factorValue} id={'factorValue-' + rightindex}></input>
//                           </td>

//                           <td>
//                             <select value={obj.basis} onChange={handleFieldChanged} id={'basis-' + rightindex} >
//                               <option value="-1">--Select--</option>
//                               <option value="Gross">Gross</option>
//                               <option value="Net">Net</option>
//                             </select>

//                           </td>

//                           <td>
//                             <input disabled={obj.basis == '% Of Basic'} style={{ width: "100px" }} type="number" onChange={handleFieldChanged}
//                               value={obj.amount} id={'amount-' + rightindex}></input> </td>
//                         </tr>

//                         </>
//                       ))}

//                     </table>

//                     {<> <div className="from-group row">
//                       <div className="col-12 col-md-4 mt-3">
//                         <input type='button' id="Earning" onClick={addRow} value='+Add'></input>
//                       </div>

//                     </div>
//                     </>}

//                   </div>





//                   </>

//           </Modal.Body>
//           <Modal.Footer>
//             {!isUserForRead ? (
//               <button
//                 type="button"
//                 onClick={onHide}
//                 className="btn btn-light btn-elevate"
//               >
//                 Cancel
//               </button>
//             ) : (
//               <button
//                 type="button"
//                 onClick={onHide}
//                 className="btn btn-primary btn-elevate"
//               >
//                 Ok
//               </button>
//             )}

//             {/* <button
//                 type="submit"
//                 onClick={() => handleSubmit()}
//                 className="btn btn-primary btn-elevate"
//               >
//                 Save
//                 {loading && (
//                   <span className="ml-3 mr-3 spinner spinner-white"></span>
//                 )}
//               </button> */}

//             {!isUserForRead && (
//               <button
//                 type="submit"
//                 onClick={() => handleSubmit()}
//                 className="btn btn-primary btn-elevate"
//               >
//                 Save
//                 {loading && (
//                   <span className="ml-3 mr-3 spinner spinner-white"></span>
//                 )}
//               </button>
//             )}
//           </Modal.Footer>
//         </>
//       )}
//     </Formik>
//   );
// }


import React, { useEffect } from "react";
import { Modal } from "react-bootstrap";
import { Formik, Form, Field, FieldArray } from "formik";
import * as Yup from "yup";
import { Input } from "../../../../../../_metronic/_partials/controls"; // Adjust import as needed
import { useDispatch, useSelector } from "react-redux";
import { SearchSelect } from "../../../../../../_metronic/_helpers/SearchSelect";
import {
  fetchAllFormsMenu,
  fetchAllHumanResourceRole,
} from "../../../../../../_metronic/redux/dashboardActions";
 
// Define the validation schema for the main form and the details
const loanManagementSchema = Yup.object().shape({
  subsidiaryId: Yup.number().required("Subsidiary is required"),
  accountId: Yup.number().required("Account is required"),
  human_resource_role: Yup.number().required("Human Resource Role is required"),
  emp_loan_account: Yup.number().required("Employee Loan Account is required"),
  installment_deduction_percentage: Yup.number()
    .min(0, "Must be at least 0")
    .required("Installment Deduction Percentage is required"),
  installment_deduction_basis_type: Yup.number().required(
    "Installment Deduction Basis Type is required"
  ),
  details: Yup.array().of(
    Yup.object().shape({
      loan_typeId: Yup.number().required(" Type is required"),
      max_loan_amount: Yup.number()
      .required("Max  Amount is required"),
      basis: Yup.number().required("Basis is required"),
      salary_count: Yup.number()
      .required("Count is required"),
    })
  ),
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
  const dispatch = useDispatch();
  const { dashboard } = useSelector((state) => state);
 
  // Fetch necessary data if not already present
  useEffect(() => {
    if (!user.Id) {
      dispatch(fetchAllFormsMenu(133, "allSubidiaryList")); // For All Subsidiaries
      dispatch(fetchAllFormsMenu(45, "allAccountList")); // For All Accounts
      dispatch(fetchAllFormsMenu(179, "allLoanTypeList")); // For All Loan Types
      dispatch(fetchAllHumanResourceRole("allHumanResourceRoleList"));
    }
  }, [dispatch, user.Id]);
 
  // Define options for basis type
  const basisOptions = [
    { value: 0, label: "Gross" },
    { value: 1, label: "Basic" },
  ];
 
  return (
    <Formik
      enableReinitialize={true}
      initialValues={{
        subsidiaryId: user.subsidiaryId || "",
        accountId: user.accountId || "",
        human_resource_role: user.human_resource_role || "",
        emp_loan_account: user.emp_loan_account || "",
        installment_deduction_percentage:
          user.installment_deduction_percentage || "",
        installment_deduction_basis_type:
          user.installment_deduction_basis_type || "",
        details: user.details || [
          {
            loan_typeId: "",
            max_loan_amount: "",
            basis: "",
            salary_count: "",
          },
        ],
      }}
      validationSchema={loanManagementSchema}
      onSubmit={(values) => {
        console.log("Form Values:", values);
        enableLoading();
        saveForm(values);
      }}
    >
      {({ handleSubmit, errors, touched, values, setFieldValue }) => (
        <>
          <Modal.Body className="overlay overlay-block cursor-default">
            {actionsLoading && (
              <div className="overlay-layer bg-transparent">
                <div className="spinner spinner-lg spinner-success" />
              </div>
            )}
            <Form className="form form-label-right" onSubmit={handleSubmit}>
              <fieldset disabled={isUserForRead}>
                <div className="form-group row">
                  {/* Subsidiary Field */}
                  <div className="col-12 col-md-6 mt-3">
                    <SearchSelect
                      name="subsidiaryId"
                      label={
                        <span>
                          Subsidiary<span style={{ color: "red" }}>*</span>
                        </span>
                      }
                      isDisabled={isUserForRead}
                      onChange={(e) => {
                        setFieldValue("subsidiaryId", e.value || null);
                      }}
                      value={
                        dashboard.allSubidiaryList.find(
                          (option) => option.value === values.subsidiaryId
                        ) || null
                      }
                      options={dashboard.allSubidiaryList}
                      error={errors.subsidiaryId}
                      touched={touched.subsidiaryId}
                    />
                  </div>
 
                  {/* Account Field */}
                  <div className="col-12 col-md-6 mt-3">
                    <SearchSelect
                      name="accountId"
                      label={
                        <span>
                          Account<span style={{ color: "red" }}>*</span>
                        </span>
                      }
                      isDisabled={isUserForRead}
                      onChange={(e) => {
                        setFieldValue("accountId", e.value || null);
                      }}
                      value={
                        dashboard.allAccountList.find(
                          (option) => option.value === values.accountId
                        ) || null
                      }
                      options={dashboard.allAccountList}
                      error={errors.accountId}
                      touched={touched.accountId}
                    />
                  </div>
 
                  {/* Human Resource Role Field */}
                  <div className="col-12 col-md-6 mt-3">
                    <SearchSelect
                      name="human_resource_role"
                      label={
                        <span>
                          Human Resource Role
                          <span style={{ color: "red" }}>*</span>
                        </span>
                      }
                      isDisabled={isUserForRead}
                      onChange={(e) => {
                        setFieldValue("human_resource_role", e.value || null);
                      }}
                      value={
                        dashboard.allHumanResourceRoleList.find(
                          (option) =>
                            option.value === values.human_resource_role
                        ) || null
                      }
                      options={dashboard.allHumanResourceRoleList}
                      error={errors.human_resource_role}
                      touched={touched.human_resource_role}
                    />
                  </div>
 
                  {/* Employee Loan Account Field */}
                  <div className="col-12 col-md-6 mt-3">
                    <Field
                      name="emp_loan_account"
                      component={Input}
                      placeholder="Enter employee loan account"
                      label="Employee Loan Account"
                      type="number"
                      disabled={isUserForRead}
                    />
                    {/* {errors.emp_loan_account && touched.emp_loan_account && (
                      <div className="text-danger">{errors.emp_loan_account}</div>
                    )} */}
                  </div>
 
                  {/* Installment Deduction Percentage Field */}
                  <div className="col-12 col-md-6 mt-3">
                    <Field
                      name="installment_deduction_percentage"
                      component={Input}
                      placeholder="Enter installment deduction percentage"
                      label="Installment Deduction (%)"
                      type="number"
                      disabled={isUserForRead}
                    />
                    {/* {errors.installment_deduction_percentage && touched.installment_deduction_percentage && (
                      <div className="text-danger">{errors.installment_deduction_percentage}</div>
                    )} */}
                  </div>
 
                  {/* Installment Deduction Basis Type Field */}
                  <div className="col-12 col-md-6 mt-3">
                    <label htmlFor="installment_deduction_basis_type">
                      Installment Deduction Basis Type
                     
                    </label>
                    <Field
                      name="installment_deduction_basis_type"
                      as="select"
                      label="Installment Deduction Basis Type"
                      className="form-control"
                      disabled={isUserForRead}
                      onChange={(e) => {
                        const value = parseInt(e.target.value, 10);
                        setFieldValue(
                          "installment_deduction_basis_type",
                          value
                        );
                      }}
                    >
                      <option value="">Select Deduction Basis Type</option>
                      {basisOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </Field>
                    {errors.installment_deduction_basis_type && touched.installment_deduction_basis_type && (
                      <div className="text-danger">{errors.installment_deduction_basis_type}</div>
                    )}
                  </div>
                </div>
              </fieldset>
 
              {/* Details Section */}
              <FieldArray name="details">
                {({ push, remove }) => (
                  <div
                    style={{
                      backgroundColor: "rgb(235 243 255)",
                      padding: "20px",
                      borderRadius: "5px",
                      border: "2px solid #adceff",
                      marginTop: "20px",
                    }}
                  >
                    <h6>Details</h6>
                    <table className="table table-head-custom table-vertical-center overflow-hidden table-hover">
                      <thead>
                        <tr
                          style={{ backgroundColor: "#4d5f7a", color: "#fff" }}
                        >
                          <th>Action</th>
                          <th>Loan Type</th>
                          <th>Max Loan Amount</th>
                          <th>Basis</th>
                          <th>Salary Count</th>
                        </tr>
                      </thead>
                      <tbody>
                        {values.details &&
                          values.details.length > 0 &&
                          values.details.map((detail, index) => (
                            <tr key={index}>
                              {/* Delete Button */}
                              <td>
                                {!isUserForRead && (
                                  <button
                                    type="button"
                                    onClick={() => remove(index)}
                                    className="btn btn-danger btn-sm"
                                  >
                                    Delete
                                  </button>
                                )}
                              </td>
 
                              {/* Loan Type Field */}
                              <td>
                                <Field
                                  name={`details[${index}].loan_typeId`}
                                  as="select"
                                  className="form-control"
                                  disabled={isUserForRead}
                                >
                                  <option value="">Select Loan Type</option>
                                  {dashboard.allLoanTypeList?.map(
                                    (loanType) => (
                                      <option
                                        key={loanType.value}
                                        value={loanType.value}
                                      >
                                        {loanType.label}
                                      </option>
                                    )
                                  )}
                                </Field>
                                {errors.details?.[index]?.loan_typeId &&
                                  touched.details?.[index]?.loan_typeId && (
                                    <div className="text-danger">
                                      {errors.details[index].loan_typeId}
                                    </div>
                                  )}
                              </td>
 
                              {/* Max Loan Amount Field */}
                              <td>
                                <Field
                                  name={`details[${index}].max_loan_amount`}
                                  type="number"
                                  className="form-control"
                                  disabled={isUserForRead}
                                />
                                {errors.details?.[index]?.max_loan_amount &&
                                  touched.details?.[index]?.max_loan_amount && (
                                    <div className="text-danger">
                                      {errors.details[index].max_loan_amount}
                                    </div>
                                  )}
                              </td>
 
                              {/* Basis Field */}
                              <td>
                                <Field
                                  name={`details[${index}].basis`}
                                  as="select"
                                  className="form-control"
                                  disabled={isUserForRead}
                                >
                                  <option value="">Select Basis</option>
                                  {basisOptions.map((option) => (
                                    <option
                                      key={option.value}
                                      value={option.value}
                                    >
                                      {option.label}
                                    </option>
                                  ))}
                                </Field>
                                {errors.details?.[index]?.basis &&
                                  touched.details?.[index]?.basis && (
                                    <div className="text-danger">
                                      {errors.details[index].basis}
                                    </div>
                                  )}
                              </td>
 
                              {/* Salary Count Field */}
                              <td>
                                <Field
                                  name={`details[${index}].salary_count`}
                                  type="number"
                                  className="form-control"
                                  disabled={isUserForRead}
                                />
                                {errors.details?.[index]?.salary_count &&
                                  touched.details?.[index]?.salary_count && (
                                    <div className="text-danger">
                                      {errors.details[index].salary_count}
                                    </div>
                                  )}
                              </td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
 
                    {/* Add Detail Button */}
                    {!isUserForRead && (
                      <button
                        type="button"
                        onClick={() =>
                          push({
                            loan_typeId: "",
                            max_loan_amount: "",
                            basis: "",
                            salary_count: "",
                          })
                        }
                        className="btn btn-primary btn-sm"
                      >
                        + Add Detail
                      </button>
                    )}
                  </div>
                )}
              </FieldArray>
            </Form>
          </Modal.Body>
 
          <Modal.Footer>
            {/* Cancel / Ok Button */}
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
 
            {/* Save Button */}
            {!isUserForRead && (
              <button
                type="submit"
                onClick={() => handleSubmit()}
                className="btn btn-primary btn-elevate"
                disabled={loading}
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