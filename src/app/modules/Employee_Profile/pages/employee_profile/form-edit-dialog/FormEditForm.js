import React, { useEffect, useRef, useState } from "react";
import { Modal } from "react-bootstrap";
import { Formik, Form, Field, FieldArray, ErrorMessage } from "formik";
import * as Yup from "yup";
import { format } from "date-fns";
import {
  DatePickerField,
  Input,
  Select,
  TextArea,
} from "../../../../../../_metronic/_partials/controls";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/redux-Actions";
import { SearchSelect } from "../../../../../../_metronic/_helpers/SearchSelect";
import {
  amountLimit,
  formatDates,
  getDateDiffInDays,
  getFileName,
  getUploadUrl,
} from "../../../../../utils/common";
import {
  fetchAllFormsMenu,
  fetchAllPayrollMonthYearList,
} from "../../../../../../_metronic/redux/dashboardActions";
import { VALIDATION_MESSAGES } from "../../../../../utils/constants";
import { getEmployeeProfileById } from "../../../../../../_metronic/redux/dashboardCrud";
import { toAbsoluteUrl } from "../../../../../../_metronic/_helpers";


const ReimbursementSchema = Yup.object().shape({
  reimbursement_typeId: Yup.number().required(VALIDATION_MESSAGES.required),
  details: Yup.string().required(VALIDATION_MESSAGES.required),
  date: Yup.date().required(VALIDATION_MESSAGES.required),
  amount: Yup.number()
    .min(1, VALIDATION_MESSAGES.minOneValue)
    .required(VALIDATION_MESSAGES.required),

  // file: Yup.mixed()
  //   .required("Required")
  //   .test(
  //     "fileSize",
  //     "File is too large (max 5MB)",
  //     (value) => !value || (value && value.size <= 5 * 1024 * 1024) // 5 MB limit
  //   )
  //   .required("Required"),
  pay_in_payroll_forId: Yup.number().required(VALIDATION_MESSAGES.required),
});

