import React from "react";
import { useDispatch } from "react-redux";
import { Route } from "react-router-dom";
import { ItemUIProvider } from "./ItemUIContext";
import { ItemEditDialog } from "./item-edit-dialog/ItemEditDialog";
import { ItemDeleteDialog } from "./item-delete-dialog/ItemDeleteDialog";
import { ItemActiveDialog } from "./item-active-dialog/ItemActiveDialog";
import { ItemsCard } from "./items-card/ItemsCard";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { fetchVehicle, fetchCategory } from "../../_redux/vehiclesActions";
import { fetchAllCenters } from "../../../../../_metronic/redux/dashboardActions";

export function ItemPage({ history }) {
  const dispatch = useDispatch();
  const itemUIEvents = {
    newCenterButtonClick: () => {
      dispatch(fetchVehicle(0));
      dispatch(fetchAllCenters());
      dispatch(fetchCategory());
      history.push("/vehicles/read-all-vehicles/new");
    },
    openEditCenterDialog: (id) => {
      dispatch(fetchVehicle(id));
      dispatch(fetchAllCenters());
      dispatch(fetchCategory());
      history.push(`/vehicles/read-all-vehicles/${id}/edit`);
    },
    openDeleteCenterDialog: (id) => {
      history.push(`/vehicles/read-all-vehicles/${id}/delete`);
    },
    openActiveDialog: (id) => {
      history.push(`/vehicles/read-all-vehicles/${id}/active`);
    },
    openReadCenterDialog: (id) => {
      dispatch(fetchAllCenters());
      dispatch(fetchVehicle(id));
      history.push(`/vehicles/read-all-vehicles/${id}/read`);
    },
  };
  return (
    <ItemUIProvider itemUIEvents={itemUIEvents}>
      <Route exact path="/vehicles/read-all-vehicles/new">
        {({ history, match }) => (
          <ItemEditDialog
            show={match != null}
            onHide={() => {
              history.push("/vehicles/read-all-vehicles");
            }}
          />
        )}
      </Route>
      <Route path="/vehicles/read-all-vehicles/:id/edit">
        {({ history, match }) => (
          <ItemEditDialog
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              dispatch(fetchVehicle(0));
              history.push("/vehicles/read-all-vehicles");
            }}
          />
        )}
      </Route>
      <Route path="/vehicles/read-all-vehicles/:id/read">
        {({ history, match }) => (
          <ItemEditDialog
            show={match != null}
            id={match && match.params.id}
            itemForRead={true}
            onHide={() => {
              dispatch(fetchVehicle(0));
              history.push("/vehicles/read-all-vehicles");
            }}
          />
        )}
      </Route>
      <Route path="/vehicles/read-all-vehicles/:id/delete">
        {({ history, match }) => (
          <ItemDeleteDialog
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push("/vehicles/read-all-vehicles");
            }}
          />
        )}
      </Route>
      <Route path="/vehicles/read-all-vehicles/:id/active">
        {({ history, match }) => (
          <ItemActiveDialog
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push("/vehicles/read-all-vehicles");
            }}
          />
        )}
      </Route>
      {/* {isAdd && (
        <Route exact path="/list/new">
          {({ history, match }) => (
            <UsersEditDialog
              show={match != null}
              onHide={() => {
                history.push("/list")
              }}
            />
          )}
        </Route>
      )}
      {isEdit && (
        <Route exact path="/list/edit">
          {({ history, match }) => (
            <UsersEditDialog
              show={match != null}
              onHide={() => {
                history.push("/list")
              }}
            />
          )}
        </Route>
      )} */}
      <ItemsCard />
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </ItemUIProvider>
  );
}
