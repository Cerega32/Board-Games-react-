// какие данные и  экшены на какой странице сделать доступными
import { connect } from "react-redux"
import { signUp } from "../actions"
import Registration from "../pages/registration-page"

const mapStateToProps = ({ auth }) => {
  const { isAuth, loading, error } = auth
  return { isAuth, loading, error }
}

const mapDispatchToProps = { signUp }

export default connect(mapStateToProps, mapDispatchToProps)(Registration)
