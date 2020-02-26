// какие данные и  экшены на какой странице сделать доступными
import { connect } from "react-redux"
import Badge from "../pages/cart-page"
import { onAddedToCart, onRemovedToCart, onAllRemovedToCart, fetchProfile, signUp, showModal, makeOrder } from "../actions"

const mapStateToProps = ({items, auth}) => {
  const { badge, total, loading, orderSuccess } = items;
  const { isAuth, user, userData } = auth;
  return { badge, total, isAuth, user, userData, loading, orderSuccess }
}
const mapDispatchToProps = { onAddedToCart, onRemovedToCart, onAllRemovedToCart, fetchProfile, signUp, showModal, makeOrder }

export default connect(mapStateToProps, mapDispatchToProps)(Badge)
