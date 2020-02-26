// какие данные и  экшены на какой странице сделать доступными
import { connect } from "react-redux"
import { fetchProfile } from "../actions"
import Profile from "../pages/profile";

const mapStateToProps = ({ auth }) => {
  const { isAuth, loading, userData, error } = auth;
  return { isAuth, loading, userData, error }
}

const mapDispatchToProps = { fetchProfile }

export default connect(mapStateToProps, mapDispatchToProps)(Profile)
