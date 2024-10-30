import React, { useEffect, useState, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Input, MaskInput, Select, TextArea } from "../../../../../../_metronic/_partials/controls";
import { useDispatch, useSelector } from "react-redux";
import { SearchSelect } from "../../../../../../_metronic/_helpers/SearchSelect";
import {
  fetchAllCountry,
  fetchAllCity,
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
import MaskedInput from "react-text-mask";

export const USERS_URL = process.env.REACT_APP_API_URL;
const currentDate = new Date();
const minDate = new Date(currentDate.getFullYear() - 18, currentDate.getMonth(), currentDate.getDate());

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
      .required("Required*")
      .max(10, "Employee code must be at most 10 characters long"),
    title: Yup.string()
      .required("Required*"),
    subsidiaryId: Yup.string()
      .required("Required*"),
    gradeId: Yup.string()
      .required("Required*"),
    designationId: Yup.string()
      .required("Required*"),
    departmentId: Yup.string()
      .required("Required*"),
    teamId: Yup.string()
      .required("Required*"),
    payrollGroupId: Yup.string()
      .required("Required*"),
    regionId: Yup.string()
      .required("Required*"),
    maritalStatus: Yup.string()
      .nullable() // Allows null values
      .required("Required*"),
    religionId: Yup.string()
      .required("Required*"),
    nationality: Yup.string()
      .required("Required*"),

    gender: Yup.string()
      .required("Required*"),

    employeeTypeId: Yup.string()
      .required("Required*"),

    locationId: Yup.string()
      .required("Required*"),

    countryId: Yup.string()
      .required("Required*"),

    cityId: Yup.string()
      .required("Required*"),

    dateOfJoining: Yup.date()
      .max(currentDate, 'Date of joining cannot be in the future')
      .required("Required*"),

    dateOfConfirmation: Yup.date()
      .required('*Required')
      .when('dateOfJoining', (dateOfJoining, schema) => {
        return dateOfJoining && schema.min(dateOfJoining, 'Date of confirmation cannot be earlier than the date of joining');
      }),

    dateOfConfirmationDue: Yup.date()
      .required('*Required')
      .when('dateOfConfirmation', (dateOfConfirmation, schema) => {
        return dateOfConfirmation && schema.min(dateOfConfirmation, 'Date confirmation due cannot be earlier than date of confirmation');
      }),

    dateOfConfirmationEnter: Yup.date()
      .required('*Required')
      .when('dateOfConfirmationDue', (dateOfConfirmationDue, schema) => {
        return dateOfConfirmationDue && schema.min(dateOfConfirmationDue, 'Date confirmation extended cannot be earlier than date confirmation due');
      }),

    dateOfContractExpiry: Yup.date().nullable()
      .required('*Required')
      .when('dateOfConfirmationEnter', (dateOfConfirmationEnter, schema) => {
        return dateOfConfirmationEnter && schema.min(dateOfConfirmationEnter, 'Contract expiry date cannot be earlier than date confirmation extended');
      }),

    // dateOfRetirement: Yup.date() .nullable()
    // //.required('Contract expiry date is required')
    // .when('dateOfBirth', (dateOfBirth, schema) => {
    //   return dateOfBirth && schema.min(dateOfBirth, 'Contract expiry date cannot be earlier than date confirmation extended');
    // }),

    dateOfRetirement: Yup.date()
      .nullable()
      .typeError('Invalid date format')
      .when('dateOfBirth', {
        is: (dateOfBirth) => dateOfBirth != null, // Check if dateOfBirth is provided
        then: Yup.date().min(
          Yup.ref('dateOfBirth'),
          'Retirement date cannot be earlier than date of birth'
        ),
      }),

    nic_no: Yup.string()
      .matches(/^\d{5}-\d{7}-\d{1}$/, 'ID Card No must be in the format 12345-6789012-3')
      .required('Required'),
    // passportNo: Yup.string()
    // .matches(/^\d$/, 'ID Card No must be exactly 13 digits and contain only numbers') // Regex to match exactly 14 digits
    // .required('ID Card No is required'), // Make it required if necessary

    email_official: Yup.string()
      .nullable() // Allows null values
      .email('Invalid email address') // Validates email format
      .notRequired(), // Optional: make it required

    email_personal: Yup.string()
      .nullable() // Allows null values
      .email('Invalid email address') // Validates email format
      .notRequired(), // Optional: make it required



    phone_cell: Yup.string()
      .nullable() // Allows null values
      .matches(/^[0-9]*$/, 'Phone no must contain only digits') // Optional regex for digits
      .notRequired(), // Make it optional if you want

    phone_home: Yup.string()
      .nullable() // Allows null values
      .matches(/^[0-9]*$/, 'Phone home must contain only digits') // Optional regex for digits
      .notRequired(), // Make it optional if you want

    phone_official: Yup.string()
      .nullable() // Allows null values
      .matches(/^[0-9]*$/, 'Phone official must contain only digits') // Optional regex for digits
      .notRequired(), // Make it optional if you want


    dateOfBirth: Yup.date()
      .nullable()
      .typeError('Invalid date format')
      .required('*Required')
      .max(currentDate, 'Date of birth cannot be in the future')
      .max(minDate, 'You must be at least 18 years old'),

    // defContactList: Yup.array()
    //   .of(
    //     Yup.object().shape({
    //       relation_name: Yup.string()
    //         .required('Relation Name is required')
    //         .min(2, 'Must be at least 2 characters long'),
    //       relation: Yup.string().required('Relation is required'),
    //       contactNo: Yup.string()
    //         .required('Contact No is required')
    //         .matches(/^\d+$/, 'Contact No must be a number')
    //         .test('is-unique', 'Contact No must be unique', function (value) {
    //           const contactNumbers = this.parent; // Access the parent array
    //           const isDuplicate = contactNumbers.some(row => row.contactNo === value);
    //           return !isDuplicate || this.createError({ message: 'Contact No must be unique' });
    //         }),
    //     })
    //   )
    //   .min(1, 'At least one contact is required'),
  },



).test('check-marital-status', 'Invalid marital status for selected title', function (value) {
  console.log("validate::",value)
  const { title, maritalStatus, gender } = value;

  // Check conditions based on title // 196 == Single
  if (title === 'Mrs.' && maritalStatus === '196') {
    
    return this.createError({ path: 'maritalStatus', message: 'Mrs. cannot be single.' });
  }

  if ((title == 'Mrs.' || title == 'Ms.') && gender == 'Male') {
    return this.createError({ path: 'gender', message: 'Mrs. Ms. cannot be male.' });
  }

  if ((title === 'Mr.' || title === 'Dr.' || title === 'Professor.' || title === 'Captain') && gender === 'Female') {
    return this.createError({ path: 'gender', message: 'cannot be female.' });
  }

  return true; // No error
});




