import React, { useState, useEffect, useRef } from 'react';
import Select from 'react-select';
import { GetAllSector, GetAllMinistry, GetMinistryBySectorCode, GetAllDepartment, GetDepartmentByMinCode, GetAllState, GetAllDistrict, GetDistrictByStateCode } from '../../api/pragyanAPI';
import Reset from "../../assets/images/reset_icon.svg";
import { useNavigate } from "react-router-dom";

const Filters = () => {
  const navigate = useNavigate();
  const [sectorOptions, setSectorOptions] = useState([]);
  const [ministryOptions, setMinistryOptions] = useState([]);
  const [departmentOptions, setDepartmentOptions] = useState([]);
  const [stateOptions, setStateOptions] = useState([]);
  const [districtOptions, setDistrictOptions] = useState([]);

  const [selectedSector, setSelectedSector] = useState();
  const [selectedMinistry, setSelectedMinistry] = useState();
  const [selectedDepartment, setSelectedDepartment] = useState();
  const [selectedState, setSelectedState] = useState(); // Assuming you have state for selected state
  const [selectedDistrict, setSelectedDistrict] = useState(null);
  const selectInputRef = useRef();

  useEffect(() => {
    const fetchSectors = async () => {
      try {
        const data = await GetAllSector();
        const options = data.map(sector => ({
          value: sector.sectorCode,
          label: sector.sectorName
        }));
        setSectorOptions(options);
      } catch (error) {
        console.error('Error fetching sector data:', error);
      }
    };

    fetchSectors();
    fetchMinistries();
    fetchDepartments();

    const fetchStates = async () => {
      try {
        const data = await GetAllState();
        const options = data.map(state => ({
          value: state.stateCode,
          label: state.stateName
        }));
        setStateOptions(options);
      } catch (error) {
        console.error('Error fetching state data:', error);
      }
    };

    fetchStates();
    fetchDistricts();
  }, []);

  const handleSectors = (selectedOption) => {
    setSelectedSector(selectedOption.label);
    fetchMinistries(selectedOption.value);
    setSelectedDistrict(null);
    setSelectedDepartment(null);
    navigate(`/dashboard/${selectedOption.value}`);
  };

  // useEffect(() => {
    
  // }, []);

  const handleStateChange = (stselectedOption) => {
    setSelectedState(stselectedOption.label);
    setSelectedDistrict(null);
    if (stselectedOption) {
      fetchDistricts(stselectedOption.value);
    }
    // if (selectedState) {
    //   navigate(`/dashboard/`);
    // } else {
      navigate(`/dashboard/${stselectedOption.value}`);
    // }
  };

  const fetchDistricts = async (stateCode) => {
    try {
      let data;
      if (stateCode) {
        data = await GetDistrictByStateCode(stateCode);
      } else {
        data = await GetAllDistrict();
      }
      const options = data.map(district => ({
        value: district.distCode,
        label: district.distName
      }));
      setDistrictOptions(options);
    } catch (error) {
      console.error('Error fetching district data:', error);
    }
  };

  const selectDistrict = (opt) => {
    setSelectedDistrict(opt.label);
  };

  const fetchMinistries = async (sectorCode) => {
    try {
      let data;
      if (sectorCode) {
        data = await GetMinistryBySectorCode(sectorCode);
        console.log("GetMinistryBySectorCode", data)
      } else {
        data = await GetAllMinistry();
      }
      const options = data.map(ministry => ({
        value: ministry.ministryCode,
        label: ministry.ministryName
      }));
      setMinistryOptions(options);
    } catch (error) {
      console.error('Error fetching ministry data:', error);
    }
  };

  const selectMinistry = (opt) => {
    setSelectedMinistry(opt.label);
    fetchDepartments(opt.value);
  };

  const fetchDepartments = async (ministryCode) => {
    try {
      let data;
      if (ministryCode) {
        data = await GetDepartmentByMinCode(ministryCode);
        // console.log("GetDepartmentByMinCode", data)
      } else {
        data = await GetAllDepartment();
      }
      // const data = await GetAllDepartment(ministryCode);
      const options = data.map(department => ({
        value: department.departmenCode,
        label: department.departmentName
      }));
      setDepartmentOptions(options);
    } catch (error) {
      console.error('Error fetching ministry data:', error);
    }
  };

  const selectDepartment = (opt) => {
    setSelectedDepartment(opt.label);
  };

  const handleClear = () => {
    if (selectInputRef.current && selectInputRef.current.select) {
      selectInputRef.current.select.clearValue();
    }
    setSelectedMinistry(null);
    // setSelectedDepartment(null);
    setSelectedSector(null);
    setSelectedState(null);
    setSelectedDistrict(null);
    // fetchMinistries(null);
    navigate(`/dashboard`);
  };

  return (
    <>
      <div className="dropdown__header CKR_pad">
        <div className="container-fluid mb-2">
          <div className="flex row CKR_pad">
            <div className="d-flex align-items-center justify-start py-1 px-3 col-lg-9 col-md-9">
              <div className="row w-100">
                <div className="col px-1 select-container">
                  <Select ref={selectInputRef}
                    value={{
                      label: selectedSector ? selectedSector : "Select Sector",
                    }}
                    placeholder="Select Sector"
                    options={sectorOptions}
                    onChange={handleSectors}
                  />
                </div>
                <div className="col px-1 select-container">
                  <Select
                    value={{
                      label: selectedMinistry ? selectedMinistry : "Select Ministry",
                    }}
                    placeholder="Select Ministry"
                    options={ministryOptions}
                    onChange={(opt) => selectMinistry(opt)}
                  />
                </div>
                <div className="col px-1 select-container">
                  <Select
                    value={{
                      label: selectedDepartment ? selectedDepartment : "Select Department",
                    }}
                    placeholder="Select Department"
                    options={departmentOptions}
                    onChange={(opt) => selectDepartment(opt)}
                  />
                </div>
                <div className="col px-1 select-container">
                  <Select ref={selectInputRef}
                    // value={selectedState}
                    value={{
                      label: selectedState ? selectedState : "Select State",
                    }}
                    placeholder="Select State"
                    options={stateOptions}
                    onChange={(opt) => handleStateChange(opt)}
                  />
                </div>
                <div className="col px-1 select-container">
                  <Select ref={selectInputRef}
                    // value={selectedDistrict}
                    value={{
                      label: selectedDistrict ? selectedDistrict : "Select District",
                    }}
                    placeholder="Select District"
                    options={districtOptions}
                    onChange={(opt) => selectDistrict(opt)}
                  />
                </div>
                {/* <div className="box_submit px-1">
                  <button type="button" className="CKR__view__btn" title="Submit" disabled>
                    Submit
                  </button>
                </div> */}
                <div className="box_reset px-1">
                  <button className="reset_btn px-2" onClick={() => handleClear("")} title="Reset Filter">
                    <img src={Reset} alt="reset icon" />
                  </button>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-3">
              <div className="w-full justify-end py-2 row">
                <input
                  type="search"
                  placeholder="Search..."
                  className="form-control "
                  value="" />
              </div>
            </div>
          </div>
        </div>

      </div>
    </>
  );
};

export default Filters;