export function FormEditForm({
  saveForm,
  user,
  actionsLoading,
  onHide,
  isUserForRead,
  enableLoading,
  loading,
  setIds,
  isEdit,
  isFileReq,
  setIsFileReq,
  employeeId
}) {
  const dispatch = useDispatch();
  const { dashboard } = useSelector((state) => state);
  const inputFile = useRef(null);
  const [profile_image, setImage] = useState(toAbsoluteUrl("/media/logos/defaultImg.png"));
  // const [isFileReq,setIsFileReq]=useState(false)
  // Fetch necessary data if not already present
  const [file, setFile] = useState('');

  const onImageChange = async event => {
    if (event.target.files && event.target.files[0]) {
      let img = event.target.files[0];
      setFile(img);
      console.log("img", URL.createObjectURL(img));
      setImage(URL.createObjectURL(img));
    }
  };

  useEffect(() => {
    if (!user.Id) {
      dispatch(fetchAllFormsMenu(202, "allReimbursementTypeList"));
      dispatch(fetchAllPayrollMonthYearList("allPayrollMonthYearList"));
    }
    //allPayrolGroupList
  }, [dispatch, user.Id]);

  const { currentState, userAccess } = useSelector((state) => {
    return {
      currentState: state.employee_profile,
      userAccess: state?.auth?.userAccess["employee_profile"],
    };
  }, shallowEqual);

  const filteredOptions = dashboard?.allReimbursementTypeList.filter((option) =>
    currentState?.reimbursement_config_policies_permission?.policies?.some(
      (item) => item.reimbursement_typeId === option.value
    )
  );

  // const { entities } = currentState;
  const [data, setdata] = useState({});
  useEffect(() => {
    if (employeeId) {
      getEmployeeProfileById(employeeId)
        .then((res) => {
          if (res?.data?.data) {
            setdata(res.data.data);
          }
        })
        .catch(() => {
          setdata({});
        });
    } else {
      setdata({});
    }
  }, [employeeId]);


  // const calculateRemainingAmount = (reimbursementTypeId, payrollForId, policies) => {
  //   // Find the max amount allowed for the reimbursement type
  //   // let employee = currentState?.loan_config_details_permission?.employee;
  //   const maxAmount = 
  //     policies?.find((item) => item.reimbursement_typeId === reimbursementTypeId)?.max_amount || 0;

  //   // Calculate the claimed amount for the selected reimbursement type and payroll
  //   const claimedAmount = entities
  //     ?.filter(
  //       (entity) =>
  //         entity?.reimbursement_typeId === reimbursementTypeId &&
  //         entity?.pay_in_payroll_forId === payrollForId
  //     )
  //     ?.reduce((sum, entity) => sum + (entity.amount || 0), 0);

  //   // Return the remaining amount
  //   const finalMaxAmount = (maxAmount || 0) - (claimedAmount || 0);
  //   return finalMaxAmount ;
  // };


  return (
    <Formik
      // key={user.Id || "new"}
      enableReinitialize={true}
      initialValues={user}
      validationSchema={ReimbursementSchema}
      onSubmit={(values, { resetForm }) => {
        enableLoading();


        // const  finalAmountLimit = calculateRemainingAmount(
        //   values?.reimbursement_typeId,
        //   values?.pay_in_payroll_forId,
        //   currentState?.reimbursement_config_policies_permission?.policies
        // );
        const clearForm = () => {
          resetForm();
          if (inputFile?.current) {
            inputFile.current.value = "";
          }
        };
        saveForm(values, isFileReq, clearForm);
      }}
    >
      {({
        handleSubmit,
        errors,
        touched,
        values,
        setFieldValue,
        handleReset,
      }) => (
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
                  {/* <div className="from-group row"> */}
                    <div className="col-12 col-md-12 mt-5 mb-5">
                      <div>
                        <div>
                          <div>
                            <img name='profile_image' width={120} height={120} src={profile_image} />
                            <h4>Select Image</h4>
                            <input type="file" name="myImage" accept=".jpg, .jpeg, .png" onChange={onImageChange} />
                            <ErrorMessage className="form-feedBack" name="myImage" component="div" />
                          </div>
                        </div>
                      </div>
                    </div>
                  {/* </div> */}


                  <div className="col-12 col-md-4 mt-3">
                    <label>
                      <span>
                        Subsidiary<span style={{ color: "red" }}>*</span>
                      </span>
                    </label>
                    <Field
                      name="name"
                      component={Input}
                      placeholder="Enter Name"

                      type="text"

                    />
                  </div>


                  <div className="col-12 col-md-4 mt-3">
                    <label>
                      <span>
                        Title<span style={{ color: "red" }}>*</span>
                      </span>
                    </label>
                    <Field
                      name="name"
                      component={Input}
                      placeholder="Enter Name"

                      type="text"

                    />
                  </div>


                  <div className="col-12 col-md-4 mt-3">
                    <label>
                      <span>
                        Employee Code <span style={{ color: "red" }}>*</span>
                      </span>
                    </label>
                    <Field
                      name="name"
                      component={Input}
                      placeholder="Enter Name"

                      type="text"

                    />
                  </div>

                  <div className="col-12 col-md-4 mt-3">
                    <label>
                      <span>
                        Grade<span style={{ color: "red" }}>*</span>
                      </span>
                    </label>
                    <Field
                      name="name"
                      component={Input}
                      placeholder="Enter Name"

                      type="text"

                    />
                  </div>

                  <div className="col-12 col-md-4 mt-3">
                    <label>
                      <span>
                        First Name<span style={{ color: "red" }}>*</span>
                      </span>
                    </label>
                    <Field
                      name="name"
                      component={Input}
                      placeholder="Enter Name"

                      type="text"

                    />
                  </div>

                  <div className="col-12 col-md-4 mt-3">
                    <label>
                      <span>
                        Middle Name<span style={{ color: "red" }}>*</span>
                      </span>
                    </label>
                    <Field
                      name="name"
                      component={Input}
                      placeholder="Enter Name"

                      type="text"

                    />
                  </div>

                  <div className="col-12 col-md-4 mt-3">
                    <label>
                      <span>
                        Last Name<span style={{ color: "red" }}>*</span>
                      </span>
                    </label>
                    <Field
                      name="name"
                      component={Input}
                      placeholder="Enter Name"

                      type="text"

                    />
                  </div>




                  <div className="col-12 col-md-4 mt-3">
                    <label>
                      <span>
                        Designation<span style={{ color: "red" }}>*</span>
                      </span>
                    </label>
                    <Field
                      name="name"
                      component={Input}
                      placeholder="Enter Name"

                      type="text"

                    />
                  </div>



                  <div className="col-12 col-md-4 mt-3">
                    <label>
                      <span>
                        Department<span style={{ color: "red" }}>*</span>
                      </span>
                    </label>
                    <Field
                      name="name"
                      component={Input}
                      placeholder="Enter Name"

                      type="text"

                    />
                  </div>


                  <div className="col-12 col-md-4 mt-3">
                    <label>
                      <span>
                        Team<span style={{ color: "red" }}>*</span>
                      </span>
                    </label>
                    <Field
                      name="name"
                      component={Input}
                      placeholder="Enter Name"

                      type="text"

                    />
                  </div>


                  <div className="col-12 col-md-4 mt-3">
                    <label>
                      <span>
                        Payroll Group<span style={{ color: "red" }}>*</span>
                      </span>
                    </label>
                    <Field
                      name="name"
                      component={Input}
                      placeholder="Enter Name"

                      type="text"

                    />
                  </div>


                  <div className="col-12 col-md-4 mt-3">
                    <label>
                      <span>
                        Region<span style={{ color: "red" }}>*</span>
                      </span>
                    </label>
                    <Field
                      name="name"
                      component={Input}
                      placeholder="Enter Name"

                      type="text"

                    />
                  </div>


                  <div className="col-12 col-md-4 mt-3">
                    <label>
                      <span>
                        Employee Type<span style={{ color: "red" }}>*</span>
                      </span>
                    </label>
                    <Field
                      name="name"
                      component={Input}
                      placeholder="Enter Name"

                      type="text"

                    />
                  </div>


                  <div className="col-12 col-md-4 mt-3">
                    <label>
                      <span>
                        Location<span style={{ color: "red" }}>*</span>
                      </span>
                    </label>
                    <Field
                      name="name"
                      component={Input}
                      placeholder="Enter Name"

                      type="text"

                    />
                  </div>


                  <div className="col-12 col-md-4 mt-3">
                    <label>
                      <span>
                        Country<span style={{ color: "red" }}>*</span>
                      </span>
                    </label>
                    <Field
                      name="name"
                      component={Input}
                      placeholder="Enter Name"

                      type="text"

                    />
                  </div>


                  <div className="col-12 col-md-4 mt-3">
                    <label>
                      <span>
                        City<span style={{ color: "red" }}>*</span>
                      </span>
                    </label>
                    <Field
                      name="name"
                      component={Input}
                      placeholder="Enter Name"

                      type="text"

                    />
                  </div>


                  <div className="col-12 col-md-4 mt-3">
                    <label>
                      <span>
                        Date Of Joining<span style={{ color: "red" }}>*</span>
                      </span>
                    </label>
                    <Field
                      name="name"
                      component={Input}
                      placeholder="Enter Name"

                      type="text"

                    />
                  </div>


                  <div className="col-12 col-md-4 mt-3">
                    <label>
                      <span>
                        Date Of Confirmation<span style={{ color: "red" }}>*</span>
                      </span>
                    </label>
                    <Field
                      name="name"
                      component={Input}
                      placeholder="Enter Name"

                      type="text"

                    />
                  </div>


                  <div className="col-12 col-md-4 mt-3">
                    <label>
                      <span>
                        Date Confirmation Due<span style={{ color: "red" }}>*</span>
                      </span>
                    </label>
                    <Field
                      name="name"
                      component={Input}
                      placeholder="Enter Name"

                      type="text"

                    />
                  </div>

                  <div className="col-12 col-md-4 mt-3">
                    <label>
                      <span>
                        Date Confirmation Extended<span style={{ color: "red" }}>*</span>
                      </span>
                    </label>
                    <Field
                      name="name"
                      component={Input}
                      placeholder="Enter Name"

                      type="text"

                    />
                  </div>



                  <div className="col-12 col-md-4 mt-3">
                    <label>
                      <span>
                        Contract Expiry<span style={{ color: "red" }}>*</span>
                      </span>
                    </label>
                    <Field
                      name="name"
                      component={Input}
                      placeholder="Enter Name"

                      type="text"

                    />
                  </div>



                  <div className="col-12 col-md-4 mt-3">
                    <label>
                      <span>
                        Default Shift<span style={{ color: "red" }}>*</span>
                      </span>
                    </label>
                    <Field
                      name="name"
                      component={Input}
                      placeholder="Enter Name"

                      type="text"

                    />
                  </div>



                  <div className="col-12 col-md-4 mt-3">
                    <label>
                      <span>
                        Marital Status<span style={{ color: "red" }}>*</span>
                      </span>
                    </label>
                    <Field
                      name="name"
                      component={Input}
                      placeholder="Enter Name"

                      type="text"

                    />
                  </div>



                  <div className="col-12 col-md-4 mt-3">
                    <label>
                      <span>
                        Gender<span style={{ color: "red" }}>*</span>
                      </span>
                    </label>
                    <Field
                      name="name"
                      component={Input}
                      placeholder="Enter Name"

                      type="text"

                    />
                  </div>



                  <div className="col-12 col-md-4 mt-3">
                    <label>
                      <span>
                        Religion<span style={{ color: "red" }}>*</span>
                      </span>
                    </label>
                    <Field
                      name="name"
                      component={Input}
                      placeholder="Enter Name"

                      type="text"

                    />
                  </div>

                  <div className="col-12 col-md-4 mt-3">
                    <label>
                      <span>
                        Nationality<span style={{ color: "red" }}>*</span>
                      </span>
                    </label>
                    <Field
                      name="name"
                      component={Input}
                      placeholder="Enter Name"

                      type="text"

                    />
                  </div>


                  <div className="col-12 col-md-4 mt-3">
                    <label>
                      <span>
                        Attendance Type<span style={{ color: "red" }}>*</span>
                      </span>
                    </label>
                    <Field
                      name="name"
                      component={Input}
                      placeholder="Enter Name"

                      type="text"

                    />
                  </div>


                  <div className="col-12 col-md-4 mt-3">
                    <label>
                      <span>
                        Report To<span style={{ color: "red" }}>*</span>
                      </span>
                    </label>
                    <Field
                      name="name"
                      component={Input}
                      placeholder="Enter Name"

                      type="text"

                    />
                  </div>


                  <div className="col-12 col-md-4 mt-3">
                    <label>
                      <span>
                        Last Review Date<span style={{ color: "red" }}>*</span>
                      </span>
                    </label>
                    <Field
                      name="name"
                      component={Input}
                      placeholder="Enter Name"

                      type="text"

                    />
                  </div>


                  <div className="col-12 col-md-4 mt-3">
                    <label>
                      <span>
                        Next Review Date<span style={{ color: "red" }}>*</span>
                      </span>
                    </label>
                    <Field
                      name="name"
                      component={Input}
                      placeholder="Enter Name"

                      type="text"

                    />
                  </div>


                  <div className="col-12 col-md-4 mt-3">
                    <label>
                      <span>
                        Source Of Hire<span style={{ color: "red" }}>*</span>
                      </span>
                    </label>
                    <Field
                      name="name"
                      component={Input}
                      placeholder="Enter Name"

                      type="text"

                    />
                  </div>



                  <br />
                  <br />
                  <div className="col-12 col-md-12 mt-5" style={{ backgroundColor: '#E6F8FF', padding: "20px", borderRadius: "5px", border: '2px solid #adceff' }}>
                    <h6>Personal Information</h6>

                    <div className="form-group row">
                      <div className="col-12 col-md-4 mt-3">
                        <label>
                          <span>
                            Date Of Birth<span style={{ color: "red" }}>*</span>
                          </span>
                        </label>
                        <Field
                          name="name"
                          component={Input}
                          placeholder="Enter Name"

                          type="text"

                        />
                      </div>

                      <div className="col-12 col-md-4 mt-3">
                        <label>
                          <span>
                            NIC No<span style={{ color: "red" }}>*</span>
                          </span>
                        </label>
                        <Field
                          name="name"
                          component={Input}
                          placeholder="Enter Name"

                          type="text"

                        />
                      </div>


                      <div className="col-12 col-md-4 mt-3">
                        <label>
                          <span>
                            Date Of Retirement<span style={{ color: "red" }}>*</span>
                          </span>
                        </label>
                        <Field
                          name="name"
                          component={Input}
                          placeholder="Enter Name"

                          type="text"

                        />
                      </div>


                      <div className="col-12 col-md-4 mt-3">
                        <label>
                          <span>
                            Passport No<span style={{ color: "red" }}>*</span>
                          </span>
                        </label>
                        <Field
                          name="name"
                          component={Input}
                          placeholder="Enter Name"

                          type="text"

                        />
                      </div>


                      <div className="col-12 col-md-4 mt-3">
                        <label>
                          <span>
                            Passport Expiry Date<span style={{ color: "red" }}>*</span>
                          </span>
                        </label>
                        <Field
                          name="name"
                          component={Input}
                          placeholder="Enter Name"

                          type="text"

                        />
                      </div>


                      <div className="col-12 col-md-4 mt-3">
                        <label>
                          <span>
                            Driving License Expiry<span style={{ color: "red" }}>*</span>
                          </span>
                        </label>
                        <Field
                          name="name"
                          component={Input}
                          placeholder="Enter Name"

                          type="text"

                        />
                      </div>


                      <div className="col-12 col-md-4 mt-3">
                        <label>
                          <span>

                            Emirates Id Number
                            <span style={{ color: "red" }}>*</span>
                          </span>
                        </label>
                        <Field
                          name="name"
                          component={Input}
                          placeholder="Enter Name"

                          type="text"

                        />
                      </div>


                      <div className="col-12 col-md-4 mt-3">
                        <label>
                          <span>
                            Routing Code<span style={{ color: "red" }}>*</span>
                          </span>
                        </label>
                        <Field
                          name="name"
                          component={Input}
                          placeholder="Enter Name"

                          type="text"

                        />
                      </div>

                      <div className="col-12 col-md-4 mt-3">
                        <label>
                          <span>
                            Contract Type<span style={{ color: "red" }}>*</span>
                          </span>
                        </label>
                        <Field
                          name="name"
                          component={Input}
                          placeholder="Enter Name"

                          type="text"

                        />
                      </div>



                    </div>












                  </div>



                  <br />
                  <br />
                  <div className="col-12 col-md-12 mt-5" style={{ backgroundColor: '#E6F8FF', padding: "20px", borderRadius: "5px", border: '2px solid #adceff' }}>
                    <h6>Contact Information</h6>

                    <div className="form-group row">
                      <div className="col-12 col-md-4 mt-3">
                        <label>
                          <span>
                            Official Email<span style={{ color: "red" }}>*</span>
                          </span>
                        </label>
                        <Field
                          name="name"
                          component={Input}
                          placeholder="Enter Name"

                          type="text"

                        />
                      </div>

                      <div className="col-12 col-md-4 mt-3">
                        <label>
                          <span>
                            Personal Email<span style={{ color: "red" }}>*</span>
                          </span>
                        </label>
                        <Field
                          name="name"
                          component={Input}
                          placeholder="Enter Name"

                          type="text"

                        />
                      </div>


                      <div className="col-12 col-md-4 mt-3">
                        <label>
                          <span>
                            Phone Home<span style={{ color: "red" }}>*</span>
                          </span>
                        </label>
                        <Field
                          name="name"
                          component={Input}
                          placeholder="Enter Name"

                          type="text"

                        />
                      </div>


                      <div className="col-12 col-md-4 mt-3">
                        <label>
                          <span>
                            Official Phone<span style={{ color: "red" }}>*</span>
                          </span>
                        </label>
                        <Field
                          name="name"
                          component={Input}
                          placeholder="Enter Name"

                          type="text"

                        />
                      </div>


                      <div className="col-12 col-md-4 mt-3">
                        <label>
                          <span>
                            Cell No.<span style={{ color: "red" }}>*</span>
                          </span>
                        </label>
                        <Field
                          name="name"
                          component={Input}
                          placeholder="Enter Name"

                          type="text"

                        />
                      </div>


                      <div className="col-12 col-md-4 mt-3">
                        <label>
                          <span>
                            Professional Summary<span style={{ color: "red" }}>*</span>
                          </span>
                        </label>
                        <Field
                          name="name"
                          component={Input}
                          placeholder="Enter Name"

                          type="text"

                        />
                      </div>


                      <div className="col-12 col-md-4 mt-3">
                        <label>
                          <span>

                            Additional Notes
                            <span style={{ color: "red" }}>*</span>
                          </span>
                        </label>
                        <Field
                          name="name"
                          component={Input}
                          placeholder="Enter Name"

                          type="text"

                        />
                      </div>

                    </div>












                  </div>





                </div>
              </fieldset>
            </Form>
          </Modal.Body>

          <Modal.Footer>
            {/* Cancel / Ok Button */}
            {!isUserForRead ? (
              <button
                type="reset"
                onClick={() => {
                  setIds("");
                  handleReset();

                  if (inputFile?.current) {
                    inputFile.current.value = "";
                  }
                }}
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
                // onClick={() => handleSubmit()}
                onClick={() => {
                  handleSubmit();
                }}
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
