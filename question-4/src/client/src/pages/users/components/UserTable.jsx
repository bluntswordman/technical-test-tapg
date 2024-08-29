import {
  CButton,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow
} from '@coreui/react';
import { useNavigate } from 'react-router-dom';

import { destroy } from '../services/user.service.js';

const UserTable = ({ users, fetchUsers }) => {
  const navigate = useNavigate();

  const dataAndHeaderFormat = {
    id: 'ID',
    name: 'Name',
    email: 'Email',
    age: 'Age',
    bod: 'Birth of Date',
    action: 'Actions',
  };

  const handleDelete = async (id) => {
    const response = await destroy(id);

    if (response.status) {
      alert(response.message);
      navigate('/');
      fetchUsers();
    } else {
      alert(response.message);
    }
  };

  return (
    <CTable responsive='md' striped className='my-5'>
      <CTableHead>
        <CTableRow>
          {Object.entries(dataAndHeaderFormat).map(([data, header]) => (
            <CTableHeaderCell key={data} className='text-center' scope='col'>
              {header}
            </CTableHeaderCell>
          ))}
        </CTableRow>
      </CTableHead>
      <CTableBody>
        {users &&
          users?.map((user) => (
            <CTableRow key={user.id}>
              <CTableHeaderCell className='text-center' scope='row'>
                {user.id}
              </CTableHeaderCell>
              <CTableDataCell className='text-center'>
                {user.name}
              </CTableDataCell>
              <CTableDataCell className='text-center'>
                {user.email}
              </CTableDataCell>
              <CTableDataCell className='text-center'>
                {user.age}
              </CTableDataCell>
              <CTableDataCell className='text-center'>
                {user.bod}
              </CTableDataCell>
              <CTableDataCell className='text-center'>
                <div className='d-flex gap-2 align-items-center justify-content-center'>
                  <CButton
                    size='sm'
                    className='text-white'
                    color='warning'
                    onClick={() => navigate(`/${user.id}`)}
                  >
                    Edit
                  </CButton>
                  <CButton
                    size='sm'
                    className='text-white'
                    color='danger'
                    onClick={() => handleDelete(user.id)}
                  >
                    Delete
                  </CButton>
                </div>
              </CTableDataCell>
            </CTableRow>
          ))}
      </CTableBody>
    </CTable>
  );
};

export default UserTable;
