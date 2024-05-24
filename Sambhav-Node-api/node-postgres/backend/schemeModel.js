const Pool = require("pg").Pool;
const pool = new Pool({
  user: "postgres",
  host: "10.23.124.59",
  database: "pragyan_staging",
  password: "Cloud#$1110",
  port: 5432,
});

//get all Schemes data
const getSchemes = async () => {
  try {
    return await new Promise(function (resolve, reject) {
      pool.query(
        "select distinct sec_code, project_code, data_freq, project_full_name, kpi_name_1, kpi_name_2, no_indicator_1_national_level, no_indicator_2_national_level, unit_indicator_1_national_level, unit_indicator_2_national_level, granularity, date_from, date_to, ministry_dgqi, scheme_dgqi, port_mode from vw_pm_dashboard_home_latest_growth order by project_code",
        (error, results) => {
          if (error) {
            reject(error);
          }
          if (results && results.rows) {
            resolve(results.rows);
          } else {
            reject(new Error("No results found"));
          }
        }
      );
    });
  } catch (error_1) {
    console.error(error_1);
    throw new Error("Internal server error");
  }
};

//get all Schemes data by Sector Code
const getSchemesById = async (sectorCode) => {
  try {
    return await new Promise(function (resolve, reject) {
      pool.query(
        `select distinct sec_code, project_code, data_freq, project_full_name, kpi_name_1, kpi_name_2, no_indicator_1_national_level, no_indicator_2_national_level, unit_indicator_1_national_level, 
      unit_indicator_2_national_level, granularity, date_from, date_to, ministry_dgqi, scheme_dgqi from vw_pm_dashboard_home_latest_growth where sec_code='${sectorCode}' order by project_code`,
        (error, results) => {
          if (error) {
            reject(error);
          }
          if (results && results.rows) {
            // console.log(results.rows)
            resolve(results.rows);
          } else {
            reject(new Error("No results found"));
          }
        }
      );
    });
  } catch (error_1) {
    console.error(error_1);
    throw new Error("Internal server error");
  }
};

const getSchemesByMinistry = async (ministryid) => {
  try {
    return await new Promise(function (resolve, reject) {
      pool.query(
        `select distinct sec_code, project_code, data_freq, project_full_name, kpi_name_1, kpi_name_2, no_indicator_1_national_level, no_indicator_2_national_level, 
      unit_indicator_1_national_level, unit_indicator_2_national_level, granularity, date_from, date_to, ministry_dgqi, scheme_dgqi from vw_pm_dashboard_home_latest_growth  
      where ministryid='${ministryid}' order by project_code`,
        (error, results) => {
          if (error) {
            reject(error);
          }
          if (results && results.rows) {
            // console.log(results.rows)
            resolve(results.rows);
          } else {
            reject(new Error("No results found"));
          }
        }
      );
    });
  } catch (error_1) {
    console.error(error_1);
    throw new Error("Internal server error");
  }
};

const getSchemesByDepartment = async (dept_code) => {
  try {
    return await new Promise(function (resolve, reject) {
      pool.query(
        `select distinct sec_code, project_code, data_freq, project_full_name, kpi_name_1, kpi_name_2, no_indicator_1_national_level, no_indicator_2_national_level, 
      unit_indicator_1_national_level, unit_indicator_2_national_level, granularity, date_from, date_to, ministry_dgqi, scheme_dgqi from vw_pm_dashboard_home_latest_growth  
      where dept_code='${dept_code}' order by project_code`,
        (error, results) => {
          if (error) {
            reject(error);
          }
          if (results && results.rows) {
            // console.log(results.rows)
            resolve(results.rows);
          } else {
            reject(new Error("No results found"));
          }
        }
      );
    });
  } catch (error_1) {
    console.error(error_1);
    throw new Error("Internal server error");
  }
};

//get all States data
const getStates = async () => {
  try {
    return await new Promise(function (resolve, reject) {
      pool.query(
        "SELECT DISTINCT state_name, state_code FROM public.m_lgd_master WHERE level='State' ORDER BY state_name",
        (error, results) => {
          if (error) {
            reject(error);
          }
          if (results && results.rows) {
            resolve(results.rows);
          } else {
            reject(new Error("No results found"));
          }
        }
      );
    });
  } catch (error_1) {
    console.error(error_1);
    throw new Error("Internal server error");
  }
};

