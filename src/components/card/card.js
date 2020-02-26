import React from "react";
import { Card, Typography, Button } from "antd";
import './card.css';
import { Link } from "react-router-dom";

const { Paragraph } = Typography;

const Item = ({ _id, title, images, price, onAddedToCart, onItemSelected, badge }) => {
  return (
    <Card
      className='card-item'
      cover={<img alt="example" src={images} onClick={() => onItemSelected(_id)} />}
    >
      <Paragraph strong onClick={() => onItemSelected(_id)} className='card__title'>
        {title}
      </Paragraph>
      <Paragraph className='card-price'>{`${price} рублей`}</Paragraph>
      {(badge.map(i => i._id).indexOf(_id) !== -1 ) ? <Link to='badge'><Button className='item__buy' type="secondary"><span><i className="fas fa-cart-plus" /> Перейти в корзину</span></Button></Link> : 
      <Button type="secondary" onClick={onAddedToCart}> Добавить в корзину </Button>}
      
    </Card>
  );
};
export default Item;

