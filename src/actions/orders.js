import BoardServices from "../services/board-services"

const boardService = new BoardServices()

const makeOrder = (list, email, phone, name, delivery, payment) => async dispatch => {
  dispatch(orderStart())
  try {
    const response = await boardService.postOrder(list, email, phone, name, delivery, payment)
    response.json()
      .then(() => {
        dispatch(orderSuccess())
      })
  } catch (error) {
    dispatch(orderError(error))
  }
}

const orderStart = () => {
  return {
    type: "ORDER_START"
  }
}

const orderSuccess = () => {
  return {
    type: "ORDER_SUCCESS"
  }
}

const orderError = error => {
  return {
    type: "ORDER_ERROR",
    payload: error
  }
}


export { makeOrder }
