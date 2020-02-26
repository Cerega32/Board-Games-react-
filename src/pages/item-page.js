import React, { Component } from 'react';
import { Spin } from 'antd';
import './item-page/item-page.css'

class ItemPage extends Component {

  componentDidMount() {
    this.props.fetchGame(this.props.itemId) // from store
  }


  render() {
    const { games, error, loading, onAddedToCart} = this.props;
    const spiner = loading ? <Spin size="large" /> : null;
    const errorMessage = error ? <p>ОШИБКА</p> : null;
    const item = !loading && !error ? (
    <div className='row'>
      <div className='col-lg-9 item__desc'>
        <h2>{games[0].title}</h2>
        <img src={games[0].images[0]} alt='desc' width='400'/>     
        <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut a nunc ex. Proin convallis nulla ut laoreet cursus. Etiam mollis velit non orci congue accumsan. Etiam mollis nulla sit amet egestas vulputate. In ac tellus efficitur, tempus nibh a, egestas justo. Pellentesque ligula eros, imperdiet non nulla in, volutpat cursus sem. Morbi ullamcorper pretium odio a maximus. Sed dictum, massa ut rhoncus sagittis, purus elit rutrum quam, sed tempus ex metus ac ante. Suspendisse cursus ac libero vitae hendrerit. Proin dapibus ante et dolor commodo, eget consectetur tortor scelerisque. Vestibulum mollis nibh a felis dictum, vel sagittis erat dictum. In consectetur in neque quis tempus. Etiam at libero eu velit convallis mattis ut non orci. Integer sed diam et ligula tincidunt imperdiet. 
        </p> 
        <p>Donec tempor luctus nulla, sed porttitor quam facilisis nec. Suspendisse rutrum egestas ante at malesuada. Phasellus accumsan tempor quam nec ullamcorper. Curabitur luctus tincidunt elit, in cursus ligula. Mauris dignissim et urna bibendum blandit. Morbi diam mi, accumsan elementum porttitor in, eleifend efficitur sem. In varius odio purus, non hendrerit nisi accumsan id. Sed sit amet erat leo. Duis at lorem vitae leo pharetra mattis quis vel nibh. Etiam pharetra ultrices dictum. Cras eu commodo ante, non fermentum nisi. Sed nec porta justo. Nulla ut nisi nibh. Quisque gravida mauris justo, vitae tristique ex blandit nec. Fusce pellentesque imperdiet vulputate.</p>
        <p>Quisque accumsan lacinia risus, sed sagittis libero faucibus ut. Nullam faucibus urna justo, quis ornare massa feugiat vitae. Integer cursus ipsum et est lacinia, non tristique est luctus. Phasellus nulla libero, pretium nec ante sit amet, egestas sollicitudin odio. Duis efficitur ullamcorper placerat. Vestibulum nunc nulla, gravida non tortor eu, dignissim ultrices ligula. Sed vestibulum augue sit amet felis mollis, id consectetur mi convallis. Sed viverra tristique orci, vel cursus massa. Nullam fermentum mi odio, vel commodo mauris viverra sed. Morbi pretium nunc id arcu varius, in posuere est dictum.</p>
        <p>Pellentesque laoreet lobortis sem et imperdiet. Suspendisse ex enim, cursus ut orci at, fermentum cursus tellus. In lobortis in nunc non elementum. Donec ullamcorper justo in orci tempus consectetur. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Pellentesque dignissim risus dui, eu vulputate massa varius sed. Integer nec eros eros. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.</p>
        <p>Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Morbi nisl enim, commodo vel neque in, tempor interdum urna. Vivamus et finibus est. Integer vel dolor elit. Proin fringilla suscipit ex, ut interdum mauris feugiat sit amet. Donec sed lacus vitae enim aliquet pellentesque. Interdum et malesuada fames ac ante ipsum primis in faucibus. Fusce imperdiet dolor vel lacus consequat dignissim. Vivamus dictum malesuada lorem, id luctus odio pharetra id. Mauris maximus suscipit accumsan. Nullam sollicitudin libero eros, ac mattis risus volutpat quis.</p>  
      </div>
      <div className='col-lg-3 item-page__sidebar'>
        <span className='item-page__price'>{games[0].price} ₽</span>
        <button onClick={(_id) => onAddedToCart(games[0]._id)} className="ant-btn ant-btn-secondary">Добавить в корзину</button>
      </div>      
    </div>
    ) : null
    return ( 
      <article className='  '>
        {spiner}
        {errorMessage}
        {item}
      </article>
    )
  }
}

export default ItemPage;