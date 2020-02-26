import React, { Component } from "react"
import Filters from "../components/filters/filter"
import GameList from "../components/game-list"

class HomePage extends Component {
  componentDidMount() {
    this.props.fetchGames(this.props.currentPage, this.props.sortBy, this.props.orderBy, 
      this.props.manufacturer, this.props.type, this.props.value, this.props.allPages) // from store
  }
  handleFilterChange = data => {
    this.props.filterChange(data, () =>
      this.props.fetchGames(this.props.currentPage, this.props.sortBy, 
        this.props.orderBy, this.props.manufacturer, this.props.type, this.props.value,
        this.props.allPages)
    )
  }
  render() {
    return (
      <div className="catalog row">
        <Filters
          onChange={this.handleFilterChange}
          sortBy={this.props.sortBy}
          orderBy={this.props.orderBy}
          manufacturer={this.props.manufacturer}
          type={this.props.type}
          minPrice={this.props.minPrice}
          maxPrice={this.props.maxPrice}
          value={this.props.value} />
        <GameList 
          games={this.props.games} 
          loading={this.props.loading} 
          error={this.props.error}
          currentPage={this.props.currentPage}
          allPages={this.props.allPages}
          onChange={this.handleFilterChange}
          onAddedToCart={this.props.onAddedToCart}
          badge={this.props.badge}/>
      </div>
    )
  }
}

export default HomePage