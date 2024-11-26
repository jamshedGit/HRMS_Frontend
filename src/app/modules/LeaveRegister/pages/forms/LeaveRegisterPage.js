import React, { useEffect } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Card } from "react-bootstrap";
import { FormTable } from "./form-table/FormTable";
import { FormFilter } from "./form-filter/FormFilter";
import { fetchAllActiveEmployees, fetchAllDept, fetchAllFormsMenu, fetchAllSubsidiaryData } from "../../../../../_metronic/redux/dashboardActions";
import { useSelector, useDispatch } from "react-redux";
import { FormUIProvider } from "./FormUIContext";

export function LeaveRegisterPage() {
  const dispatch = useDispatch();
  const {
    dashboard,
    listLoading
  } = useSelector((state) => ({
    dashboard: state.dashboard,
    listLoading: state.attendance.listLoading
  }
  ));

  //Get all Dropdown data from server on page load and set it in state
  useEffect(() => {
    if (!dashboard?.allEmployeeGradeList || !dashboard?.allEmployeeGradeList?.length)
      dispatch(fetchAllFormsMenu(143, "allEmployeeGradeList"));

    if (!dashboard?.allSubsidiaryList?.length)
      dispatch(fetchAllSubsidiaryData("allSubsidiaryList"));

    if (!dashboard.allEmployees || !dashboard.allEmployees.length)
      dispatch(fetchAllActiveEmployees());

    if (!dashboard?.allDesignations || !dashboard?.allDesignations?.length)
      dispatch(fetchAllFormsMenu(158, "allDesignations"));

    if (!dashboard?.allLocationChildMenus || !dashboard?.allLocationChildMenus?.length)
      dispatch(fetchAllFormsMenu(89, "allLocationChildMenus"));

    if (!dashboard?.allDept || !dashboard?.allDept?.length)
      dispatch(fetchAllDept());
  }, [dispatch]);

  return (

    <FormUIProvider FormUIEvents={{}}>
      < Card>
        {/* Card Starts */}

        {/* Filter Form Starts */}
        <FormFilter loading={listLoading} dispatch={dispatch} />
        {/* Filter Form Ends */}

        {/* Table Starts */}
        <FormTable />
        {/* Table Ends */}

        {/* Card Ends */}
      </Card >
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </FormUIProvider>
  );
}
