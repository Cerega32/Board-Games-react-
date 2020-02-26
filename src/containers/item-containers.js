// какие данные и  экшены на какой странице сделать доступными
import { connect } from "react-redux"
import { fetchGame,  onAddedToCart } from "../actions"
import ItemPage from "../pages/item-page"

const mapStateToProps = ({ items }) => {
  const { games, loading, error } = items
  return { games, loading, error }
}

const mapDispatchToProps = { fetchGame, onAddedToCart }

export default connect(mapStateToProps, mapDispatchToProps)(ItemPage)