//get all Schemes by state_code
const getSchemesByStateId = async (state_code) => {
  try {
    // console.log(state_code);
    return await new Promise(function (resolve, reject) {
      pool.query(
        `select distinct state_code, sec_code, project_code, data_freq, project_full_name, kpi_name_1, kpi_name_2, no_indicator_1_state_level, 
        no_indicator_2_state_level, unit_indicator_1_state_level, unit_indicator_2_state_level, granularity, date_from, date_to, 
        ministry_dgqi, scheme_dgqi from vw_pm_dashboard_home_latest_growth where state_code='${state_code}' order by project_code`,
        (error, results) => {
          if (error) {
            reject(error);
          }
          if (results && results.rows) {
            resolve(results.rows);
          } else {
            reject(new Error("No results found"));
          }
        }
      );
    });
  } catch (error_1) {
    console.error(error_1);
    throw new Error("Internal server error");
  }
};

//get Schemes by Districts    http://localhost:3001/district?dist_code=241
const getSchemesByDistricts = async (dist_code) => {
  try {
    return await new Promise(function (resolve, reject) {
      pool.query(
        `select distinct sec_code, state_code, project_code, data_freq, project_full_name, kpi_name_1, kpi_name_2, no_indicator_1_district_level, no_indicator_2_district_level, 
        unit_indicator_1_district_level, unit_indicator_2_district_level, granularity, date_from, date_to, ministry_dgqi, scheme_dgqi from vw_pm_dashboard_home_latest_growth  
        where dist_code='${dist_code}'`,
        (error, results) => {
          if (error) {
            reject(error);
          }
          if (results && results.rows) {
            resolve(results.rows);
          } else {
            reject(new Error("No results found"));
          }
        }
      );
    });
  } catch (error_1) {
    console.error(error_1);
    throw new Error("Internal server error");
  }
};

//get all Schemes by sectorCode and state_code
// http://localhost:3001/states?state_code=15&sectorCode=11
const getSchemesByStateIdAndSector = async (state_code, sectorCode) => {
  try {
    return await new Promise(function (resolve, reject) {
      pool.query(
        `select distinct state_code, sec_code, project_code, data_freq, project_full_name, kpi_name_1, kpi_name_2, no_indicator_1_state_level, 
      no_indicator_2_state_level, unit_indicator_1_state_level, unit_indicator_2_state_level, granularity, date_from, date_to, ministry_dgqi, 
        scheme_dgqi from vw_pm_dashboard_home_latest_growth where state_code='${state_code}' and sec_code='${sectorCode}' order by project_code`,
        (error, results) => {
          if (error) {
            reject(error);
          }
          if (results && results.rows) {
            resolve(results.rows);
          } else {
            reject(new Error("No results found"));
          }
        }
      );
    });
  } catch (error_1) {
    console.error(error_1);
    throw new Error("Internal server error");
  }
};

//get all Schemes by sectorCode and state_code
// http://10.25.53.135:3001/states?state_code=12&dist_code=677
const getSchemesByStateIdAndDistrict = async (state_code, dist_code) => {
  try {
    return await new Promise(function (resolve, reject) {
      pool.query(
        `select distinct state_code, dist_code, sec_code, project_code, data_freq, project_full_name, kpi_name_1, kpi_name_2, no_indicator_1_district_level, 
      no_indicator_2_district_level, unit_indicator_1_district_level, unit_indicator_2_district_level, granularity, date_from, date_to, ministry_dgqi, 
        scheme_dgqi from vw_pm_dashboard_home_latest_growth where state_code='${state_code}' and dist_code='${dist_code}' order by project_code`,
        (error, results) => {
          if (error) {
            reject(error);
          }
          if (results && results.rows) {
            resolve(results.rows);
          } else {
            reject(new Error("No results found"));
          }
        }
      );
    });
  } catch (error_1) {
    console.error(error_1);
    throw new Error("Internal server error");
  }
};

