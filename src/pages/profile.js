import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { Spin } from 'antd';
import ErrorIndicator from '../components/error-indicator/error-indicator';

class Profile extends Component {

  componentDidMount = () => {
    this.props.fetchProfile() // from store
  }


  render() {
    const { loading, error, isAuth, userData } = this.props

    const spiner = loading ? <Spin /> : null;
    const errorShow = error ? <ErrorIndicator /> : null;
    const profile = !loading && !error ? <div>
      <p>{userData.name}</p>
      <p>Роль: {userData.role}</p>
      <h3>Список заказов:</h3>
    </div> : null

    return (
      isAuth ? 
      (<div>
        {spiner}
        {errorShow}
        {profile}
      </div>) : <Redirect  to='/signin'/>
    )
  }
}

export default Profile