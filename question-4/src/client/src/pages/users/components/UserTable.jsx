import React from 'react';
import {
    CButton,
    CCol,
    CRow,
    CTable,
    CTableBody,
    CTableDataCell,
    CTableHead,
    CTableHeaderCell,
    CTableRow
} from '@coreui/react';
import {destroy, getAll, show} from "../services/user.service.js";

const UserTable = ({users, setUsers, setSelectedUser, setIsNotValid}) => {
    const dataAndHeaderFormat = {
        "id": "ID",
        "name": "Name",
        "email": "Email",
        "age": "Age",
        "bod": "Birth of Date",
        "action": "Actions"
    }
    const handleSelectedData = async (id) => {
        await show(id)
            .then(response => {
                setSelectedUser(response.data)
            })
            .then(setIsNotValid(false))
    }

    const handleDelete = async (id) => {
        await destroy(id)
            .finally(async () => {
                await getAll().then(response => setUsers(response.data))
            })
    }

    return (
        <CRow className="my-5">
            <CCol>
                <CTable responsive="md" striped>
                    <CTableHead>
                        <CTableRow>
                            {
                                Object.entries(dataAndHeaderFormat).map(([data, header]) => {
                                    return <CTableHeaderCell key={data} className="text-center"
                                                             scope="col">{header}</CTableHeaderCell>
                                })
                            }
                        </CTableRow>
                    </CTableHead>
                    <CTableBody>
                        {
                            users.map((user) => (
                                <CTableRow key={user.id}>
                                    <CTableHeaderCell className="text-center" scope="row">{user.id}</CTableHeaderCell>
                                    <CTableDataCell className="text-center">{user.name}</CTableDataCell>
                                    <CTableDataCell className="text-center">{user.email}</CTableDataCell>
                                    <CTableDataCell className="text-center">{user.age}</CTableDataCell>
                                    <CTableDataCell className="text-center">{user.bod}</CTableDataCell>
                                    <CTableDataCell className="text-center">
                                        <div className="d-flex gap-2 align-items-center justify-content-center">
                                            <CButton size="sm" className="text-white" color="warning"
                                                     onClick={async () => handleSelectedData(user.id)}>Edit</CButton>
                                            <CButton size="sm" className="text-white" color="danger"
                                                     onClick={async () => handleDelete(user.id)}>Delete</CButton>
                                        </div>
                                    </CTableDataCell>
                                </CTableRow>
                            ))
                        }
                    </CTableBody>
                </CTable>
            </CCol>
        </CRow>
    );
};

export default UserTable;
