import React, { useEffect, useMemo } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, {
  PaginationProvider,
} from "react-bootstrap-table2-paginator";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/bankActions";
import {
  getHandlerTableChange,
  NoRecordsFoundMessage,
  PleaseWaitMessage,
  sortCaret,
  headerSortingClasses,
} from "../../../../../../_metronic/_helpers";
import * as uiHelpers from "../BanksUIHelpers";
import { ActionsColumnFormatter } from "./column-formatter/ActionsColumnFormatter";
import { Pagination } from "../../../../../../_metronic/_partials/controls";
import { useBanksUIContext } from "../BanksUIContext";
import { DatetimeColumnFormatter } from "../../../../Dashboard/pages/dashboard/last-trips-vehicles-table/column-formatter/CreatedColumnFormatter";

export function BanksTable() {
  //Users UI Context
  const bankUIContext = useBanksUIContext();

  const bankUIProps = useMemo(() => {
    return {
      ids: bankUIContext.ids,
      setIds: bankUIContext.setIds,
      queryParams: bankUIContext.queryParams,
      setQueryParams: bankUIContext.setQueryParams,
      openEditBankDialog: bankUIContext.openEditBankDialog,
      openDeleteBankDialog: bankUIContext.openDeleteBankDialog,
      openActiveBankDialog: bankUIContext.openActiveBankDialog,
      openReadBankDialog: bankUIContext.openReadBankDialog,
    };
  }, [bankUIContext]);

  //console.log("queryparms", usersUIProps.queryparms)
  const { currentState, userAccess } = useSelector(
    (state) => {  console.log("state ",state); return {
      
      currentState: state.salarypolicy,
      userAccess: state?.auth?.userAccess["salarypolicy"],
    }},
    shallowEqual
  );
  console.log("currentState salary policy", currentState);
  
  const { totalCount, entities, listLoading } = currentState;

  //totalCount = 10

  const dispatch = useDispatch();

  useEffect(() => {
    bankUIProps.setIds([]);
    console.log("test 2",bankUIProps.queryParams)
    dispatch(actions.fetchUsers(bankUIProps.queryParams));
  }, [bankUIProps.queryParams, dispatch, totalCount]);

  const isAccessForEdit = userAccess?.find(
    (item) => item.componentName === "UpdateSalarypolicy"
  );

  const isAccessForDelete = userAccess?.find(
    (item) => item.componentName === "DeleteSalarypolicy"
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
        minWidth: "10px",
      },
    },
    {
      dataField: "type",
      text: "Type",
      sort: false,
      sortCaret: sortCaret,
      headerSortingClasses,
      style: {
        minWidth: "160px",
      },
    },

    // {
    //   dataField: "value",
    //   text: "Value",
    //   sort: false,
    //   sortCaret: sortCaret,
    //   headerSortingClasses,
    //   style: {
    //     minWidth: "10px",
    //   },
    // },

{
  dataField: "value",
  text: "Value",
  sort: false,
  sortCaret: sortCaret,
  headerSortingClasses,
  style: {
    minWidth: "10px",
  },
  formatter: (cell, row) => {
    console.log("Row data:", row); // Debug log
    return row.type === "Month Days" ? "Current Month" : cell;
  },
},


    {
      dataField: "multiplier",
      text: "Multiplier",
      sort: false,
      sortCaret: sortCaret,
      headerSortingClasses,
      style: {
        minWidth: "10px",
      },
    },

    {
      dataField: "divisor",
      text: "divisor",
      sort: false,
      sortCaret: sortCaret,
      headerSortingClasses,
      style: {
        minWidth: "10px",
      },
    },



       {
      dataField: "action",
      text: "Actions",
      isDummyField: true,
      formatter: ActionsColumnFormatter,
      formatExtraData: {
        openEditBankDialog: bankUIProps.openEditBankDialog,
        openDeleteBankDialog: bankUIProps.openDeleteBankDialog,
        openActiveBankDialog: bankUIProps.openActiveBankDialog,
        openReadBankDialog: bankUIProps.openReadBankDialog,
        isAccessForEdit: isAccessForEdit ? isAccessForEdit.isAccess : false,
        isAccessForDelete: isAccessForDelete
          ? isAccessForDelete.isAccess
          : false,
      },
      classes: "text-right pr-0",
      headerClasses: "text-right pr-3",
      style: {
        minWidth: "10px",
      },
    },
  ];

  //Table pagination properties
  const paginationOptions = {
    custom: true,
    totalSize: totalCount,
    sizePerPageList: uiHelpers.sizePerPageList,
    sizePerPage: bankUIProps.queryParams.pageSize,
    page: bankUIProps.queryParams.pageNumber,
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
                  bankUIProps.setQueryParams
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
