import React, { useState, useEffect, useRef } from "react";
import { GetAllProjects, GetQuarters } from "../api/pragyanAPI";
import Header from "../components/layout/header";
import Footer from "../components/layout/footer";
import { useParams } from "react-router-dom";
import Select from "react-select";
import Back from "../assets/images/back.svg";
import Reset from "../assets/images/reset_icon.svg";
import Close from "../assets/images/close-ic.svg";
import { useNavigate } from "react-router-dom";
import { useTable, usePagination } from "react-table";
import ReactModal from "react-modal";
import ExcelJS from "exceljs";
// const ExcelJS = require("exceljs");
import { saveAs } from "file-saver";

function DataTable({ columns, filteredData }) {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    nextPage,
    previousPage,
    canPreviousPage,
    canNextPage,
    pageOptions,
    state: { pageIndex },
    gotoPage, // Add gotoPage
  } = useTable(
    {
      columns,
      data: filteredData,
      initialState: { pageIndex: 0, pageSize: 20 },
    },
    usePagination
  );

  const handlePageChange = (pageIndex) => {
    if (pageIndex >= 0 && pageIndex < pageOptions.length) {
      gotoPage(pageIndex);
    }
  };

  const pageRange = (pageIndex, pageCount) => {
    const start = Math.max(0, pageIndex - 4); // Adjust as needed
    const end = Math.min(start + 9, pageCount - 1); // Display 10 pages
    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  };

  return (
    <>
      <div className="table-responsive">
        <table
          {...getTableProps()}
          className="NETable project_data_table table table-bordered table-hover"
        >
          <thead className="table-light">
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th {...column.getHeaderProps()}>
                    {column.render("Header")}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()} className="table-group-divider">
            {page.map((row) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map((cell) => {
                    return (
                      <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="pagination">
        <button onClick={() => previousPage()} disabled={!canPreviousPage}>
          Previous
        </button>{" "}
        {pageRange(pageIndex, pageOptions.length).map((index) => (
          <button
            className="innerPgItem"
            key={index}
            onClick={() => handlePageChange(index)}
            style={{
              fontWeight: pageIndex === index ? "bold" : "normal",
              backgroundColor: pageIndex === index ? "#085dad" : "#fff",
              color: pageIndex === index ? "#fff" : "#000",
            }}
          >
            {index + 1}
          </button>
        ))}
        <button onClick={() => nextPage()} disabled={!canNextPage}>
          Next
        </button>{" "}
      </div>
    </>
  );
}

const DefaultColumns = [
  { Header: "Sr. No.", accessor: "sn" },
  { Header: "Project Name", accessor: "project_code" },
  { Header: "State Name", accessor: "state_name" },
  { Header: "District Name", accessor: "district_name" },
  { Header: "City Name", accessor: "city_name" },
  { Header: "Village Name", accessor: "village_name" },
  {
    Header: "% of days mid-day meal served against total working days on Gov",
    accessor: "% of days mid-day meal served against total working days on Gov",
  },
  {
    Header: "% of school children at primary level taking mid-day meal again",
    accessor: "% of school children at primary level taking mid-day meal again",
  },
  { Header: "Quarter", accessor: "quarter_year" },
];

const AllColumns = [
  { Header: "Sr. No.", accessor: "sn" },
  { Header: "Project Name", accessor: "project_code" },
  { Header: "State Name", accessor: "state_name" },
  { Header: "state Code", accessor: "state_code" },
  { Header: "District Name", accessor: "district_name" },
  { Header: "District Code", accessor: "dist_code" },
  { Header: "City Name", accessor: "city_name" },
  { Header: "city Code", accessor: "city_code" },
  { Header: "Village Name", accessor: "village_name" },
  { Header: "village Code", accessor: "village_code" },
  {
    Header: "% of days mid-day meal served against total working days on Gov",
    accessor: "% of days mid-day meal served against total working days on Gov",
  },
  {
    Header: "% of school children at primary level taking mid-day meal again",
    accessor: "% of school children at primary level taking mid-day meal again",
  },
  { Header: "Quarter", accessor: "quarter_year" },
];

const ProjectDataLog = () => {
  const [data, setData] = useState([]);
  const { projectCode } = useParams();
  const [projectOptions, setProjectOptions] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const selectInputRef = useRef();
  const navigate = useNavigate();
  const [quarterOptions, setQuarterOptions] = useState([]);
  const [selectedQuarter, setSelectedQuarter] = useState(null);
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [filteredData, setFilteredData] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedColumns, setSelectedColumns] = useState(DefaultColumns);

  useEffect(() => {
    fetchProjects();
    fetchQuarters();
  }, []);

  useEffect(() => {
    if (data.length > 0) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [data]);

  const fetchProjects = async () => {
    try {
      const data = await GetAllProjects();
      const options = data.map((project) => ({
        value: String(project.projectCode),
        label: project.projectName,
      }));
      setProjectOptions(options);

      // const defaultOption = options.find((option) => option.value === "1034");
      // setSelectedProject(defaultOption);

      // fetchData("1034");
    } catch (error) {
      console.error("Error fetching sector data:", error);
    }
  };

  const handleProjects = (selectedOption) => {
    if (selectedOption) {
      setSelectedProject(selectedOption);
      fetchData(selectedOption.value);
    }
  };

  const fetchQuarters = async () => {
    try {
      const data = await GetQuarters();
      const options = data.map((quarter) => ({
        value: "Q" + quarter.quarterCode,
        label: "Q" + quarter.quarterValue,
      }));
      setQuarterOptions(options);
    } catch (error) {
      console.error("Error fetching state data:", error);
    }
  };

  const handleQuarters = (selectedOption) => {
    setSelectedQuarter(selectedOption);
    console.log("quarter_year", selectedOption);
    const filteredData2 = data.filter((item) =>
      item.quarter_year.startsWith(selectedOption.label)
    );
    setFilteredData(filteredData2);
  };

  useEffect(() => {
    if (projectCode) {
      return fetchData(projectCode);
    }
  }, [projectCode]);

  const fetchData = async (projectCode) => {
    try {
      let apiUrl = `http://10.25.53.135:3001/rawData`;
      if (projectCode) {
        apiUrl += `?project_code=${projectCode}`;
        console.log("project Code", projectCode);
      }
      const response = await fetch(apiUrl);
      const data = await response.json();

      if (!Array.isArray(data)) {
        throw new Error("Data is not an array");
      }

      const dataWithSerialNumber = data.map((item, index) => ({
        ...item,
        sn: index + 1,
      }));

      setData(dataWithSerialNumber);
      setFilteredData(dataWithSerialNumber);
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  const exportToCsv = async () => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Sheet 1");

    worksheet.properties.defaultRowHeight = 20;

    const columns = selectedColumns.map((col) => {
      let width;
      switch (col.accessor) {
        case "sn":
          width = 10;
          break;
        case "project_code":
          width = 30;
          break;
        case "state_name":
          width = 20;
          break;
        case "state_code":
          width = 10;
          break;
        case "district_name":
          width = 20;
          break;
        case "dist_code":
          width = 10;
          break;
        case "city_name":
          width = 20;
          break;
        case "city_code":
          width = 10;
          break;
        case "village_name":
          width = 20;
          break;
        case "village_code":
          width = 15;
          break;
        case "% of days mid-day meal served against total working days on Gov":
          width = 40;
          break;
        case "% of school children at primary level taking mid-day meal again":
          width = 40;
          break;
        case "quarter_year":
          width = 20;
          break;
        default:
          width = 20;
      }

      return { header: col.Header, key: col.accessor, width };
    });

    worksheet.columns = columns;

    const headerRow = worksheet.getRow(1);
    headerRow.height = 35;

    worksheet.getRow(1).fill = {
      type: "pattern",
      pattern: "darkVertical",
      fgColor: { argb: "e6ecff" },
    };

    worksheet.getRow(1).font = {
      size: 14,
      bold: true,
      lineHeight: 1,
    };

    worksheet.getRow(1).alignment = {
      vertical: "middle",
      wrapText: true,
    };

    worksheet.eachRow({ includeEmpty: true }, (row, rowNumber) => {
      row.eachCell({ includeEmpty: true }, (cell, colNumber) => {
        cell.alignment = { wrapText: true };
      });
    });

    const rows = filteredData.map((product, index) => {
      const row = {
        sn: index + 1,
        project_code: product.project_code,
        state_name: product.state_name,
        district_name: product.district_name,
        city_name: product.city_name,
        village_name: product.village_name,
        quarter_year: product.quarter_year,
      };

      if (selectedColumns.some((col) => col.accessor === "state_code")) {
        row.state_code = product.state_code;
      }

      if (selectedColumns.some((col) => col.accessor === "dist_code")) {
        row.dist_code = product.dist_code;
      }

      if (selectedColumns.some((col) => col.accessor === "city_code")) {
        row.city_code = product.city_code;
      }

      if (selectedColumns.some((col) => col.accessor === "village_code")) {
        row.village_code = product.village_code;
      }

      if (
        selectedColumns.some(
          (col) =>
            col.accessor ===
            "% of days mid-day meal served against total working days on Gov"
        )
      ) {
        row["% of days mid-day meal served against total working days on Gov"] =
          product[
            "% of days mid-day meal served against total working days on Gov"
          ];
      }

      if (
        selectedColumns.some(
          (col) =>
            col.accessor ===
            "% of school children at primary level taking mid-day meal again"
        )
      ) {
        row["% of school children at primary level taking mid-day meal again"] =
          product[
            "% of school children at primary level taking mid-day meal again"
          ];
      }

      return row;
    });

    worksheet.addRows(rows);

    worksheet.eachRow((row, rowNumber) => {
      row.eachCell((cell) => {
        if (rowNumber % 2 === 0) {
          cell.fill = {
            type: "pattern",
            pattern: "solid",
            fgColor: { argb: "e1e1e1" },
          };
        }
      });
    });

    worksheet.eachRow((cell) => {
      cell.border = {
        top: { style: "thin", color: { argb: "c8c8c8" } },
        left: { style: "thin", color: { argb: "c8c8c8" } },
        bottom: { style: "thin", color: { argb: "c8c8c8" } },
        right: { style: "thin", color: { argb: "c8c8c8" } },
      };
    });

    const buffer = await workbook.xlsx.writeBuffer();
    const blob = new Blob([buffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
    saveAs(blob, "export.xlsx");

    // const buffer = await workbook.csv.writeBuffer();
    // const blob = new Blob([buffer], { type: "application/octet-stream" });
    // const url = URL.createObjectURL(blob);
    // const a = document.createElement("a");
    // a.href = url;
    // a.download = "data.csv";
    // document.body.appendChild(a);
    // a.click();
    // document.body.removeChild(a);
  };

  const handleClear = () => {
    if (selectInputRef.current && selectInputRef.current.select) {
      selectInputRef.current.select.clearValue();
    }
    fetchData("0");
    setSelectedProject(null);
    setSelectedQuarter(null);
    navigate(`/projectdataLog`);
  };

  const handleRadioChange = (e) => {
    const { value } = e.target;
    if (value === "withLGD") {
      setSelectedColumns(AllColumns);
    } else {
      setSelectedColumns(DefaultColumns);
    }
  };

  const resetModalState = () => {
    setIsOpen(false);
    setSelectedColumns(DefaultColumns);
  };

  return (
    <div>
      <Header />
      <section className="BI__product__container">
        <div className="dropdown__header CKR_pad">
          <div className="container-fluid mb-2">
            <div className="flex row py-2">
              <div className="d-flex align-items-center justify-start col-md-10 px-1">
                <div className="row w-100">
                  <div className="btnbox px-1">
                    <a href="/dashboard" className="NEbtn back_btn">
                      <img src={Back} alt="reset icon" /> Back
                    </a>
                  </div>
                  <div className="col-4 px-1 select-container">
                    <Select
                      value={selectedProject}
                      placeholder="Select Project"
                      options={projectOptions}
                      onChange={handleProjects}
                    />
                  </div>
                  <div
                    className="col-2 px-1 select-container"
                    style={{ width: "170px" }}
                  >
                    <Select
                      options={quarterOptions}
                      onChange={handleQuarters}
                      value={selectedQuarter}
                      placeholder="Select Quarter"
                    />
                  </div>
                  <div className="box_reset px-1">
                    <button
                      className="NEbtn reset_btn px-2"
                      onClick={() => handleClear("")}
                      title="Reset Filter"
                    >
                      <img src={Reset} alt="reset icon" />
                    </button>
                  </div>
                </div>
              </div>
              <div className="d-flex col-md-2 justify-content-end">
                {/* <div className="col-5">
                  <input
                    type="search"
                    placeholder="Search..."
                    className="form-control "
                    value=""
                  />
                </div> */}
                <div className="d-flex px-3">
                  <button
                    onClick={() => setIsOpen(true)}
                    className="NEbtn export_btn"
                    disabled={buttonDisabled}
                  >
                    Export Data
                  </button>
                  <ReactModal
                    className="reportModal"
                    isOpen={isOpen}
                    onRequestClose={resetModalState}
                    contentLabel="Example Modal"
                    style={{
                      content: {
                        backgroundColor: "white",
                        width: "470px",
                        height: "235px",
                        border: "1px solid #ccc",
                        padding: "20px",
                      },
                      overlay: {
                        backgroundColor: "rgba(0, 0, 0, 0.75)",
                      },
                    }}
                  >
                    <div className="modalContent">
                      <button
                        onClick={resetModalState}
                        className="NEbtn close_btn"
                      >
                        <img
                          src={Close}
                          alt="Close icon"
                          style={{ height: "15px" }}
                        />
                      </button>
                      <div>
                        <div>
                          <h5
                            style={{
                              borderBottom: "1px solid #ccc",
                              paddingBottom: "5px",
                            }}
                          >
                            Export data
                          </h5>
                        </div>
                        <div className="ml-3">
                          <div className="form-check">
                            <label>
                              <input
                                className="form-check-input"
                                type="radio"
                                name="addColumns"
                                value="withLGD"
                                onChange={handleRadioChange}
                              />
                              With LGD Codes
                            </label>
                          </div>
                          <div className="form-check">
                            <input
                              className="form-check-input"
                              type="radio"
                              name="addColumns"
                              value="withoutLGD"
                              defaultChecked
                              onChange={handleRadioChange}
                            />
                            <label className="form-check-label">
                              Without LGD Codes
                            </label>
                          </div>
                        </div>
                        <div className="mdNBtnBox">
                          <button
                            className="NEbtn submit_btn"
                            onClick={exportToCsv}
                          >
                            Export
                          </button>
                        </div>
                      </div>
                    </div>
                  </ReactModal>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="dept_color1 dept_container">
          <div className="container-fluid">
            <div className="row">
              {filteredData && filteredData.length > 0 ? (
                <DataTable
                  columns={selectedColumns}
                  filteredData={filteredData}
                />
              ) : (
                <div
                  style={{
                    textAlign: "center",
                    fontSize: "17px",
                    color: "#5c5b5b",
                    fontWeight: "500",
                  }}
                >
                  <p>"No Data, Please select Project"</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
      <Footer className="overview_pad prayas__ml_250" />
    </div>
  );
};

export default ProjectDataLog;