const ReimbursementSchema = Yup.object().shape({
  subsidiaryId: Yup.number().required("Subsidiary is required"),
  payroll_groupId: Yup.number().required("Payroll group is required"),
  cycle_typeId: Yup.number().required("Cycle type required"),



  accounts: Yup.array().of(
    Yup.object().shape({
      reimbursement_typeId: Yup.number().required("required"),
      expense_accountId: Yup.number()
        .required("Expense account is required"),
      bank_accountId: Yup.number().required("bank account required"),

    })
  )
});



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
  const [defMaritalStatus = null, setDefaultMaritalStatus] = useState(null);

  const [defCountry, setDefaultCountry] = useState({});
  const [defCity, setDefaultCity] = useState({});
  const [joiningDateSelected, setJoiningDate] = useState(null);
  const [confirmationDateSelected, setConfirmationDate] = useState(null);
  const [confirmationDueDateSelected, setConfirmationDueDate] = useState(null);
  const [confirmationEnterDateSelected, setConfirmationEnterDate] = useState(null);
  const [contractExpirtyDateSelected, setContractExpiryDate] = useState(null);
  const [DOBDateSelected, setDOBDate] = useState(null);
  const [RetirementSelected, setDRetirmentDate] = useState(null);

  const [defStartDateForExp, setStartDateForExp] = useState(null);
  const [defEndDateForExp, setEndDateForExp] = useState(null);

  const [profile_image, setImage] = useState(toAbsoluteUrl("/media/logos/defaultImg.png"));
  const [file, setFile] = useState('');
  // ================ Getting list from DB Stored Procedure

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
  const [defContactList = null, setDefaultContactList] = useState([]);
  const [currentDate, setCurrentDate] = useState('');

  useEffect(() => {
    // Get the current date in YYYY-MM-DD format
    const today = new Date().toISOString().split('T')[0];
    setCurrentDate(today);
  }, []);

  // Department DropDown Load when pageLoad
  useEffect(() => {
    console.log("ball", user)
    if (!user.Id) {
      dispatch(fetchAllDept(1));
      dispatch(fetchAllFormsMenu(143, "allEmployeeGradeList")); // For All Grade Codes
      dispatch(fetchAllFormsMenu(127, "allChildMenus")); // For Payroll Group
      dispatch(fetchAllFormsMenu(174, "allTeamsChildMenus")); // For Teams
      dispatch(fetchAllFormsMenu(86, "allRegionChildMenus")); // For Region
      dispatch(fetchAllFormsMenu(87, "allReligionChildMenus")); // For Religion
      dispatch(fetchAllFormsMenu(88, "allEmpTypeChildMenus")); // For EmployeeType
      dispatch(fetchAllFormsMenu(89, "allLocationChildMenus")); // For Location
      dispatch(fetchAllCountry());
      dispatch(fetchAllCity());
      dispatch(fetchAllActiveEmployees());
      dispatch(fetchAllFormsMenu(158, "allDesignations")); // For All Designations
      dispatch(fetchAllFormsMenu(133, "allSubidiaryList")); // For All Subsisidaries
      dispatch(fetchAllFormsMenu(190, "allMaritalStatus")); // For All Subsisidaries, "allMaritalStatus")); // For All Marital Status
      // dispatch(fetchAllFormsMenu(87));
      dispatch(fetchAllFormsMenu(125, "allRelationCodeList"));
      dispatch(fetchAllFormsMenu(109, "allInstitution")); // For Institution
      dispatch(fetchAllFormsMenu(108, "allDegreeTitle")); // For Degree Title
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

  ///

  useEffect(() => {
    console.log("marital::", user, dashboard.allMaritalStatus);
    const maritalStatus = defMaritalStatus?.value ? defMaritalStatus.value : user.maritalStatus;
    setDefaultMaritalStatus(

      dashboard.allMaritalStatus &&
      dashboard.allMaritalStatus.filter((item) => {
        return item.value == maritalStatus;
      })
    );

  }, [user?.maritalStatus, dashboard.maritalStatus]);

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

  // useEffect(() => {
  //   if (!user.countryId) {
  //     dispatch(fetchAllCity(1));
  //   }
  // }, [user.countryId, dispatch]);


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

  // For Edit Form
  useEffect(() => {
    const fetchContactData = async () => {
      try {
        const response = await axios.post(`${USERS_URL}/profile/read-contact`, { Id: id });
        setDefaultContactList(response?.data?.data);
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
        console.log('test academic', id)
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


  // For Add Employee Contact States

  const addRowContact = (element) => {
    console.log("click", element.target.id)
    setDefaultContactList([...defContactList, { transactionType: element.target.id, employeeId: id }])
  }

  const handleFieldChangedContact = (el) => {
    const index = el.target.id.split('-')[1]
    const key = el.target.id.split('-')[0]
    setDefaultContactList([...defContactList.map((val, ind) => {
      if (ind == index) {
        val[key] = el.target.value
      }
      return val
    })])
  }

  const deleteRowContact = (element) => {

    const data = defContactList;
    data.splice(element.target.id, 1);

    setDefaultContactList([...data])
  }
  // End Contact Section

  // Experience Section

  const addRowExprerience = (element) => {

    setworkExperienceList([...workExperienceList, { transactionType: element.target.id, employeeId: id }])
  }

  const handleDatePicker = (el, key, index, val) => {

    console.log("datepicker::", el, key, index);
    setworkExperienceList([...workExperienceList.map((val, ind) => {
      if (ind == index) {
        val[key] = new Date(el)
      }
      return val
    })])

  }

  const handleFieldChangedExperience = (el) => {


    console.log("::go", el);
    const index = el?.target?.id.split('-')[1]
    const key = el?.target?.id.split('-')[0]

    if (key == "countryId") {
      console.log("::el::", el);
      //  dispatch(fetchAllCity(el.target.value));

    }

    setworkExperienceList([...workExperienceList.map((val, ind) => {
      if (ind == index) {
        val[key] = el?.target?.value
      }
      return val
    })])
  }

  const deleteRowExperience = (element) => {

    const data = workExperienceList;
    data.splice(element.target.id, 1);

    setworkExperienceList([...data])
  }

  // End Experience


  // Experience Academic Info

  const addRowAcademic = (element) => {

    setAcademicList([...academicList, { transactionType: element.target.id, employeeId: id }])
  }

  const handleDatePickerAcademic = (el, key, index, val) => {

    console.log("datepicker::", el, key, index);
    setAcademicList([...academicList.map((val, ind) => {
      if (ind == index) {
        val[key] = new Date(el)
      }
      return val
    })])

  }

  const handleFieldChangedAcademic = (el) => {
    console.log("::go", el);
    const index = el.target.id.split('-')[1]
    const key = el.target.id.split('-')[0]

    if (key == "countryId") {
      console.log("::el::", el);
      // dispatch(fetchAllCity(el.target.value));

    }

    setAcademicList([...academicList.map((val, ind) => {
      if (ind == index) {
        val[key] = el.target.value
      }
      return val
    })])
  }

  const deleteRowAcademic = (element) => {
    const data = academicList;
    data.splice(element.target.id, 1);
    setAcademicList([...data])
  }

  // End Academic


  // Employee Skills Info

  const addRowSkills = (element) => {

    setSkillList([...skillsList, { transactionType: element.target.id, employeeId: id }])
  }

  const handleDatePickerSkills = (el, key, index, val) => {

    console.log("datepicker::", el, key, index);
    setSkillList([...skillsList.map((val, ind) => {
      if (ind == index) {
        val[key] = new Date(el)
      }
      return val
    })])

  }

  const handleFieldChangedSkills = (el) => {
    console.log("::go", el);
    const index = el?.target.id.split('-')[1]
    const key = el?.target.id.split('-')[0]
    setSkillList([...skillsList.map((val, ind) => {
      if (ind == index) {
        val[key] = el.target.value
      }
      return val
    })])
  }

  const deleteRowSkills = (element) => {
    const data = skillsList;
    data.splice(element.target.id, 1);
    setSkillList([...data])
  }

  // End Academic


  // Employee Incident

  const addRowIncident = (element) => {

    setIncidentList([...incidentList, { transactionType: element.target.id, employeeId: id }])
  }

  const handleDatePickerIncident = (el, key, index, val) => {

    console.log("datepicker::", el, key, index);
    setIncidentList([...incidentList.map((val, ind) => {
      if (ind == index) {
        val[key] = new Date(el)
      }
      return val
    })])

  }

  const handleFieldChangedIncident = (el) => {
    console.log("::go", el);
    const index = el?.target.id.split('-')[1]
    const key = el?.target.id.split('-')[0]
    setIncidentList([...incidentList.map((val, ind) => {
      if (ind == index) {
        val[key] = el.target.value
      }
      return val
    })])
  }

  const deleteRowIncident = (element) => {
    const data = incidentList;
    data.splice(element.target.id, 1);
    setIncidentList([...data])
  }

  // End Academic

  console.log("contactList", defContactList, workExperienceList, academicList, incidentList)
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

                saveEmployeeProfile(values, res.data.imageUrl, defContactList, workExperienceList, academicList, skillsList, incidentList);
              });
          }
          else {
            console.log("values emp", values)
            saveEmployeeProfile(values, profile_image, defContactList, workExperienceList, academicList, skillsList, incidentList);
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
                          {errors.title && touched.title && (
                            <div className="invalid-text">{errors.title}</div>
                          )}
                        </div>

                      }
                      {
                        <div className="col-12 col-md-4 mt-3">
                          <Field
                            name="employeeCode"
                            component={Input}
                            maxLength="10"
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
                          error={errors.departmentId}
                          touched={touched.departmentId}
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
                          error={errors.teamId}
                          touched={touched.teamId}
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
                          error={errors.payrollGroupId}
                          touched={touched.payrollGroupId}
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
                          error={errors.regionId}
                          touched={touched.regionId}
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
                          error={errors.employeeTypeId}
                          touched={touched.employeeTypeId}
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
                          error={errors.locationId}
                          touched={touched.locationId}
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
                            setDefaultCity({});
                            // dispatch(fetchAllCity(e.value));
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

                          }}
                          value={defCity}
                          error={errors.cityId}
                          touched={touched.cityId}
                          options={dashboard.allCity.filter(x => x.code == values.countryId)}
                        />
                      </div>
                      <div className="col-12 col-md-4 mt-3">
                        <label>Date Of Joining<span style={{ color: 'red' }}>*</span></label>
                        <DatePicker
                          className="form-control"
                          placeholder="Enter Date Of Joining"
                          selected={joiningDateSelected}
                          onChange={(date) => {
                            setFieldValue("dateOfJoining", date);
                            setJoiningDate(date);
                          }}
                          showYearDropdown
                          scrollableMonthYearDropdown
                          timeInputLabel="Time:"
                          dateFormat="dd/MM/yyyy"
                          showTimeInput
                          autoComplete="off"
                          name="dateOfJoining"
                          disabled={isUserForRead}
                          error={errors.dateOfJoining}
                          touched={touched.dateOfJoining}
                        />
                        <ErrorMessage style={{ color: "red" }} name="dateOfJoining" component="div" />
                      </div>

                      <div className="col-12 col-md-4 mt-3">
                        <label>Date Of Confirmation<span style={{ color: 'red' }}>*</span></label>
                        <DatePicker
                          className="form-control"
                          placeholder="Enter Date Of Confirmation"
                          selected={confirmationDateSelected}
                          showYearDropdown
                          scrollableMonthYearDropdown
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
                        <ErrorMessage style={{ color: "red" }} name="dateOfConfirmation" component="div" />
                      </div>
                      <div className="col-12 col-md-4 mt-3">
                        <label>Date Confirmation Due<span style={{ color: 'red' }}>*</span> </label>
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
                        <ErrorMessage style={{ color: "red" }} name="dateOfConfirmationDue" component="div" />
                      </div>
                      <div className="col-12 col-md-4 mt-3">
                        <label>Date Confirmation Extended <span style={{ color: 'red' }}>*</span> </label>
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
                        <ErrorMessage style={{ color: "red" }} name="dateOfConfirmationEnter" component="div" />
                      </div>
                      <div className="col-12 col-md-4 mt-3">
                        <label>Contract Expiry <span style={{ color: 'red' }}>*</span></label>
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
                        <ErrorMessage style={{ color: "red" }} name="dateOfContractExpiry" component="div" />
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


                      
                 
                    </div>

                    <div className="from-group row">
                      <div className="col-12 col-md-4 mt-3">
                       
                        <SearchSelect
                          label={<span> Marital Status<span style={{ color: 'red' }}>*</span></span>}
                          name="maritalStatus"
                          // value={values.maritalStatus}

                          onBlur={handleBlur}
                          onChange={(e) => {
                            setFieldValue("maritalStatus", e.value || null);
                            setDefaultMaritalStatus(e);
                            // dispatch(fetchAllFormsMenu(e.value));
                          }}
                          value={(defMaritalStatus || null)}
                          error={errors.maritalStatus}
                          touched={touched.maritalStatus}
                          options={dashboard.allMaritalStatus}
                        />
                        {/* <ErrorMessage style={{ color: "red" }} name="maritalStatus" component="div" /> */}
                      </div>
                      <div className="col-12 col-md-4 mt-3">
                        <Select
                          label={<span> Gender<span style={{ color: 'red' }}>*</span></span>}
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
                          label={<span> Religion<span style={{ color: 'red' }}>*</span></span>}
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
                          error={errors.religionId}
                          touched={touched.religionId}
                          options={dashboard.allReligionChildMenus}
                        />
                      </div>
                      <div className="col-12 col-md-4 mt-3">
                        <Select
                          label={<span> Nationality<span style={{ color: 'red' }}>*</span></span>}
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

                    <div className="from-group row">
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
                        
                        <div className="col-12 col-md-4 mt-3">
                          <SearchSelect
                            name="reportTo"
                            label={<span> Report To</span>}
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
                            options={dashboard.allEmployees.filter(x=>x.value != values.Id)}
                          />{console.log("::report::",dashboard.allEmployees,values.Id)}
                        </div>
                      
                    </div>
                    <br></br>

                  </div>

                  <br></br>
                  <div style={{ backgroundColor: "rgb(235 243 255)", padding: "20px", borderRadius: "5px", border: '2px solid #adceff' }}>
                    <h6>Personal Information</h6>

                    <div className="from-group row">
                      <div className="col-12 col-md-4 mt-3">
                        {<span> Date Of Birth<span style={{ color: 'red' }}>*</span></span>}
                        <DatePicker
                          className="form-control"
                          placeholder="Enter Date Of Birth"
                          selected={DOBDateSelected}
                          //value={values.dateOfBirth}
                          showYearDropdown
                          scrollableMonthYearDropdown
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
                        <ErrorMessage style={{ color: "red" }} name="dateOfBirth" component="div" />
                      </div>

                      <div className="col-12 col-md-4 mt-3">
                        <label>Date Of Retirement</label>
                        <DatePicker
                          className="form-control"
                          placeholder="Enter Date Of Retirement"
                          selected={RetirementSelected}

                          showYearDropdown
                          scrollableMonthYearDropdown
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
                        <ErrorMessage style={{ color: "red" }} name="dateOfRetirement" component="div" />
                      </div>
                    </div>

                    <div className="from-group row">
                      <div className="col-12 col-md-4 mt-3">
                        <Field
                          name="nic_no"
                          mask={[

                            /[1-9]/,
                            /\d/,
                            /\d/,
                            /\d/,
                            /\d/,
                            "-",
                            /\d/,
                            /\d/,
                            /\d/,
                            /\d/,
                            /\d/,
                            /\d/,
                            /\d/,
                            "-",
                            /\d/,
                          ]}
                          component={MaskInput}
                          placeholder="Enter ID Card No"
                          label={<span> NIC No<span style={{ color: 'red' }}>*</span></span>}
                          autoComplete="off"
                        />
                        {/* <ErrorMessage style={{color:"red"}} name="nic_no" component="div" /> */}
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
                          label="Official Email"
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
                      <h3>Contact Info</h3>
                      <table class="table table table-head-custom table-vertical-center overflow-hidden table-hover">
                        <tr style={{ backgroundColor: '#4d5f7a', color: '#fff' }}>
                          <td></td>
                          <td>Relation Name</td>
                          <td>Relation</td>
                          <td>Contact No</td>
                        </tr>

                        {defContactList?.map((obj, rightindex) => (
                          <><tr>
                            <td > <button id={rightindex} onClick={deleteRowContact} className="btn btn-danger btn-sm"> Delete</button></td>
                            <td>
                              <input
                                className="form-control"
                                type="text"
                                onChange={handleFieldChangedContact}
                                value={obj.relation_name}
                                name={`defContactList[${rightindex}].relation_name`} // Corrected name syntax
                                id={`relation_name-${rightindex}`}
                              />
                              <ErrorMessage name={`defContactList[${rightindex}].relation_name`} component="div" className="error" />
                            </td>
                            <td>
                              <select className="form-control" value={obj.relation} onChange={handleFieldChangedContact} id={'relation-' + rightindex} >
                                {/* <option value="-1"> --Select--</option> */}
                                {
                                  dashboard.allRelationCodeList?.map((x) => {
                                    return <option value={x.value}> {x.label} </option>
                                  })}

                                {/* disabled={defContactList.find(el => el.relation == x.value) ? true : false} */}
                              </select>

                            </td>
                            <td>
                              <input className="form-control" type="text" onChange={handleFieldChangedContact}
                                value={obj.contactNo} id={'contactNo-' + rightindex}></input>
                            </td>
                            {/* <td>{obj.relation_emp}</td>
                            <td>{obj.contactNo}</td> */}
                          </tr>
                          </>

                        ))}

                      </table>
                      {<> <div className="from-group row">
                        <div className="col-12 col-md-4 mt-3">
                          <input className="btn btn-success btn-sm" type='button' id="Contact" onClick={addRowContact} value='+Add'></input>
                        </div>

                      </div>
                      </>}
                    </div>
                    <br></br>
                    <div style={{ backgroundColor: "rgb(235 243 255)", padding: "20px", borderRadius: "5px", border: '2px solid #adceff' }}>

                      <h3>Work Experience</h3>
                      <table class="table table table-head-custom table-vertical-center overflow-hidden table-hover">
                        <tr style={{ backgroundColor: '#4d5f7a', color: '#fff' }}>
                          <td></td>
                          <td>Company</td>
                          <td>Position Held</td>
                          <td>Country</td>
                          <td>City</td>
                          <td>Start Date</td>
                          <td>End Date</td>
                        </tr>
                        {console.log("::work::", workExperienceList)}
                        {workExperienceList?.map((obj, rightindex) => (

                          <><tr>
                            <td id={rightindex} onClick={deleteRowExperience}> <span className="btn btn-danger btn-sm"> Delete</span></td>
                            <td>
                              <input className="form-control" type="text" onChange={handleFieldChangedExperience}
                                value={obj.companyName} id={'companyName-' + rightindex}></input>
                            </td>
                            <td>
                              <input className="form-control" type="text" onChange={handleFieldChangedExperience}
                                value={obj.positionHeld} id={'positionHeld-' + rightindex}></input>
                            </td>
                            <td>
                              <select className="form-control" value={obj.countryId} onChange={handleFieldChangedExperience} id={'countryId-' + rightindex} >
                                <option value="-1"> --Select--</option>
                                {
                                  dashboard.allCountry?.map((x) => {
                                    return <option value={x.value}> {x.label} </option>
                                  })}

                                {/* disabled={defContactList.find(el => el.relation == x.value) ? true : false} */}
                              </select>
                            </td>
                            <td>
                              <select className="form-control" value={obj.cityId} onChange={handleFieldChangedExperience} id={'cityId-' + rightindex} >
                                <option value="-1"> --Select--</option>
                                {

                                  dashboard.allCity?.map((x) => {
                                    if (x.code == obj.countryId) {
                                      return <option value={x.value}> {x.label} </option>
                                    }
                                  })}

                                {/* disabled={defContactList.find(el => el.relation == x.value) ? true : false} */}
                              </select>
                            </td>

                            <td>
                              <DatePicker
                                className="form-control"
                                placeholder="Start Date"
                                selected={new Date(obj.startDate || currentDate)}
                                showYearDropdown
                                scrollableMonthYearDropdown
                                onChange={(el) => handleDatePicker(el, 'startDate', rightindex, '')}
                                id={"startDate-" + rightindex}
                                timeInputLabel="Time:"
                                dateFormat="dd/MM/yyyy"
                                showTimeInput
                                name="startDate"
                                disabled={isUserForRead}
                                autoComplete="off"
                              />
                            </td>
                            <td>
                              <DatePicker
                                className="form-control"
                                placeholder="End Date"
                                selected={new Date(obj.endDate || currentDate)}
                                showYearDropdown
                                scrollableMonthYearDropdown
                                onChange={(el) => handleDatePicker(el, 'endDate', rightindex, '')}
                                id={"endDate-" + rightindex}
                                timeInputLabel="Time:"
                                dateFormat="dd/MM/yyyy"
                                showTimeInput
                                name="endDate"
                                disabled={isUserForRead}
                                autoComplete="off"
                              />
                            </td>
                          </tr>
                          </>
                        ))}


                      </table>
                      {<> <div className="from-group row">
                        <div className="col-12 col-md-4 mt-3">
                          <input className="btn btn-success btn-sm" type='button' id="Experience" onClick={addRowExprerience} value='+Add'></input>
                        </div>

                      </div>
                      </>}
                    </div>
                    <br></br>
                    <div style={{ backgroundColor: "rgb(235 243 255)", padding: "20px", borderRadius: "5px", border: '2px solid #adceff' }}>
                      <h3>Academic Info</h3>
                      <table class="table table table-head-custom table-vertical-center overflow-hidden table-hover">
                        <tr style={{ backgroundColor: '#4d5f7a', color: '#fff' }}>
                          <td></td>
                          <td>Institution</td>
                          <td>Degree</td>
                          <td>Country</td>
                          <td>City</td>
                          <td>CGPA</td>
                          <td>Start Date</td>
                          <td>End Date</td>
                        </tr>
                        {console.log("::aca", academicList)}
                        {academicList?.map((obj, rightindex) => (
                          <>

                            <tr>
                              <td id={rightindex} onClick={deleteRowAcademic}> <span className="btn btn-danger btn-sm"> Delete</span></td>
                              <td>
                                <select className="form-control" value={obj.institutionId} onChange={handleFieldChangedAcademic} id={'institutionId-' + rightindex} >
                                  {
                                    dashboard.allInstitution?.map((x) => {
                                      return <option value={x.value}> {x.label} </option>
                                    })}
                                  {/* disabled={defContactList.find(el => el.relation == x.value) ? true : false} */}
                                </select>
                              </td>
                              <td>
                                <select className="form-control" value={obj.degreeId} onChange={handleFieldChangedAcademic} id={'degreeId-' + rightindex} >
                                  {
                                    dashboard.allDegreeTitle?.map((x) => {
                                      return <option value={x.value}> {x.label} </option>
                                    })}
                                  {/* disabled={defContactList.find(el => el.relation == x.value) ? true : false} */}
                                </select></td>
                              <td>
                                <select className="form-control" value={obj.countryId} onChange={handleFieldChangedAcademic} id={'countryId-' + rightindex} >
                                  <option value="-1">--Select--</option>
                                  {
                                    dashboard.allCountry?.map((x) => {
                                      return <option value={x.value}> {x.label} </option>
                                    })}

                                  {/* disabled={defContactList.find(el => el.relation == x.value) ? true : false} */}
                                </select>
                              </td>
                              <td>
                                <select className="form-control" value={obj.cityId} onChange={handleFieldChangedAcademic} id={'cityId-' + rightindex} >
                                  <option value="-1"> --Select--</option>

                                  {

                                    dashboard.allCity?.map((x) => {
                                      if (x.code == obj.countryId) {
                                        return <option value={x.value}> {x.label} </option>
                                      }
                                    })}

                                  {/* disabled={defContactList.find(el => el.relation == x.value) ? true : false} */}
                                </select>
                              </td>

                              <td>
                                <input className="form-control" type="text" onChange={handleFieldChangedAcademic}
                                  value={obj.gpa} id={'gpa-' + rightindex}></input>
                              </td>
                              <td>
                                <DatePicker
                                  className="form-control"
                                  placeholder="Start Date"
                                  selected={new Date(obj.startDate || currentDate)}
                                  showYearDropdown
                                  scrollableMonthYearDropdown
                                  onChange={(el) => handleDatePickerAcademic(el, 'startDate', rightindex, '')}
                                  id={"startDate-" + rightindex}
                                  timeInputLabel="Time:"
                                  dateFormat="dd/MM/yyyy"
                                  showTimeInput
                                  name="startDate"
                                  disabled={isUserForRead}
                                  autoComplete="off"
                                />
                              </td>
                              <td>
                                <DatePicker
                                  className="form-control"
                                  placeholder="End Date"
                                  selected={new Date(obj.endDate || currentDate)}
                                  showYearDropdown
                                  scrollableMonthYearDropdown
                                  onChange={(el) => handleDatePickerAcademic(el, 'endDate', rightindex, '')}
                                  id={"endDate-" + rightindex}
                                  timeInputLabel="Time:"
                                  dateFormat="dd/MM/yyyy"
                                  showTimeInput
                                  name="endDate"
                                  disabled={isUserForRead}
                                  autoComplete="off"
                                />
                              </td>
                            </tr>
                          </>
                        ))}

                      </table>
                      {<> <div className="from-group row">
                        <div className="col-12 col-md-4 mt-3">
                          <input className="btn btn-success btn-sm" type='button' id="Academic" onClick={addRowAcademic} value='+Add'></input>
                        </div>

                      </div>
                      </>}
                    </div>
                    <br></br>
                    <div style={{ backgroundColor: "rgb(235 243 255)", padding: "20px", borderRadius: "5px", border: '2px solid #adceff' }}>

                      <h3>Employee Skills</h3>
                      <table class="table table table-head-custom table-vertical-center overflow-hidden table-hover">
                        <tr style={{ backgroundColor: '#4d5f7a', color: '#fff' }}>

                          <td></td>
                          <td>Skill</td>
                          <td>Description</td>

                          <td>rating</td>
                          <td>Start Date</td>
                          <td>End Date</td>
                        </tr>
                        {skillsList?.map((obj, rightindex) => (
                          <>
                            <tr>
                              <td id={rightindex} onClick={deleteRowSkills}> <span className="btn btn-danger btn-sm"> Delete</span></td>

                              <td>
                                <input className="form-control" type="text" onChange={handleFieldChangedSkills}
                                  value={obj.skill} id={'skill-' + rightindex}></input>
                              </td>
                              <td>
                                <input className="form-control" type="text" onChange={handleFieldChangedSkills}
                                  value={obj.description} id={'description-' + rightindex}></input>
                              </td>
                              <td>  <Select
                                name="ratingScale"
                                value={obj.ratingScale}
                                onChange={handleFieldChangedSkills}
                                onBlur={handleBlur}
                                style={{ display: "block" }}
                                id={'ratingScale-' + rightindex}
                              >
                                <option value="-1" label="Select Rating Scale" />
                                <option value="1" label="1" />
                                <option value="2" label="2" />
                                <option value="3" label="3" />
                                <option value="4" label="4" />
                                <option value="5" label="5" />
                                <option value="6" label="6" />
                                <option value="7" label="7" />
                                <option value="8" label="8" />
                                <option value="9" label="9" />
                                <option value="10" label="10" />
                              </Select></td>
                              <td>
                                <DatePicker
                                  className="form-control"
                                  placeholder="Start Date"
                                  selected={new Date(obj.startDate || currentDate)}
                                  showYearDropdown
                                  scrollableMonthYearDropdown
                                  onChange={(el) => handleDatePickerSkills(el, 'startDate', rightindex, '')}
                                  id={"startDate-" + rightindex}
                                  timeInputLabel="Time:"
                                  dateFormat="dd/MM/yyyy"
                                  showTimeInput
                                  name="startDate"
                                  disabled={isUserForRead}
                                  autoComplete="off"
                                />
                              </td>
                              <td>
                                <DatePicker
                                  className="form-control"
                                  placeholder="End Date"
                                  selected={new Date(obj.endDate || currentDate)}
                                  showYearDropdown
                                  scrollableMonthYearDropdown
                                  onChange={(el) => handleDatePickerSkills(el, 'endDate', rightindex, '')}
                                  id={"endDate-" + rightindex}
                                  timeInputLabel="Time:"
                                  dateFormat="dd/MM/yyyy"
                                  showTimeInput
                                  name="endDate"
                                  disabled={isUserForRead}
                                  autoComplete="off"
                                />
                              </td>
                            </tr>
                          </>
                        ))}

                      </table>
                      {<> <div className="from-group row">
                        <div className="col-12 col-md-4 mt-3">
                          <input className="btn btn-success btn-sm" type='button' id="Academic" onClick={addRowSkills} value='+Add'></input>
                        </div>

                      </div>
                      </>}
                    </div>

                    <br></br>
                    <div style={{ backgroundColor: "rgb(235 243 255)", padding: "20px", borderRadius: "5px", border: '2px solid #adceff' }}>

                      <h3>Incident Info</h3>
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
                              <td id={rightindex} onClick={deleteRowIncident}> <span className="btn btn-danger btn-sm"> Delete</span></td>
                              <td>
                                <input className="form-control" type="text" onChange={handleFieldChangedIncident}
                                  value={obj.incidentDetail} id={'incidentDetail-' + rightindex}></input>
                              </td>
                              <td>
                                <input className="form-control" type="text" onChange={handleFieldChangedIncident}
                                  value={obj.actionTaken} id={'actionTaken-' + rightindex}></input>
                              </td>

                              <td>
                                <select className="form-control" value={obj.actionTakenBy} onChange={handleFieldChangedIncident} id={'actionTakenBy-' + rightindex} >
                                  <option value='-1'>--Select--</option>
                                  {
                                    dashboard.allEmployees?.map((x) => {
                                      return <option value={x.value}> {x.label} </option>
                                    })}

                                  {/* disabled={defContactList.find(el => el.relation == x.value) ? true : false} */}
                                </select>

                              </td>
                              <td>
                                <DatePicker
                                  className="form-control"
                                  placeholder="Date"
                                  selected={new Date(obj.incidentDate || currentDate)}
                                  showYearDropdown
                                  scrollableMonthYearDropdown
                                  onChange={(el) => handleDatePickerIncident(el, 'incidentDate', rightindex, '')}
                                  id={"incidentDate-" + rightindex}
                                  timeInputLabel="Time:"
                                  dateFormat="dd/MM/yyyy"
                                  showTimeInput
                                  name="incidentDate"
                                  disabled={isUserForRead}
                                  autoComplete="off"
                                />
                              </td>


                            </tr>
                          </>
                        ))}

                      </table>
                      {<> <div className="from-group row">
                        <div className="col-12 col-md-4 mt-3">
                          <input className="btn btn-success btn-sm" type='button' id="Incident" onClick={addRowIncident} value='+Add'></input>
                        </div>

                      </div>
                      </>}
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
