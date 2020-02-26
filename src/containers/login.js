// какие данные и  экшены на какой странице сделать доступными
import { connect } from "react-redux"
import { signIn } from "../actions"
import Login from "../pages/login-page"

const mapStateToProps = ({ auth }) => {
  const { isAuth, loading, error } = auth;
  return { isAuth, loading, error }
}

const mapDispatchToProps = { signIn }

export default connect(mapStateToProps, mapDispatchToProps)(Login)
