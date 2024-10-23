import React, { useEffect, useMemo, useState } from "react";
import { Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { MortuaryEditForm } from "./MortuaryEditForm";
import { MortuaryEditDialogHeader } from "./MortuaryEditDialogHeader";
import { useModuleUIContext } from "../MortuaryUIContext";
import * as actions from "../../../_redux/mortuary/reduxActions";
import { useParams } from "react-router-dom";
import { set } from "date-fns";

const initValue = {
  images: "",
  sN: "",
  countryId: "",
  cityId: "",
  hospitalId: "",
  statusId: "",
  ibfId: "",
  dateTime: "",
  fullNameOfTheDeceased: "",
  fatherNameOfTheDeceased: "",
  Address: "",
  callerCnic: "",
  callerName: "",
  callerPhNo: "",
  description: "",
  mortuaryReachdateTime: "",
  dischargeFromMortuaryDateTime: "",
};

export function MortuaryEditDialog({ show, onHide, userForRead }) {
  const dispatch = useDispatch();
  let { id } = useParams();
  const [initialValue, setInitialValue] = useState(initValue);

  //const moduleUIContext = useModuleUIContext();
  // const moduleUIProps = useMemo(() => {
  //   return {
  //     initCenter: moduleUIContext.initCenter,
  //     queryParams: moduleUIContext.queryParams,
  //     secondQueryParams: moduleUIContext.secondQueryParams,
  //   };
  // }, [moduleUIContext]);

  const mortuaryState = useSelector((state) => state.mortuary);
  const { infoForEdit } = mortuaryState;

  useEffect(() => {
    if (id) {
      const filteredObj = Object.fromEntries(
        Object.entries(infoForEdit).filter(([key, value]) => value !== null)
      );
      setInitialValue(filteredObj);
    }
  }, [id, infoForEdit]);

  const saveCenter = (props) => {
    if (!id) {
      dispatch(actions.createInfo(props, onHide));
    } else {
      dispatch(actions.updateInfo(props, onHide));
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
      <MortuaryEditDialogHeader id={id} isUserForRead={userForRead} />

      <MortuaryEditForm
        saveCenter={saveCenter}
        initialValue={initialValue}
        onHide={onHide}
        isUserForRead={userForRead}
      />
    </Modal>
  );
}
