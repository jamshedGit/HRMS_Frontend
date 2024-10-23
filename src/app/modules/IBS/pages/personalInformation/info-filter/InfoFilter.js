import React, { useMemo, useState } from "react";
import { Formik } from "formik";
import { isEqual } from "lodash";
import { useInfoUIContext } from "../PersonalUIContext";
import DatePicker from "react-datepicker";
import moment from "moment";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import axios from "axios";
import { toAbsoluteUrl } from "../../../../../../_metronic/_helpers";

pdfMake.vfs = pdfFonts.pdfMake.vfs;
const API_URL = process.env.REACT_APP_API_URL;

const prepareFilter = (queryParams, values) => {
  const { status, type, searchText } = values;
  const newQueryParams = { ...queryParams };
  const filter = {};
  // Filter by status
  filter.status = status !== "" ? +status : undefined;
  // Filter by type
  filter.type = type !== "" ? +type : undefined;
  // Filter by all fields
  filter.searchQuery = searchText;
  if (searchText) {
    filter.searchQuery = searchText;
  }
  newQueryParams.filter = filter;
  return newQueryParams;
};

export function InfoFilter({ listLoading }) {
  const [startDate, setStartDate] = useState();
  const centersUIContext = useInfoUIContext();
  const [Loading, setLoading] = useState(false);

  const centersUIProps = useMemo(() => {
    return {
      queryParams: centersUIContext.queryParams,
      setQueryParams: centersUIContext.setQueryParams,
    };
  }, [centersUIContext]);

  async function fetchData(year) {
    try {
      const response = await axios.post(`${API_URL}/ibs/read-ibsreport`, {
        year: year,
      });
      return response?.data?.data;
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  function getBase64ImageFromURL(url) {
    return new Promise((resolve, reject) => {
      var img = new Image();
      img.setAttribute("crossOrigin", "anonymous");

      img.onload = () => {
        var canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;

        var ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0);

        var dataURL = canvas.toDataURL("image/png");

        resolve(dataURL);
      };

      img.onerror = (error) => {
        reject(error);
      };

      img.src = url;
    });
  }

  async function createPdf(e) {
    setStartDate(e);
    const getYear = moment(e).format("yyyy");
    if (e != null) {
      setLoading(true);
      const data = await fetchData(getYear);
      const table = {
        headerRow: [
          "Name",
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "June",
          "July",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
          "Total",
        ],
        body: [],
      };

      data &&
        data.forEach((item) => {
          const row = [
            item.name,
            item.jan,
            item.feb,
            item.mar,
            item.apr,
            item.may,
            item.june,
            item.july,
            item.aug,
            item.sep,
            item.oct,
            item.nov,
            item.dec,
            item.total,
          ];
          table.body.push(row);
        });

      const documentDefinition = {
        content: [
          {
            alignment: "justify",
            columns: [
              {
                width: 100,
                image: await getBase64ImageFromURL(
                  `${toAbsoluteUrl("/media/logos/abdul-start-edhi (1).png")}`
                ),
              },
              {
                width: "*",
                text: [
                  `${getYear} YEARLY REPORT KARACHI\n`,
                  `TRAFFIC ACCIDENT & OTHER INCIDENTS`,
                ],
                style: "header",
              },
              {
                width: 100,
                image: await getBase64ImageFromURL(
                  `${toAbsoluteUrl("/media/logos/abdul-start-edhi (2).png")}`
                ),
              },
            ],
          },

          {
            table: {
              headerRows: 1,
              body: [table.headerRow, ...table.body],
            },
          },
        ],
        styles: {
          header: {
            fontSize: 14,
            bold: true,
            margin: [0, 0, 0, 10],
            alignment: "center",
          },
        },
        defaultStyle: {
          columnGap: 20,
        },
      };

      setLoading(false);

      try {
        pdfMake.createPdf(documentDefinition).download();
      } catch (error) {
        // Handle the error
        console.error(error);
      }
    }
  }

  const applyFilter = (values) => {
    const newQueryParams = prepareFilter(centersUIProps.queryParams, values);
    if (!isEqual(newQueryParams, centersUIProps.queryParams)) {
      newQueryParams.pageNumber = 1;
      centersUIProps.setQueryParams(newQueryParams);
    }
  };

  return (
    <>
      <Formik
        initialValues={{
          status: "", // values => All=""/Susspended=0/Active=1/Pending=2
          type: "", // values => All=""/Business=0/Individual=1
          searchText: "",
        }}
        onSubmit={(values) => {
          //console.log("Filter Value", values)
          applyFilter(values);
        }}
      >
        {({
          values,
          handleSubmit,
          handleBlur,
          handleChange,
          setFieldValue,
        }) => (
          <form onSubmit={handleSubmit} className="form form-label-right">
            <div className="row">
              <div className="col-12 col-md-6">
                <input
                  type="text"
                  className="form-control"
                  name="searchText"
                  placeholder="Search"
                  onBlur={handleBlur}
                  value={values.searchText}
                  onChange={(e) => {
                    setFieldValue("searchText", e.target.value);
                    handleSubmit();
                  }}
                />
                <small className="form-text text-muted">
                  <b>Search</b> in all fields
                </small>
              </div>
              <div className="col-12 col-md-6">
                <DatePicker
                  className="form-control"
                  selected={startDate}
                  onChange={(e) => createPdf(e)}
                  showYearPicker
                  dateFormat="yyyy"
                />
                {/* <select
                  className="form-control"
                  name="status"
                  placeholder="Filter by Status"
                  // TODO: Change this code
                  onChange={(e) => {
                    setFieldValue("status", e.target.value);
                    handleSubmit();
                  }}
                  onBlur={handleBlur}
                  value={values.status}
                >
                  <option value="">All</option>
                  <option value="0">2023</option>
                  <option value="1"></option>
                  <option value="2">Pending</option>
                </select> */}
                <small className="form-text text-muted">
                  {Loading ? <>Creating PDF...</> : <>Select year for report</>}
                </small>
              </div>
            </div>
          </form>
        )}
      </Formik>
    </>
  );
}
