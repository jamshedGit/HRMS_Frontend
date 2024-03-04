import React, { useMemo } from "react";

import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../../_metronic/_partials/controls";
import { IncidentsTable } from "../incidents-table/IncidentsTable";
import { useIncidentsUIContext } from "../IncidentsUIContext";
import { UsersFilter } from "../incidents-filter/IncidentsFIlter";
import { useSelector, shallowEqual } from "react-redux";

export function IncidentsCard() {
  const incidentsUIContext = useIncidentsUIContext();
  const incidentsUIProps = useMemo(() => {
    return {
      newUserButtonClick: incidentsUIContext.newUserButtonClick,
      openEditUserDialog: incidentsUIContext.openEditUserDialog,
    };
  }, [incidentsUIContext]);

  const { userAccess } = useSelector(
    (state) => ({
      userAccess: state.auth.userAccess.Users,
    }),
    shallowEqual
  );

  const accessUser = userAccess.find(
    (item) => item.componentName === "CreateUser"
  );

  return (
    <>
      <Card>
        <CardHeader title={<UsersFilter />}>
          <CardHeaderToolbar>
            {accessUser ? (
              <button
                type="button"
                className="btn btn-primary"
                onClick={incidentsUIProps.newUserButtonClick}
              >
                Add New Incident
              </button>
            ) : (
              <></>
            )}
          </CardHeaderToolbar>
        </CardHeader>
        <CardBody>
          <IncidentsTable />
        </CardBody>
      </Card>
    </>
  );
}
