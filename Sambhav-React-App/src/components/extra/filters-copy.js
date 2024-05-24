import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import { GetAllSector, GetMinistry, GetDepartment } from '../../api/pragyanAPI'; 
import Reset from "../../assets/images/reset_icon.svg";
import { useNavigate } from "react-router-dom";

const Filters = () => {
  const navigate = useNavigate();
  const [sectorOptions, setSectorOptions] = useState([]);
  const [ministryOptions, setMinistryOptions] = useState([]);
  const [departmentOptions, setDepartmentOptions] = useState([]);
  const [states, setStates] = useState([]);
  const [districts, setDistricts] = useState([]);

  const [selectedSector, setSelectedSector] = useState();
  const [selectedMinistry, setSelectedMinistry] = useState();
  const [selectedDepartment, setSelectedDepartment] = useState();
  const [selectedState, setSelectedState] = useState(null); // Assuming you have state for selected state
  const [selectedDistrict, setSelectedDistrict] = useState(null);
  // const [selectedSectorCode, setSelectedSectorCode] = useState(null);
  // const [sectorData, setSectorData] = useState(null);

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
  }, []);

  // const fetchSectorsById = async (sectorCode) => {
  //   try {
  //     const response = await fetch(`http://localhost:3001?sectorCode=${sectorCode}`);
  //     console.log(response);
  //     if (response.ok) {
  //       const data = await response.json();
  //       setSectorData(data);
  //     } else {
  //       console.error('Failed to fetch sector:', response.statusText);
  //     }
  //   } catch (error) {
  //     console.error('Error fetching sector:', error);
  //   }
  // };

  // useEffect(() => {
  //   if (selectedSectorCode) {
  //     fetchSectorsById(selectedSectorCode);
  //   }
  // }, [selectedSectorCode]);

  const handleSectors = (selectedOption) => {
    setSelectedSector(selectedOption.label);
    // setSelectedSectorCode(selectedOption.value);
    // fetchSectorsById(selectedOption.value); 
    fetchMinistries(selectedOption.value);
    // fetchData(selectedOption.value);
    navigate(`/dashboard/${selectedOption.value}`);
  };

  useEffect(() => {
    const fetchStates = async () => {
      try {
        const response = await fetch('http://localhost:3001/states');
        if (response.ok) {
          const data = await response.json();
          setStates(data);
        } else {
          console.error('Failed to fetch states:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching states:', error);
      }
    };

    fetchStates();
  }, []);

  const fetchDistricts = async (stateCode) => {
    try {
      const response = await fetch(`http://localhost:3001/district?state_code=${stateCode}`);
      if (response.ok) {
        const data = await response.json();
        setDistricts(data);
        // alert(data)
      } else {
        console.error('Failed to fetch districts:', response.statusText);
      }
    } catch (error) {
      console.error('Error fetching districts:', error);
    }
  };
  
  const fetchMinistries = async (sectorCode) => {
    try {
      const data = await GetMinistry(sectorCode);
      console.log("Data1", data);     
      
      const options = data.map(ministry => ({
        value: ministry.ministryCode,
        label: ministry.ministryName
      }));
      setMinistryOptions(options);
    } catch (error) {
      console.error('Error fetching ministry data:', error);
    }
  };

  const fetchDepartments = async (ministryCode) => {
    try {
      const data = await GetDepartment(ministryCode);
      console.log("Data2", data); 
      const options = data.map(department => ({
        value: department.departmentCode,
        label: department.departmentName
      }));
      setDepartmentOptions(options);
    } catch (error) {
      console.error('Error fetching ministry data:', error);
    }
  };

  const selectMinistry = (opt) => {
    setSelectedMinistry(opt.label);
    fetchDepartments(opt.value);
  };

  const selectDepartment = (opt) => {
    setSelectedDepartment(opt.label);
  };

  const handleStateChange = (selectedOption) => {
    setSelectedState(selectedOption);
    setSelectedDistrict(null); // Reset district selection when state changes
    if (selectedOption) {
      fetchDistricts(selectedOption.value);
    }
  };

  const stateOptions = states.map((state) => ({
    value: state.state_code,
    label: state.state_name,
  }));

  const districtOptions = districts.map((district) => ({
    value: district.dist_code,
    label: district.dist_name,
  }));

  

  return (
    <>  
    <div className="dropdown__header CKR_pad">
        <div className="container-fluid mb-2">
          <div className="flex row CKR_pad">
            <div className="d-flex align-items-center justify-start py-1 px-3 col-lg-9 col-md-9">
              <div className="row w-100">
                <div className="col px-1 select-container">
                  <Select
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
                  <Select
                    value={selectedState}
                    placeholder="Select State"
                    options={stateOptions}
                    onChange={handleStateChange}
                  />
                </div>
                <div className="col px-1 select-container">               
                  <Select
                    value={selectedDistrict}
                    placeholder="Select District"
                    options={districtOptions}
                    onChange={setSelectedDistrict}
                    isDisabled={!selectedState}
                  />
                </div>
                <div className="box_submit px-1">
                  <button type="button" className="CKR__view__btn" title="Submit" disabled>
                    Submit
                  </button>
                </div>
                <div className="box_reset px-1">
                  <button className="reset_btn px-2" title="Reset Filter" disabled>
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
                  value=""/>
              </div>
            </div>
          </div>
        </div>
      
    </div> 
    </>
  );
};

export default Filters;