//get all Schemes by state_code and ministry
// http://10.25.53.135:3001/ministries?ministryid=7&state_code=18
const getSchemesByMinistryAndState = async (ministryid, state_code) => {
  try {
    return await new Promise(function (resolve, reject) {
      pool.query(
        `select distinct state_code, ministryid, sec_code, project_code, data_freq, project_full_name, kpi_name_1, kpi_name_2, no_indicator_1_state_level, 
        no_indicator_2_state_level, unit_indicator_1_state_level, unit_indicator_2_state_level, granularity, date_from, date_to, ministry_dgqi, 
        scheme_dgqi from vw_pm_dashboard_home_latest_growth where ministryid='${ministryid}' and state_code='${state_code}' order by project_code`,
        (error, results) => {
          if (error) {
            reject(error);
          }
          if (results && results.rows) {
            resolve(results.rows);
          } else {
            reject(new Error("No results found"));
          }
        }
      );
    });
  } catch (error_1) {
    console.error(error_1);
    throw new Error("Internal server error");
  }
};

//get all Schemes by Department & state_code
// //   http://localhost:3001/dept?dept_code=11&state_code=17
const getSchemesByDepartmentAndState = async (dept_code, state_code) => {
  try {
    return await new Promise(function (resolve, reject) {
      pool.query(
        `select distinct state_code, dept_code, sec_code, project_code, data_freq, project_full_name, kpi_name_1, kpi_name_2, no_indicator_1_state_level, 
        no_indicator_2_state_level, unit_indicator_1_state_level, unit_indicator_2_state_level, granularity, date_from, date_to, ministry_dgqi, 
        scheme_dgqi from vw_pm_dashboard_home_latest_growth where dept_code='${dept_code}' and state_code='${state_code}' order by project_code`,
        (error, results) => {
          if (error) {
            reject(error);
          }
          if (results && results.rows) {
            resolve(results.rows);
          } else {
            reject(new Error("No results found"));
          }
        }
      );
    });
  } catch (error_1) {
    console.error(error_1);
    throw new Error("Internal server error");
  }
};

//get all Schemes by Sector And Ministry
// http://localhost:3001/ministries?ministryid=37&sectorCode=11
const getSchemesBySectorAndMinistry = async (sectorCode, ministryid) => {
  try {
    return await new Promise(function (resolve, reject) {
      pool.query(
        `select distinct sec_code, project_code, data_freq, project_full_name, kpi_name_1, kpi_name_2, no_indicator_1_national_level, no_indicator_2_national_level, 
      unit_indicator_1_national_level, unit_indicator_2_national_level, granularity, date_from, date_to, ministry_dgqi, scheme_dgqi from vw_pm_dashboard_home_latest_growth 
      where sec_code='${sectorCode}' and ministryid='${ministryid}' order by project_code`,
        (error, results) => {
          if (error) {
            reject(error);
          }
          if (results && results.rows) {
            resolve(results.rows);
          } else {
            reject(new Error("No results found"));
          }
        }
      );
    });
  } catch (error_1) {
    console.error(error_1);
    throw new Error("Internal server error");
  }
};

//get all Schemes by Sector And Department
// http://localhost:3001/dept?dept_code=66&sectorCode=24
const getSchemesBySectorAndDepartment = async (sectorCode, dept_code) => {
  try {
    return await new Promise(function (resolve, reject) {
      pool.query(
        `select distinct sec_code, project_code, data_freq, project_full_name, kpi_name_1, kpi_name_2, no_indicator_1_national_level, no_indicator_2_national_level, 
      unit_indicator_1_national_level, unit_indicator_2_national_level, granularity, date_from, date_to, ministry_dgqi, scheme_dgqi from vw_pm_dashboard_home_latest_growth 
      where sec_code='${sectorCode}' and dept_code='${dept_code}' order by project_code`,
        (error, results) => {
          if (error) {
            reject(error);
          }
          if (results && results.rows) {
            resolve(results.rows);
          } else {
            reject(new Error("No results found"));
          }
        }
      );
    });
  } catch (error_1) {
    console.error(error_1);
    throw new Error("Internal server error");
  }
};

