import React, { useMemo } from "react";

import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../../_metronic/_partials/controls";
import { InfoTable } from "../info-table/InfoTable";
import { useInfoUIContext } from "../PersonalUIContext";
import { useSelector, shallowEqual } from "react-redux";
import { InfoFilter } from "../info-filter/InfoFilter";

export function InfoCard() {
  const centersUIContext = useInfoUIContext();

  const centersUIProps = useMemo(() => {
    return {
      newCenterButtonClick: centersUIContext.addNewButtonClick,
      makePDFreport: centersUIContext.makePDFreport,
    };
  }, [centersUIContext]);

  const { userAccess } = useSelector(
    (state) => ({
      userAccess: state?.auth?.userAccess?.IBS,
    }),
    shallowEqual
  );

  const accessUser = userAccess?.find(
    (item) => item.componentName === "CreateIbform"
  );

  return (
    <>
      <Card>
        <CardHeader title={<InfoFilter />}>
          <CardHeaderToolbar>
            {accessUser?.isAccess && (
              <button
                type="button"
                className="btn btn-primary mr-3"
                onClick={centersUIProps.newCenterButtonClick}
              >
                Add New Info
              </button>
            )}
          </CardHeaderToolbar>
        </CardHeader>
        <CardBody>
          <InfoTable />
        </CardBody>
      </Card>
    </>
  );
}
