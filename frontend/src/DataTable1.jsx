import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import axios from 'axios';
import del from './Delete.png';
import edit from './penciledit.png';
import './App.css';

const DataTable1 = () => {
    const [allData, setAllData] = useState([]);
    const [isFormVisible, setIsFormVisible] = useState(false);
    const [isDeleteConfirmVisible, setIsDeleteConfirmVisible] = useState(false);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [address, setAddress] = useState("");
    const [phone, setPhone] = useState("");
    const [selectedIds, setSelectedIds] = useState([]);
    const [editId, setEditId] = useState(null);

    const columns = [
        {
            name: <b>Name</b>,
            selector: row => row.name,
            sortable: true
        },
        {
            name: <b>Email</b>,
            selector: row => row.email
        },
        {
            name: <b>Address</b>,
            selector: row => row.address
        },
        {
            name: <b>Phone</b>,
            selector: row => row.phone
        },
        {
            name: <b>Actions</b>,
            cell: row => (
                <div>
                    <img
                        src={edit}
                        alt="edit"
                        width={20} height={20}
                        style={{ cursor: 'pointer', marginRight: '10px' }}
                        onClick={() => handleEdit(row)}
                    />
                    <img
                        src={del}
                        alt="delete"
                        width={20} height={20}
                        style={{ cursor: 'pointer' }}
                        onClick={() => handleDelete(row)}
                    />
                </div>
            ),
            ignoreRowClick: true,
            allowOverflow: true,
            button: true,
        }
    ];

    const handleSelected = ({ selectedRows }) => {
        const selectedIds = selectedRows.map(row => row._id);
        setSelectedIds(selectedIds);
    };

    const handleEdit = (row) => {
        const { _id, name, email, address, phone } = row;
        setName(name);
        setEmail(email);
        setAddress(address);
        setPhone(phone);
        setEditId(_id);
        setIsFormVisible(true);
    };

    const handleDelete = (row) => {
        const { _id } = row;

        if (window.confirm('Are you sure you want to delete this item?')) {
            axios.delete(`http://localhost:8000/del/${_id}`)
                .then(result => {
                    console.log(result);
                    fetchData();
                })
                .catch(err => console.log(err));
        }
    };

    const showAddDataForm = () => {
        setName("");
        setEmail("");
        setAddress("");
        setPhone("");
        setEditId(null);
        setIsFormVisible(true);
    };

    const addOrEditDetails = (e) => {
        e.preventDefault();
        if (!name || !email || !phone || !address) {
            alert('Please fill in all the required fields.');
            return;
        }

        const payload = { name, email, address, phone };

        if (editId) {
            axios.put(`http://localhost:8000/edit/${editId}`, payload)
                .then(result => {
                    console.log(result.data);
                    fetchData();
                    setIsFormVisible(false);
                    alert("Record updated successfully!");
                })
                .catch(err => {
                    console.error("Error updating record:", err.response ? err.response.data : err.message);
                    alert("Error updating record. Please try again later.");
                });
        } else {
            axios.post('http://localhost:8000/add', payload)
                .then(result => {
                    console.log(result);
                    fetchData();
                    setIsFormVisible(false);
                })
                .catch(err => {
                    console.error("Error adding record:", err.response ? err.response.data : err.message);
                    alert("Error adding record. Please try again later.");
                });
        }
    };

    const fetchData = () => {
        axios.get('http://localhost:8000/list')
            .then(result => setAllData(result.data))
            .catch(err => console.log(err));
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleDeleteAll = () => {
        if (selectedIds.length === 0) {
            alert('Please select at least one item to delete.');
            return;
        }

        if (window.confirm('Are you sure you want to delete selected item(s)?')) {
            selectedIds.forEach(itemId => {
                axios.delete(`http://localhost:8000/del/${itemId}`)
                    .then(result => {
                        console.log(result);
                        fetchData();
                    })
                    .catch(err => console.log(err));
            });
            setIsDeleteConfirmVisible(false);
        }
    };

    return (
        <div>
            {!isFormVisible && !isDeleteConfirmVisible && (
                <DataTable
                columns={columns}
                data={allData}
                pagination
                fixedHeader
                selectableRows
                selectableRowsHighlight
                onSelectedRowsChange={handleSelected}
                title={<b>Employee CRUD Operations:</b>}
                subHeader
                subHeaderComponent={
                    <div className="sub-header-container">
                        <div className="sub-header-title">
                            <h3><b>Manage Employees</b></h3>
                        </div>
                        <div className="sub-header-buttons">
                            <button className='button1' onClick={() => setIsDeleteConfirmVisible(true)}>Delete All</button>
                            <button className='button2' onClick={showAddDataForm}>Add New Employee</button>
                        </div>
                    </div>
                }
            />
            
            )}

            {isFormVisible && (
                <div className="container">
                    <form className='edit' onSubmit={addOrEditDetails}>
                        <h3>{editId ? "Edit Employee Details" : "Add Employee Details"}</h3>
                        <label><b>Name:</b></label>
                        <input type="text" name='name' value={name} onChange={(e) => setName(e.target.value)} /> <br />
                        <label><b>Email:</b></label>
                        <input type="text" name='email' value={email} onChange={(e) => setEmail(e.target.value)} /> <br />
                        <label><b>Phone:</b></label>
                        <input type="text" name='phone' value={phone} onChange={(e) => setPhone(e.target.value)} /> <br />
                        <label><b>Address:</b></label>
                        <textarea name="address" cols="23" rows="2" value={address} onChange={(e) => setAddress(e.target.value)}></textarea>
                        <br />
                        <div className="button-container">
                            <button className='button1' type="button" onClick={() => setIsFormVisible(false)}>Cancel</button>
                            <button className='button2' type="submit">{editId ? "Update Details" : "Add Details"}</button>
                        </div>
                    </form>
                </div>
            )}

            {isDeleteConfirmVisible && (
                <div className='del'>
                    <h4>Delete Employees</h4>
                    <h5>Are you sure you want to delete these records?</h5>
                    <h6>This action cannot be undone</h6>
                    <button className='button3' onClick={() => setIsDeleteConfirmVisible(false)}>Cancel</button>
                    <button className='button1' onClick={handleDeleteAll}>Delete</button>
                </div>
            )}
        </div>
    );
};

export default DataTable1;
