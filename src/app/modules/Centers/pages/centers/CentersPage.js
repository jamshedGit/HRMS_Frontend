import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Route } from "react-router-dom";
import { CentersUIProvider } from "./CentersUIContext";
import { CenterEditDialog } from "./center-edit-dialog/CenterEditDialog";
import { CenterDeleteDialog } from "./center-delete-dialog/CenterDeleteDialog";
import { CenterActiveDialog } from "./center-active-dialog/CenterActiveDialog";
import { CentersCard } from "./centers-card/CentersCard";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import * as actions from "../../_redux/centers/centersActions";
import { fetchAllCountry } from "../../../../../_metronic/redux/dashboardActions";
// import { fetchCenter, fetchAllCity } from "../../_redux/centers/centersActions";

export function CentersPage({ history }) {
  const dispatch = useDispatch();

  const centerForEdit = useSelector((state) => state?.centers?.centerForEdit);
  //console.log("centerForEdit", centerForEdit.countryId);
  // useEffect(() => {
  //   const fetchData = () => {

  //   };
  // }, [centerForEdit.countryId]);
  // const { auth } = useSelector((auth) => auth)
  // console.log("UserManagement, Auth: ", auth)
  // const { userAccess } = auth
  // console.log("UserManagement, userAccess: ", userAccess)
  // const isAdd = userAccess["Settings"]?.find(
  //   (access) => access.resourceId === 5
  // )
  //   ? true
  //   : false
  // const isEdit = userAccess["Settings"]?.find(
  //   (access) => access.resourceId == 4
  // )
  //   ? true
  //   : false
  // console.log("UserManagement, isAdd: ", isAdd)
  // const ForRead = false
  const centersUIEvents = {
    newCenterButtonClick: () => {
      dispatch(actions.fetchCenter());
      dispatch(fetchAllCountry());
      history.push("/centers/read-all-centers/new");
    },
    openEditCenterDialog: (id) => {
      dispatch(fetchAllCountry());
      dispatch(actions.fetchCenter(id));
      history.push(`/centers/read-all-centers/${id}/edit`);
    },
    openDeleteCenterDialog: (id, status) => {
      history.push(`/centers/read-all-centers/${id}/${status}/delete`);
    },
    openActiveCenterDialog: (id) => {
      history.push(`/centers/read-all-centers/${id}/active`);
    },
    openReadCenterDialog: (id, isUserRead) => {
      dispatch(actions.fetchCenter(id));
      dispatch(fetchAllCountry());
      //dispatch(actions.fetchVehicles(id));

      history.push(`/centers/read-all-centers/${id}/read`);
    },
  };
  return (
    <CentersUIProvider centersUIEvents={centersUIEvents}>
      <Route exact path="/centers/read-all-centers/new">
        {({ history, match }) => (
          <CenterEditDialog
            show={match != null}
            onHide={() => {
              history.push("/centers/read-all-centers");
            }}
            isNew={true}
          />
        )}
      </Route>
      <Route path="/centers/read-all-centers/:id/edit">
        {({ history, match }) => (
          <CenterEditDialog
            show={match != null}
            id={match && match.params.id}
            isEdit={true}
            onHide={() => {
              // dispatch(actions.fetchCenter());
              // // dispatch(fetchAllCity());
              history.push("/centers/read-all-centers");
            }}
          />
        )}
      </Route>
      <Route path="/centers/read-all-centers/:id/read">
        {({ history, match }) => (
          <CenterEditDialog
            show={match != null}
            id={match && match.params.id}
            userForRead={true}
            onHide={() => {
              history.push("/centers/read-all-centers");
            }}
          />
        )}
      </Route>
      {/* <Route path="/centers/read-all-centers/:id/delete">
        {({ history, match }) => (
          <CenterDeleteDialog
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push("/centers/read-all-centers");
            }}
          />
        )}
      </Route> */}

      <Route path="/centers/read-all-centers/:id/:status/delete">
        {({ history, match }) => (
          <CenterDeleteDialog
            show={match != null}
            id={match && match.params.id}
            status={match && match.params.status}
            onHide={() => {
              history.push("/centers/read-all-centers");
            }}
          />
        )}
      </Route>
      <Route path="/centers/read-all-centers/:id/active">
        {({ history, match }) => (
          <CenterActiveDialog
            show={match != null}
            id={match && match.params.id}
            //status={match && match.params.status}
            onHide={() => {
              history.push("/centers/read-all-centers");
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
      <CentersCard />
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
    </CentersUIProvider>
  );
}
