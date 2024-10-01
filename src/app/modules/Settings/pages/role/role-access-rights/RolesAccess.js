import React, { useMemo, useEffect, useState, useRef } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../../_metronic/_partials/controls";
import {
  Input,
  Checkbox,
} from "../../../../../../_metronic/_partials/controls";
// import { Formik, Form} from "formik"
// import   'react-bootstrap/Form'
// import Card from 'react-bootstrap/Card'
import { Row, Col, Form } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { shallowEqual, useSelector } from "react-redux";
import * as actions from "../../../_redux/roles/rolesAction";
import {
  DB_COLUMNS,
  FormClasses,
  Http,
  OperationStatus,
  RedirectURLs,
  TOAST_CONFIG,
} from "../../../../../utils/constants";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export function RolesAccess({
  history,
  match: {
    params: { id },
  },
}) {
  // const obj = {
  //   roleId: id,
  //   sortBy: "name",
  //   limit: 10,
  //   page: 1,
  // }

  const { actionsLoading, currentState } = useSelector(
    (state) => ({
      actionsLoading: state.roles.actionsLoading,
      currentState: state.roles.accessRights,
    }),
    shallowEqual
  );

  // const currentState = useSelector((state) => ({
  //   entities: state.entities,
  // }))

  //Role Redux State
  const dispatch = useDispatch();

  // useEffect(() => {
  //   // Serer call by params
  //   dispatch(
  //     actions.accessRights({ roleId: id, sortBy: "name", limit: 10, page: 1 })
  //     )
  //   }, [id, dispatch])
  const newdata = Object.entries(currentState);
  // newdata.push(currentState);

  // const { entities, listLoading, totalCount } = currentState
  // newdata.forEach((data) => {
  // })

  // function changeState (id){


  // }

  const [isChecked, setIsChecked] = React.useState(true);

  // const [isChecked, setIsChecked] = useState()

  const onCheckboxChange = async (event) => {
    const target = event.currentTarget;
    const name = target.name;
    const id = target.id;
    const checked = target.checked;

    // openRoleAccessPage(row.id)
    await dispatch(
      actions.updateAccessRightByRoleAndResourceId({
        roleId: name,
        resourceId: id,
        isAccess: checked,
      })
    );

    setIsChecked({
      ...isChecked,
      [id]: checked, // using "id" seems to not work here.
    });
  };

  return (
    <>
      <h1 className="mb-10">Role Access page</h1>
      {newdata.map((dd, index) => (
        <Card key={index}>
          <CardBody>
            <Row>
              <Col lg={2}>
                <Form.Text className="col-form-label fw-bold fs-6">
                  {dd[0]}
                </Form.Text>
              </Col>
              <Col lg={10}>
                <Row>
                  {dd[1].map((right, rightindex) => (
                    <Col lg={3} key={rightindex}>
                      <div className="row">
                        <input
                          type="checkbox"
                          className="form-check-input"
                          id={right.resourceId}
                          name={right.roleId}
                          label={right.name}
                          defaultChecked={right.isAccess}
                          onChange={onCheckboxChange}
                        />
                        <Form.Text className={FormClasses.LABEL_NON_REQUIRED}>
                          {right.name}
                        </Form.Text>
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
    </>
  );
}
