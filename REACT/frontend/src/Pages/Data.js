import React, { useState,useEffect } from 'react';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import '../Styles/Data.css'


function Table() {

  const [data, setData] = useState([]);
  useEffect(() => {
    fetch('http://localhost:3001/getdata')
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then(result => {
        console.log('Stored procedure results:', result);
        setData(result.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);
  

  const [editIndex, setEditIndex] = useState(null);
  const [editName, setEditName] = useState('');

  const handleEditClick = (index, currentName) => {
    setEditIndex(index);
    setEditName(currentName);
  };

  const handleSaveClick = async (index, Sno) => {
    try {
      const updatedData = await fetch(`http://localhost:3001/update/${Sno}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ Name: editName }), // Update property name to 'Name'
      });
  
      if (!updatedData.ok) {
        throw new Error(`HTTP error! Status: ${updatedData.status}`);
          
      }
      console.log(Sno);    
  
      const newData = [...data];
      newData[index].Name = editName; // Assuming the key is 'Name' on the server
      setData(newData);
      setEditIndex(null);
    } catch (error) {
      console.error('Error updating data:', error);
    }
  };
  const handleCancelClick = () => {
    setEditIndex(null);
  };

  return (
    <div className="custom-body">
      <div className="container">
      <h1 className="title">Voters Table</h1>

<div className="filters">
  <label htmlFor="mobileFilter">Mobile Number:</label>
  <select className="filter-select" id="mobileFilter">
    <option value="">All</option>
    <option value="1234567890">1234567890</option>
    <option value="9876543210">9876543210</option>
  </select>

  <label htmlFor="ageFilter">Age:</label>
  <select className="filter-select" id="ageFilter">
    <option value="">All</option>
    <option value="20">20</option>
    <option value="25">25</option>
    <option value="30">30</option>
  </select>

  <label htmlFor="fatherNameFilter">Father's Name:</label>
  <select className="filter-select" id="fatherNameFilter">
    <option value="">All</option>
    <option value="John Doe">John Doe</option>
    <option value="Jane Doe">Jane Doe</option>
  </select>
</div>


        <div className="table-container">
          <table className="dataTable">
            <thead>
              <tr>
                <th>Sno</th>
                <th>Name</th>
                <th>Number</th>
                <th>Email</th>
                <th>Father Name</th>
                <th>Age</th>
                <th>Edit</th>
              </tr>
            </thead>
            <tbody>
              {data.map((row, index) => (
                <tr key={row.Sno}>
                  <td>{row.Sno}</td>
                  <td>
                    {editIndex === index ? (
                      <input
                        type="text"
                        value={editName}
                        onChange={(e) => setEditName(e.target.value)}
                      />
                    ) : (row.Name)}
                  </td>
                  <td>{row.Number}</td>
                  <td>{row.Email}</td>
                  <td>{row.FatherName}</td>
                  <td>{row.Age}</td>
                  <td>
                    {editIndex === index ? (
                      <>
                        <button onClick={() => handleSaveClick(index, row.Sno)}>
                        {<SaveIcon />}
                        </button>
                        <button onClick={handleCancelClick}>{<CancelIcon/>}</button>
                      </>
                    ) : (
                      <BorderColorIcon onClick={() => handleEditClick(index, row.name)} />
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

export default Table;
