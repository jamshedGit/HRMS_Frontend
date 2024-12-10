import React, { useMemo, useState, useEffect } from "react"
import { Formik } from "formik"
import { isEqual } from "lodash"
import { useFormUIContext } from "../FormUIContext"
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllCity,

} from "../../../../../../_metronic/redux/dashboardActions";


pdfMake.vfs = pdfFonts.pdfMake.vfs;
const API_URL = process.env.REACT_APP_API_URL;


const prepareFilter = (queryParams, values) => {
  const { searchText } = values
  const newQueryParams = { ...queryParams }
  const filter = {}

  if (searchText) {
    filter.searchQuery = searchText
    // filter.email = searchText
  }
  newQueryParams.filter = filter
  return newQueryParams
}

export function FormFilter({ listLoading, user, setCity,
  seletCity,
  setCenter,
  center,
  setSubcenter,
  isUserForRead,
  subCenter,
  alarmTime,
  setAlarmTime,
  setVehicle, }) {
  const [defCity, setDefaultCity] = useState({});
  const dispatch = useDispatch();
  const FormUIContext = useFormUIContext()
  const [Loading, setLoading] = useState(false)
  const { countryId, cityId } = useSelector((state) => state.auth.user);
  const dashboard = useSelector((state) => state.dashboard);
  useEffect(() => {
    
    if (countryId) {
     
      dispatch(fetchAllCity(1));
    }
  }, [countryId, dispatch]);



  const formUIProps = useMemo(() => {
    return {
      queryParams: FormUIContext.queryParams,
      setQueryParams: FormUIContext.setQueryParams,
    }
  }, [FormUIContext])

  async function fetchDonationReport(filterVal) {
    try {
      const response = await axios.post(`${API_URL}/edrs/donation-report`, {
        bookNo: filterVal.txtBookNo,
        cityId: filterVal.cityId || "0",
        centerId: filterVal.centerId || "0",
        subCenterId: filterVal.subCenterId || "0",
        dateFrom: filterVal.receiptDateFrom || "",
        dateTo: filterVal.receiptDateTo,
               
      });
      return response?.data?.data;
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  // queryParams, setQueryParams,
  const applyFilter = (values) => {

    const newQueryParams = prepareFilter(formUIProps.queryParams, values)
    if (!isEqual(newQueryParams, formUIProps.queryParams)) {
      newQueryParams.pageNumber = 1
      // update list by queryParams
      formUIProps.setQueryParams(newQueryParams)
    }
  }

  return (
    <>
      <Formik
        enableReinitialize={true}
        initialValues={{
          donorName: "", // values => All=""/Susspended=0/Active=1/Pending=2
          receiptNo: "", // values => All=""/Business=0/Individual=1
          searchText: "",
          cityId: [],
          centerId: [],
          subCenterId: [],
          alarmTimeId: [],
        }}
        onSubmit={(values) => {
          // createPdf(values);
          applyFilter(values)
        }}
      >
        {({
          values,
          handleSubmit,
          handleBlur,
          handleChange,
          setFieldValue,
          errors,
          touched,

        }) => (
          <form onSubmit={handleSubmit} className="form form-label-right">
            <div className="row">

              <div className="col-12 col-md-12">
                <input
                  type="text"
                  className="form-control"
                  name="searchText"
                  placeholder="Search"
                  onBlur={handleBlur}
                  value={values.searchText}
                  onChange={(e) => {
                    setFieldValue("searchText", e.target.value.trim())
                    handleSubmit()
                  }}
                />
                <small className="form-text text-muted">
                  <b>Search</b> in all fields
                </small>
              </div>
            </div>
          </form>
        )}
      </Formik>

      <Formik
        enableReinitialize={true}
        // initialValues={{
        //   donorName: "", // values => All=""/Susspended=0/Active=1/Pending=2
        //   receiptNo: "", // values => All=""/Business=0/Individual=1
        //   searchText: "",
        //   cityId: '0',
        //   centerId: '0',
        //   subCenterId: '0',
        //   alarmTimeId: [],
        // }}
        onSubmit={(values) => {
          //createPdf(values);
          //applyFilter(values)
        }}
      >
        {({
          values,
          handleSubmit,
          handleBlur,
          handleChange,
          setFieldValue,
          errors,
          touched,

        }) => (
          <form onSubmit={handleSubmit} className="form form-label-right">
            <div className="row">
              {/* <div className="col-12 col-md-4">
                <label>Date From</label>
                <DatePicker
                  className="form-control"
                  placeholder="Enter Date From"
                  // selected={receiptDateFrom}
                  // onChange={(date) => {
                  //   setFieldValue("receiptDateFrom", date);
                  //   setReceiptDateFrom(date);
                  // }}
                  timeInputLabel="Time:"
                  dateFormat="dd/MM/yyyy"
                  showTimeInput
                  name="incidentlocationReachdateTime"
                  disabled={isUserForRead}
                />
              </div> */}
              {/* <div className="col-12 col-md-4">
                <label>Date To</label>
                <DatePicker
                  className="form-control"
                  placeholder="Enter Date To"
                  // selected={receiptDateTo}
                  // onChange={(date) => {
                  //   setFieldValue("receiptDateTo", date);
                  //   setReceiptDateTo(date);
                  // }}
                  timeInputLabel="Time:"
                  dateFormat="dd/MM/yyyy"
                  showTimeInput
                  name="incidentlocationReachdateTime"
                  disabled={isUserForRead}
                />
              </div> */}
             {/* <div className="col-12 col-md-12">
             
                <label>Bank</label>
                <input

                  className="form-control"
                  //onBlur={(e) => createPdf(e.target.value)}
                  // values={values.txtBookNo}
                  // onChange={(e) => {
                  //   setFieldValue("txtBookNo", e.target.value.trim())
                  //   // handleSubmit()
                  // }}
                  name="txtBankSearch"
                  placeholder="Enter Bank Name"
                // onBlur={handleBlur}

                />


              </div>*/}

             
            </div>
           
           
          </form>
        )}
      </Formik>
    </>
  )

  return (
    <>

    </>
  )
}
