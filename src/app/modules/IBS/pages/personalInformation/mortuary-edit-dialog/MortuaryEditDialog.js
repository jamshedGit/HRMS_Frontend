import React, { useState, useEffect, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { MortuaryEditForm } from "./MortuaryEditForm";
import { MortuaryEditDialogHeader } from "./MortuaryEditDialogHeader";
import * as actions from "../../../_redux/mortuary/reduxActions";
import {
  updateInfo,
  fetchInfoById,
  fetchIbs,
} from "../../../_redux/info-personal/infoActions";
import { useParams } from "react-router-dom";
import { useInfoUIContext } from "../PersonalUIContext";

const initValue = {
  images: "",
  SN: "",
  countryId: "",
  cityId: "",
  hospitalId: "",
  statusId: "",
  ibfId: "",
  dateTime: "",
  fullNameOfTheDeceased: "",
  fatherNameOfTheDeceased: "",
  age: "",
  Address: "",
  callerCnic: "",
  callerName: "",
  callerPhNo: "",
  description: "",
  mortuaryReachdateTime: "",
  dischargeFromMortuaryDateTime: "",
};

export function MortuaryEditDialog({ show, onHide, userForRead, isForEdit }) {
  const dispatch = useDispatch();
  const [initialValue, setInitialValue] = useState(initValue);
  const [isFieldDisable, setFieldDisable] = useState(false);
  const infoUIContext = useInfoUIContext();

  const infoUIProps = useMemo(() => {
    return {
      queryParams: infoUIContext.queryParams,
    };
  }, [infoUIContext]);

  let { ibfId, mfId } = useParams();
  const { infoForEdit } = useSelector((state) => state.mortuary);
  const PersonalInfoState = useSelector(
    (state) => state?.personalInformation?.infoForEdit
  );

  useEffect(() => {
    if (infoForEdit) {
      setInitialValue(infoForEdit);
    }
  }, [infoForEdit]);

  useEffect(() => {
    if (ibfId && PersonalInfoState) {
      const UpdateObj = {
        ...PersonalInfoState,
        fullNameOfTheDeceased: PersonalInfoState.patientName,
        statusId: "",
        fatherNameOfTheDeceased: "",
        SN: "",
        mortuaryReachdateTime: "",
        dischargeFromMortuaryDateTime: "",
        Address: "",
      };
      delete UpdateObj.city;
      delete UpdateObj.country;
      delete UpdateObj.createdAt;
      delete UpdateObj.createdBy;
      delete UpdateObj.district;
      delete UpdateObj.gender;
      delete UpdateObj.hospital;
      delete UpdateObj.hospitalReachdateTime;
      delete UpdateObj.ibFormImages;
      delete UpdateObj.id;
      delete UpdateObj.incidentTypeId;
      delete UpdateObj.incidentlocationReachdateTime;
      delete UpdateObj.isActive;
      delete UpdateObj.policeStation;
      delete UpdateObj.status;
      delete UpdateObj.updatedAt;
      delete UpdateObj.updatedBy;
      delete UpdateObj.vehicle;
      delete UpdateObj.vehicleId;
      delete UpdateObj.vehicleRegNo;
      delete UpdateObj.vehicleType;
      delete UpdateObj.relatedMortuaryForm;
      delete UpdateObj.area;
      delete UpdateObj.areaId;
      delete UpdateObj.bodyType;
      delete UpdateObj.incidentType;
      delete UpdateObj.incidentAddress;

      //setFieldDisable(true);
      setInitialValue(UpdateObj);
    }
  }, [PersonalInfoState, ibfId]);

  const saveCenter = (props) => {
    if (mfId) {
      dispatch(actions.updateInfo(props, onHide));
    } else {
      dispatch(fetchInfoById(ibfId));
      if (ibfId) {
        props.ibfId = ibfId;
      }
      // console.log("props", props);

      dispatch(actions.createInfo(props, onHide, infoUIProps.queryParams));
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
      <MortuaryEditDialogHeader isForEdit={isForEdit} />

      <MortuaryEditForm
        saveCenter={saveCenter}
        initialValue={initialValue}
        onHide={onHide}
        isUserForRead={userForRead}
        isForEdit={isForEdit}
        isFieldDisable={isFieldDisable}
      />
    </Modal>
  );
}
