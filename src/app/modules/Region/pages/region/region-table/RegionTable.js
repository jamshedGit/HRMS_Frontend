import React, { useEffect, useMemo } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, {
  PaginationProvider,
} from "react-bootstrap-table2-paginator";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/regionActions";
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
import { useBanksUIContext } from "../ReligionUIContext";
import { DatetimeColumnFormatter } from "../../../../Dashboard/pages/dashboard/last-trips-vehicles-table/column-formatter/CreatedColumnFormatter";

export function RegionTable() {
  //Users UI Context
  const religionUIContext = useBanksUIContext();

  const religionUIProps = useMemo(() => {
    return {
      ids: religionUIContext.ids,
      setIds: religionUIContext.setIds,
      queryParams: religionUIContext.queryParams,
      setQueryParams: religionUIContext.setQueryParams,
      openEditBankDialog: religionUIContext.openEditBankDialog,
      openDeleteBankDialog: religionUIContext.openDeleteBankDialog,
      openActiveBankDialog: religionUIContext.openActiveBankDialog,
      openReadBankDialog: religionUIContext.openReadBankDialog,
    };
  }, [religionUIContext]);

  const { currentState, userAccess } = useSelector(
    (state) => {  return {
      
      currentState: state.region,
      userAccess: state?.auth?.userAccess["Region"],
    }},
    shallowEqual
  );
  
  const { totalCount, entities, listLoading } = currentState;

  //totalCount = 10

  const dispatch = useDispatch();

  useEffect(() => {
    religionUIProps.setIds([]);
    dispatch(actions.fetchUsers(religionUIProps.queryParams));
  }, [religionUIProps.queryParams, dispatch, totalCount]);

  const isAccessForEdit = userAccess?.find(
    (item) => item.componentName === "UpdateRegion"
  );

  const isAccessForDelete = userAccess?.find(
    (item) => item.componentName === "DeleteRegion"
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
      dataField: "regionName",
      text: "Region",
      sort: false,
      sortCaret: sortCaret,
      headerSortingClasses,
      style: {
        minWidth: "160px",
      },
    },
    {
      dataField: "regionCode",
      text: "Region Code",
      sort: false,
      sortCaret: sortCaret,
      headerSortingClasses,
      style: {
        minWidth: "160px",
      },
    },
       {
      dataField: "action",
      text: "Actions",
      isDummyField: true,
      formatter: ActionsColumnFormatter,
      formatExtraData: {
        openEditBankDialog: religionUIProps.openEditBankDialog,
        openDeleteBankDialog: religionUIProps.openDeleteBankDialog,
        openActiveBankDialog: religionUIProps.openActiveBankDialog,
        openReadBankDialog: religionUIProps.openReadBankDialog,
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
