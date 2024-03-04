import React, { useMemo } from "react";

import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../../_metronic/_partials/controls";
import { CoffinTable } from "../coffin-table/CoffinTable";
import { useModuleUIContext } from "../CoffinUIContext";
import { useSelector, shallowEqual } from "react-redux";
import { CoffinFilter } from "../coffin-filter/CoffinFilter";

export function CoffinCard() {
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
    (item) => item.componentName === "CreateCoffinform"
  );

  return (
    <>
      <Card>
        <CardHeader title={<CoffinFilter />}>
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
          <CoffinTable />
        </CardBody>
      </Card>
    </>
  );
}
