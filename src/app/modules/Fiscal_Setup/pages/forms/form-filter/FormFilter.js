import React, { useMemo, useState, useEffect } from "react"
import { Formik } from "formik"
import { isEqual } from "lodash"
import { useFormUIContext } from "../FormUIContext"
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import axios from "axios";
import { toAbsoluteUrl } from "../../../../../../_metronic/_helpers";
import { useDispatch, useSelector } from "react-redux";
import { SearchSelect } from "../../../../../../_metronic/_helpers/SearchSelect";
import * as actions from "../../../../Dashboard/_redux/dashboardActions";
import DatePicker from "react-datepicker";
import {
  fetchAllCity,
  fetchAllSubCenter,
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
  const [defCenter, setDefaultCenter] = useState({});
  const [defSubcenter, setDefaultSubCenter] = useState({});
  const [receiptDateFrom, setReceiptDateFrom] = useState(null);
  const [receiptDateTo, setReceiptDateTo] = useState(null);
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

 



  function addCommas(nStr) {
    nStr += '';
    var x = nStr.split('.');
    var x1 = x[0];
    var x2 = x.length > 1 ? '.' + x[1] : '';
    var rgx = /(\d+)(\d{3})/;
    while (rgx.test(x1)) {
      x1 = x1.replace(rgx, '$1' + ',' + '$2');
    }
    return x1 + x2;
  }

  // queryParams, setQueryParams,
  const applyFilter = (values) => {

    const newQueryParams = prepareFilter(formUIProps.queryParams, values)
    if (!isEqual(newQueryParams, formUIProps.queryParams)) {
      newQueryParams.pageNumber = 1
      // update list by queryParams
      console.log("update list by queryParams");
      console.log(newQueryParams);
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
          console.log(1);
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
                  <b>Search</b> field by year eg:2024
                </small>
              </div>
            </div>
          </form>
        )}
      </Formik>

   
    </>
  )


}
