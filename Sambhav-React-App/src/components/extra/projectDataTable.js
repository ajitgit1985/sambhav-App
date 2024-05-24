import React, { useState, useEffect, useRef } from "react";
import { GetAllProjects, GetAllState } from "../api/pragyanAPI";
import Header from "../components/layout/header";
import Footer from "../components/layout/footer";
import axios from "axios";
import { useParams } from "react-router-dom";
import Select from "react-select";
import Back from "../assets/images/back.svg";
import { saveAs } from "file-saver";
import Reset from "../assets/images/reset_icon.svg";
import { useNavigate } from "react-router-dom";

const ProjectDataLog = () => {
  const [data, setData] = useState([]);
  const { projectCode } = useParams();
  const [projectOptions, setProjectOptions] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const selectInputRef = useRef();
  const navigate = useNavigate();
  const [stateOptions, setStateOptions] = useState([]);
  const [selectedState, setSelectedState] = useState(null);
  const [projectStateFilter, setProjectStateFilter] = useState({ show: false });
  const [buttonDisabled, setButtonDisabled] = useState(true);

  useEffect(() => {
    fetchProjects();
    fetchStates();
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
        value: String(project.projectCode), // Ensure projectCode is treated as a string
        label: project.projectName,
      }));
      setProjectOptions(options);

      // Set selectedProject to '0' by default
      const defaultOption = options.find((option) => option.value === "0");
      setSelectedProject(defaultOption);
      console.log("defaultOption", defaultOption);

      // Fetch data for projectCode=0 initially
      fetchData("0");
    } catch (error) {
      console.error("Error fetching sector data:", error);
    }
  };
  //   const fetchProjects = async () => {
  //     try {
  //       const data = await GetAllProjects();
  //       const options = data.map((project) => ({
  //         value: project.projectCode,
  //         label: project.projectName,
  //       }));
  //       setProjectOptions(options);
  //     } catch (error) {
  //       console.error("Error fetching sector data:", error);
  //     }
  //   };

  const handleProjects = (selectedOption) => {
    if (selectedOption) {
      setSelectedProject(selectedOption);
      // Fetch data for the selected project
      fetchData(selectedOption.value);
    }
  };

  const fetchStates = async () => {
    try {
      const data = await GetAllState();
      const options = data.map((state) => ({
        value: state.stateCode,
        label: state.stateName,
      }));
      setStateOptions(options);
    } catch (error) {
      console.error("Error fetching state data:", error);
    }
  };

  const handleStates = (selectedOption) => {
    setSelectedState(selectedOption);
    console.log("selectedOption", selectedOption);
    const filteredData = data.filter((item) => item.selectedOption);
    setData(filteredData);
  };

  const fetchData = async (projectCode) => {
    try {
      const response = await axios.get(
        `http://10.23.124.59:2222/getAllRawDataFromReplica?projectCode=${projectCode}`
      );
      console.log("projectCode", projectCode);
      setData(response.data);
      setProjectStateFilter({ show: true });
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  useEffect(() => {
    if (projectCode) {
      fetchData(projectCode);
    }
  }, [projectCode]);

  const exportToCSV = () => {
    const csvData = convertToCSV(data);
    const blob = new Blob([csvData], { type: "text/csv;charset=utf-8" });
    saveAs(blob, "project_data.csv");
  };

  const convertToCSV = (dataArray) => {
    const header = Object.keys(dataArray[0]).join(",");
    const rows = dataArray.map((obj) => Object.values(obj).join(","));
    return `${header}\n${rows.join("\n")}`;
  };

  const handleClear = () => {
    if (selectInputRef.current && selectInputRef.current.select) {
      selectInputRef.current.select.clearValue();
    }
    fetchData(null);
    navigate(`/projectdataLog`);
  };

  return (
    <div>
      <Header />
      <section className="BI__product__container">
        <div className="dropdown__header CKR_pad">
          <div className="container-fluid mb-2">
            <div className="flex row py-2">
              <div className="d-flex align-items-center justify-start col-md-5 px-1">
                <div className="row w-100">
                  <div className="btnbox px-1">
                    <a href="/dashboard" className="NEbtn back_btn px-2">
                      <img src={Back} alt="reset icon" /> Back
                    </a>
                  </div>
                  <div className="col-7 px-1 select-container">
                    <Select
                      value={selectedProject}
                      placeholder="Select Project"
                      options={projectOptions}
                      onChange={handleProjects}
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

              <div className="d-flex col-md-7 justify-content-end">
                {projectStateFilter.show && (
                  <div className="col-3 px-1 select-container project_state_filter">
                    <Select
                      value={selectedState}
                      placeholder="Select State"
                      options={stateOptions}
                      onChange={handleStates}
                    />
                  </div>
                )}
                <div className="col-5">
                  <input
                    type="search"
                    placeholder="Search..."
                    className="form-control "
                    value=""
                  />
                </div>
                <div className="d-flex px-3">
                  <button
                    className="NEbtn export_btn"
                    onClick={exportToCSV}
                    disabled={buttonDisabled}
                  >
                    Export to CSV
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="dept_color1 dept_container">
          <div className="container-fluid">
            <div className="row">
              <div className="table-responsive">
                <table className="NETable project_data_table table table-bordered table-hover">
                  <thead className="table-light">
                    <tr>
                      <th>Sr. No.</th>
                      <th>State Code</th>
                      <th>State Name</th>
                      <th>Dist Code</th>
                      <th>District Name</th>
                      <th>City Code</th>
                      <th>City Name</th>
                      <th>Village Code</th>
                      <th>Village Name</th>
                      <th>KPI Id</th>
                      <th>Indicator</th>
                      <th>Value</th>
                      <th>Unit</th>
                      <th>Year</th>
                    </tr>
                  </thead>
                  <tbody className="table-group-divider">
                    {data.map((item, index) => (
                      <tr key={index}>
                        {Object.values(item).map((value, i) => (
                          <td key={i}>{value}</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer className="overview_pad prayas__ml_250" />
    </div>
  );
};

export default ProjectDataLog;
