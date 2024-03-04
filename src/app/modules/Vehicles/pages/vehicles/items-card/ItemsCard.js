import React, { useMemo } from "react";
import { useSelector, shallowEqual } from "react-redux";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../../_metronic/_partials/controls";
import { ItemsTable } from "../items-table/itemsTable";
import { useItemUIContext } from "../ItemUIContext";
import { VehicleFilter } from "../vehicles-filter/VehiclesFilter";

export function ItemsCard() {
  const itemsUIContext = useItemUIContext();

  const centersUIProps = useMemo(() => {
    return {
      newCenterButtonClick: itemsUIContext.newCenterButtonClick,
      openEditCenterDialog: itemsUIContext.openEditCenterDialog,
    };
  }, [itemsUIContext]);

  const { userAccess } = useSelector(
    (state) => ({
      userAccess: state?.auth?.userAccess?.Users,
    }),
    shallowEqual
  );

  const accessUser = userAccess?.find(
    (item) => item.componentName === "CreateUser"
  );

  return (
    <>
      <Card>
        <CardHeader title={<VehicleFilter />}>
          <CardHeaderToolbar>
            {accessUser ? (
              <button
                type="button"
                className="btn btn-primary"
                onClick={centersUIProps.newCenterButtonClick}
              >
                Add New Vehicle
              </button>
            ) : (
              <></>
            )}
          </CardHeaderToolbar>
        </CardHeader>
        <CardBody>
          <ItemsTable />
        </CardBody>
      </Card>
    </>
  );
}
