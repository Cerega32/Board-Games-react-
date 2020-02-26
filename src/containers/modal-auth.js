// какие данные и  экшены на какой странице сделать доступными
import { connect } from "react-redux"
import { signIn, signUp, hideModal, changeSign } from "../actions"
import ModalAuth from "../components/modal-auth";

const mapStateToProps = ({ auth }) => {
  const { isAuth, loading, error, signInOrUp, visibleModal } = auth;
  return { isAuth, loading, error, signInOrUp, visibleModal }
}

const mapDispatchToProps = { signIn, signUp, hideModal, changeSign }

export default connect(mapStateToProps, mapDispatchToProps)(ModalAuth)
