// какие данные и  экшены на какой странице сделать доступными
import { connect } from "react-redux"
import Header from "../components/header"
import { onAddedToCart, onRemovedToCart, onAllRemovedToCart, signOut, signUp, signIn, showModal } from "../actions"

const mapStateToProps = ({items, auth}) => {
  const { badge, total } = items;
  const { isAuth, user, loading, error } = auth;
  return { badge, total, isAuth, user, loading, error }
}

const mapDispatchToProps = { onAddedToCart, onRemovedToCart, onAllRemovedToCart, signOut, signUp, signIn, showModal }

export default connect(mapStateToProps, mapDispatchToProps)(Header)
