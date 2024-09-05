import React, { useState, useEffect } from 'react';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import '../Styles/Data.css';

function Table() {
  const [data, setData] = useState([]);
  useEffect(() => {
    fetch('http://localhost:3001/getdata')
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
  const [editName, setEditName] = useState('');
  const [editNumber, setEditNumber] = useState('');
  const [editEmail, setEditEmail] = useState('');
  const [editFatherName, setEditFatherName] = useState('');
  const [editAge, setEditAge] = useState('');

  const handleEditClick = (index, currentName, currentNumber, currentEmail, currentFatherName, currentAge) => {
    setEditIndex(index);
    setEditName(currentName);
    setEditNumber(currentNumber);
    setEditEmail(currentEmail);
    setEditFatherName(currentFatherName);
    setEditAge(currentAge);
  };

  const handleSaveClick = async (index, Sno) => {
    try {
      const updatedData = await fetch(`http://localhost:3001/update/${Sno}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          Name: editName,
          Number: editNumber,
          Email: editEmail,
          FatherName: editFatherName,
          Age: editAge,
        }),
      });
  
      if (!updatedData.ok) {
        throw new Error(`HTTP error! Status: ${updatedData.status}`);
      }
      console.log(Sno);
  
      const newData = [...data];
      newData[index] = { ...newData[index], Name: editName, Number: editNumber, Email: editEmail, FatherName: editFatherName, Age: editAge };
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
      case 'Name':
        return editName;
      case 'Number':
        return editNumber;
      case 'Email':
        return editEmail;
      case 'FatherName':
        return editFatherName;
      case 'Age':
        return editAge;
      default:
        return '';
    }
  };
  const handleEditChange = (e, key) => {
    switch (key) {
      case 'Name':
        setEditName(e.target.value);
        break;
      case 'Number':
        setEditNumber(e.target.value);
        break;
      case 'Email':
        setEditEmail(e.target.value);
        break;
      case 'FatherName':
        setEditFatherName(e.target.value);
        break;
      case 'Age':
        setEditAge(e.target.value);
        break;
      default:
        break;
    }
  };
  

  return (
    <div className="custom-body">
      <div className="container">
        <h1 className="title">Voters Table</h1>

        <div className="filters">
          {/* ... (previous filters code) */}
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
                  <td>{renderEditableCell(index, 'Name', row.Name, editIndex === index)}</td>
                  <td>{renderEditableCell(index, 'Number', row.Number, editIndex === index)}</td>
                  <td>{renderEditableCell(index, 'Email', row.Email, editIndex === index)}</td>
                  <td>{renderEditableCell(index, 'FatherName', row.FatherName, editIndex === index)}</td>
                  <td>{renderEditableCell(index, 'Age', row.Age, editIndex === index)}</td>
                  <td>
                    {editIndex === index ? (
                      <>
                        <button onClick={() => handleSaveClick(index, row.Sno)}>
                          {<SaveIcon />}
                        </button>
                        <button onClick={handleCancelClick}>{<CancelIcon />}</button>
                      </>
                    ) : (
                      <BorderColorIcon onClick={() => handleEditClick(index, row.Name, row.Number, row.Email, row.FatherName, row.Age)} />
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
