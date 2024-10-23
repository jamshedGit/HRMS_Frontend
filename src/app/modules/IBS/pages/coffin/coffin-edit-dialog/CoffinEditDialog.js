import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { CoffinEditForm } from "./CoffinEditForm";
import { CoffinEditDialogHeader } from "./CoffinEditDialogHeader";
//import { useModuleUIContext } from "../CoffinUIContext";
import * as actions from "../../../_redux/coffin/reduxActions";
import { useParams } from "react-router-dom";

const initValue = {
  countryId: "",
  cityId: "",
  statusId: "",
  SN: 0,
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

  const mortuaryState = useSelector((state) => state.coffin);
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
      delete props.isActive;
      delete props.createdBy;
      delete props.createdAt;
      delete props.updatedAt;
      delete props.country;
      delete props.status;
      delete props.city;
      delete props.updatedBy;
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
      <CoffinEditDialogHeader id={id} isUserForRead={userForRead} />

      <CoffinEditForm
        saveCenter={saveCenter}
        initialValue={initialValue}
        onHide={onHide}
        isUserForRead={userForRead}
      />
    </Modal>
  );
}
