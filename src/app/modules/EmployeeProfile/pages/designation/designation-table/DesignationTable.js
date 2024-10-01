import React, { useEffect, useMemo } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, {
  PaginationProvider,
} from "react-bootstrap-table2-paginator";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/designationActions";
import {
  getHandlerTableChange,
  NoRecordsFoundMessage,
  PleaseWaitMessage,
  sortCaret,
  headerSortingClasses,
} from "../../../../../../_metronic/_helpers";
import * as uiHelpers from "../ReligionUIHelpers";
import { ActionsColumnFormatter } from "./column-formatter/ActionsColumnFormatter";
import { Pagination } from "../../../../../../_metronic/_partials/controls";
import { useDesignationUIContext } from "../DesignationUIContext";
import { DatetimeColumnFormatter } from "../../../../Dashboard/pages/dashboard/last-trips-vehicles-table/column-formatter/CreatedColumnFormatter";

export function DesignationTable() {
  //Users UI Context
  const designationUIContext = useDesignationUIContext();
console.log("designation in")
  const religionUIProps = useMemo(() => {
    return {
      ids: designationUIContext.ids,
      setIds: designationUIContext.setIds,
      queryParams: designationUIContext.queryParams,
      setQueryParams: designationUIContext.setQueryParams,
      openEditDesignationDialog: designationUIContext.openEditDesignationDialog,
      openDeleteDesignationDialog: designationUIContext.openDeleteDesignationDialog,
      openActiveDesignationDialog: designationUIContext.openActiveDesignationDialog,
      openReadDesignationDialog: designationUIContext.openReadDesignationDialog,
    };
  }, [designationUIContext]);

  //console.log("queryparms", usersUIProps.queryparms)
  const { currentState, userAccess } = useSelector(
    (state) => {   return {
      
      currentState: state.profile,
      userAccess: state?.auth?.userAccess["Profile"],
    }},
    shallowEqual
  );
  
  
  const { totalCount, entities, listLoading } = currentState;

  //totalCount = 10

  const dispatch = useDispatch();

  useEffect(() => {
    religionUIProps.setIds([]);
    console.log("religionUIProps.queryParams",religionUIProps.queryParams)
    dispatch(actions.fetchUsers(religionUIProps.queryParams));
  }, [religionUIProps.queryParams, dispatch, totalCount]);


  // For Getting Contact Info
  // useEffect(() => {
  //   religionUIProps.setIds([]);
  //   console.log("fetchContactInfo.queryParams",religionUIProps.queryParams)
  //   dispatch(actions.fetchContactInfo(religionUIProps.queryParams));
  // }, [religionUIProps.queryParams, dispatch, totalCount]);

  
  const isAccessForEdit = userAccess?.find(
    (item) => item.componentName === "UpdateProfile"
  );

  const isAccessForDelete = userAccess?.find(
    (item) => item.componentName === "DeleteProfile"
  );
  // Table columns
  const columns = [
    {
      dataField: "Id",
      text: "ID",
      sort: false,
      sortCaret: sortCaret,
      headerSortingClasses,
      style: {
        minWidth: "160px",
      },
    },
    {
      dataField: "employeeCode",
      text: "Employee Code",
      sort: false,
      sortCaret: sortCaret,
      headerSortingClasses,
      style: {
        minWidth: "160px",
      },
    },
    {
      dataField: "firstName",
      text: "First Name",
      sort: false,
      sortCaret: sortCaret,
      headerSortingClasses,
      style: {
        minWidth: "160px",
      },
    },
    // {
    //   dataField: "middleName",
    //   text: "Middle Name",
    //   sort: false,
    //   sortCaret: sortCaret,
    //   headerSortingClasses,
    //   style: {
    //     minWidth: "160px",
    //   },
    // },
    {
      dataField: "lastName",
      text: "Last Name",
      sort: false,
      sortCaret: sortCaret,
      headerSortingClasses,
      style: {
        minWidth: "160px",
      },
    },
    {
      dataField: "email_personal",
      text: "Email(Personal)",
      sort: false,
      sortCaret: sortCaret,
      headerSortingClasses,
      style: {
        minWidth: "160px",
      },
    },
    {
      dataField: "email_official",
      text: "Email(Official)",
      sort: false,
      sortCaret: sortCaret,
      headerSortingClasses,
      style: {
        minWidth: "160px",
      },
    },
    // {
    //   dataField: "phone_home",
    //   text: "Phone(Home)",
    //   sort: false,
    //   sortCaret: sortCaret,
    //   headerSortingClasses,
    //   style: {
    //     minWidth: "160px",
    //   },
    // },
    // {
    //   dataField: "phone_official",
    //   text: "Phone(Official)",
    //   sort: false,
    //   sortCaret: sortCaret,
    //   headerSortingClasses,
    //   style: {
    //     minWidth: "160px",
    //   },
    // },
       {
      dataField: "action",
      text: "Actions",
      isDummyField: true,
      formatter: ActionsColumnFormatter,
      formatExtraData: {
        openEditDesignationDialog: religionUIProps.openEditDesignationDialog,
        openDeleteDesignationDialog: religionUIProps.openDeleteDesignationDialog,
        openActiveDesignationDialog: religionUIProps.openActiveDesignationDialog,
        openReadDesignationDialog: religionUIProps.openReadDesignationDialog,
        isAccessForEdit: isAccessForEdit ? isAccessForEdit.isAccess : false,
        isAccessForDelete: isAccessForDelete
          ? isAccessForDelete.isAccess
          : false,
      },
      classes: "text-right pr-0",
      headerClasses: "text-right pr-3",
      style: {
        minWidth: "170px",
      },
    },
  ];

  //Table pagination properties
  const paginationOptions = {
    custom: true,
    totalSize: totalCount,
    sizePerPageList: uiHelpers.sizePerPageList,
    sizePerPage: religionUIProps.queryParams.pageSize,
    page: religionUIProps.queryParams.pageNumber,
  };

    return (
    <>
      <PaginationProvider pagination={paginationFactory(paginationOptions)}>
        {({ paginationProps, paginationTableProps }) => {
          return (
            <Pagination
              isLoading={listLoading}
              paginationProps={paginationProps}
            >
              <BootstrapTable
                wrapperClasses="table-responsive"
                bordered={false}
                classes="table table-head-custom table-vertical-center overflow-hidden table-hover"
                bootstrap4
                remote
                keyField="Id"
                data={entities === null ? [] : entities}
                columns={columns}
                defaultSorted={uiHelpers.defaultSorted}
                onTableChange={getHandlerTableChange(
                  religionUIProps.setQueryParams
                )}
                // selectRow={getSelectRow({
                //   entities,

                // })}
                {...paginationTableProps}
              >
                <PleaseWaitMessage entities={entities} />
                <NoRecordsFoundMessage entities={entities} />
              </BootstrapTable>
            </Pagination>
          );
        }}
      </PaginationProvider>
    </>
  );
}
