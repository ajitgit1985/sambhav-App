import axios from "axios";

export const GetAllSector = async () => {
  try {
    // const res = await axios.get("http://10.23.124.59:2222/getAllSector?language=en");
    const res = await axios.get("http://10.23.124.59:2222/allSector");
    if (res.status === 200) {
      return res?.data;
    }
  } catch (err) {
    console.log("Error: ", err);
  }
};

export const GetAllMinistry = async () => {
  // Function to get all ministries
  try {
    const res = await axios.get(`http://10.23.124.59:2222/allMinistry`);
    if (res.status === 200) {
      return res?.data;
    }
  } catch (err) {
    console.log("Error: ", err);
  }
};

export const GetMinistryBySectorCode = async (sectorCode) => {
  try {
    const res = await axios.get(
      `http://10.23.124.59:2222/getMinistry?sectorId=${sectorCode}`
    );
    // const res = await axios.get(`http://10.23.124.59:2222/allMinistry?sectorId=${sectorCode}`);
    if (res.status === 200) {
      return res?.data;
    }
  } catch (err) {
    console.log("Failed to fetch ministries by sector code: ", err);
  }
};

export const GetAllDepartment = async () => {
  try {
    const res = await axios.get(`http://10.23.124.59:2222/allDepartment`);
    if (res.status === 200) {
      return res?.data;
    }
  } catch (err) {
    console.log("Error: ", err);
  }
};

export const GetDepartmentByMinCode = async (ministryCode) => {
  try {
    const res = await axios.get(
      `http://10.23.124.59:2222/getDepartment?ministryId=${ministryCode}`
    );
    if (res.status === 200) {
      return res?.data;
    }
  } catch (err) {
    console.log("Error: ", err);
  }
};

export const GetAllState = async () => {
  try {
    const res = await axios.get(`http://10.23.124.59:2222/getAllState`);
    if (res.status === 200) {
      return res?.data;
    }
  } catch (err) {
    console.log("Error: ", err);
  }
};

export const GetAllDistrict = async () => {
  try {
    const res = await axios.get(`http://10.23.124.59:2222/getAllDistrict`);
    if (res.status === 200) {
      return res?.data;
    }
  } catch (err) {
    console.log("Error: ", err);
  }
};

export const GetDistrictByStateCode = async (stateCode) => {
  try {
    const res = await axios.get(
      `http://10.23.124.59:2222/getDistrictByStateCode?stateCode=${stateCode}`
    );
    if (res.status === 200) {
      return res?.data;
    }
  } catch (err) {
    console.log("Error: ", err);
  }
};

export const GetAllProjects = async () => {
  try {
    const res = await axios.get(`http://10.23.124.59:2222/getAllProjects`);
    if (res.status === 200) {
      return res?.data;
    }
  } catch (err) {
    console.log("Error: ", err);
  }
};
export const GetAllYears = async () => {
  try {
    const res = await axios.get(`http://10.23.124.59:2222/getFinancialYears`);
    if (res.status === 200) {
      return res?.data;
    }
  } catch (err) {
    console.log("Error: ", err);
  }
};

export const GetQuarters = async () => {
  try {
    const res = await axios.get(`http://10.23.124.59:2222/getQuarters`);
    if (res.status === 200) {
      return res?.data;
    }
  } catch (err) {
    console.log("Error: ", err);
  }
};

export const GetViewAndDashboadId = async (projectCode) => {
  try {
    // response = {"id":1,"projectCode":1016,"viewName":"pm_awaas_yojana_gramin","dashboardId":"e10cc8ad-eea3-4577-b09d-ac040090ecef","flag":1}
    const res = await axios.get(
      `http://10.23.124.59:2222/getViewAndDashboadId?projectCode=${projectCode}`
    );
    if (res.status === 200) {
      return res?.data;
    }
  } catch (err) {
    console.log("Error: ", err);
  }
};

//  http://10.23.124.59:2222/getAllProjects
//  http://10.23.124.59:2222/getAllRawDataFromReplica?projectCode=1021
// http://10.23.124.59:2222/allSector
// http://10.23.124.59:2222/allMinistry
// http://10.23.124.59:2222/allDepartment
// http://10.23.124.59:2222/getAllState
// http://10.23.124.59:2222/getAllDistrict
