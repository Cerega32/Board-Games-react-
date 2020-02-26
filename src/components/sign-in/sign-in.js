import React, { Component } from "react"
import { Form, Icon, Input, Button, Spin } from "antd"
import './sign-in.css'

class NormalLoginForm extends Component {
  state = {
    email: '',
    password: ''
  }

  handleSubmit = e => {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.signIn(this.state.email, this.state.password)
          .then(() => {
            if (this.props.isAuth) {
              return this.props.hideModal()
            }
          })
      }
    })
  }

  handleInputChange = (event) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSubmit} className="login-form">
        {this.props.error ? <p className='error-message'>Проверьте правильность ваших данных</p> : null}
        <Spin spinning={this.props.loading}>
          <Form.Item>
            {getFieldDecorator("email", {
              rules: [{ required: true, message: "Please input your username!" }]
            })(<Input 
            prefix={<Icon type="mail" style={{ color: "rgba(0,0,0,.25)" }} />} 
            placeholder="Email" 
            name='email' 
            onChange={this.handleInputChange}/>)}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator("password", {
              rules: [{ required: true, message: "Please input your Password!" }]
            })(
              <Input
                prefix={<Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />}
                type="password"
                placeholder="Password"
                name="password"
                onChange={this.handleInputChange}
              />
            )}
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" className="login-form-button">
              Войти
            </Button>
          </Form.Item>
        </Spin>
      </Form>
    )
  }
}

const WrappedNormalLoginForm = Form.create({ name: "normal_login" })(NormalLoginForm)

export default WrappedNormalLoginForm
