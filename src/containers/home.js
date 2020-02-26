// какие данные и  экшены на какой странице сделать доступными
import { connect } from "react-redux"
import Home from "../pages/home-page"
import { fetchGames, filterChange, onAddedToCart } from "../actions"

const mapStateToProps = ({ items }) => {
  const { games, currentPage, allPages, sortBy, orderBy, loading, error, manufacturer, type, minPrice, maxPrice, value, badge } = items;
  return { games, loading, error, manufacturer, currentPage, allPages, sortBy, orderBy, type, minPrice, maxPrice, value, badge }
}

const mapDispatchToProps = { fetchGames, filterChange, onAddedToCart }

export default connect(mapStateToProps, mapDispatchToProps)(Home)