//get all Schemes by Sector And District
// http://localhost:3001/district?dist_code=616&sectorCode=7
const getSchemesBySectorAndDistrict = async (sectorCode, dist_code) => {
  try {
    return await new Promise(function (resolve, reject) {
      pool.query(
        `select distinct sec_code, dist_code, project_code, data_freq, project_full_name, kpi_name_1, kpi_name_2, no_indicator_1_district_level, 
        no_indicator_2_district_level, unit_indicator_1_district_level, unit_indicator_2_district_level, granularity, date_from, date_to, ministry_dgqi, 
        scheme_dgqi from vw_pm_dashboard_home_latest_growth where sec_code='${sectorCode}' and dist_code='${dist_code}' order by project_code`,
        (error, results) => {
          if (error) {
            reject(error);
          }
          if (results && results.rows) {
            resolve(results.rows);
          } else {
            reject(new Error("No results found"));
          }
        }
      );
    });
  } catch (error_1) {
    console.error(error_1);
    throw new Error("Internal server error");
  }
};

//get all Schemes by ministry and Department
// http://10.25.53.135:3001/dept?dept_code=8&ministryid=7
const getSchemesByMinistryAndDepartment = async (dept_code, ministryid) => {
  try {
    return await new Promise(function (resolve, reject) {
      pool.query(
        `select distinct sec_code, ministryid, dept_code, project_code, data_freq, project_full_name, kpi_name_1, kpi_name_2, no_indicator_1_national_level, 
      no_indicator_2_national_level, unit_indicator_1_national_level, unit_indicator_2_national_level, granularity, date_from, date_to, ministry_dgqi, scheme_dgqi from 
      vw_pm_dashboard_home_latest_growth where dept_code='${dept_code}' and ministryid='${ministryid}' order by project_code`,
        (error, results) => {
          if (error) {
            reject(error);
          }
          if (results && results.rows) {
            resolve(results.rows);
          } else {
            reject(new Error("No results found"));
          }
        }
      );
    });
  } catch (error_1) {
    console.error(error_1);
    throw new Error("Internal server error");
  }
};

//get all Schemes by APIMode
//  http://localhost:3001/mode?port_mode=1
const getSchemesByAPIMode = async (port_mode) => {
  try {
    return await new Promise(function (resolve, reject) {
      pool.query(
        `select distinct sec_code, project_code, data_freq, project_full_name, kpi_name_1, kpi_name_2, no_indicator_1_national_level, 
        no_indicator_2_national_level, unit_indicator_1_national_level, unit_indicator_2_national_level, granularity, date_from, date_to, 
        ministry_dgqi, scheme_dgqi, port_mode from vw_pm_dashboard_home_latest_growth where port_mode='${port_mode}' and kpi_name_1  is not null order by
        project_code`,
        (error, results) => {
          if (error) {
            reject(error);
          }
          if (results && results.rows) {
            resolve(results.rows);
          } else {
            reject(new Error("No results found"));
          }
        }
      );
    });
  } catch (error_1) {
    console.error(error_1);
    throw new Error("Internal server error");
  }
};

//get all Report Data
const getAllRawDataFromReplica = async () => {
  try {
    return await new Promise(function (resolve, reject) {
      pool.query(`select * from public.mid_day_mea`, (error, results) => {
        if (error) {
          reject(error);
        }
        if (results && results.rows) {
          resolve(results.rows);
        } else {
          reject(new Error("No results found"));
        }
      });
    });
  } catch (error_1) {
    console.error(error_1);
    throw new Error("Internal server error");
  }
};

//get all Report Data by Project Code
// http://localhost:3001/rawData?project_code=1034
const getAllRawDataByProject = async (project_code) => {
  try {
    return await new Promise(function (resolve, reject) {
      pool.query(
        `select * from public.mid_day_mea where project_code='${project_code}'`,
        (error, results) => {
          if (error) {
            reject(error);
          }
          if (results && results.rows) {
            resolve(results.rows);
          } else {
            reject(new Error("No results found"));
          }
        }
      );
    });
  } catch (error_1) {
    console.error(error_1);
    throw new Error("Internal server error");
  }
};

module.exports = {
  getSchemes,
  getSchemesById,
  getSchemesByStateId,
  getSchemesByMinistry,
  getSchemesByDepartment,
  getStates,
  getSchemesByDistricts,
  getSchemesByStateIdAndSector,
  getSchemesByStateIdAndDistrict,
  getSchemesByMinistryAndState,
  getSchemesByDepartmentAndState,
  getSchemesBySectorAndMinistry,
  getSchemesBySectorAndDistrict,
  getSchemesBySectorAndDepartment,
  getSchemesByMinistryAndDepartment,
  getSchemesByAPIMode,
  getAllRawDataFromReplica,
  getAllRawDataByProject,
};
