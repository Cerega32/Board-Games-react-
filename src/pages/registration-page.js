import React from 'react';
import WrappedRegistrationForm from '../components/registration-form/registration-form';
import { Redirect } from 'react-router-dom';

const Registration = ({signUp, isAuth, loading, error}) => {
  return (
    !isAuth ? <WrappedRegistrationForm  signUp={signUp} loading={loading} error={error}/> : <Redirect  to='/'/>
  )
}

export default Registration