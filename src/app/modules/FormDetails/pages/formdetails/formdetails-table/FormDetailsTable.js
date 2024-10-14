import React, { useEffect, useMemo, useState } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, {
  PaginationProvider,
} from "react-bootstrap-table2-paginator";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/formdetailsActions";
import {
  getHandlerTableChange,
  NoRecordsFoundMessage,
  PleaseWaitMessage,
  sortCaret,
  headerSortingClasses,
} from "../../../../../../_metronic/_helpers";
import * as uiHelpers from "../FormDetailsUIHelpers";
import { ActionsColumnFormatter } from "./column-formatter/ActionsColumnFormatter";
import { Pagination } from "../../../../../../_metronic/_partials/controls";
import { useFormUIContext } from "../FormDetailsUIContext";
import { Row, Col, Form } from "react-bootstrap";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../../_metronic/_partials/controls";
import {
  DB_COLUMNS,
  FormClasses,
  Http,
  OperationStatus,
  RedirectURLs,
  TOAST_CONFIG,
} from "../../../../../utils/constants";
import { ToastContainer } from "react-toastify";
import { DatetimeColumnFormatter } from "../../../../Dashboard/pages/dashboard/last-trips-vehicles-table/column-formatter/CreatedColumnFormatter";
import { Link } from "@material-ui/core";
import axios from "axios";
import { setData } from "../../../../../../_metronic/redux/tripLogTable/tripLogTableSlice";
export const USERS_URL = process.env.REACT_APP_API_URL;

export function FormTable() {
  //Users UI Context
  const formUIContext = useFormUIContext();
  //console.log("queryparms", usersUIProps.queryparms)
  const { currentState, userAccess } = useSelector(
    (state) => {
      console.log("state ", state); return {

        currentState: state.formDetails,
        userAccess: state?.auth?.userAccess["FormDetails"],
      }
    },
    shallowEqual
  );
  const formUIProps = useMemo(() => {
    return {
      ids: formUIContext.ids,
      setIds: formUIContext.setIds,
      queryParams: formUIContext.queryParams,
      setQueryParams: formUIContext.setQueryParams,
      openEditFormDialog: formUIContext.openEditFormDialog,
      openDeleteFormDialog: formUIContext.openDeleteFormDialog,
      openActiveFormDialog: formUIContext.openActiveFormDialog,
      openReadFormDialog: formUIContext.openReadFormDialog,
    };
  }, [currentState]);

  const [loading, setLoading] = useState(false);
  const [list, setList] = useState([]);
  const [heading, setHeading] = useState('');
  console.log("currentState ent", currentState.entities);

  const { totalCount, entities, listLoading } = currentState;


  //totalCount = 10

  const dispatch = useDispatch();

  // const newdata = Object.entries(currentState);

  const newdata = currentState.entities
  const customList = currentState.customList || [];


  useEffect(() => {
    formUIProps.setIds([]);
    dispatch(actions.fetchUsers(formUIProps.queryParams));
  }, [formUIProps.queryParams, dispatch, formUIProps.setIds]);


  const isAccessForEdit = userAccess?.find(
    (item) => item.componentName === "UpdateChildForms"
  );

  const isAccessForDelete = userAccess?.find(
    (item) => item.componentName === "DeleteChildForms"
  );
  // Table columns
  const columns = [
    // {
    //   dataField: "Id",
    //   text: "ID",
    //   sort: false,
    //   sortCaret: sortCaret,
    //   headerSortingClasses,
    //   style: {
    //     minWidth: "160px",
    //   },
    // },
    {
      dataField: "formName",
      text: "Form",
      sort: false,
      sortCaret: sortCaret,
      headerSortingClasses,
      style: {
        minWidth: "160px",
      },
    },
    {
      dataField: "formCode",
      text: "Code",
      sort: false,
      sortCaret: sortCaret,
      headerSortingClasses,
      style: {
        minWidth: "160px",
      },
    },
    // {
    //   dataField: "MenuName",
    //   text: "Parent",
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
        openEditFormDialog: formUIProps.openEditFormDialog,
        openDeleteFormDialog: formUIProps.openDeleteFormDialog,
        openActiveFormDialog: formUIProps.openActiveFormDialog,
        openReadFormDialog: formUIProps.openReadFormDialog,
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
    sizePerPage: formUIProps.queryParams.pageSize,
    page: formUIProps.queryParams.pageNumber,
  };
  const [handleClickTriggered, setHandleClickTriggered] = useState(false);

  // Handle click event for fetching child forms
  const handleClick = async (parentId,formName) => {

    setLoading(true);
    try {

      dispatch(actions.customfetchFormDetail(parentId));
      setHeading(formName)
    } catch (error) {
      console.error("Error fetching data:", error);

    } finally {
      setLoading(false);
    }

  };



  return (
    <>


      <h1 className="mb-10">General Setups</h1>
      {['1']?.map((dd, index) => (


        <Card key={index}>
          <CardBody>
            <Row>
              {/* <Col lg={2}>
                <Form.Text className="col-form-label fw-bold fs-6">
                  {'Parent Forms'}
                </Form.Text>
              </Col> */}
              <Col lg={10}>
                <Row>
                  {newdata?.map((obj, rightindex) => (
                    <Col lg={3} key={rightindex}>
                      <div className="row">
                        {/* <a href='#' id={obj.Id}>{obj.formName}</a> */}
                        <Link id={obj.Id} href="javascript:void(0)" onClick={() => handleClick(obj.Id,obj.formName)}>{obj.formName}</Link>

                        {/* <Form.Text className={FormClasses.LABEL_NON_REQUIRED}>{right.rightName}</Form.Text> */}
                      </div>
                    </Col>
                  ))}
                </Row>
              </Col>
            </Row>
          </CardBody>
        </Card>
      ))}
      {heading && <h1> {heading} </h1>}
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
                data={customList === null ? [] : customList}
                columns={columns}
                defaultSorted={uiHelpers.defaultSorted}
                onTableChange={getHandlerTableChange(
                  formUIProps.setQueryParams
                )}
                // selectRow={getSelectRow({
                //   entities,

                // })}
                {...paginationTableProps}
              >
                <PleaseWaitMessage entities={customList} />
                <NoRecordsFoundMessage entities={customList} />
              </BootstrapTable>
            </Pagination>
          );
        }}
      </PaginationProvider>
    </>
  );
}
