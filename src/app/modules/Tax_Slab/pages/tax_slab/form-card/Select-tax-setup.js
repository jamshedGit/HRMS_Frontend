import React, { useEffect } from "react";
import { Modal } from "react-bootstrap";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { Select } from "../../../../../../_metronic/_partials/controls";
import { useDispatch, useSelector, shallowEqual } from "react-redux"
import CustomDropdown from "../../../../../utils/common-modules/CustomDropdown";
import CustomErrorLabel from "../../../../../utils/common-modules/CustomErrorLabel";
import CurrentModuleName from "../../../../../utils/common-modules/ModuleName";
import { Card, CardHeader } from "@material-ui/core";
import { fetchAllSubsidiaryData } from "../../../../../../_metronic/redux/dashboardActions";
import * as actions from "../../../_redux/redux-Actions";
import { SearchSelect } from "../../../../../../_metronic/_helpers/SearchSelect";
export function SelectTaxSetup({
    actionsLoading,
    fetchSubsidiaryId,
    setFetchSubsidiaryId,
    fetchTaxSetupId,
    setFetchTaxSetupId,
}) {

    //Get all Employee list from dashboard global state
    const { allEmployees } = useSelector(
        (state) => ({
            allEmployees: state.dashboard.allEmployees
        }),
        shallowEqual
    )
    const dispatch = useDispatch();
    const { dashboard } = useSelector((state) => state);

    useEffect(() => {

        dispatch(fetchAllSubsidiaryData("allSubsidiaryList"))
        dispatch(actions.fetchgetAllTaxYearSetup());

    }, [dispatch]);


    const { currentState, userAccess } = useSelector(
        (state) => {
            return {

                currentState: state.tax_slab,
                userAccess: state?.auth?.userAccess["tax_slab"],
            }
        },

    );


    const { taxYearSetup, } = currentState;
    console.log("taxYearSetup", taxYearSetup)
    return (
        <>
            {/* Formik Starts */}

            <Formik
                enableReinitialize={true}
                initialValues={{}}
            >
                {({
                    errors,
                    touched,
                    values,
                    handleBlur,
                    setFieldValue,
                }) => (
                    <>

                        {actionsLoading && (
                            <div className="overlay-layer bg-transparent">
                                <div className="spinner spinner-lg spinner-success" />
                            </div>
                        )}
                        {/* Form Starts */}
                        <Form className="form form-label-right">
                            <fieldset>
                                <div className="from-group row m-5">

                                    {/* Employee Id Dropdown Starts */}
                                    <div className="col-4 col-md-4 mt-3">
                                        <SearchSelect
                                            name="subsidiaryId"
                                            label={
                                                <span>
                                                    Subsidiary<span style={{ color: "red" }}>*</span>
                                                </span>
                                            }

                                            onChange={(e) => {
                                                setFieldValue("subsidiaryId", e.value || null);
                                                setFetchSubsidiaryId(e.value)

                                            }}
                                            //    value={
                                            //      dashboard?.allSubsidiaryList?.find(
                                            //        (option) => option?.value === values?.subsidiaryId
                                            //      ) || null
                                            //    }
                                            options={dashboard?.allSubsidiaryList}
                                            // options={dashboard.allAccountList.map((option) => ({
                                            //   label: `${option.mergeLabel}`, // Adding the value to the label
                                            //   value: option.value,
                                            // }))}


                                            error={errors.subsidiaryId}
                                            touched={touched.subsidiaryId}
                                        />
                                    </div>

                                    <div className="col-4 col-md-4 mt-3">
                                        <SearchSelect
                                            name="taxSetupId"
                                            label={
                                                <span>
                                                    Select Tax Year<span style={{ color: "red" }}>*</span>
                                                </span>
                                            }
                                            isDisabled={!values.subsidiaryId}
                                            onChange={(e) => {
                                                setFieldValue("taxSetupId", e.value || null);
                                                setFetchTaxSetupId(e.value)
                                            }}

                                            // value={
                                            //     taxYearSetup?.find(
                                            //         (option) => option?.subsidiaryId === values?.subsidiaryId
                                            //     ) || null
                                            // }
                                            // options={taxYearSetup}
                                            options={taxYearSetup
                                                ?.filter(option => option?.subsidiaryId === values?.subsidiaryId) // Filtering by subsidiaryId
                                                .map(option => ({
                                                    label: `${option?.startDate} - ${option?.endDate} ${option?.isActive ? "Active" : ""}`, // Adding Active status
                                                    value: option?.Id, // Use Id as the value
                                                })) || []}


                                            error={errors.taxSetupId}
                                            touched={touched.taxSetupId}
                                        />
                                    </div>

                                </div>
                            </fieldset>
                        </Form>
                        {/* Form Ends */}
                    </>
                )}
            </Formik>
            {/* Formik Ends */}
        </>
    );
}
