import React, {useEffect, useState} from "react";
import {getAll} from "./services/user.service.js";
import {CCol, CContainer, CRow} from "@coreui/react";
import UserForm from "./components/UserForm.jsx";
import UserTable from "./components/UserTable.jsx";
import {defaultUser} from "../../helpers/Default.js";

export default function UserPage() {
    const [users, setUsers] = useState([])
    const [selectedUser, setSelectedUser] = useState(defaultUser)
    const [isNotValid, setIsNotValid] = useState(true)

    useEffect(() => {
        const data = async () => {
            return await getAll()
        }

        data().then(response => setUsers(response.data))
    }, [])

    return (<CContainer>
            <CRow className="my-5">
                <h1 className="fs-1 text-center">User Management</h1>
            </CRow>
            <CRow>
                <CCol>
                    <UserForm setUsers={setUsers} selectedUser={selectedUser} setSelectedUser={setSelectedUser}
                              isNotValid={isNotValid} setIsNotValid={setIsNotValid}/>
                    <UserTable users={users} setSelectedUser={setSelectedUser} setUsers={setUsers}
                               setIsNotValid={setIsNotValid}/>
                </CCol>
            </CRow>
        </CContainer>)
}