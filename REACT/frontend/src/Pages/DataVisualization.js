import React, { useState, useEffect } from 'react';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import '../Styles/Data.css';

function Table2() {
  const [data, setData] = useState([]);
  const [filterPartNo, setFilterPartNo] = useState('');
  const [filterPartName, setFilterPartName] = useState('');
  const [filterVoterId, setFilterVoterId] = useState('');
  const [filterName, setFilterName] = useState('');
  const [filterGuardian, setFilterGuardian] = useState('');
  const [filterGuardianName, setFilterGuardianName] = useState('');
  const [filterAge, setFilterAge] = useState('');
  const [filterHNo, setFilterHNo] = useState('');

  useEffect(() => {
    fetch('http://localhost:3001/getvoters')
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((result) => {
        console.log('Stored procedure results:', result);
        setData(result.data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const [editIndex, setEditIndex] = useState(null);
  const [editPartNo, setEditPartNo] = useState('');
  const [editPartName, setEditPartName] = useState('');
  const [editVoterId, setEditVoterId] = useState('');
  const [editName, setEditName] = useState('');
  const [editGuardian, setEditGuardian] = useState('');
  const [editGuardianName, setEditGuardianName] = useState('');
  const [editAge, setEditAge] = useState('');
  const [editHNo, setEditHNo] = useState('');

  const handleEditClick = (index, currentPartNo, currentPartName, currentVoterId, currentName, currentGuardian, currentGuardianName, currentAge, currentHNo) => {
    setEditIndex(index);
    setEditPartNo(currentPartNo);
    setEditPartName(currentPartName);
    setEditVoterId(currentVoterId);
    setEditName(currentName);
    setEditGuardian(currentGuardian);
    setEditGuardianName(currentGuardianName);
    setEditAge(currentAge);
    setEditHNo(currentHNo);
  };

  const handleSaveClick = async (index, Sno) => {
    try {
      const updatedData = await fetch(`http://localhost:3001/update/${Sno}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          PartNo: editPartNo,
          PartName: editPartName,
          VoterId: editVoterId,
          Name: editName,
          Guardian: editGuardian,
          GuardianName: editGuardianName,
          Age: editAge,
          HNo: editHNo,
        }),
      });
  
      if (!updatedData.ok) {
        throw new Error(`HTTP error! Status: ${updatedData.status}`);
      }
      console.log(Sno);
  
      const newData = [...data];
      newData[index] = { ...newData[index], PartNo: editPartNo, PartName: editPartName, VoterId: editVoterId, Name: editName, Guardian: editGuardian, GuardianName: editGuardianName, Age: editAge, HNo: editHNo };
      setData(newData);
      setEditIndex(null);
    } catch (error) {
      console.error('Error updating data:', error);
    }
  };

  const handleCancelClick = () => {
    setEditIndex(null);
  };

  const renderEditableCell = (index, key, value, isEditing) => {
    return isEditing ? (
      <input
        type="text"
        defaultValue={value}
        value={getEditValue(key)}
        onChange={(e) => handleEditChange(e, key)}
      />
    ) : (
      value
    );
  };

  const getEditValue = (key) => {
    switch (key) {
      case 'PartNo':
        return editPartNo;
      case 'PartName':
        return editPartName;
      case 'VoterId':
        return editVoterId;
      case 'Name':
        return editName;
      case 'Guardian':
        return editGuardian;
      case 'GuardianName':
        return editGuardianName;
      case 'Age':
        return editAge;
      case 'HNo':
        return editHNo;
      default:
        return '';
    }
  };

  const handleEditChange = (e, key) => {
    switch (key) {
      case 'PartNo':
        setEditPartNo(e.target.value);
        break;
      case 'PartName':
        setEditPartName(e.target.value);
        break;
      case 'VoterId':
        setEditVoterId(e.target.value);
        break;
      case 'Name':
        setEditName(e.target.value);
        break;
      case 'Guardian':
        setEditGuardian(e.target.value);
        break;
      case 'GuardianName':
        setEditGuardianName(e.target.value);
        break;
      case 'Age':
        setEditAge(e.target.value);
        break;
      case 'HNo':
        setEditHNo(e.target.value);
        break;
      default:
        break;
    }
  };

  const handleFilterChange = (e, key) => {
    switch (key) {
      case 'PartNo':
        setFilterPartNo(e.target.value);
        break;
      case 'PartName':
        setFilterPartName(e.target.value);
        break;
      case 'VoterId':
        setFilterVoterId(e.target.value);
        break;
      case 'Name':
        setFilterName(e.target.value);
        break;
      case 'Guardian':
        setFilterGuardian(e.target.value);
        break;
      case 'GuardianName':
        setFilterGuardianName(e.target.value);
        break;
      case 'Age':
        setFilterAge(e.target.value);
        break;
      case 'HNo':
        setFilterHNo(e.target.value);
        break;
      default:
        break;
    }
  };

  const applyFilters = () => {
    // You can perform the filtering logic here and update the data accordingly
    // For simplicity, I'm assuming case-insensitive partial matching
    const filteredData = data.filter((row) => (
      row.PartNo.toLowerCase().includes(filterPartNo.toLowerCase()) &&
      row.PartName.toLowerCase().includes(filterPartName.toLowerCase()) &&
      row.VoterId.toLowerCase().includes(filterVoterId.toLowerCase()) &&
      row.Name.toLowerCase().includes(filterName.toLowerCase()) &&
      row.Guardian.toLowerCase().includes(filterGuardian.toLowerCase()) &&
      row.GuardianName.toLowerCase().includes(filterGuardianName.toLowerCase()) &&
      row.Age.toLowerCase().includes(filterAge.toLowerCase()) &&
      row.HNo.toLowerCase().includes(filterHNo.toLowerCase())
    ));

    // Update the data with filtered results
    setData(filteredData);
  };

  return (
    <div className="custom-body">
      <div className="container">
        <h1 className="title">Voters Table</h1>

        <div className="filters">
          <input type="text" placeholder="Filter Part No" value={filterPartNo} onChange={(e) => handleFilterChange(e, 'PartNo')} />
          <input type="text" placeholder="Filter Part Name" value={filterPartName} onChange={(e) => handleFilterChange(e, 'PartName')} />
          <input type="text" placeholder="Filter Voter Id" value={filterVoterId} onChange={(e) => handleFilterChange(e, 'VoterId')} />
          <input type="text" placeholder="Filter Name" value={filterName} onChange={(e) => handleFilterChange(e, 'Name')} />
          <input type="text" placeholder="Filter Guardian" value={filterGuardian} onChange={(e) => handleFilterChange(e, 'Guardian')} />
          <input type="text" placeholder="Filter Guardian Name" value={filterGuardianName} onChange={(e) => handleFilterChange(e, 'GuardianName')} />
          <input type="text" placeholder="Filter Age" value={filterAge} onChange={(e) => handleFilterChange(e, 'Age')} />
          <input type="text" placeholder="Filter H No" value={filterHNo} onChange={(e) => handleFilterChange(e, 'HNo')} />
          <button onClick={applyFilters}>Apply Filters</button>
        </div>

        <div className="table-container">
          <table className="dataTable">
            <thead>
              <tr>
                <th>Sno</th>
                <th>Part No</th>
                <th>Part Name</th>
                <th>Voter Id</th>
                <th>Name</th>
                <th>Guardian</th>
                <th>Guardian Name</th>
                <th>Age</th>
                <th>H No</th>
                <th>Edit</th>
              </tr>
            </thead>
            <tbody>
              {data.map((row, index) => (
                <tr key={row.Sno}>
                  <td>{index + 1}</td>
                  <td>{row.Sno}</td>
                  <td>{renderEditableCell(index, 'PartNo', row.PartNo, editIndex === index)}</td>
                  <td>{renderEditableCell(index, 'PartName', row.PartName, editIndex === index)}</td>
                  <td>{renderEditableCell(index, 'VoterId', row.VoterId, editIndex === index)}</td>
                  <td>{renderEditableCell(index, 'Name', row.Name, editIndex === index)}</td>
                  <td>{renderEditableCell(index, 'Guardian', row.Guardian, editIndex === index)}</td>
                  <td>{renderEditableCell(index, 'GuardianName', row.GuardianName, editIndex === index)}</td>
                  <td>{renderEditableCell(index, 'Age', row.Age, editIndex === index)}</td>
                  <td>{renderEditableCell(index, 'HNo', row.HNo, editIndex === index)}</td>
                  <td>
                    {editIndex === index ? (
                      <>
                        <button onClick={() => handleSaveClick(index, row.Sno)}>
                          {<SaveIcon />}
                        </button>
                        <button onClick={handleCancelClick}>{<CancelIcon />}</button>
                      </>
                    ) : (
                      <BorderColorIcon onClick={() => handleEditClick(index, row.PartNo, row.PartName, row.VoterId, row.Name, row.Guardian, row.GuardianName, row.Age, row.HNo)} />
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="add-new-button">
          <button>Add New</button>
        </div>
      </div>
    </div>
  );
}

export default Table2;
