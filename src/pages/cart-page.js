import React, { Component } from "react"
import { List, Avatar, Button, Radio, Input, Form, Spin } from "antd"
import { withRouter, Link } from "react-router-dom"
import './cart-page/cart-page.css'

class CartPage extends Component {

  state = {
    stage: 0,
    delivery: null,
    payment: null,
    name: '',
    email: '',
    phone: '',
    success: false
  }

  onChange = e => {
    const name = e.target.name;
    this.setState({
      [name]: e.target.value,
    });
  };

  handleSubmit = e => {
    e.preventDefault();    
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        this.props.makeOrder(this.props.badge, this.state.email, this.state.phone, this.state.name, this.state.delivery, this.state.payment)
          .then(() => {
            this.setState({
              success: true
            })
          })
      }
    })
  }

  onContinue = () => {
    this.props.isAuth ? ( 
      this.props.form.validateFieldsAndScroll((err, values) => {
        if (!err) {
          this.setState({stage: this.state.stage + 1}) 
        }
      })
    ) : (
      this.props.showModal()
    )
  }
  
  handleInputChange = (event) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    
    this.setState({
      [name]: value
    });
  }

  componentDidMount = () => {
    if (this.props.isAuth) {
      this.props.fetchProfile()
    }
  }

  render() {

    const { badge, total, onAddedToCart, onRemovedToCart, onAllRemovedToCart, history } = this.props;
    const { getFieldDecorator } = this.props.form;

    const radioStyle = {
      display: 'block',
      height: '30px',
      lineHeight: '30px',
    }; 
    
    return (
      <React.Fragment>
        {
          this.state.success && this.props.orderSuccess ?
         <h2>Заказ успешно передан на формирование, с вами свяжутся в ближайшее время</h2> : 
         null
        }
      <List
        className='cart-page'
        itemLayout="horizontal"
        dataSource={badge}
        renderItem={item => (
          <List.Item>
            <List.Item.Meta
              avatar={<Avatar src={item.images[0]} />}
              title={<Link to='#' className='modal-cart__item' onClick={(_id) => history.push(`/games/${item._id}`)}>{item.title}</Link>}
              />
             <div>
                <span>{item.price} ₽</span>
                <button  className='modal-cart__btn' onClick={() => onRemovedToCart(item._id)}><i className="fas fa-minus" /></button>
                <span className='modal-cart__count'>{item.count} шт.</span>
                <button className='modal-cart__btn' onClick={() => onAddedToCart(item._id)}><i className="fas fa-plus" /></button>
                <span className='modal-cart__count'>{item.total} ₽</span>
                <button className='modal-cart__btn' onClick={() => onAllRemovedToCart(item._id)}><i className="fas fa-trash-alt" /></button>
              </div>
            </List.Item>
          )}
          />
        <div className='modal-cart__badge cart-page__badge'>
          <span className='modal-cart__badge-total'>Итого: {total} ₽</span>
        </div>
        {
          badge.length === 0 ? null :
          <Form onSubmit={this.handleSubmit} className="register-form">
            <Spin spinning={this.props.loading}>
              {this.state.stage > 0 ? 
                <Form.Item label="Доставка:">
                  {getFieldDecorator('radio-delivery',{
                    rules: [
                      {
                        required: true 
                      }
                    ]
                  })(
                    <Radio.Group onChange={this.onChange} name='delivery'>
                      <Radio style={radioStyle} value='самовызов'>
                        Самовызов
                      </Radio>
                      <Radio style={radioStyle} value='яндекс'>
                        Яндекс.Доставка
                      </Radio>
                      <Radio style={radioStyle} value='почта'>
                        Почта
                      </Radio>
                    </Radio.Group>,
                  )}
                </Form.Item>
              : null}
              {this.state.stage > 1 ? 
              <React.Fragment>
                <Form.Item label="ФИО">
                  {getFieldDecorator("username", {
                    rules: [
                      {
                        required: true,
                        message: 'Введите ФИО', 
                      }
                    ], initialValue: this.props.user
                  })(<Input name='name' onChange={this.handleInputChange} />)}
                </Form.Item>
                <Form.Item label="E-mail">
                  {getFieldDecorator("email", {
                    rules: [
                      {
                        type: "email",
                        message: "The input is not valid E-mail!"
                      },
                      {
                        required: true,
                        message: "Введите свой email!",
                        initialValue: this.props.user
                      }
                    ], initialValue: this.props.userData.email
                  })(<Input name='email' onChange={this.handleInputChange} />)}
                </Form.Item>
                <Form.Item label="Телефон">
                  {getFieldDecorator("phone", {
                    rules: [
                      {
                        required: true,
                        message: "Введите свой телефон!"
                      }
                    ], initialValue: this.props.userData.phone
                  })(<Input name='phone' type='tel' onChange={this.handleInputChange} />)}
                </Form.Item>
              </React.Fragment>
              : null}
              {this.state.stage > 2 ? 
              <Form.Item label="Оплата:">
                {getFieldDecorator('radio-payment',{
                  rules: [
                    {
                      required: true 
                    }
                  ]
                })(
                  <Radio.Group onChange={this.onChange} name='payment'>
                    <Radio style={radioStyle} value='cash'>
                      Наличными/картой курьеру
                    </Radio>
                    <Radio style={radioStyle} value='yandex'>
                      Яндекс.Деньги
                    </Radio>
                    <Radio style={radioStyle} value='card'>
                      Visa, MasterCard
                    </Radio>
                  </Radio.Group>,
                )}
              </Form.Item>
              : null}
              {
                this.state.stage < 3 ? 
                  <Button onClick={this.onContinue}>Далее</Button> : 
                  <Form.Item>
                    <Button type="primary" htmlType="submit">
                      Зарегистрироваться
                    </Button>
                  </Form.Item>
              }
            </Spin>
          </Form>
        }
      </React.Fragment>
    )
  }
}

const WrappedOrder = Form.create({ name: 'validate_order' })(CartPage);
export default withRouter(WrappedOrder)
