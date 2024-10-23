import React, { useMemo } from "react";

import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../../_metronic/_partials/controls";
import { MortuaryTable } from "../mortuary-table/MortuaryTable";
import { useModuleUIContext } from "../MortuaryUIContext";
import { useSelector, shallowEqual } from "react-redux";
import { MortuaryFilter } from "../mortuary-filter/MortuaryFilter";

export function MortuaryCard() {
  const moduleUIContext = useModuleUIContext();

  const moduleUIProps = useMemo(() => {
    return {
      addNewButtonClick: moduleUIContext.addNewButtonClick,
    };
  }, [moduleUIContext]);

  const { userAccess } = useSelector(
    (state) => ({
      userAccess: state?.auth?.userAccess?.IBS,
    }),
    shallowEqual
  );

  const accessUser = userAccess?.find(
    (item) => item.componentName === "CreateMortuaryform"
  );

  return (
    <>
      <Card>
        <CardHeader title={<MortuaryFilter />}>
          <CardHeaderToolbar>
            {accessUser?.isAccess ? (
              <button
                type="button"
                className="btn btn-primary"
                onClick={moduleUIProps.addNewButtonClick}
              >
                Add New Info
              </button>
            ) : (
              <></>
            )}
          </CardHeaderToolbar>
        </CardHeader>

        <CardBody>
          <MortuaryTable />
        </CardBody>
      </Card>
    </>
  );
}
