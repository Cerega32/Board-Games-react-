import React from 'react';
import { Redirect } from 'react-router-dom';
import SignIn from '../components/sign-in';

const Login = ({signIn, isAuth, loading, error}) => {
  return (
    !isAuth ? <SignIn signIn={signIn} loading={loading} error={error}/> : <Redirect  to='/'/>
  )
}

export default Login