import React, { useEffect, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { ItemEditForm } from "./ItemEditForm";
import { ItemEditDialogHeader } from "./ItemEditDialogHeader";
import { useItemUIContext } from "../ItemUIContext";
import * as actions from "../../../_redux/vehiclesActions";
import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "center",
    marginTop: "2rem",
    marginBottom: "2rem",
  },
}));

export function ItemEditDialog({ id, show, onHide, itemForRead }) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const itemUIContext = useItemUIContext();
  const itemUIProps = useMemo(() => {
    return {
      initItem: itemUIContext.initItem,
      queryParams: itemUIContext.queryParams,
    };
  }, [itemUIContext]);

  const { itemForEdit, centers, category } = useSelector(
    (state) => ({
      //actionsLoading: state.vehicles.actionsLoading,
      itemForEdit: state.vehicles.itemForEdit,
      centers: state.vehicles.centers,
      category: state.vehicles.categories,
    }),
    shallowEqual
  );

  // console.log("itemForEdit", itemForEdit)

  useEffect(() => {
    const fetchData = async () => {
      // await dispatch(actions.fetchVehicles(itemUIProps.queryParams));
      // await dispatch(actions.fetchCenters());
      // await dispatch(actions.fetchCategory());
    };
    fetchData();
    // if (id) {
    //   dispatch(actions.fetchVehicle(id));
    // }
    //console.log("useEffect called")
  }, []);

  // useEffect(() => {
  //   dispatch(actions.fetchVehicles(itemUIProps.queryParams));
  //   dispatch(actions.fetchCenters());
  //   dispatch(actions.fetchCategory());
  //   if (id) {
  //     dispatch(actions.fetchVehicle(id));
  //   }
  //   //console.log("useEffect called")
  // }, [id, dispatch, itemUIProps.queryParams]);

  const saveItem = (item) => {
    console.log("itrem", item);
    if (!id) {
      const itemUpdatedFields = {};

      if (item.name) {
        itemUpdatedFields.name = item.name;
      }
      if (item.regNo) {
        itemUpdatedFields.regNo = item.regNo;
      }
      if (item.engineNo) {
        itemUpdatedFields.engineNo = item.engineNo;
      }
      if (item.engineCapacity) {
        itemUpdatedFields.engineCapacity = item.engineCapacity;
      }
      if (item.registerCity) {
        itemUpdatedFields.name = item.registerCity;
      }
      if (item.chasis) {
        itemUpdatedFields.chasis = item.chasis;
      }
      if (item.milleage) {
        itemUpdatedFields.milleage = item.milleage;
      }
      if (item.year) {
        itemUpdatedFields.year = item.year;
      }
      if (item.make) {
        itemUpdatedFields.make = item.make;
      }
      if (item.model) {
        itemUpdatedFields.model = item.model;
      }
      if (item.color) {
        itemUpdatedFields.color = item.color;
      }
      if (item.fuelType) {
        itemUpdatedFields.fuelType = item.fuelType;
      }
      if (item.transmission) {
        itemUpdatedFields.transmission = item.transmission;
      }
      if (item.status) {
        itemUpdatedFields.status = item.status;
      }

      if (item.centerId) {
        itemUpdatedFields.centerId = item.centerId;
      }
      if (item.subCenterId) {
        itemUpdatedFields.subCenterId = item.subCenterId;
      }
      if (item.vehicleCategoryId) {
        itemUpdatedFields.vehicleCategoryId = item.vehicleCategoryId;
      }
      if (item.driverId) {
        itemUpdatedFields.driverId = item.driverId;
      }
      if (item.oldDriverId) {
        itemUpdatedFields.oldDriverId = item.oldDriverId;
      }

      dispatch(actions.createVehicle(itemUpdatedFields)).then((res) => {
        onHide();
      });
    } else {
      // id: item.id,
      //   name: item.name,
      //   regNo: item.regNo,
      //   engineNo: item.engineNo,
      //   engineCapacity: item.engineCapacity,
      //   registerCity: item.registerCity,
      //   chasis: item.chasis,
      //   milleage: item.milleage,
      //   year: item.year,
      //   make: item.make,
      //   model: item.model,
      //   color: item.color,
      //   fuelType: item.fuelType,
      //   transmission: item.transmission,
      //   status: item.status,
      //   centerId: item.centerId,
      //   vehicleCategoryId: item.vehicleCategoryId,
      //   driverId: item.driverId,
      //   oldDriverId: item.oldDriverId,
      const itemUpdatedFields = {};

      if (item.id) {
        itemUpdatedFields.id = item.id;
      }
      if (item.name) {
        itemUpdatedFields.name = item.name;
      }
      if (item.regNo) {
        itemUpdatedFields.regNo = item.regNo;
      }
      if (item.engineNo) {
        itemUpdatedFields.engineNo = item.engineNo;
      }
      if (item.engineCapacity) {
        itemUpdatedFields.engineCapacity = item.engineCapacity;
      }
      if (item.registerCity) {
        itemUpdatedFields.name = item.registerCity;
      }
      if (item.chasis) {
        itemUpdatedFields.chasis = item.chasis;
      }
      if (item.milleage) {
        itemUpdatedFields.milleage = item.milleage;
      }
      if (item.year) {
        itemUpdatedFields.year = item.year;
      }
      if (item.make) {
        itemUpdatedFields.make = item.make;
      }
      if (item.model) {
        itemUpdatedFields.model = item.model;
      }
      if (item.color) {
        itemUpdatedFields.color = item.color;
      }
      if (item.fuelType) {
        itemUpdatedFields.fuelType = item.fuelType;
      }
      if (item.transmission) {
        itemUpdatedFields.transmission = item.transmission;
      }
      if (item.status) {
        itemUpdatedFields.status = item.status;
      }
      if (item.centerId) {
        itemUpdatedFields.centerId = item.centerId;
      }
      if (item.subCenterId) {
        itemUpdatedFields.subCenterId = item.subCenterId;
      }
      if (item.vehicleCategoryId) {
        itemUpdatedFields.vehicleCategoryId = item.vehicleCategoryId;
      }
      if (item.driverId) {
        itemUpdatedFields.driverId = item.driverId;
      }
      if (item.oldDriverId) {
        itemUpdatedFields.oldDriverId = item.oldDriverId;
      }
      dispatch(actions.updateVehicle(itemUpdatedFields));
      onHide();
    }
  };

  return (
    <Modal
      size="lg"
      show={show}
      onHide={onHide}
      aria-labelledby="example-modal-sizes-title-lg"
    >
      {id ? (
        <>
          {!itemForEdit ? (
            <div className={classes.root}>
              <CircularProgress />
            </div>
          ) : (
            <>
              <ItemEditDialogHeader id={id} itemForRead={itemForRead} />
              <ItemEditForm
                saveItem={saveItem}
                centerName={centers}
                item={itemForEdit || itemUIProps.initItem}
                onHide={onHide}
                itemForRead={itemForRead}
                category={category}
              />
            </>
          )}
        </>
      ) : (
        <>
          <ItemEditDialogHeader id={id} itemForRead={itemForRead} />
          <ItemEditForm
            saveItem={saveItem}
            centerName={centers}
            item={itemUIProps.initItem}
            onHide={onHide}
            itemForRead={itemForRead}
            category={category}
          />
        </>
      )}

      {/* <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      /> */}
    </Modal>
  );
}
