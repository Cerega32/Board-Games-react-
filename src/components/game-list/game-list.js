import React, { Component } from "react"
import { Pagination, Spin } from "antd"
import Item from "../card/card"
import { withRouter } from "react-router-dom";
import './game-list.css'

const Items = ({ games, allPages, currentPage, onChangePage, onAddedToCart, onItemSelected, badge }) => {
  return (
    <React.Fragment>
      <div className="items" >
        {games.map(item => (
          <Item {...item} onAddedToCart={() => onAddedToCart(item._id)} key={item._id} onItemSelected={onItemSelected} badge={badge}/>
        ))}
      </div>
      
      {(allPages <= 10)
      ? null 
      : (<Pagination defaultCurrent={currentPage} total={allPages} onChange={onChangePage}/>)}
    </React.Fragment>
  )
}

class GameList extends Component {

  state = {
    currentPage: this.props.currentPage
  }

  handeFiltersChange = () => {
    const filtersState = { ...this.state }
    this.props.onChange(filtersState)
  }
  
  onChangePage = currentPage => {
    this.setState({ currentPage }, () => this.handeFiltersChange())
  }

  render() {
    const { games, loading, error, allPages, currentPage, onAddedToCart, history, badge } = this.props
    return (
      <div className="col-lg-9 game-list">
        {error ? (
          <p>Что-то пошло не так</p>
        ) : (
          <div className="catalog-wrapper">{loading ? 
          <Spin size="large" /> : 
          <Items games={games}
                  allPages={allPages}
                  currentPage={currentPage}
                  onChangePage={this.onChangePage}
                  onAddedToCart={onAddedToCart}
                  onItemSelected={(id) => history.push(`games/${id}`)}
                  badge={badge} />}</div>
        )}
      </div>
    )
  }
}

export default withRouter(GameList)
