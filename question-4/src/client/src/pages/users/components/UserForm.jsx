import { CButton, CCol, CForm, CFormInput, CRow } from '@coreui/react';
import { useCallback, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { save, show } from '../services/user.service.js';

const UserForm = ({ fetchUsers }) => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [user, setUser] = useState({
    id: null,
    name: '',
    email: '',
    age: '',
    bod: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await save(user, id);

    if (response.status) {
      fetchUsers();
      handleReset();
    } else {
      alert(response.message);
    }
  };

  const handleReset = () => {
    setUser({
      id: null,
      name: '',
      email: '',
      age: '',
      bod: '',
    });

    if (id) navigate('/');
  };

  const fetchUser = useCallback(async () => {
    const response = await show(id);
    setUser(response.data);
  }, [id]);

  useEffect(() => {
    if (id) {
      fetchUser();
    }
  }, [id, fetchUser]);

  return (
    <CForm onSubmit={handleSubmit}>
      <CRow>
        <CCol sm={6} lg={12} className='mb-3'>
          <CFormInput
            autoComplete='off'
            required
            type='text'
            id='name'
            label='Name'
            placeholder='Ex: John Doe'
            value={user.name}
            onChange={(e) => {
              setUser((prevState) => ({
                ...prevState,
                name: e.target.value,
              }));
            }}
          />
        </CCol>
        <CCol sm={12} lg={6} className='mb-3'>
          <CFormInput
            autoComplete='off'
            required
            type='email'
            id='email'
            label='Email Address'
            placeholder='email@example.com'
            value={user.email}
            onChange={(e) => {
              setUser((prevState) => ({
                ...prevState,
                email: e.target.value,
              }));
            }}
          />
        </CCol>
        <CCol sm={12} lg={6} className='mb-3'>
          <CFormInput
            autoComplete='off'
            required
            type='text'
            id='age'
            label='Age'
            placeholder='Ex: 20'
            value={user.age}
            onChange={(e) => {
              setUser((prevState) => ({
                ...prevState,
                age: e.target.value,
              }));
            }}
          />
        </CCol>
        <CCol sm={12} lg={6} className='mb-3'>
          <CFormInput
            autoComplete='off'
            required
            type='Date'
            id='birth-of-date'
            label='Birth of Date'
            placeholder='Select Date'
            value={user.bod}
            onChange={(e) => {
              setUser((prevState) => ({
                ...prevState,
                bod: e.target.value,
              }));
            }}
          />
        </CCol>
        <CCol>
          <div className='d-flex gap-2 justify-content-end'>
            <CButton
              size='sm'
              type='submit'
              color='primary'
              disabled={Object.values(user).every((val) =>
                [null, '', 0].includes(val)
              )}
            >
              {id ? 'Update' : 'Save'}
            </CButton>
            <CButton
              size='sm'
              type='reset'
              color='secondary'
              disabled={Object.values(user).every((val) =>
                ['', null, 0].includes(val)
              )}
              onClick={handleReset}
            >
              Reset
            </CButton>
          </div>
        </CCol>
      </CRow>
    </CForm>
  );
};

export default UserForm;
