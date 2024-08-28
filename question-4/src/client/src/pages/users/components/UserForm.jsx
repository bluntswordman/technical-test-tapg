import React from "react";
import {CButton, CCol, CForm, CFormInput, CRow} from "@coreui/react";
import {getAll, save} from "../services/user.service.js";
import {toCapitalize} from "../../../helpers/String.js";
import {defaultUser} from "../../../helpers/Default.js";

const UserForm = ({setUsers, selectedUser, setSelectedUser, isNotValid, setIsNotValid}) => {
    const handleSubmit = async (e) => {
        e.preventDefault()
        await save(selectedUser, selectedUser.id)
            .then(async () => {
                await getAll().then(response => setUsers(response.data))
            })
            .finally(() => resetForm())
    }

    const resetForm = () => {
        setSelectedUser(defaultUser)
        setIsNotValid(true)
    }

    const validateIsValid = (allField = true) => {
        let nowIsNotValid = allField
            ? !(selectedUser.name !== "" && selectedUser.email !== "" && selectedUser.age !== "" && selectedUser.bod !== "")
            : !(selectedUser.name !== "" || selectedUser.email !== "" || selectedUser.age !== "" || selectedUser.bod !== "")

        setIsNotValid(nowIsNotValid)
    }

    return (
        <CRow className="mb-3">
            <CCol>
                <CForm onSubmit={handleSubmit}>
                    <CRow>
                        <CCol sm={12} lg={6} className="mb-3">
                            <CFormInput
                                autoComplete="off"
                                required
                                type="text"
                                id="name"
                                label="Name"
                                placeholder="Ex: John Doe"
                                value={selectedUser.name || ''}
                                onChange={(e) => {
                                    setSelectedUser((prevState) => ({
                                        ...prevState,
                                        name: toCapitalize(e.target.value)
                                    }))
                                    validateIsValid()
                                }}
                            />
                        </CCol>
                        <CCol sm={12} lg={6} className="mb-3">
                            <CFormInput
                                autoComplete="off"
                                required
                                type="email"
                                id="email"
                                label="Email Address"
                                placeholder="email@example.com"
                                value={selectedUser.email || ''}
                                onChange={(e) => {
                                    setSelectedUser((prevState) => ({
                                        ...prevState,
                                        email: e.target.value
                                    }))
                                    validateIsValid()
                                }}
                            />
                        </CCol>
                        <CCol sm={12} lg={6} className="mb-3">
                            <CFormInput
                                autoComplete="off"
                                required
                                type="text"
                                id="age"
                                label="Age"
                                placeholder="Ex: 20"
                                value={selectedUser.age || ''}
                                onChange={(e) => {
                                    setSelectedUser((prevState) => ({
                                        ...prevState,
                                        age: e.target.value
                                    }))
                                    validateIsValid()
                                }}
                            />
                        </CCol>
                        <CCol sm={12} lg={6} className="mb-3">
                            <CFormInput
                                autoComplete="off"
                                required
                                type="Date"
                                id="birth-of-date"
                                label="Birth of Date"
                                placeholder="Select Date"
                                value={selectedUser.bod || ''}
                                onChange={(e) => {
                                    setSelectedUser((prevState) => ({
                                        ...prevState,
                                        bod: e.target.value
                                    }))
                                    validateIsValid()
                                }}
                            />
                        </CCol>
                        <CCol>
                            <div className="d-flex gap-2 justify-content-end">
                                <CButton size="sm" type="submit" color="primary" disabled={isNotValid}>
                                    {
                                        selectedUser.id === null ? "Submit User" : "Save Changes User"
                                    }
                                </CButton>
                                <CButton size="sm" type="reset" color="secondary" disabled={isNotValid}
                                         onClick={resetForm}>Reset</CButton>
                            </div>
                        </CCol>
                    </CRow>
                </CForm>
            </CCol>
        </CRow>
    )
}

export default UserForm