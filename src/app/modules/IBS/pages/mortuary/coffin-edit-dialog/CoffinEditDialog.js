import React, { useEffect, useMemo, useState } from "react";
import { Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { CoffinEditForm } from "./CoffinEditForm";
import { CoffinEditDialogHeader } from "./CoffinEditDialogHeader";
import * as actions from "../../../_redux/coffin/reduxActions";
import { useParams } from "react-router-dom";
import { useModuleUIContext } from "../MortuaryUIContext";
//import { updateAccessRightByRoleAndResourceId } from "../../../../Settings/_redux/roles/rolesCrud";

const initValue = {
  countryId: "",
  cityId: "",
  statusId: "",
  SN: "",
  dateTime: "",
  fullNameOfTheDeceased: "",
  fatherNameOfTheDeceased: "",
  surname: "",
  cast: "",
  religion: "",
  nativePlace: "",
  age: "",
  gender: "",
  dateTimeofDeath: "",
  causeOfDeath: "",
  placeOfDeath: "",
  reporterCnic: "",
  reporterName: "",
  reporterPhNo: "",
  description: "",
};

export function CoffinEditDialog({ show, onHide, userForRead }) {
  const dispatch = useDispatch();
  let { ibfId, mfId, cfId } = useParams();

  const moduleUIContext = useModuleUIContext();

  const moduleUIProps = useMemo(() => {
    return {
      queryParams: moduleUIContext.queryParams,
    };
  }, [moduleUIContext]);

  const [initialValue, setInitialValue] = useState(initValue);

  const mortuary = useSelector((state) => state.mortuary);
  const coffinInfoForEdit = useSelector((state) => state.coffin?.infoForEdit);
  const { infoForEdit } = mortuary;

  useEffect(() => {
    if (cfId && coffinInfoForEdit) {
      const filteredObj = Object.fromEntries(
        Object.entries(coffinInfoForEdit).filter(
          ([key, value]) => value !== null
        )
      );
      setInitialValue(filteredObj);
    }
  }, [coffinInfoForEdit]);

  useEffect(() => {
    if (ibfId && mfId && infoForEdit) {
      const UpdateObj = {
        ...infoForEdit,
        age: "",
        dateTimeofDeath: "",
        causeOfDeath: "",
        gender: "",
      };
      UpdateObj.city && delete UpdateObj.city;
      UpdateObj.country && delete UpdateObj.country;
      UpdateObj.createdAt && delete UpdateObj.createdAt;
      UpdateObj.createdBy && delete UpdateObj.createdBy;
      UpdateObj.hospital && delete UpdateObj.hospital;
      UpdateObj.mortuaryFormImages && delete UpdateObj.mortuaryFormImages;
      UpdateObj.status && delete UpdateObj.status;
      UpdateObj.updatedAt && delete UpdateObj.updatedAt;
      UpdateObj.updatedBy && delete UpdateObj.updatedBy;
      delete UpdateObj.sN;
      delete UpdateObj.Address;
      delete UpdateObj.mortuaryReachdateTime;
      delete UpdateObj.callerCnic;
      delete UpdateObj.callerName;
      delete UpdateObj.callerPhNo;
      delete UpdateObj.dischargeFromMortuaryDateTime;
      delete UpdateObj.isActive;
      delete UpdateObj.hospitalId;
      delete UpdateObj.coffinFormRelatedToMortuaryForm;
      delete UpdateObj.id;
      delete UpdateObj.hospital;

      setInitialValue(UpdateObj);
    }
  }, [infoForEdit, ibfId, mfId]);

  const saveCenter = (props, disabledloading) => {
    if (!cfId) {
      if (ibfId) {
        props.ibfId = +ibfId;
      }
      if (mfId) {
        props.mfId = +mfId;
      }
      dispatch(
        actions.createInfo(
          props,
          onHide,
          moduleUIProps.queryParams,
          disabledloading
        )
      );
    } else {
      const UpdatedObj = { ...props };
      delete UpdatedObj?.isActive;
      delete UpdatedObj?.createdBy;
      delete UpdatedObj?.createdAt;
      delete UpdatedObj?.updatedAt;
      delete UpdatedObj?.country;
      delete UpdatedObj?.city;
      delete UpdatedObj?.status;
      delete UpdatedObj?.ibForm;
      delete UpdatedObj?.mortuaryForm;
      delete UpdatedObj?.updatedBy;
      dispatch(
        actions.updateInfo(
          UpdatedObj,
          onHide,
          moduleUIProps.queryParams,
          disabledloading
        )
      );
    }
  };

  return (
    <Modal
      size="xl"
      dialogClassName="modal-90w"
      show={show}
      onHide={onHide}
      aria-labelledby="example-modal-sizes-title-lg"
    >
      <CoffinEditDialogHeader />

      <CoffinEditForm
        saveCenter={saveCenter}
        initialValue={initialValue}
        onHide={onHide}
      />
    </Modal>
  );
}
