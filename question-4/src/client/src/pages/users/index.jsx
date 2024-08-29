import { CCol, CContainer, CRow } from '@coreui/react';
import { useCallback, useEffect, useState } from 'react';

import { UserForm, UserTable } from './components';
import { getAll } from './services/user.service.js';

export default function UserPage() {
  const [users, setUsers] = useState([]);

  const fetchUsers = useCallback(async () => {
    const response = await getAll();
    setUsers(response.data);
  }, []);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  return (
    <CContainer>
      <CRow className='my-5'>
        <h1 className='fs-1 text-center'>User Management</h1>
      </CRow>
      <CRow>
        <CCol xs={6} sm={12}>
          <UserForm {...{ fetchUsers }} />
        </CCol>
        <CCol xs={6} sm={12}>
          <UserTable {...{ users, fetchUsers }} />
        </CCol>
      </CRow>
    </CContainer>
  );
}
