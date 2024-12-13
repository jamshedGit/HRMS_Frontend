import React, { useMemo } from "react"

import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../../_metronic/_partials/controls"
import { FormTable } from "../form-table/FormTable"
import { useFormUIContext } from "../FormUIContext"
import { FormFIlter } from "../form-filter/FormFIlter"
import { useSelector, shallowEqual } from "react-redux"
import CurrentModuleName from "../../../../../utils/common-modules/ModuleName"
import { SelectTaxSetup } from "./Select-tax-setup"

export function FormCard(fetchSubsidiaryId,fetchTaxSetupId) {

  const FormUIContext = useFormUIContext()

  const FormUIProps = useMemo(() => {
    return {
      newFormButtonClick: FormUIContext.newFormButtonClick,
      openEditFormDialog: FormUIContext.openEditFormDialog,
    }
  }, [FormUIContext])

  const { userAccess } = useSelector(

    (state) => ({

      userAccess: state.auth.userAccess.tax_slab,
    }),
    shallowEqual
  )

  const accessUser = userAccess.find(
    (item) => item.componentName === "CreateTaxSlab"
  )

  const { currentState } = useSelector(
    (state) => {
      ; return {

        currentState: state.tax_slab,
        userAccess: state?.auth?.userAccess["tax_slab"],
      }
    },
    shallowEqual
  );



  const { entities } = currentState;


  
    const fetchTaxSlabProps = useMemo(() => {
      return {
        fetchSubsidiaryId: FormUIContext?.fetchSubsidiaryId,
        fetchTaxSetupId: FormUIContext?.fetchTaxSetupId,
        setFetchSubsidiaryId: FormUIContext?.setFetchSubsidiaryId,
        setFetchTaxSetupId: FormUIContext?.setFetchTaxSetupId,
      };
    }, [FormUIContext]);
  return (
    <>


      <Card>
        <CardHeader title={CurrentModuleName()} >
            
          <div className="d-flex justify-content-between align-items-center gap-3 m-4">

            {/* <div className="pt-5">
              <FormFIlter />
            </div> */}
            <div className=" p-2">
              <CardHeaderToolbar>

                <button
                  type="button"
                  className="btn btn-primary "
                  onClick={FormUIProps.newFormButtonClick}
                >
                  + Add Tax Slab
                </button>


              </CardHeaderToolbar>
            </div>

          </div>
        </CardHeader>
        <SelectTaxSetup 
          
                
          setFetchSubsidiaryId={fetchTaxSlabProps?.setFetchSubsidiaryId}
         
          setFetchTaxSetupId={fetchTaxSlabProps?.setFetchTaxSetupId}
        
          />
          {console.log("fetchSubsidiaryId111", FormUIContext?.fetchSubsidiaryId,FormUIContext?.fetchTaxSetupId,)}

        {/* <CardBody>


          <FormTable />
        </CardBody> */}

{
  FormUIContext?.fetchSubsidiaryId && FormUIContext?.fetchTaxSetupId ? (
    <CardBody>
      <FormTable />
    </CardBody>
  ) : (
   <></>
  )
}

      </Card>
    </>
  )
}
