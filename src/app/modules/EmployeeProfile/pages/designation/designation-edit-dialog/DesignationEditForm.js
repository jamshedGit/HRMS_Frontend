import React, { useEffect, useState, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { Input, Select, TextArea } from "../../../../../../_metronic/_partials/controls";
import { useDispatch, useSelector } from "react-redux";
import { SearchSelect } from "../../../../../../_metronic/_helpers/SearchSelect";
import {
  fetchAllCountry,
  fetchAllCity,
  fetchAllCityCenters,
  fetchAllSubCenter,
  getLatestBookingNo,
  fetchAllDept,
  fetchAllFormsMenu,
  fetchAllActiveEmployees
} from "../../../../../../_metronic/redux/dashboardActions";
import DatePicker from "react-datepicker";
import axios from 'axios';
import { red } from "@material-ui/core/colors";
import { toAbsoluteUrl } from "../../../../../../_metronic/_helpers";
import { Link } from "@material-ui/core";
import { useDesignationUIContext } from "../DesignationUIContext";

export const USERS_URL = process.env.REACT_APP_API_URL;

// Phone Number Regex
const phoneRegExp = /^((\+92)|(0092))-{0,1}\d{3}-{0,1}\d{7}$|^\d{11}$|^\d{4}-\d{7}$/;
// CNIC Regex
const cnicRegExp = /^[0-9]{5}-[0-9]{7}-[0-9]$/;
// Password Regex
const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
// Validation schema
const profileValidation = Yup.object().shape(
  {
    firstName: Yup.string()
      .required("Required*"),
    lastName: Yup.string()
      .required("Required*"),
    middleName: Yup.string()
      .required("Required*"),
    employeeCode: Yup.string()
      .required("Required*"),
    title: Yup.string()
      .required("Required*"),


  },

);
export function DesignationEditForm({
  saveEmployeeProfile,
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
  id
}) {

  const designationUIContext = useDesignationUIContext()
  const DesignationUIProps = useMemo(() => {
    return {
      newSkillButtonClick: designationUIContext.newSkillButtonClick,
      newIncidentButtonClick: designationUIContext.newIncidentButtonClick,
      newWorkExperienceButtonClick: designationUIContext.newWorkExperienceButtonClick,
      newContactButtonClick: designationUIContext.newContactButtonClick,
      newAcademicButtonClick: designationUIContext.newAcademicButtonClick,
      newDesignationButtonClick: designationUIContext.newDesignationButtonClick,
      openEditDesignationDialog: designationUIContext.openEditDesignationDialog,
    }
  }, [designationUIContext])

  const dispatch = useDispatch();
  const { dashboard } = useSelector((state) => state);
  // Get User Details
  const { auth } = useSelector((state) => state);


  const [defDept = null, setDefaultDept] = useState(null);
  const [defchildMenus = null, setDefaultChildMenus] = useState(null);
  const [defchildTeamMenus = null, setDefaultChildTeamsMenus] = useState(null);
  const [defchildRegionMenus = null, setDefaultChildRegionMenus] = useState(null);
  const [defchildReligionMenus = null, setDefaultChildReligionMenus] = useState(null);
  const [defchildEmptypeMenus = null, setDefaultChildEmpTypeMenus] = useState(null);
  const [defchildLocationMenus = null, setDefaultChildLocationMenus] = useState(null);

  const [defCountry, setDefaultCountry] = useState({});
  const [defCity, setDefaultCity] = useState({});
  const [joiningDateSelected, setJoiningDate] = useState(null);
  const [confirmationDateSelected, setConfirmationDate] = useState(null);
  const [confirmationDueDateSelected, setConfirmationDueDate] = useState(null);
  const [confirmationEnterDateSelected, setConfirmationEnterDate] = useState(null);
  const [contractExpirtyDateSelected, setContractExpiryDate] = useState(null);
  const [DOBDateSelected, setDOBDate] = useState(null);
  const [RetirementSelected, setDRetirmentDate] = useState(null);
  const [profile_image, setImage] = useState(toAbsoluteUrl("/media/logos/defaultImg.png"));
  const [file, setFile] = useState('');
  // ================ Getting list from DB Stored Procedure
  const [contactList, setContactList] = useState([]);
  const [workExperienceList, setworkExperienceList] = useState([]);
  const [academicList, setAcademicList] = useState([]);
  const [skillsList, setSkillList] = useState([]);
  const [incidentList, setIncidentList] = useState([]);
  const [defSubsidiary = null, setDefualtSubsidiaryList] = useState(null);
  //==================== END
  const [defEmpDesingaton = null, setDefualtEmpDesignation] = useState(null);
  
  const [mylist, setMyList] = useState('');

  const [showChildModal, setShowChildModal] = useState(false);
  const handleChildModalClose = () => setShowChildModal(false);
  const handleChildModalShow = () => setShowChildModal(true);
  const [defEmployeeReportTo = null, setEmployeeReportToDefault] = useState(null);
  const [defEmployeeGrade = null, setDefualtEmployeeGrade] = useState(null);
  // Department DropDown Load when pageLoad
  useEffect(() => {
    console.log("ball", id)
    if (!user.deptId) {
      dispatch(fetchAllDept(1));
      dispatch(fetchAllFormsMenu(143, "allEmployeeGradeList")); // For All Grade Codes
      dispatch(fetchAllFormsMenu(127, "allChildMenus")); // For Payroll Group
      dispatch(fetchAllFormsMenu(174, "allTeamsChildMenus")); // For Teams
      dispatch(fetchAllFormsMenu(86, "allRegionChildMenus")); // For Region
      dispatch(fetchAllFormsMenu(87, "allReligionChildMenus")); // For Religion
      dispatch(fetchAllFormsMenu(88, "allEmpTypeChildMenus")); // For EmployeeType
      dispatch(fetchAllFormsMenu(89, "allLocationChildMenus")); // For Location
      dispatch(fetchAllCountry());
      dispatch(fetchAllActiveEmployees());
      dispatch(fetchAllFormsMenu(158, "allDesignations")); // For All Designations
      dispatch(fetchAllFormsMenu(133, "allSubidiaryList")); // For All Subsisidaries
      // dispatch(fetchAllFormsMenu(87));
    }
  }, [dispatch]);


  useEffect(() => {

    const subsidiaryId = defSubsidiary?.value ? defSubsidiary.value : user.subsidiaryId;
   
    setDefualtSubsidiaryList(
      dashboard.allSubidiaryList &&
      dashboard.allSubidiaryList.filter((item) => {
        return item.value === subsidiaryId;
      })
    );

  }, [user?.subsidiaryId, dashboard.subsidiaryId]);

  //===== Date Of Joining
  useEffect(() => {
    if (user.dateOfJoining) {
      setJoiningDate(new Date(user.dateOfJoining));
    }
  }, [user.dateOfJoining]);

  //=========== END

  //===== Date Of Birth
  useEffect(() => {
    console.log("user DOB", user.dateOfBirth)
    if (user.dateOfBirth) {
      setDOBDate(new Date(user.dateOfBirth));
    }
  }, [user.dateOfBirth]);

  //=========== END

  //===== Date Of Confirmation
  useEffect(() => {
    if (user.dateOfConfirmation) {
      setConfirmationDate(new Date(user.dateOfConfirmation));
    }
  }, [user.dateOfConfirmation]);

  //=========== END

useEffect(() => {
    const designationId = defEmpDesingaton?.value ? defEmpDesingaton.value : user.designationId;
    setDefualtEmpDesignation(
      dashboard.allDesignations &&
      dashboard.allDesignations.filter((item) => {
        return item.value === designationId;
      })
    );

  }, [user?.designationId, dashboard.designationId]);

  //===== Date Of Confirmation Due
  useEffect(() => {
    if (user.dateOfConfirmationDue) {
      setConfirmationDueDate(new Date(user.dateOfConfirmationDue));
    }
  }, [user.dateOfConfirmationDue]);

  //=========== END

  //===== Date Of dateOfConfirmationEnter
  useEffect(() => {
    if (user.dateOfConfirmationEnter) {
      setConfirmationEnterDate(new Date(user.dateOfConfirmationEnter));
    }
  }, [user.dateOfConfirmationEnter]);

  //=========== END

  //===== Date Of Contract Expirty
  useEffect(() => {
    if (user.dateOfContractExpiry) {
      setContractExpiryDate(new Date(user.dateOfContractExpiry));
    }
  }, [user.dateOfContractExpiry]);

  //=========== END

  //===== Date Of Retirement
  useEffect(() => {
    if (user.dateOfRetirement) {
      setDRetirmentDate(new Date(user.dateOfRetirement));
    }
  }, [user.dateOfRetirement]);

  //=========== END


  useEffect(() => {
    const gradeId = defEmployeeGrade?.value ? defEmployeeGrade.value : user.gradeId;
    setDefualtEmployeeGrade(
      dashboard.allEmployeeGradeList &&
      dashboard.allEmployeeGradeList.filter((item) => {
        return item.value === gradeId;
      })
    );

  }, [user?.gradeId, dashboard.gradeId]);

  // This method is used for when edit record and get selected dept where id save in DB
  useEffect(() => {
    const deptId = defDept?.value ? defDept.value : user.departmentId;
    console.log("deptID", deptId);
    setDefaultDept(
      dashboard.allDept &&
      dashboard.allDept.filter((item) => {
        return item.value === deptId;
      })
    );

  }, [user?.departmentId, dashboard.departmentId]);

  useEffect(() => {
    const countryId = defCountry?.value ? defCountry.value : user.countryId;
    setDefaultCountry(
      dashboard.allCountry &&
      dashboard.allCountry.filter((item) => {
        return item.value === countryId;
      })
    );

  }, [user?.countryId, dashboard.countryId]);
  //======================= Payroll Group
  useEffect(() => {
    const payrollGroupId = defchildMenus?.value ? defchildMenus.value : user.payrollGroupId;
    setDefaultChildMenus(
      dashboard.allChildMenus &&
      dashboard.allChildMenus.filter((item) => {
        return item.value === payrollGroupId;
      })
    );

  }, [user?.payrollGroupId, dashboard.payrollGroupId]);
  //======================= End

  //======================= Team

  useEffect(() => {
    const teamId = defchildTeamMenus?.value ? defchildTeamMenus.value : user.teamId;
    setDefaultChildTeamsMenus(
      dashboard.allTeamsChildMenus &&
      dashboard.allTeamsChildMenus.filter((item) => {
        return item.value === teamId;
      })
    );

  }, [user?.teamId, dashboard.teamId]);
  //======================= End


  //======================= Region

  useEffect(() => {
    const regionId = defchildRegionMenus?.value ? defchildRegionMenus.value : user.regionId;
    setDefaultChildRegionMenus(
      dashboard.allRegionChildMenus &&
      dashboard.allRegionChildMenus.filter((item) => {
        return item.value === regionId;
      })
    );

  }, [user?.regionId, dashboard.regionId]);
  //======================= End

  //======================= Religion

  useEffect(() => {
    const religionId = defchildRegionMenus?.value ? defchildRegionMenus.value : user.religionId;
    setDefaultChildReligionMenus(
      dashboard.allReligionChildMenus &&
      dashboard.allReligionChildMenus.filter((item) => {
        return item.value === religionId;
      })
    );

  }, [user?.religionId, dashboard.religionId]);
  //======================= End

  useEffect(() => {
    const reportTo = defEmployeeReportTo?.value ? defEmployeeReportTo.value : user.reportTo;
    console.log("reportTo", reportTo);
    setEmployeeReportToDefault(
      dashboard.allEmployees &&
      dashboard.allEmployees.filter((item) => {
        return item.value === reportTo;
      })
    );

  }, [user?.reportTo, dashboard.reportTo]);

  //======================= Employee Type

  useEffect(() => {
    const emptypeId = defchildEmptypeMenus?.value ? defchildEmptypeMenus.value : user.employeeTypeId;
    setDefaultChildEmpTypeMenus(
      dashboard.allEmpTypeChildMenus &&
      dashboard.allEmpTypeChildMenus.filter((item) => {
        return item.value === emptypeId;
      })
    );

  }, [user?.employeeTypeId, dashboard.employeeTypeId]);
  //======================= End


  //======================= Location

  useEffect(() => {
    const locationId = defchildLocationMenus?.value ? defchildLocationMenus.value : user.locationId;
    setDefaultChildLocationMenus(
      dashboard.allLocationChildMenus &&
      dashboard.allLocationChildMenus.filter((item) => {
        return item.value === locationId;
      })
    );

  }, [user?.locationId, dashboard.locationId]);
  //======================= End

  useEffect(() => {
    if (!user.countryId) {
      dispatch(fetchAllCity(1));
    }
  }, [user.countryId, dispatch]);


  useEffect(() => {
    const cityId = defCity?.value ? defCity.value : user.cityId;
    console.log('cityId', cityId, dashboard.allCity)
    setDefaultCity(
      dashboard.allCity &&
      dashboard.allCity.filter((item) => {
        return item.value === cityId;
      })
    );
  }, [user?.cityId, dashboard.allCity]);

  useEffect(() => {
    if (user.cityId) {

      console.log(user);
      setImage(user.profile_image || '');
      dispatch(fetchAllCityCenters(user.cityId));
    }
  }, [user.cityId, dispatch]);

  const onImageChange = async event => {
    if (event.target.files && event.target.files[0]) {
      let img = event.target.files[0];
      setFile(img);
      console.log("img", URL.createObjectURL(img));
      setImage(URL.createObjectURL(img));
    }
  };

  useEffect(() => {
    const fetchContactData = async () => {
      try {
        console.log('test contact', id)
        const response = await axios.post(`${USERS_URL}/profile/read-contact`, { Id: id });
        console.log("tall resp", response);
        setContactList(response?.data?.data?.rows);

      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    const fetchWorkExperienceData = async () => {
      try {
        console.log('test exp', id)
        const response = await axios.post(`${USERS_URL}/experience/read-all-experienceById`, { Id: id });
        console.log("experience resp", response);
        setworkExperienceList(response?.data?.data);

      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    const fetchAcademicData = async () => {
      try {
        console.log('test exp', id)
        const response = await axios.post(`${USERS_URL}/academic/read-all-academic_by_empId`, { Id: id });
        console.log("academy resp", response);
        setAcademicList(response?.data?.data);

      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    const fetchSkillsData = async () => {
      try {
        console.log('test skill empid', id)
        const response = await axios.post(`${USERS_URL}/skills/read-all-skills_by_employeeId`, { Id: id });
        console.log("skill resp", response);
        setSkillList(response?.data?.data);

      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    const fetchIncidentData = async () => {
      try {
        console.log('test incident empid', id)
        const response = await axios.post(`${USERS_URL}/incident/read-all-incident_by_employeeId`, { Id: id });
        console.log("incident resp", response);
        setIncidentList(response?.data?.data);

      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchIncidentData();
    fetchSkillsData();
    fetchAcademicData();
    fetchWorkExperienceData();
    fetchContactData();
  }, []);
  console.log("contactList", mylist)
  return (
    <>
      <Formik
        enableReinitialize={true}
        initialValues={user}
        validationSchema={profileValidation}
        onSubmit={async (values) => {
          enableLoading();
          //   console.log("values emp", values);
          //   values.profile_image = profile_image;
          if (file) {
            let formData = new FormData();
            await formData.append('image', file);
            await axios
              .post(`${USERS_URL}/profile/image-upload`, formData)
              .then((res) => {
                console.log(res.data, "looos")
                setImage(res.data.imageUrl)
                
                saveEmployeeProfile(values, res.data.imageUrl);
              });
          }
          else {
            console.log("values emp",values)
            saveEmployeeProfile(values, profile_image);
          }

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
                  <div style={{ backgroundColor: "rgb(235 243 255)", padding: "20px", borderRadius: "5px", border: '2px solid #adceff' }}>
                    <h6>Basic Information</h6>
                    <div className="from-group row">
                      <div className="col-12 col-md-4 mt-3">
                        <div>
                          <div>
                            <div>
                              <img name='profile_image' width={120} height={120} src={profile_image} />
                              <h4>Select Image</h4>
                              <input type="file" name="myImage" onChange={onImageChange} />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="from-group row">
                    <div className="col-12 col-md-4 mt-3">
                          <SearchSelect
                            name="subsidiaryId"
                            label={<span> Subsidiary<span style={{ color: 'red' }}>*</span></span>}
                            isDisabled={isUserForRead && true}
                            onBlur={() => {
                              // handleBlur({ target: { name: "countryId" } });
                            }}
                            onChange={(e) => {
                              setFieldValue("subsidiaryId", e.value || null);
                              setDefualtSubsidiaryList(e);
                              //handlePaymenModeChanged(e)
                            }}

                            value={(defSubsidiary || null)}
                            error={errors.subsidiaryId}
                            touched={touched.subsidiaryId}
                            options={dashboard.allSubidiaryList}
                          />

                        </div>
                    </div>
                    <div className="from-group row">
                      {

                        <div className="col-12 col-md-4 mt-3">
                          <Select
                            label="Title"
                            name="title"
                            value={values.title}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            style={{ display: "block" }}
                          >
                            <option value="-1" label="Select Title" />
                            <option value="Mr." label="Mr." />
                            <option value="Mrs." label="Mrs." />
                            <option value="Ms." label="Ms." />
                            <option value="Dr." label="Dr." />
                            <option value="Professor." label="Professor." />
                            <option value="Captain." label="Captain." />

                          </Select>
                          {errors.fuelType && touched.fuelType && (
                            <div className="invalid-text">{errors.title}</div>
                          )}
                        </div>

                      }
                      {
                        <div className="col-12 col-md-4 mt-3">
                          <Field
                            name="employeeCode"
                            component={Input}
                            placeholder="Enter Employee Code"
                            label={<span> Employee Code<span style={{ color: 'red' }}>*</span></span>}
                            autoComplete="off"
                          />
                        </div>
                      }
                      <div className="col-12 col-md-4 mt-3">
                        <SearchSelect
                          name="gradeId"
                          label={<span> Grade<span style={{ color: 'red' }}>*</span></span>}
                          isDisabled={isUserForRead && true}
                          onBlur={() => {
                            // handleBlur({ target: { name: "countryId" } });
                          }}
                          onChange={(e) => {
                            setFieldValue("gradeId", e.value || null);
                            setDefualtEmployeeGrade(e);
                            // dispatch(fetchAllFormsMenu(e.value));
                          }}
                          value={(defEmployeeGrade || null)}
                          error={errors.gradeId}
                          touched={touched.gradeId}
                          options={dashboard.allEmployeeGradeList}
                        />

                      </div>
                    </div>
                    <div className="from-group row">
                      <div className="col-12 col-md-4 mt-3">
                        <Field
                          name="firstName"
                          component={Input}
                          placeholder="Enter first name"
                          label={<span> First Name<span style={{ color: 'red' }}>*</span></span>}
                          autoComplete="off"
                        />
                      </div>
                      <div className="col-12 col-md-4 mt-3">
                        <Field
                          name="middleName"
                          component={Input}
                          placeholder="Enter middle name"
                          label={<span> Middle Name<span style={{ color: 'red' }}>*</span></span>}
                          autoComplete="off"
                        />
                      </div>
                      <div className="col-12 col-md-4 mt-3">
                        <Field
                          name="lastName"
                          component={Input}
                          placeholder="Enter last name"
                          label={<span> Last Name<span style={{ color: 'red' }}>*</span></span>}
                          autoComplete="off"
                        />
                      </div>

                    </div>


                    <div className="form-group row">
                    <div className="col-12 col-md-4 mt-3">
                    <SearchSelect
                      name="designationId"
                      label={<span> Designation<span style={{ color: 'red' }}>*</span></span>}
                      isDisabled={isUserForRead && true}
                      onBlur={() => {
                        // handleBlur({ target: { name: "countryId" } });
                      }}
                      onChange={(e) => {
                        setFieldValue("designationId", e.value || null);
                        setDefualtEmpDesignation(e);
                        // dispatch(fetchAllFormsMenu(e.value));
                      }}
                      value={(defEmpDesingaton || null)}
                      error={errors.designationId}
                      touched={touched.designationId}
                      options={dashboard.allDesignations}
                    />

                  </div>
                      <div className="col-12 col-md-4 mt-3">
                        <SearchSelect
                          name="departmentId"
                          label={<span> Department<span style={{ color: 'red' }}>*</span></span>}
                          isDisabled={isUserForRead && true}
                          onBlur={() => {
                            // handleBlur({ target: { name: "countryId" } });
                          }}
                          onChange={(e) => {
                            setFieldValue("departmentId", e.value || null);
                            setDefaultDept(e);
                            dispatch(fetchAllDept(e.value));
                          }}
                          value={(defDept || null)}
                          error={errors.Id}
                          touched={touched.Id}
                          options={dashboard.allDept}
                        />
                      </div>
                      <div className="col-12 col-md-4 mt-3">
                        <SearchSelect
                          name="teamId"
                          label={<span> Team<span style={{ color: 'red' }}>*</span></span>}
                          isDisabled={isUserForRead && true}
                          onBlur={() => {
                            // handleBlur({ target: { name: "countryId" } });
                          }}
                          onChange={(e) => {
                            setFieldValue("teamId", e.value || null);
                            setDefaultChildTeamsMenus(e);
                            // dispatch(fetchAllFormsMenu(e.value));
                          }}
                          value={(defchildTeamMenus || null)}
                          error={errors.Id}
                          touched={touched.Id}
                          options={dashboard.allTeamsChildMenus}
                        />
                      </div>
                      <div className="col-12 col-md-4 mt-3">
                        <SearchSelect
                          name="payrollGroupId"
                          label={<span> Payroll Group<span style={{ color: 'red' }}>*</span></span>}
                          isDisabled={isUserForRead && true}
                          onBlur={() => {
                            // handleBlur({ target: { name: "countryId" } });
                          }}
                          onChange={(e) => {
                            setFieldValue("payrollGroupId", e.value || null);
                            setDefaultChildMenus(e);
                            // dispatch(fetchAllFormsMenu(e.value));
                          }}
                          value={(defchildMenus || null)}
                          error={errors.Id}
                          touched={touched.Id}
                          options={dashboard.allChildMenus}
                        />
                      </div>

                      <div className="col-12 col-md-4 mt-3">

                        <SearchSelect
                          name="regionId"
                          label={<span> Region<span style={{ color: 'red' }}>*</span></span>}
                          isDisabled={isUserForRead && true}
                          onBlur={() => {
                            // handleBlur({ target: { name: "countryId" } });
                          }}
                          onChange={(e) => {
                            setFieldValue("regionId", e.value || null);
                            setDefaultChildRegionMenus(e);
                            // dispatch(fetchAllFormsMenu(e.value));
                          }}
                          value={(defchildRegionMenus || null)}
                          error={errors.Id}
                          touched={touched.Id}
                          options={dashboard.allRegionChildMenus}
                        />
                      </div>

                      <div className="col-12 col-md-4 mt-3">
                        <SearchSelect
                          name="employeeTypeId"
                          label={<span> Employee Type<span style={{ color: 'red' }}>*</span></span>}
                          isDisabled={isUserForRead && true}
                          onBlur={() => {
                            // handleBlur({ target: { name: "countryId" } });
                          }}
                          onChange={(e) => {
                            setFieldValue("employeeTypeId", e.value || null);
                            setDefaultChildEmpTypeMenus(e);
                            // dispatch(fetchAllFormsMenu(e.value));
                          }}
                          value={(defchildEmptypeMenus || null)}
                          error={errors.Id}
                          touched={touched.Id}
                          options={dashboard.allEmpTypeChildMenus}
                        />
                      </div>
                      <div className="col-12 col-md-4 mt-3">
                        <SearchSelect
                          name="locationId"
                          label={<span> Location<span style={{ color: 'red' }}>*</span></span>}
                          isDisabled={isUserForRead && true}
                          onBlur={() => {
                            // handleBlur({ target: { name: "countryId" } });
                          }}
                          onChange={(e) => {
                            setFieldValue("locationId", e.value || null);
                            setDefaultChildLocationMenus(e);
                            // dispatch(fetchAllFormsMenu(e.value));
                          }}
                          value={(defchildLocationMenus || null)}
                          error={errors.Id}
                          touched={touched.Id}
                          options={dashboard.allLocationChildMenus}
                        />
                      </div>
                      <div className="col-12 col-md-4 mt-3">
                        <SearchSelect
                          name="countryId"
                          label={<span> Country<span style={{ color: 'red' }}>*</span></span>}
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
                      </div>
                      <div className="col-12 col-md-4 mt-3">
                        <SearchSelect
                          name="cityId"
                          label={<span> City<span style={{ color: 'red' }}>*</span></span>}
                          isDisabled={isUserForRead && true}
                          onBlur={() => {
                            //   handleBlur({ target: { name: "cityId" } });
                          }}
                          onChange={(e) => {
                            setFieldValue("cityId", e.value);
                            setDefaultCity(e);
                            dispatch(fetchAllCityCenters(e.value));
                          }}
                          value={defCity}
                          error={errors.cityId}
                          touched={touched.cityId}
                          options={dashboard.allCity}
                        />
                      </div>
                      <div className="col-12 col-md-4 mt-3">
                        <label>Date Of Joining</label>
                        <DatePicker
                          className="form-control"
                          placeholder="Enter Date Of Joining"
                          selected={joiningDateSelected}
                          onChange={(date) => {
                            setFieldValue("dateOfJoining", date);
                            setJoiningDate(date);
                          }}
                          timeInputLabel="Time:"
                          dateFormat="dd/MM/yyyy"
                          showTimeInput
                          autoComplete="off"
                          name="dateOfJoining"
                          disabled={isUserForRead}
                        // value = {values.dateOfJoining}
                        />
                      </div>
                      <div className="col-12 col-md-4 mt-3">
                        <label>Date Of Confirmation</label>
                        <DatePicker
                          className="form-control"
                          placeholder="Enter Date Of Confirmation"
                          selected={confirmationDateSelected}
                          onChange={(date) => {
                            setFieldValue("dateOfConfirmation", date);
                            setConfirmationDate(date);
                          }}
                          timeInputLabel="Time:"
                          dateFormat="dd/MM/yyyy"
                          showTimeInput
                          name="dateOfConfirmation"
                          disabled={isUserForRead}
                          autoComplete="off"
                        />
                      </div>
                      <div className="col-12 col-md-4 mt-3">
                        <label>Date Confirmation Due </label>
                        <DatePicker
                          className="form-control"
                          placeholder="Enter Date Of Confirmation Due"
                          selected={confirmationDueDateSelected}
                          onChange={(date) => {
                            setFieldValue("dateOfConfirmationDue", date);
                            setConfirmationDueDate(date);
                          }}
                          timeInputLabel="Time:"
                          dateFormat="dd/MM/yyyy"
                          showTimeInput
                          name="dateOfConfirmationDue"
                          disabled={isUserForRead}
                          autoComplete="off"
                        />
                      </div>
                      <div className="col-12 col-md-4 mt-3">
                        <label>Date Confirmation Extended </label>
                        <DatePicker
                          className="form-control"
                          placeholder="Enter Confirmation Enter Date"
                          selected={confirmationEnterDateSelected}
                          onChange={(date) => {
                            setFieldValue("dateOfConfirmationEnter", date);
                            setConfirmationEnterDate(date);
                          }}
                          timeInputLabel="Time:"
                          dateFormat="dd/MM/yyyy"
                          showTimeInput
                          name="dateOfConfirmationEnter"
                          disabled={isUserForRead}
                          autoComplete="off"
                        />
                      </div>
                      <div className="col-12 col-md-4 mt-3">
                        <label>Date Confirmation Enter </label>
                        <DatePicker
                          className="form-control"
                          placeholder="Enter Contract Expiry"
                          selected={contractExpirtyDateSelected}
                          onChange={(date) => {
                            setFieldValue("dateOfContractExpiry", date);
                            setContractExpiryDate(date);
                          }}
                          timeInputLabel="Time:"
                          dateFormat="dd/MM/yyyy"
                          showTimeInput
                          name="dateOfContractExpiry"
                          disabled={isUserForRead}
                          autoComplete="off"
                        />
                      </div>


                      <div className="col-12 col-md-4 mt-3">
                        <Select
                          label="Default Shift"
                          name="defaultShiftId"
                          value={values.defaultShiftId}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          style={{ display: "block" }}
                          autoComplete="off"
                        >
                          <option value="-1" label="Select Shift" />
                          <option value="1" label="Morning Shift-A" />
                          <option value="2" label="Evening Shift-B" />
                          <option value="3" label="Night Shift-C" />


                        </Select>
                        {errors.defaultShiftId && touched.defaultShiftId && (
                          <div className="invalid-text">{errors.defaultShiftId}</div>
                        )}
                      </div>
                      <div className="col-12 col-md-4 mt-3">
                        <Select
                          label="Attendance Type"
                          name="attendanceType"
                          value={values.attendanceType}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          style={{ display: "block" }}
                          autoComplete="off"
                        >
                          <option value="-1" label="Select Attendance Type" />
                          <option value="1" label="Regular Attendance" />
                          <option value="2" label="Auto Present Attendance" />

                        </Select>
                        {errors.attendanceType && touched.attendanceType && (
                          <div className="invalid-text">{errors.attendanceType}</div>
                        )}
                      </div>
                    </div>
                    <div className="from-group row">
                    {
                      <div className="col-12 col-md-4 mt-3">
                      <SearchSelect
                        name="reportTo"
                        label={<span> Report To<span style={{ color: 'red' }}>*</span></span>}
                        isDisabled={isUserForRead && true}
                        // onBlur={() => {
                        //   handleBlur({ target: { name: "countryId" } });
                        // }}
                        onChange={(e) => {
                          setFieldValue("reportTo", e.value || null);
                          setEmployeeReportToDefault(e);
                          //dispatch(fetchAllActiveEmployees(e.value));
                        }}
                        value={(defEmployeeReportTo || null)}
                        error={errors.reportTo}
                        touched={touched.reportTo}
                        options={dashboard.allEmployees}
                      />
                    </div>
                    }
                    </div>
                    <br></br>

                  </div>

                  <br></br>
                  <div style={{ backgroundColor: "rgb(235 243 255)", padding: "20px", borderRadius: "5px", border: '2px solid #adceff' }}>
                    <h6>Personal Information</h6>

                    <div className="from-group row">
                      <div className="col-12 col-md-4 mt-3">
                        <label>Date Of Birth</label>
                        <DatePicker
                          className="form-control"
                          placeholder="Enter Date Of Birth"
                          selected={DOBDateSelected}
                          value={values.dateOfBirth}
                          onChange={(date) => {
                            setFieldValue("dateOfBirth", date);
                            setDOBDate(date);
                          }}
                          timeInputLabel="Time:"
                          dateFormat="dd/MM/yyyy"
                          showTimeInput
                          name="dateOfBirth"
                          disabled={isUserForRead}
                          autoComplete="off"
                        />
                      </div>

                      <div className="col-12 col-md-4 mt-3">
                        <label>Date Of Retirement</label>
                        <DatePicker
                          className="form-control"
                          placeholder="Enter Date Of Retirement"
                          selected={RetirementSelected}
                          onChange={(date) => {
                            setFieldValue("dateOfRetirement", date);
                            setDRetirmentDate(date);
                          }}
                          timeInputLabel="Time:"
                          dateFormat="dd/MM/yyyy"
                          showTimeInput
                          name="dateOfRetirement"
                          disabled={isUserForRead}
                          autoComplete="off"
                        />
                      </div>
                    </div>

                    <div className="from-group row">
                      <div className="col-12 col-md-4 mt-3">
                        <Field
                          name="nic_no"
                          component={Input}
                          placeholder="Enter ID Card No"
                          label="Enter ID Card No"
                          autoComplete="off"
                        />
                      </div>
                      <div className="col-12 col-md-4 mt-3">
                        <Field
                          name="passportNo"
                          component={Input}
                          placeholder="Enter Passport No"
                          label="Enter Passport No"
                          autoComplete="off"
                        />
                      </div>
                    </div>


                    <div className="from-group row">
                      <div className="col-12 col-md-4 mt-3">
                        <Select
                          label="Marital Status"
                          name="maritalStatus"
                          value={values.maritalStatus}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          style={{ display: "block" }}
                          autoComplete="off"
                        >
                          <option value="-1" label="Select..." />
                          <option value="Single" label="Single" />
                          <option value="Married" label="Married" />

                        </Select>
                      </div>
                      <div className="col-12 col-md-4 mt-3">
                        <Select
                          label="Gender"
                          name="gender"
                          value={values.gender}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          style={{ display: "block" }}
                          autoComplete="off"
                        >
                          <option value="-1" label="Select Gender" />
                          <option value="Male" label="Male" />
                          <option value="Female" label="Female" />

                        </Select>
                        {errors.gender && touched.gender && (
                          <div className="invalid-text">{errors.gender}</div>
                        )}
                      </div>
                    </div>
                    <div className="from-group row">
                      <div className="col-12 col-md-4 mt-3">
                        <SearchSelect
                          name="religionId"
                          label="Religion*"
                          isDisabled={isUserForRead && true}

                          onBlur={() => {
                            // handleBlur({ target: { name: "countryId" } });
                          }}
                          onChange={(e) => {
                            setFieldValue("religionId", e.value || null);
                            setDefaultChildReligionMenus(e);
                            // dispatch(fetchAllFormsMenu(e.value));
                          }}
                          value={(defchildReligionMenus || null)}
                          error={errors.Id}
                          touched={touched.Id}
                          options={dashboard.allReligionChildMenus}
                        />
                      </div>
                      <div className="col-12 col-md-4 mt-3">
                        <Select
                          label="Nationality"
                          name="nationality"
                          value={values.nationality}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          style={{ display: "block" }}
                        >
                          <option value="-1" label="Select Nationality" />
                          <option value="Pakistani" label="Pakistani" />
                          <option value="Other" label="Other" />

                        </Select>
                        {errors.nationality && touched.nationality && (
                          <div className="invalid-text">{errors.nationality}</div>
                        )}
                      </div>
                    </div>
                  </div>
                  <br></br>

                  <div style={{ backgroundColor: "rgb(235 243 255)", padding: "20px", borderRadius: "5px", border: '2px solid #adceff' }}>
                    <h6>Contact Information</h6>

                    <hr></hr>
                    <div className="from-group row">
                      <div className="col-12 col-md-4 mt-3">
                        <Field
                          name="email_official"
                          component={Input}
                          placeholder="Enter Offical Email"
                          label="Offical Email"
                          autoComplete="off"

                        />
                      </div>
                      <div className="col-12 col-md-4 mt-3">
                        <Field
                          name="email_personal"
                          component={Input}
                          placeholder="Enter Personal Email"
                          label="Personal Email"
                          autoComplete="off"
                        />
                      </div>
                    </div>
                    <div className="from-group row">

                      <div className="col-12 col-md-4 mt-3">
                        <Field
                          name="phone_home"
                          component={Input}
                          placeholder="Enter Home Phone"
                          label="Phone Home"
                          autoComplete="off"
                        />
                      </div>
                      <div className="col-12 col-md-4 mt-3">
                        <Field
                          name="phone_official"
                          component={Input}
                          placeholder="Enter Offical Phone"
                          label="Offical Phone"
                          autoComplete="off"
                        />
                      </div>
                      <div className="col-12 col-md-4 mt-3">
                        <Field
                          name="phone_cell"
                          component={Input}
                          placeholder="Enter Mobile Phone"
                          label="Cell No."
                          autoComplete="off"
                        />
                      </div>
                    </div>
                    <div className="from-group row">
                      <div className="col-12 col-md-4 mt-3">
                        <Field
                          name="professional_summary"
                          component={TextArea}
                          placeholder="Enter Professional Summary"
                          label="Professional Summary"
                          autoComplete="off"
                        />
                      </div>
                      <div className="col-12 col-md-4 mt-3">
                        <Field
                          name="additional_summary"
                          component={TextArea}
                          placeholder="Enter Additional Notes"
                          label="Additional Notes"
                          autoComplete="off"
                        />
                      </div>
                    </div>
                    {/* {<><button className="btn btn-light btn-elevate" type="button" onClick={handleChildModalShow}>
                      Open Child Modal
                    </button>

                      <Modal show={showChildModal} onHide={handleChildModalClose}>
                        <Modal.Header closeButton>
                          <Modal.Title>Child Modal</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>This is the child modal.</Modal.Body>
                        <Modal.Footer></Modal.Footer>
                        <button className="btn btn-light btn-elevate" type="button" onClick={handleChildModalClose}>
                          Close Child Modal
                        </button>
                      </Modal></>} */}
                    <hr></hr>

                    <div style={{ backgroundColor: "rgb(235 243 255)", padding: "20px", borderRadius: "5px", border: '2px solid #adceff' }}>

                      {<a onClick={DesignationUIProps.newContactButtonClick} href='javascript:void(0)'>+ Add Contact </a>}

                      <table class="table table table-head-custom table-vertical-center overflow-hidden table-hover">
                        <tr style={{ backgroundColor: '#4d5f7a', color: '#fff' }}>
                          <td>Relation Name</td>
                          <td>Relation</td>
                          <td>Contact No</td>
                        </tr>
                        {contactList?.map((obj, rightindex) => (
                          <><tr>
                            <td>
                              {obj.relation_name}
                            </td>
                            <td>{obj.relation}</td>
                            <td>{obj.contactNo}</td>
                          </tr>
                          </>
                        ))}

                      </table>
                    </div>
                    <br></br>
                    <div style={{ backgroundColor: "rgb(235 243 255)", padding: "20px", borderRadius: "5px", border: '2px solid #adceff' }}>

                      {<a onClick={DesignationUIProps.newWorkExperienceButtonClick} href='javascript:void(0)'>+ Add Experience </a>}

                      <table class="table table table-head-custom table-vertical-center overflow-hidden table-hover">
                        <tr style={{ backgroundColor: '#4d5f7a', color: '#fff' }}>
                          <td>Company</td>
                          <td>Position Held</td>
                          <td>Country</td>
                          <td>City</td>
                          <td>Start Date</td>
                          <td>End Date</td>
                        </tr>
                        {workExperienceList?.map((obj, rightindex) => (
                          <><tr>
                            <td>
                              {obj.companyName}
                            </td>
                            <td>{obj.positionHeld}</td>
                            <td>{obj.country}</td>
                            <td>{obj.city}</td>
                            <td>{obj.startDate}</td>
                          </tr>
                          </>
                        ))}


                      </table>
                    </div>
                    <br></br>
                    <div style={{ backgroundColor: "rgb(235 243 255)", padding: "20px", borderRadius: "5px", border: '2px solid #adceff' }}>

                      {<a onClick={DesignationUIProps.newAcademicButtonClick} href='javascript:void(0)'>+ Add Academic Info </a>}

                      <table class="table table table-head-custom table-vertical-center overflow-hidden table-hover">
                        <tr style={{ backgroundColor: '#4d5f7a', color: '#fff' }}>

                          <td>Employee</td>

                          <td>Institution</td>
                          <td>Degree</td>
                          <td>Country</td>
                          <td>City</td>
                          <td>Status</td>
                        </tr>
                        {academicList?.map((obj, rightindex) => (
                          <>

                            <tr>
                              <td>
                                {obj.employee}
                              </td>
                              <td>{obj.institution}</td>
                              <td>{obj.degree}</td>
                              <td>{obj.country}</td>
                              <td>{obj.city}</td>
                              <td>{obj.status}</td>
                            </tr>
                          </>
                        ))}

                      </table>
                    </div>
                    <br></br>
                    <div style={{ backgroundColor: "rgb(235 243 255)", padding: "20px", borderRadius: "5px", border: '2px solid #adceff' }}>

                      {<a onClick={DesignationUIProps.newSkillButtonClick} href='javascript:void(0)'>+ Add Skill </a>}

                      <table class="table table table-head-custom table-vertical-center overflow-hidden table-hover">
                        <tr style={{ backgroundColor: '#4d5f7a', color: '#fff' }}>

                          <td>Employee</td>

                          <td>Description</td>
                          <td>Skill</td>
                          <td>rating</td>
                          <td>Start Date</td>
                          <td>End Date</td>
                        </tr>
                        {skillsList?.map((obj, rightindex) => (
                          <>

                            <tr>
                              <td>
                                {obj.employee}
                              </td>
                              <td>{obj.description}</td>
                              <td>{obj.skill}</td>
                              <td>{obj.ratingScale}</td>

                              <td>{obj.startDate}</td>
                              <td>{obj.endDate}</td>
                            </tr>
                          </>
                        ))}

                      </table>
                    </div>

                    <br></br>
                    <div style={{ backgroundColor: "rgb(235 243 255)", padding: "20px", borderRadius: "5px", border: '2px solid #adceff' }}>

                      {<a onClick={DesignationUIProps.newIncidentButtonClick} href='javascript:void(0)'>+ Add Incident Info </a>}

                      <table class="table table table-head-custom table-vertical-center overflow-hidden table-hover">
                        <tr style={{ backgroundColor: '#4d5f7a', color: '#fff' }}>

                          <td>Employee</td>

                          <td>Incident</td>
                          <td>Action Taken</td>
                          <td>Action Taken By</td>
                          <td>Incident Date</td>

                        </tr>
                        {incidentList?.map((obj, rightindex) => (
                          <>

                            <tr>
                              <td>
                                {obj.employee}
                              </td>
                              <td>{obj.incidentDetail}</td>
                              <td>{obj.actionTaken}</td>
                              <td>{obj.actionTakenBy}</td>

                              <td>{obj.incidentDate}</td>

                            </tr>
                          </>
                        ))}

                      </table>
                    </div>
                  </div>
                  <div className="from-group row">
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
      </Formik >
    </>
  );
}
