import React, { useEffect, useMemo, useState } from "react";
import { Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { InfoEditForm } from "./InfoEditForm";
import { InfoEditDialogHeader } from "./InfoEditDialogHeader";
import { useInfoUIContext } from "../PersonalUIContext";
import * as actions from "../../../_redux/info-personal/infoActions";
import { useParams } from "react-router-dom";

const initInfo = {
  images: "",
  countryId: "",
  cityId: "",
  incidentTypeId: "",
  districtId: "",
  areaId: "",
  bodyType: "",
  vehicleType: "",
  vehicleId: "",
  vehicleRegNo: "",
  patientName: "",
  age: "",
  gender: "",
  callerCnic: "",
  callerName: "",
  callerPhNo: "",
  description: "",
  dateTime: "",
  incidentAddress: "",
  incidentlocationReachdateTime: "",
  hospitalReachdateTime: "",
  statusId: "",
  hospitalId: "",
  policeStationId: "",
};

export function InfoEditDialog({ show, onHide, userForRead }) {
  const dispatch = useDispatch();
  let { id } = useParams();
  const [initialValue, setInitialValue] = useState(initInfo);
  const infoUIContext = useInfoUIContext();

  const infoUIProps = useMemo(() => {
    return {
      queryParams: infoUIContext.queryParams,
      secondQueryParams: infoUIContext.secondQueryParams,
    };
  }, [infoUIContext]);

  const { infoForEdit } = useSelector((state) => ({
    infoForEdit: state.personalInformation.infoForEdit,
  }));

  useEffect(() => {
    if (id) {
      const filteredObj = Object.fromEntries(
        Object.entries(infoForEdit).filter(([key, value]) => value !== null)
      );
      setInitialValue(filteredObj);
    }
  }, [id, infoForEdit]);

  const saveInfo = (info) => {
    if (!id) {
      dispatch(actions.createInfo(info, onHide));
    } else {
      dispatch(actions.updateInfo(info, onHide));
    }
  };

  return (
    <Modal
      size="xl"
      dialogClassName="modal-90w"
      show={show}
      onHide={onHide}
      aria-labelledby="example-modal-sizes-title-lg"
      backdrop="static"
      keyboard={false}
    >
      <InfoEditDialogHeader id={id} isUserForRead={userForRead} />
      <InfoEditForm
        saveInfo={saveInfo}
        initialInfo={initialValue}
        onHide={onHide}
        isUserForRead={userForRead}
      />
    </Modal>
  );
}
